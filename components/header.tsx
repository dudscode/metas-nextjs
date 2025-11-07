import { Button } from "./ui/button";
import { LogOut } from 'lucide-react';


export function Header() {
  return (
    <header className="row-start-1 flex items-center justify-between p-2 px-7 bg-secondary text-white">
      <p>Goals App</p>
     <Button variant="outline" size="icon">
      <LogOut />
    </Button>
    </header>
  );
}