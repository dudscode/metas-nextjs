"use client"

import { useRouter } from "next/navigation"
import { Button } from "./ui/button";
import { LogOut } from 'lucide-react';


export function Header() {
  const router = useRouter();
  const handleLogout = () => {
    document.cookie = 'idGoalsUser=; path=/; max-age=0';
    router.push('/login');
  };

  return (
    <header className="row-start-1 flex items-center justify-between p-2 px-7 bg-secondary text-white">
      <p>Goals App</p>
     <Button variant="outline" size="icon" onClick={handleLogout}>
      <LogOut />
    </Button>
    </header>
  );
}