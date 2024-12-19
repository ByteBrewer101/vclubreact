import { ChatComponent } from "@/components/ChatComponent";
 

import { useSession } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Chatpage() {
  const nav = useNavigate();
  const { isSignedIn } = useSession();


  useEffect(() => {
    if (!isSignedIn) {
      nav("/");
    }

   
  }, [isSignedIn, nav]);



  return (
    <div className="flex flex-col h-[calc(100vh-64px)] p-2 ">
      
      {/* Chat Messages */}
      <div className=" flex-1 h-full flex items-center justify-center p-2 ">
        <ChatComponent />
      </div>
    </div>
  );
}
