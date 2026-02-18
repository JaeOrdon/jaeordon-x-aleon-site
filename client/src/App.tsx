import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Merch from "@/pages/Merch";
import NotFound from "@/pages/not-found";
import Cursor from "@/components/ui/cursor";
import Preloader from "@/components/ui/preloader";
import TouchScrollGlow from "@/components/ui/touch-scroll-glow";
import { AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/merch" component={Merch} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  // Incrementing key forces React to remount the Preloader, replaying the intro
  const [preloaderKey, setPreloaderKey] = useState(0);

  const replayIntro = useCallback(() => {
    setPreloaderKey((k) => k + 1);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-black">
        <Preloader key={preloaderKey} />
        <Cursor />
        <TouchScrollGlow />
        <div className="grain" />
        <Navbar onLogoClick={replayIntro} />
        <Router />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
