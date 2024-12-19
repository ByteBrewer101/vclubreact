import { atom } from "recoil";

export const websocketAtom = atom<WebSocket | null>({
  key: "websocketAtom", // Unique key for this atom
  default: null, // Initial value, no WebSocket connection yet
});


interface chatMsg{

  type:string,
  msg:string,
  time:string

}

export const ChatArray = atom<chatMsg[]> ({
  key:"CharArray",
  default:[],
})

export const RoomId = atom<string>({
  key:"roomID",
  default:"",
})

export const SenderId = atom<string>({

  key:"SenderId",
  default:""

})



export const roomId = atom<string>({
  key:"roomId",
  default:""
})