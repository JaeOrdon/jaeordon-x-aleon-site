import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function Newsletter() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-6">
          Don't Miss a Beat
        </h2>
        <p className="text-black/80 text-lg mb-10 font-medium">
          Subscribe to get exclusive updates on new tracks, tour dates, and behind-the-scenes content.
        </p>

        <form className="space-y-6 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <Input 
            type="email" 
            placeholder="Enter your email address" 
            className="bg-black/10 border-black/20 text-black placeholder:text-black/50 h-14 rounded-none focus-visible:ring-black"
          />
          
          <div className="flex items-center space-x-2 justify-center">
            <Checkbox id="terms" className="border-black/30 data-[state=checked]:bg-black data-[state=checked]:text-white" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black/70"
            >
              Yes, subscribe me to the newsletter.
            </label>
          </div>

          <Button className="w-full h-14 bg-black text-white hover:bg-black/80 rounded-none font-bold text-lg uppercase tracking-widest">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
