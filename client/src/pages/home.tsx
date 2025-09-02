import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

function EmailSignupForm({ source, title, buttonText }: { source: string; title: string; buttonText: string }) {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: EmailFormData) => {
      const response = await apiRequest("POST", "/api/subscribe", {
        email: data.email,
        source,
      });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setIsSuccess(true);
        toast({
          title: "Success!",
          description: data.message,
        });
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EmailFormData) => {
    mutation.mutate(data);
  };

  if (isSuccess) {
    return (
      <div className="bg-green-100 text-green-800 p-4 sm:p-6 rounded-lg text-center">
        <div className="text-lg sm:text-xl font-bangers mb-2">🎉 Welcome to the Poo Poo Mountain family!</div>
        <p className="text-sm sm:text-base">We'll notify you when the chaos begins.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bangers mb-4 text-center">{title}</h2>
      <p className="mb-4 sm:mb-6 text-poop text-center text-sm sm:text-base leading-relaxed">
        {source === "form1" 
          ? "Enter your email to join the early bird squad. We'll reward your loyalty with nonsense and prizes."
          : "Don't miss out on early bird perks, exclusive updates, and the chance to be part of gaming history (the smelly kind)."
        }
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="your.email@example.com"
                    type="email"
                    {...field}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-poop/20 focus:border-poopAccent transition-colors text-sm sm:text-base"
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            disabled={mutation.isPending}
            className="w-full bg-poop hover:bg-poopAccent text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-bangers text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
          >
            {mutation.isPending ? "Loading..." : buttonText}
          </Button>
        </form>
      </Form>
      
      <p className="text-xs sm:text-sm text-poop/70 text-center">
        We respect your privacy. No spam, just poop jokes and game updates.
      </p>
    </div>
  );
}

export default function Home() {
  const timelinePhases = [
    {
      title: "Phase 1: Pre-Launch 📱",
      description: "Social Media Awareness - Building buzz and gathering our poop squad through hilarious content and sneak peeks.",
      side: "left"
    },
    {
      title: "Phase 2: Crowdfunding 🚀",
      description: "Crowdfunding Launch - Time to back the most ridiculous card game ever created and unlock stretch goals!",
      side: "right"
    },
    {
      title: "Phase 3: Production 🏭",
      description: "Production and Crowdfunding Deliveries - Cards get printed, backers get their games, and the chaos begins!",
      side: "left"
    },
    {
      title: "Phase 4: Taiwan Launch 🇹🇼",
      description: "Taiwan Launch - Our home base gets first dibs on retail copies. Local game stores, prepare for the storm!",
      side: "right"
    },
    {
      title: "Phase 5: Worldwide 🌍",
      description: "Worldwide Launch - Poo Poo Mountain conquers the globe! Available in stores and online everywhere.",
      side: "left"
    },
    {
      title: "Phase 6: Expansion 🎮",
      description: "Product Collaborations and Expansion Packs - More cards, more chaos, more questionable humor!",
      side: "right"
    }
  ];

  return (
    <div className="bg-beige text-poop font-sans">
      {/* Hero Section */}
      <section className="text-center px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bangers mb-4 sm:mb-6">💩 Poo Poo Mountain is Coming!</h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-poop max-w-4xl mx-auto leading-relaxed">
          The funniest card game for kids (and weird adults). Watch the trailer and sign up below for early bird chaos.
        </p>
        
        {/* Video */}
        <div className="max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mb-8 sm:mb-10">
          <div className="relative aspect-video">
            <iframe 
              className="w-full h-full rounded-lg shadow-lg border-2 border-poop/20" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="Poo Poo Mountain Trailer" 
              frameBorder="0" 
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* First Signup Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 lg:py-20 bg-white/80">
        <div className="max-w-sm sm:max-w-md lg:max-w-xl mx-auto">
          <EmailSignupForm 
            source="form1" 
            title="🚀 Be the First to Know" 
            buttonText="Join the Chaos! 💩"
          />
        </div>
      </section>

      {/* Launch Timeline Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 lg:py-20 bg-beige">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bangers text-center mb-12 sm:mb-16 text-poop">
            🗓️ The Journey to Poo Poo Mountain
          </h2>
          
          <div className="relative min-h-[800px] sm:min-h-[900px] lg:min-h-[1000px]">
            {/* Central vertical line - hidden on mobile */}
            <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-poop h-full z-0"></div>
            
            {/* Timeline Items */}
            <div className="space-y-8 sm:space-y-16 relative z-10">
              {timelinePhases.map((phase, index) => (
                <div key={index} className="relative">
                  {/* Mobile Layout - Stacked */}
                  <div className="block sm:hidden">
                    <div className="bg-white rounded-lg p-4 shadow-lg">
                      <div className="bg-poop text-white px-3 py-2 rounded-full inline-block font-bangers text-sm sm:text-base mb-3">
                        {phase.title}
                      </div>
                      <p className="text-poop text-sm leading-relaxed">{phase.description}</p>
                    </div>
                  </div>

                  {/* Desktop/Tablet Layout - Alternating */}
                  <div className="hidden sm:flex items-center">
                    {phase.side === "left" ? (
                      <>
                        <div className="w-1/2 pr-4 md:pr-8 text-right">
                          <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg relative">
                            <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 w-4 md:w-8 h-1 bg-gradient-to-r from-poopAccent to-transparent"></div>
                            <div className="bg-poop text-white px-3 md:px-4 py-2 rounded-full inline-block font-bangers text-sm md:text-lg mb-3">
                              {phase.title}
                            </div>
                            <p className="text-poop text-sm md:text-base leading-relaxed">{phase.description}</p>
                          </div>
                        </div>
                        
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-poopAccent rounded-full border-2 md:border-4 border-beige"></div>
                        
                        <div className="w-1/2 pl-4 md:pl-8"></div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/2 pr-4 md:pr-8"></div>
                        
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-poopAccent rounded-full border-2 md:border-4 border-beige"></div>
                        
                        <div className="w-1/2 pl-4 md:pl-8">
                          <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg relative">
                            <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 w-4 md:w-8 h-1 bg-gradient-to-l from-poopAccent to-transparent"></div>
                            <div className="bg-poop text-white px-3 md:px-4 py-2 rounded-full inline-block font-bangers text-sm md:text-lg mb-3">
                              {phase.title}
                            </div>
                            <p className="text-poop text-sm md:text-base leading-relaxed">{phase.description}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Second Signup Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 lg:py-20 bg-white/80">
        <div className="max-w-sm sm:max-w-md lg:max-w-xl mx-auto">
          <EmailSignupForm 
            source="form2" 
            title="💩 Ready to Join the Mountain?" 
            buttonText="Count Me In! 🚀"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-poop text-white/80 py-6 sm:py-8 px-4 sm:px-6 text-center">
        <p className="font-bangers text-xl sm:text-2xl mb-2">💩 Poo Poo Mountain</p>
        <p className="text-sm sm:text-base">The card game that's about to get real messy.</p>
        <p className="text-xs sm:text-sm mt-4 opacity-70">
          © 2024 Poo Poo Mountain. All rights reserved. No actual poop involved.
        </p>
      </footer>
    </div>
  );
}
