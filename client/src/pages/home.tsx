import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

export function EmailSignupForm({
  source,
  title,
  buttonText,
}: {
  source: string;
  title: string;
  buttonText: string;
}) {
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
          title: "Success! 💩",
          description: "🎉 Welcome to the Poo Poo Mountain family! When the chaos begins, we'll notify you right away! 🎉 歡迎加入《噗噗山》大家庭！混亂開始時，我們會第一時間通知你！",
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
        <div className="text-lg sm:text-xl font-bangers mb-2">
          🎉 Welcome to the Poo Poo Mountain family!
        </div>
        <div className="text-sm sm:text-base mb-2">
          When the chaos begins, we'll notify you right away!
        </div>
        <div className="text-lg sm:text-xl font-bangers mb-2">
          🎉 歡迎加入《噗噗山》大家庭！
        </div>
        <div className="text-xs sm:text-sm">
          混亂開始時，我們會第一時間通知你！
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bangers mb-2 text-amber-900">
          {title}
        </h2>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bangers text-amber-700">
          {source === "form1" 
            ? "💩 加入噗噗山小隊！"
            : source === "form2"
            ? "💩 準備好加入噗噗山了嗎？"
            : source === "legend-page"
            ? "💩 加入傳說！"
            : source === "how-to-play-page"
            ? "💩 加入噗噗山小隊！"
            : "💩 加入噗噗山小隊！"
          }
        </h3>
      </div>
      <p className="mb-4 sm:mb-6 text-poop text-center text-sm sm:text-base leading-relaxed">
        {source === "form1"
          ? "Join our e-mail list and get a free printable coloring book, exclusive backer rewards for email list subscribers during crowdfunding launch, and a front row seat to the most ridiculous (and smelliest) card game ever created."
          : "Join our e-mail list and get a free printable coloring book, exclusive backer rewards for email list subscribers during crowdfunding launch, and a front row seat to the most ridiculous (and smelliest) card game ever created."}
      </p>
      <p className="mb-4 sm:mb-6 text-[#3D2B1F] text-center text-xs sm:text-sm leading-relaxed">
        {source === "form1"
          ? "加入我們的電子郵件名單，獲得免費可列印的著色本、眾籌啟動期間專屬贊助者獎勵，以及最前排觀賞史上最荒謬（也最臭的）桌遊的機會。"
          : "加入我們的電子郵件名單，獲得免費可列印的著色本、眾籌啟動期間專屬贊助者獎勵，以及最前排觀賞史上最荒謬（也最臭的）桌遊的機會。"}
      </p>

      {/* Coloring Book Image with Arrows */}
      {true && (
        <div className="flex items-center justify-center my-6 sm:my-8 relative">
          <style>{`
            @keyframes arrowFlash {
              0%, 100% { opacity: 1; transform: translateY(0px) scale(1); }
              25% { opacity: 0.6; transform: translateY(2px) scale(1.1); }
              50% { opacity: 1; transform: translateY(-1px) scale(0.95); }
              75% { opacity: 0.8; transform: translateY(1px) scale(1.05); }
            }
          `}</style>
          {/* Left Arrow - Flowing from book toward form */}
          <div 
            className="absolute left-8 sm:left-12 md:left-16 top-1/2 transform -translate-y-1/2"
            style={{
              animation: 'arrowFlash 1.5s infinite ease-in-out'
            }}
          >
            <img 
              src="/cartoon-arrow.webp"
              alt="Arrow pointing to signup"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
              style={{
                transform: 'scaleX(-1) rotate(-45deg)'
              }}
            />
          </div>

          {/* Coloring Book Image */}
          <div className="w-32 sm:w-40 md:w-48 lg:w-56 max-w-xs mx-8 sm:mx-16">
            <img
              src="/coloring-book-3d-optimized.webp"
              alt="Poo Poo Mountain Coloring Book - Free with email signup"
              className="w-full h-auto object-contain drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 transform hover:scale-105"
            />
          </div>

          {/* Right Arrow - Flowing from book toward form */}
          <div 
            className="absolute right-8 sm:right-12 md:right-16 top-1/2 transform -translate-y-1/2"
            style={{
              animation: 'arrowFlash 1.5s infinite ease-in-out 0.5s'
            }}
          >
            <img 
              src="/cartoon-arrow.webp"
              alt="Arrow pointing to signup"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
              style={{
                transform: 'scaleX(1) rotate(-45deg)'
              }}
            />
          </div>
        </div>
      )}

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
      <p className="text-xs sm:text-sm text-amber-900/70 text-center">
        我們尊重您的隱私。沒有垃圾郵件，只有關於糞便的笑話和遊戲更新。
      </p>
    </div>
  );
}

