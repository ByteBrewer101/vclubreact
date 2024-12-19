import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export function UserAvatar(){

    return (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    );
}