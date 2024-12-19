

import { useUser } from "@clerk/clerk-react";
import { AvatarImage,Avatar,AvatarFallback } from "./ui/avatar";
import { useRecoilValue } from "recoil";
import { SenderId } from "@/Atoms/Atoms";



interface propsTypes{

  message:string,
  type?:string,
  time?:string


}


export function MsgComponentSender(props:propsTypes){
  const {user}= useUser()
  const username = user?.firstName
  const image = user?.imageUrl

  

    
    return (
      <div className="w-full flex flex-col  items-end" >
        <div className="h-fit w-fit space-y-2 py-4  ">
          <div className="flex space-x-2  justify-end items-end  ">
            <Avatar className="w-6 h-6">
              <AvatarImage src={image} />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <h1 className="font-semibold ">{username}</h1>
          </div>

          <div className="bg-gray-200 p-2  rounded-xl w-full  text-black ">
            {props.message}
          </div>
          <p className="text-end" >{props.time}</p>
        </div>
      </div>
    );
}


export function MsgComponentReciever(props: propsTypes) {

  const senderName = useRecoilValue(SenderId)


  return (
    <div className="w-full flex flex-col  items-start">
      <div className="h-fit w-fit space-y-2 py-4  ">
        <div className="flex space-x-2  justify-start items-start  ">
          <Avatar className="w-6 h-6">
            <AvatarImage src={"https://github.com/shadcn.png"} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <h1 className="font-bold ">{senderName}</h1>
        </div>

        <div className="bg-gray-900 p-2  rounded-xl w-full  text-white ">
          {props.message}
        </div>
        <p className="text-start">{props.time}</p>
      </div>
    </div>
  );
}
