import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";

import { ModeToggle } from "./modetoggle";
import { useEffect } from "react";
import { toast } from "sonner";

export default function TopBar() {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      toast.warning("Not Signed in");
    } else {
      toast.success("Signed in Successfully");
    }
  }, [isSignedIn]);

  return (
    <header className="flex justify-around p-2">
      <div>
        <h1 className="text-xl font-bold">Verto Connect</h1>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <ModeToggle />
        <SignedOut>
          <div className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-2 rounded-lg text-sm">
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