export default function Home() {
  const timelinePhases = [
    {
      title: "Phase 1: Pre-Launch 📱",
      description:
        "Social Media Awareness - Building buzz and gathering our poop squad through hilarious content and sneak peeks.",
      side: "left",
    },
    {
      title: "Phase 2: Crowdfunding 🚀",
      description:
        "Crowdfunding Launch - Time to back the most ridiculous card game ever created and unlock stretch goals!",
      side: "right",
    },
    {
      title: "Phase 3: Production 🏭",
      description:
        "Production and Crowdfunding Deliveries - Cards get printed, backers get their games, and the chaos begins!",
      side: "left",
    },
    {
      title: "Phase 4: Taiwan Launch 🇹🇼",
      description:
        "Taiwan Launch - Our home base gets first dibs on retail copies. Local game stores, prepare for the storm!",
      side: "right",
    },
    {
      title: "Phase 5: Worldwide 🌍",
      description:
        "Worldwide Launch - Poo Poo Mountain conquers the globe! Available in stores and online everywhere.",
      side: "left",
    },
    {
      title: "Phase 6: Expansion 🎮",
      description:
        "Product Collaborations and Expansion Packs - More cards, more chaos, more questionable humor!",
      side: "right",
    },
  ];

  // Handle both hash and query parameter navigation
  useEffect(() => {
    const scrollIfNeeded = () => {
      const params = new URLSearchParams(window.location.search);
      if (window.location.hash === '#journey' || params.get('scroll') === 'journey') {
        document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
        // Clean up query parameter after scrolling
        if (params.get('scroll') === 'journey') {
          const url = new URL(window.location.href);
          url.searchParams.delete('scroll');
          url.hash = 'journey';
          history.replaceState(null, "", url.toString());
        }
      }
    };
    
    const t = setTimeout(scrollIfNeeded, 0); // next tick after mount
    const onHashChange = () => setTimeout(scrollIfNeeded, 0);
    const onPopState = () => setTimeout(scrollIfNeeded, 0);
    
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('popstate', onPopState);
    
    return () => {
      clearTimeout(t);
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  return (
    <div className="bg-beige text-poop font-sans">
      {/* Hero Section */}
      <section className="text-center px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
          <img 
            src="/poo-victory.png" 
            alt="Poo Character Victory Pose" 
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
          />
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bangers text-[#3D2B1F]">
            Poo Poo Mountain is Coming!
          </h1>
          <img 
            src="/victory-toilet-man.png" 
            alt="Victory Toilet Character" 
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
          />
        </div>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-poop max-w-4xl mx-auto leading-relaxed">
          The funniest card game for kids (and weird adults). Watch the trailer
          and sign up below for early bird chaos.
        </p>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-amber-900 max-w-4xl mx-auto leading-relaxed">
          最有趣的兒童（和怪異的成年人）卡牌遊戲。觀看預告片並在下方註冊以獲得早鳥混亂。
        </p>

        {/* Video */}
        <div className="max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mb-8 sm:mb-10">
          <div className="relative aspect-video">
            <iframe
              className="w-full h-full rounded-lg shadow-lg border-2 border-poop/20 object-contain"
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
      <section id="journey" className="px-4 sm:px-6 py-12 sm:py-16 lg:py-20 bg-beige">
        <div className="max-w-6xl mx-auto">
          {/* Sailing Image */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <img 
              src="/sailing-optimized.webp" 
              alt="Poo and Toilet characters sailing to Poo Poo Mountain" 
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-contain"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bangers text-center mb-12 sm:mb-16 text-[#3D2B1F]">
            🗓️ The Journey to Poo Poo Mountain
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-[#3D2B1F] max-w-4xl mx-auto text-center leading-relaxed">
            通往噗噗山的旅程
          </p>

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
                      <p className="text-poop text-sm leading-relaxed">
                        {phase.description}
                      </p>
                      <p className="text-poop text-xs leading-relaxed">
                        {index === 0 &&
                          "社交媒體意識 - 透過搞笑內容和預覽來建立人氣並聚集我們的糞便隊伍。"}
                        {index === 1 &&
                          "眾籌發布 - 是時候支持有史以來最荒謬的紙牌遊戲並解鎖 the stretch goals！"}
                        {index === 2 &&
                          "製作與眾籌交付 - 紙牌被印刷，支持者獲得他們的遊戲，混亂開始了！"}
                        {index === 3 &&
                          "台灣發布 - 我們的總部將首先獲得零售複製品。當地遊戲商店，準備迎接風暴！"}
                        {index === 4 &&
                          "全球發布 - 噗噗山征服世界！隨處有售，線上和線下。"}
                        {index === 5 &&
                          "產品合作與擴展包 - 更多的紙牌，更多的混亂，更多的可疑幽默！"}
                      </p>
                    </div>
                  </div>

                  {/* Desktop/Tablet Layout - Alternating */}
                  <div className="hidden sm:flex items-center">
                    {phase.side === "left" ? (
                      <>
                        <div className="w-1/2 pr-4 md:pr-8 text-right">
                          <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg relative">
                            <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 w-4 md:w-8 h-1 bg-gradient-to-r from-amber-600 to-transparent"></div>
                            <div className="bg-poop text-white px-3 md:px-4 py-2 rounded-full inline-block font-bangers text-sm md:text-lg mb-3">
                              {phase.title}
                            </div>
                            <p className="text-poop text-sm md:text-base leading-relaxed">
                              {phase.description}
                            </p>
                            <p className="text-poop text-xs md:text-sm leading-relaxed">
                              {index === 0 &&
                                "社交媒體意識 - 透過搞笑內容和預覽來建立人氣並聚集我們的糞便隊伍。"}
                              {index === 1 &&
                                "眾籌發布 - 是時候支持有史以來最荒謬的紙牌遊戲並解鎖 the stretch goals！"}
                              {index === 2 &&
                                "製作與眾籌交付 - 紙牌被印刷，支持者獲得他們的遊戲，混亂開始了！"}
                              {index === 3 &&
                                "台灣發布 - 我們的總部將首先獲得零售複製品。當地遊戲商店，準備迎接風暴！"}
                              {index === 4 &&
                                "全球發布 - 噗噗山征服世界！隨處有售，線上和線下。"}
                              {index === 5 &&
                                "產品合作與擴展包 - 更多的紙牌，更多的混亂，更多的可疑幽默！"}
                            </p>
                          </div>
                        </div>

                        <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-amber-600 rounded-full border-2 md:border-4 border-beige"></div>

                        <div className="w-1/2 pl-4 md:pl-8"></div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/2 pr-4 md:pr-8"></div>

                        <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-amber-600 rounded-full border-2 md:border-4 border-beige"></div>

                        <div className="w-1/2 pl-4 md:pl-8">
                          <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg relative">
                            <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 w-4 md:w-8 h-1 bg-gradient-to-l from-amber-600 to-transparent"></div>
                            <div className="bg-poop text-white px-3 md:px-4 py-2 rounded-full inline-block font-bangers text-sm md:text-lg mb-3">
                              {phase.title}
                            </div>
                            <p className="text-poop text-sm md:text-base leading-relaxed">
                              {phase.description}
                            </p>
                            <p className="text-poop text-xs md:text-sm leading-relaxed">
                              {index === 0 &&
                                "社交媒體意識 - 透過搞笑內容和預覽來建立人氣並聚集我們的糞便隊伍。"}
                              {index === 1 &&
                                "眾籌發布 - 是時候支持有史以來最荒謬的紙牌遊戲並解鎖 the stretch goals！"}
                              {index === 2 &&
                                "製作與眾籌交付 - 紙牌被印刷，支持者獲得他們的遊戲，混亂開始了！"}
                              {index === 3 &&
                                "台灣發布 - 我們的總部將首先獲得零售複製品。當地遊戲商店，準備迎接風暴！"}
                              {index === 4 &&
                                "全球發布 - 噗噗山征服世界！隨處有售，線上和線下。"}
                              {index === 5 &&
                                "產品合作與擴展包 - 更多的紙牌，更多的混亂，更多的可疑幽默！"}
                            </p>
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
        {/* Poo and Toilet Friends Image */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <img
            src="/poo-toilet-friends-optimized.webp"
            alt="Poo and Toilet Characters - Best Friends Forever"
            className="w-64 sm:w-80 md:w-96 lg:w-[400px] h-auto object-contain drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 transform hover:scale-105"
          />
        </div>

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
        <p className="font-bangers text-xl sm:text-2xl mb-2 text-amber-900">
          💩 Poo Poo Mountain
        </p>
        <p className="text-sm sm:text-base">
          The card game that's about to get real messy.
        </p>
        <p className="text-sm sm:text-base text-amber-900">
          最臭名昭著的卡牌遊戲。
        </p>
        <p className="text-xs sm:text-sm mt-4 opacity-70">
          © 2025 Poo Poo Mountain. All rights reserved. No actual poop
          involved.
        </p>
        <p className="text-xs sm:text-sm mt-4 opacity-70">
          © 2025 噗噗山。保留所有權利。不涉及實際的糞便。
        </p>
      </footer>
    </div>
  );
}
