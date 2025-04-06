
import React from 'react';
import { cn } from '@/lib/utils';
import { Leaf } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("py-4 border-b", className)}>
      <div className="container flex items-center gap-2">
        <div className="bg-leaf rounded-md p-1">
          <Leaf className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-xl font-bold">Potato Leaf Guardian</h1>
      </div>
    </header>
  );
};

export default Header;
