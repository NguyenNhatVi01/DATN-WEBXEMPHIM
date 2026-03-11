import { Link, useLocation } from "wouter";
import { Film, User, Search, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/">
            <a className="flex items-center gap-2 text-primary font-bold text-2xl tracking-tighter">
              <Film className="w-8 h-8" />
              <span>CINEBOOK</span>
            </a>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/">
              <a className={`text-sm font-medium transition-colors hover:text-primary ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
                Home
              </a>
            </Link>
            <Link href="/movies">
              <a className={`text-sm font-medium transition-colors hover:text-primary ${location.startsWith('/movies') ? 'text-primary' : 'text-muted-foreground'}`}>
                Movies
              </a>
            </Link>
            <Link href="/theaters">
              <a className={`text-sm font-medium transition-colors hover:text-primary ${location.startsWith('/theaters') ? 'text-primary' : 'text-muted-foreground'}`}>
                Theaters
              </a>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Search className="w-5 h-5" />
          </Button>
          <Link href="/tickets">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hidden sm:flex">
              <Ticket className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <User className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/auth">
            <Button variant="outline" className="border-white/20 hover:bg-white/10 hidden sm:flex gap-2">
              <span>Sign In</span>
            </Button>
          </Link>
          {/* Mobile menu trigger could go here */}
        </div>
      </div>
    </nav>
  );
}
