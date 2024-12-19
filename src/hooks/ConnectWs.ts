import { ChatArray, roomId, SenderId, websocketAtom } from "@/Atoms/Atoms";
import { useEffect, useCallback } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export function useConnectServer() {
  const [socket, setSocket] = useRecoilState(websocketAtom);
    const [senderId, setSenderId] = useRecoilState(SenderId);
    const setRoomId = useSetRecoilState(roomId);
  const setChats = useSetRecoilState(ChatArray);
  const createSocket = useCallback(
    (token: string) => {
      const baseurl = import.meta.env.VITE_BASE_URL;
      const url = `${baseurl}?token=${token}`;
      const ws = new WebSocket(url);

      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = (event) => {
        console.log("WebSocket disconnected:", event.reason);
      };

      ws.onmessage = (message) => {
        

        const msg = JSON.parse(message.data);
  



        // if(currsndr!=msg.sender){
        //   setSender(msg.sender)
        //   updateSender(msg.sender)
        
        // }

        if(msg.sender ==="roomId"){
          setRoomId(msg.msg)
          
        }

         if (msg.sender && msg.sender !== senderId) {

         

           setSenderId(msg.sender);
         }
        
        

        const currentMessage = {
          type: "received",
          msg: msg.msg,
          time: gettime(),
        };

        setChats((prevChats) => [...prevChats, currentMessage]);
      };

      setSocket(ws);

      return () => {
        ws.close(); // Ensure the WebSocket is closed when the component unmounts or reconnects
      };
    },
    [setSocket, setChats,senderId,setSenderId,setRoomId]
  );

  useEffect(() => {
    return () => {
      // Cleanup WebSocket connection when the hook is unmounted
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return { socket, createSocket };
}

export function useSendInitMsg(): () => void {
  const socket = useRecoilValue(websocketAtom);

  return () => {
    socket?.send(
      JSON.stringify({
        type: "joinRoom",
      })
    );
  };
}

export function gettime() {
  const now = new Date();
  const hrs = String(now.getHours()).padStart(2, "0");
  const mins = String(now.getMinutes()).padStart(2, "0");

  return `${hrs}:${mins}`;
}

export function useSendMsg(): (msg: string) => void {
  const socket = useRecoilValue(websocketAtom);
  const setChats = useSetRecoilState(ChatArray);

  return (msg: string) => {
    const currMsg = {
      type: "sent",
      msg: msg,
      time: gettime(),
    };

    setChats((prevchats) => [...prevchats, currMsg]);

    socket?.send(
      JSON.stringify({
        type: "chat",
        content: msg,
      })
    );
  };
}

