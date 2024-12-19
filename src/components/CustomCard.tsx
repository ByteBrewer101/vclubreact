

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export function CustomCard() {
  return (
    <Card className="w-[350px] bg-transparant backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Name User</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, quam..
        </CardDescription>
      </CardContent>
      <CardFooter className="flex ">
        
        <Button>Connect</Button>
      </CardFooter>
    </Card>
  );
}
