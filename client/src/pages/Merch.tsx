import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import vinylImage from "@assets/Shake_Your_Groovy_Bird_Feather_ALBUM_COVER_1764875387489.png";
import artPrint from "@assets/xe2s4543(saved_7_2_1764875387489.jpg";
import symbolImage from "@assets/symbol_clear_1764875387489.jpg";

const products = [
  {
    id: 1,
    name: "Shake Your Groovy Bird Feather - Vinyl",
    price: "$35.00",
    image: vinylImage,
    category: "Music"
  },
  {
    id: 2,
    name: "Abstract Dreams Print",
    price: "$45.00",
    image: artPrint,
    category: "Art Prints"
  },
  {
    id: 3,
    name: "Mascot Symbol Tee",
    price: "$30.00",
    image: symbolImage, // Using symbol as placeholder for tee design
    category: "Apparel"
  }
];

export default function Merch() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-sm">
              Official Store
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mt-4">
              MERCHANDISE
            </h1>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden bg-white/5 mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button className="bg-primary text-black font-bold rounded-none">
                      ADD TO CART
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  <span className="text-xl text-white font-medium">
                    {product.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
