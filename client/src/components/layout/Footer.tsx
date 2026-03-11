import { Link } from "wouter";
import { Film, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/60 backdrop-blur-lg border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <a className="flex items-center gap-2 text-primary font-bold text-xl tracking-tighter mb-4 hover:opacity-80 transition-opacity">
                <Film className="w-6 h-6" />
                <span>CINEBOOK</span>
              </a>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Your ultimate destination for movie tickets, reservations, and cinema experiences.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary/20 transition-colors flex items-center justify-center text-muted-foreground hover:text-primary">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary/20 transition-colors flex items-center justify-center text-muted-foreground hover:text-primary">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary/20 transition-colors flex items-center justify-center text-muted-foreground hover:text-primary">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary/20 transition-colors flex items-center justify-center text-muted-foreground hover:text-primary">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/"><a className="text-muted-foreground hover:text-primary transition-colors text-sm">Home</a></Link></li>
              <li><Link href="/movies"><a className="text-muted-foreground hover:text-primary transition-colors text-sm">Movies</a></Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Theaters</a></li>
              <li><Link href="/profile"><a className="text-muted-foreground hover:text-primary transition-colors text-sm">My Bookings</a></Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Offers</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-bold text-white mb-4">About</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Press Kit</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Refund Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">+84 (123) 456 7890</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">support@cinebook.vn</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">HCM City, Vietnam</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} CINEBOOK. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
