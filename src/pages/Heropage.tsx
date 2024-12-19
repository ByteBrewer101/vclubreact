import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";

import Particles from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { CustomCard } from "@/components/CustomCard";
import { useNavigate } from "react-router-dom";
import { useSendInitMsg } from "@/hooks/ConnectWs";


export function HeroPage() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffff");
  const nav = useNavigate()
  const initmsg = useSendInitMsg();

  useEffect(() => {
    setColor(theme === "dark" ? "#ffff" : "#0000");
  }, [theme]);

  function handleNav(){
    initmsg()
    nav("/chat")
  }

  return (
    <div className="relative py-10 md:py-0  flex flex-col items-center justify-center w-full min-h-screen overflow-hidden px-4 sm:px-8 md:px-16">
      <div className="flex flex-col items-center justify-around space-y-8 text-center mb-8 sm:w-full md:w-2/3 lg:w-1/2 ">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-200">
          Start Connecting now
        </h1>
        <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-gray-200 mt-4 max-w-xl">
          Connect with others easily and efficiently with our platform. Click
          the button below to get started.
        </h3>
        <Button className="bg-orange-500 text-white shadow-lg shadow-orange-500/50 p-4" onClick={handleNav} >
          Get Started
        </Button>

        <div className="flex justify-center items-center text-center font-bold underline space-x-2 mt-4">
          <button>Disclaimer</button>
          <button>Terms of service</button>
        </div>
      </div>

      <Particles
        className="absolute inset-0 z-0"
        quantity={900}
        ease={50}
        color={color}
        refresh
      />
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 justify-center items-center z-1">
        <CustomCard />
        <CustomCard />
        <CustomCard />
      </div>
    </div>
  );
}
