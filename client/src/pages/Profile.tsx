import { useState } from "react";
import { QrCode, LogOut, Settings, Award, Ticket, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { movies } from "@/lib/data";

// Import generated images
import actionPoster from "@/assets/images/poster-action.png";

export default function Profile() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl min-h-[calc(100vh-64px)]">
      
      {/* Profile Header */}
      <div className="bg-card/40 border border-white/10 rounded-3xl p-6 md:p-10 mb-8 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 relative z-10">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-purple-600 p-1">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-4xl font-bold overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=transparent`} alt="avatar" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">Alex Nguyen</h1>
            <p className="text-muted-foreground mb-4">alex.nguyen@example.com • +84 987 654 321</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <Badge className="bg-gradient-to-r from-yellow-500 to-amber-400 text-black border-none px-3 py-1 text-sm font-bold gap-1">
                <Award className="w-4 h-4" /> GOLD MEMBER
              </Badge>
              <Badge variant="outline" className="border-white/20 bg-white/5 px-3 py-1 text-sm">
                2,450 Points
              </Badge>
            </div>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" className="border-white/10 hover:bg-white/5">
              <Settings className="w-4 h-4 mr-2" /> Settings
            </Button>
            <Button variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="tickets" className="w-full">
        <TabsList className="bg-card/50 border border-white/10 p-1 w-full justify-start h-auto overflow-x-auto scrollbar-hide mb-8">
          <TabsTrigger value="tickets" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 px-6 rounded-xl text-base gap-2">
            <Ticket className="w-5 h-5" /> My Tickets
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-white/10 py-3 px-6 rounded-xl text-base gap-2">
            Watch History
          </TabsTrigger>
          <TabsTrigger value="watchlist" className="data-[state=active]:bg-white/10 py-3 px-6 rounded-xl text-base gap-2">
            <Heart className="w-5 h-5" /> Watchlist
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="mt-0">
          <h2 className="text-2xl font-bold mb-6">Upcoming Shows</h2>
          
          <div className="grid gap-6">
            {/* Active Ticket Card */}
            <div className="flex flex-col md:flex-row bg-gradient-to-r from-card to-black border border-primary/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(225,29,72,0.1)]">
              {/* Poster Side */}
              <div className="w-full md:w-48 h-64 md:h-auto shrink-0 relative">
                <img src={actionPoster} alt="Movie" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r" />
              </div>
              
              {/* Details Side */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">The Silent Echo</h3>
                      <p className="text-primary font-medium">Cineplex Central • Hall 4</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">CONFIRMED</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 rounded-2xl p-4 border border-white/5 mb-6">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase mb-1">Date</p>
                      <p className="font-bold">Today</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase mb-1">Time</p>
                      <p className="font-bold">08:30 PM</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase mb-1">Seats</p>
                      <p className="font-bold text-white">E5, E6</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase mb-1">Booking ID</p>
                      <p className="font-mono font-bold">CNB-8A9F21</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button className="gap-2 flex-1 md:flex-none">
                    <QrCode className="w-5 h-5" /> View E-Ticket QR
                  </Button>
                  <Button variant="outline" className="border-white/10 hover:bg-white/5">
                    Order F&B
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-0 text-center py-20 bg-card/20 rounded-3xl border border-white/5">
          <div className="text-muted-foreground">Your watch history will appear here.</div>
        </TabsContent>

        <TabsContent value="watchlist" className="mt-0 text-center py-20 bg-card/20 rounded-3xl border border-white/5">
          <div className="text-muted-foreground">Movies you've saved for later will appear here.</div>
        </TabsContent>

      </Tabs>
    </div>
  );
}