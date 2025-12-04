import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Merch from "@/pages/Merch";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/merch" component={Merch} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-black">
        <div className="grain" />
        <Navbar />
        <Router />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
