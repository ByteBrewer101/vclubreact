import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
import TopBar from "./components/Topbar";
import { HeroPage } from "./pages/Heropage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Chatpage } from "./pages/Chatpage";
import { useAuth } from "@clerk/clerk-react";
import { useConnectServer } from "./hooks/ConnectWs";
import { useEffect } from "react";




export default function App() {
  const { getToken } = useAuth();


  const { createSocket } = useConnectServer();

  useEffect(() => {
    async function handleConnect() {
      try {
        const token = await getToken(); // Retrieve the JWT token
        

        if (token) {
          console.log("before hook");

          createSocket(token);
          console.log(token);

          console.log("Successfully connected to the server!");
        } else {
          console.error("Failed to retrieve token!");
        }
      } catch (error) {
        console.error("Error while connecting to server:", error);
      }
    }

  


    handleConnect();
  }, [getToken, createSocket]);

  


  

  return (
    <BrowserRouter>
      <ThemeProvider>
        <TopBar />
        <Toaster richColors />
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/chat" element={<Chatpage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
