import { useRecoilValue } from "recoil";
import { MsgComponentReciever, MsgComponentSender } from "./MsgComponent";
import { Card } from "./ui/card";
import { ChatArray, roomId } from "@/Atoms/Atoms";
import { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useSendMsg } from "@/hooks/ConnectWs";


export function ChatComponent() {
  const Chats = useRecoilValue(ChatArray);
  const roomIdCheck = useRecoilValue(roomId)

  const [currMsg, setcurrMsg] = useState("");
  const sendMessage = useSendMsg();
  const scrollref = useRef(null);

  // Scroll to the bottom whenever Chats array changes or new message is sent
  useEffect(() => {
    if (scrollref.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      scrollref.current.scrollTop = scrollref.current.scrollHeight;
    }
  }, [Chats]);

  useEffect(() => {
    async function getImage() {
      try {
        const response = await axios.post("http://localhost:5000/roomdata", {
          roomId: roomIdCheck, // Sending roomId in request body
        });

        // Access user data from response
        const resdata = response.data;
       
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    }

    if (roomIdCheck) {
      getImage();
    }
  }, [roomIdCheck]);

  function handleSendMessage() {
    if (currMsg.trim() !== "") {
      sendMessage(currMsg);
      setcurrMsg("");
    }
  }

  return (
    <Card className="w-1/2 h-full flex flex-col justify-end  relative z-3 backdrop-blur-lg  ">
      <div
        className="flex flex-col-reverse p-2 h-full scroll-smooth overflow-y-scroll border-red-500"
        ref={scrollref}
      >
        {[...Chats]
          .reverse()
          .map((i, k) =>
            i.type === "sent" ? (
              <MsgComponentSender key={k} message={i.msg} time={i.time} />
            ) : (
              <MsgComponentReciever key={k} message={i.msg} time={i.time} />
            )
          )}
      </div>

      <div className="w-full flex space-x-2 p-2">
        <input
          type="text"
          placeholder="Your Message"
          value={currMsg}
          className="focus:outline-none w-full py-2 bg-gray-200 rounded-lg p-2 dark:text-black "
          onChange={(e) => setcurrMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </Card>
  );
}
