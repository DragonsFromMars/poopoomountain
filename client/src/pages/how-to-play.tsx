import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertEmailSchema, type InsertEmail } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

export default function HowToPlayPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertEmail>({
    resolver: zodResolver(
      insertEmailSchema.extend({
        email: insertEmailSchema.shape.email.email(
          "Please enter a valid email address",
        ),
      }),
    ),
    defaultValues: {
      email: "",
      source: "how-to-play-form",
    },
  });

  const subscribeEmail = useMutation({
    mutationFn: async (data: InsertEmail) => {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Subscription failed");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success! 💩",
        description: "🎉 Welcome to the Poo Poo Mountain family! When the chaos begins, we'll notify you right away! 🎉 歡迎加入《噗噗山》大家庭！混亂開始時，我們會第一時間通知你！",
        variant: "default",
      });
      setIsSubmitted(true);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/emails"] });
    },
    onError: (error: any) => {
      const message =
        error?.message || "Something went wrong. Please try again.";
      toast({
        title: "Oops!",
        description: message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertEmail) => {
    subscribeEmail.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#3D2B1F] mb-2 font-['Bangers']">
            💩 How to Play Poo Poo Mountain
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-amber-900 mb-6 font-['Bangers']">
            💩 如何玩噗噗山
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-amber-700 max-w-3xl mx-auto mb-2">
            Welcome to the ultimate bathroom showdown.
            <br />
            Your goal: be the first to turn all your clean toilets into mighty
            Poo Poo Mountains!
          </p>
          <p className="text-base sm:text-lg lg:text-xl text-amber-700 max-w-3xl mx-auto">
            歡迎來到終極廁所大對決。
            <br />
            你的目標：成為第一個將所有乾淨馬桶變成噗噗山的玩家！
          </p>
        </div>

        {/* Game Info Section */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg border-4 border-amber-900">
            <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-2 font-['Bangers'] flex items-center">
              👥 Players
            </h3>
            <h4 className="text-lg lg:text-xl font-bold text-amber-900 mb-4 font-['Bangers']">
              👥 玩家人數
            </h4>
            <p className="text-amber-700 text-lg mb-1">2–4 players</p>
            <p className="text-amber-700 text-sm mb-2">2–4 位玩家</p>
            <p className="text-amber-700 mb-1">
              Ages: anyone who laughs at bathroom jokes
            </p>
            <p className="text-amber-700 text-sm mb-2">
              年齡：任何會對廁所笑話發笑的人
            </p>
            <p className="text-amber-700 mb-1">Play time: 15–25 minutes</p>
            <p className="text-amber-700 text-sm">遊戲時間：15–25 分鐘</p>
          </div>

          <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg border-4 border-amber-900">
            <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-2 font-['Bangers'] flex items-center">
              🎲 Setup
            </h3>
            <h4 className="text-lg lg:text-xl font-bold text-amber-900 mb-4 font-['Bangers']">
              🎲 遊戲設置
            </h4>
            <p className="text-amber-700 mb-1">
              Each player gets 4 clean toilet cards. Place them in front of you.
            </p>
            <p className="text-amber-700 text-sm mb-2">
              每位玩家獲得 4 張乾淨馬桶卡片。將它們放在面前。
            </p>
            <p className="text-amber-700 mb-1">
              Shuffle the deck and deal 4 cards to each player.
            </p>
            <p className="text-amber-700 text-sm mb-2">
              洗牌並發給每位玩家 4 張卡片。
            </p>
            <p className="text-amber-700 mb-1">
              Put the rest in the middle as the draw pile.
            </p>
            <p className="text-amber-700 text-sm">
              將剩餘卡片放在中間作為抽牌堆。
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg border-4 border-amber-900 md:col-span-2">
            <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-2 font-['Bangers'] flex items-center">
              🚽 On Your Turn
            </h3>
            <h4 className="text-lg lg:text-xl font-bold text-amber-900 mb-4 font-['Bangers']">
              🚽 你的回合
            </h4>
            <p className="text-amber-700 mb-1">
              <strong>1.</strong> Draw 1 card.
            </p>
            <p className="text-amber-700 text-sm mb-2">
              <strong>1.</strong> 抽取 1 張卡片。
            </p>
            <p className="text-amber-700 mb-1">
              <strong>2.</strong> Play 1 card. (Or do nothing if you can't.)
            </p>
            <p className="text-amber-700 text-sm mb-2">
              <strong>2.</strong> 打出 1 張卡片。（如果無法打出則跳過。）
            </p>
            <p className="text-amber-700 mb-1">
              <strong>3.</strong> End your turn.
            </p>
            <p className="text-amber-700 text-sm">
              <strong>3.</strong> 結束你的回合。
            </p>
          </div>
        </div>

        {/* Winning Section */}
        <div className="bg-gradient-to-r from-yellow-200 to-amber-200 rounded-xl p-8 lg:p-12 mb-16 border-4 border-amber-900 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-2 font-['Bangers']">
            🏆 Winning
          </h3>
          <h4 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-4 font-['Bangers']">
            🏆 獲勝條件
          </h4>
          <p className="text-xl lg:text-2xl text-amber-800 mb-2">
            The first player to turn all 4 toilets into poo is crowned the{" "}
            <strong>Toilet Champion!</strong> 👑💩
          </p>
          <p className="text-lg lg:text-xl text-amber-800">
            第一位將所有 4 個馬桶變成噗噗的玩家將被封為
            <strong>廁所冠軍！</strong> 👑💩
          </p>
        </div>

        {/* Toilet Divider */}
        <div className="text-center mb-16">
          <div className="text-6xl">🚽💩🪠💩🚽</div>
        </div>

        {/* Card Guide Section */}
        <div className="mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-2 text-center font-['Bangers']">
            🃏 Card Guide
          </h2>
          <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-12 text-center font-['Bangers']">
            🃏 卡片指南
          </h3>

          <div className="space-y-8">
            {/* Occupied Card */}
            <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg border-4 border-amber-900">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="bg-amber-200 border-2 border-amber-900 rounded-lg p-2 text-center">
                  <img
                    src="/uploads/how-to-play/occupied-12 cards.png"
                    alt="Occupied Card"
                    className="w-full h-48 object-contain rounded-md mb-2"
                  />
                  <p className="text-sm text-amber-600 font-bold">
                    Occupied Card
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-1 font-['Bangers']">
                    🚽 Occupied
                  </h3>
                  <h4 className="text-lg lg:text-xl font-bold text-amber-900 mb-3 font-['Bangers']">
                    🚽 使用中
                  </h4>
                  <p className="text-amber-700 text-lg mb-1">
                    Flip one of your clean toilets into a poo toilet.
                  </p>
                  <p className="text-amber-700 text-sm mb-2">
                    將你的一個乾淨馬桶翻轉成噗噗馬桶。
                  </p>
                  <p className="text-amber-600 mb-1">
                    <strong>
                      This is how you build your Poo Poo Mountain.
                    </strong>
                  </p>
                  <p className="text-amber-600 text-sm">
                    <strong>這就是建造噗噗山的方法。</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Cleaner Card */}
            <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg border-4 border-amber-900">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-1 font-['Bangers']">
                    🧹 Cleaner
                  </h3>
                  <h4 className="text-lg lg:text-xl font-bold text-amber-900 mb-3 font-['Bangers']">
                    🧹 清潔工
                  </h4>
                  <p className="text-amber-700 text-lg mb-1">
                    Target any poo toilet (yours or an opponent's).
                  </p>
                  <p className="text-amber-700 text-sm mb-2">
                    選擇任何噗噗馬桶（你的或對手的）。
                  </p>
                  <p className="text-amber-600 mb-1">
                    <strong>Flip it back to clean.</strong>
                  </p>
                  <p className="text-amber-600 text-sm">
                    <strong>將它翻轉回乾淨狀態。</strong>
                  </p>
                </div>
                <div className="bg-amber-200 border-2 border-amber-900 rounded-lg p-2 text-center">
                  <img
                    src="/uploads/how-to-play/Cleaner-4 cards.png"
                    alt="Cleaner Card"
                    className="w-full h-48 object-contain rounded-md mb-2"
                  />
                  <p className="text-sm text-amber-600 font-bold">
                    Cleaner Card
                  </p>
                </div>
              </div>
            </div>

            {/* Plumber Card */}
            <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg border-4 border-amber-900">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="bg-amber-200 border-2 border-amber-900 rounded-lg p-2 text-center">
                  <img
                    src="/uploads/how-to-play/Plunger-3 cards.png"
                    alt="Plumber Card"
                    className="w-full h-48 object-contain rounded-md mb-2"
                  />
                  <p className="text-sm text-amber-600 font-bold">
                    Plumber Card
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-1 font-['Bangers']">
                    🔧 Plumber
                  </h3>
                  <h4 className="text-lg lg:text-xl font-bold text-amber-900 mb-3 font-['Bangers']">
                    🔧 水管工
                  </h4>
                  <p className="text-amber-700 text-lg mb-1">
                    Same as Cleaner: flip a poo toilet back to clean.
                  </p>
                  <p className="text-amber-700 text-sm mb-2">
                    與清潔工相同：將噗噗馬桶翻轉回乾淨狀態。
                  </p>
                </div>
              </div>
            </div>

            {/* Flush the Leader Card */}
            <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg border-4 border-amber-900">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-1 font-['Bangers']">
                    💥 Flush the Leader
                  </h3>
                  <h4 className="text-lg lg:text-xl font-bold text-amber-900 mb-3 font-['Bangers']">
                    💥 沖掉領先者
                  </h4>
                  <p className="text-amber-700 text-lg mb-1">
                    Choose the player with the most poo toilets.
                  </p>
                  <p className="text-amber-700 text-sm mb-2">
                    選擇擁有最多噗噗馬桶的玩家。
                  </p>
                  <p className="text-amber-700 mb-1">
                    <strong>ALL</strong> of their poo toilets are instantly
                    cleaned back to fresh.
                  </p>
                  <p className="text-amber-700 text-sm mb-2">
                    <strong>所有</strong>他們的噗噗馬桶立即被清潔回新鮮狀態。
                  </p>
                  <p className="text-amber-600 mb-1">
                    <strong>The ultimate reset button!</strong>
                  </p>
                  <p className="text-amber-600 text-sm">
                    <strong>終極重置按鈕！</strong>
                  </p>
                </div>
                <div className="bg-amber-200 border-2 border-amber-900 rounded-lg p-2 text-center">
                  <img
                    src="/uploads/how-to-play/Flush The Leader-3 cards.png"
                    alt="Flush the Leader Card"
                    className="w-full h-48 object-contain rounded-md mb-2"
                  />
                  <p className="text-sm text-amber-600 font-bold">
                    Flush the Leader Card
                  </p>
                </div>
              </div>
            </div>

            {/* Golden Poo Card */}
            <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg border-4 border-amber-900">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="bg-amber-200 border-2 border-amber-900 rounded-lg p-2 text-center">
                  <img
                    src="/uploads/how-to-play/GoldenPoo-1 card.png"
                    alt="Golden Poo Card"
                    className="w-full h-48 object-contain rounded-md mb-2"
                  />
                  <p className="text-sm text-amber-600 font-bold">
                    Golden Poo Card
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-1 font-['Bangers']">
                    🟡 Golden Poo
                  </h3>
                  <h4 className="text-lg lg:text-xl font-bold text-amber-900 mb-3 font-['Bangers']">
                    🟡 黃金噗噗
                  </h4>
                  <p className="text-amber-700 text-lg mb-1">
                    Place it on one of your poo toilets.
                  </p>
                  <p className="text-amber-700 text-sm mb-2">
                    將它放在你的一個噗噗馬桶上。
                  </p>
                  <p className="text-amber-700 mb-1">
                    <strong>Protects that toilet from being cleaned.</strong>
                  </p>
                  <p className="text-amber-700 text-sm mb-2">
                    <strong>保護該馬桶免於被清潔。</strong>
                  </p>
                  <p className="text-red-600 mb-1">
                    <strong>Warning: can be stolen by Plunger Heist.</strong>
                  </p>
                  <p className="text-red-600 text-sm">
                    <strong>警告：可能被通馬桶搶劫偷走。</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Toxic Poo Card */}
            <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg border-4 border-amber-900">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-1 font-['Bangers']">
                    ☣️ Toxic Poo
                  </h3>
                  <h4 className="text-lg lg:text-xl font-bold text-amber-900 mb-3 font-['Bangers']">
                    ☣️ 有毒噗噗
                  </h4>
                  <p className="text-amber-700 text-lg mb-1">
                    Place it on one of your poo toilets.
                  </p>
                  <p className="text-amber-700 text-sm mb-2">
                    將它放在你的一個噗噗馬桶上。
                  </p>
                  <p className="text-green-700 mb-1">
                    <strong>
                      Permanent protection—can't ever be cleaned or stolen.
                    </strong>
                  </p>
                  <p className="text-green-700 text-sm">
                    <strong>永久保護——永遠不能被清潔或偷走。</strong>
                  </p>
                </div>
                <div className="bg-amber-200 border-2 border-amber-900 rounded-lg p-2 text-center">
                  <img
                    src="/uploads/how-to-play/Toxic Poo-1 card.png"
                    alt="Toxic Poo Card"
                    className="w-full h-48 object-contain rounded-md mb-2"
                  />
                  <p className="text-sm text-amber-600 font-bold">
                    Toxic Poo Card
                  </p>
                </div>
              </div>
            </div>

            {/* Risky Flush Card */}
            <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg border-4 border-amber-900">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="bg-amber-200 border-2 border-amber-900 rounded-lg p-2 text-center">
                  <img
                    src="/uploads/how-to-play/Risky Flush-3 cards.png"
                    alt="Risky Flush Card"
                    className="w-full h-48 object-contain rounded-md mb-2"
                  />
                  <p className="text-sm text-amber-600 font-bold">
                    Risky Flush Card
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-1 font-['Bangers']">
                    🚽💥 Risky Flush
                  </h3>
                  <h4 className="text-lg lg:text-xl font-bold text-amber-900 mb-3 font-['Bangers']">
                    🚽💥 危險沖水
                  </h4>
                  <p className="text-amber-700 text-lg mb-1">
                    Can only be played if you already have at least one poo
                    toilet.
                  </p>
                  <p className="text-amber-700 text-sm mb-2">
                    只有在你已經有至少一個噗噗馬桶時才能使用。
                  </p>
                  <p className="text-amber-700 mb-1">
                    <strong>Draw 1 card:</strong>
                  </p>
                  <p className="text-amber-700 text-sm mb-2">
                    <strong>抽取 1 張卡片：</strong>
                  </p>
                  <p className="text-red-600 mb-1">
                    If it's Cleaner or Flush the Leader → you must use it on
                    yourself immediately.
                  </p>
                  <p className="text-red-600 text-sm mb-2">
                    如果是清潔工或沖掉領先者 → 你必須立即對自己使用。
                  </p>
                  <p className="text-green-600 mb-1">
                    Otherwise → play it right away or keep it.
                  </p>
                  <p className="text-green-600 text-sm">
                    否則 → 立即使用或保留。
                  </p>
                </div>
              </div>
            </div>

            {/* Plunger Heist Card */}
            <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg border-4 border-amber-900">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-1 font-['Bangers']">
                    🪠 Plunger Heist
                  </h3>
                  <h4 className="text-lg lg:text-xl font-bold text-amber-900 mb-3 font-['Bangers']">
                    🪠 通馬桶搶劫
                  </h4>
                  <p className="text-amber-700 text-lg mb-1">
                    Steal a random card from another player's hand{" "}
                    <strong>OR</strong> steal their active Golden Poo.
                  </p>
                  <p className="text-amber-700 text-sm">
                    從其他玩家手中隨機偷取一張卡片<strong>或者</strong>
                    偷走他們正在使用的黃金噗噗。
                  </p>
                </div>
                <div className="bg-amber-200 border-2 border-amber-900 rounded-lg p-2 text-center">
                  <img
                    src="/uploads/how-to-play/Plunger-3 cards.png"
                    alt="Plunger Heist Card"
                    className="w-full h-48 object-contain rounded-md mb-2"
                  />
                  <p className="text-sm text-amber-600 font-bold">
                    Plunger Heist Card
                  </p>
                </div>
              </div>
            </div>

            {/* No Toilet Paper Card */}
            <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg border-4 border-amber-900">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="bg-amber-200 border-2 border-amber-900 rounded-lg p-2 text-center">
                  <img
                    src="/uploads/how-to-play/NoToiletPaper-3 cards.png"
                    alt="No Toilet Paper Card"
                    className="w-full h-48 object-contain rounded-md mb-2"
                  />
                  <p className="text-sm text-amber-600 font-bold">
                    No Toilet Paper Card
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-1 font-['Bangers']">
                    🧻 No Toilet Paper
                  </h3>
                  <h4 className="text-lg lg:text-xl font-bold text-amber-900 mb-3 font-['Bangers']">
                    🧻 沒有衛生紙
                  </h4>
                  <p className="text-amber-700 text-lg mb-1">
                    Pick one player.
                  </p>
                  <p className="text-amber-700 text-sm mb-2">選擇一位玩家。</p>
                  <p className="text-red-600 mb-1">
                    On their next turn, they cannot flip a clean toilet to poo.
                  </p>
                  <p className="text-red-600 text-sm mb-2">
                    在他們的下一回合，無法將乾淨馬桶翻轉成噗噗。
                  </p>
                  <p className="text-amber-600 mb-1">
                    They can still attack or defend.
                  </p>
                  <p className="text-amber-600 text-sm">
                    他們仍然可以攻擊或防禦。
                  </p>
                </div>
              </div>
            </div>

            {/* Taco Tuesday Card */}
            <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg border-4 border-amber-900">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-1 font-['Bangers']">
                    🌮 Taco Tuesday
                  </h3>
                  <h4 className="text-lg lg:text-xl font-bold text-amber-900 mb-3 font-['Bangers']">
                    🌮 墨西哥餅星期二
                  </h4>
                  <p className="text-amber-700 text-lg mb-1">
                    <strong>
                      Flip two of your clean toilets into poo toilets at once!
                    </strong>
                  </p>
                  <p className="text-amber-700 text-sm">
                    <strong>一次將你的兩個乾淨馬桶翻轉成噗噗馬桶！</strong>
                  </p>
                </div>
                <div className="bg-amber-200 border-2 border-amber-900 rounded-lg p-2 text-center">
                  <img
                    src="/uploads/how-to-play/Taco Twosday-3 cards.png"
                    alt="Taco Tuesday Card"
                    className="w-full h-48 object-contain rounded-md mb-2"
                  />
                  <p className="text-sm text-amber-600 font-bold">
                    Taco Tuesday Card
                  </p>
                </div>
              </div>
            </div>

            {/* Sewer Backup Card */}
            <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg border-4 border-amber-900">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="bg-amber-200 border-2 border-amber-900 rounded-lg p-2 text-center">
                  <img
                    src="/uploads/how-to-play/Sewer Backup-3 cards.png"
                    alt="Sewer Backup Card"
                    className="w-full h-48 object-contain rounded-md mb-2"
                  />
                  <p className="text-sm text-amber-600 font-bold">
                    Sewer Backup Card
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-1 font-['Bangers']">
                    🌊 Sewer Backup
                  </h3>
                  <h4 className="text-lg lg:text-xl font-bold text-amber-900 mb-3 font-['Bangers']">
                    🌊 下水道堵塞
                  </h4>
                  <p className="text-amber-700 text-lg mb-1">
                    For the next round, no one can flip toilets to poo{" "}
                    <strong>OR</strong> clean them.
                  </p>
                  <p className="text-amber-700 text-sm">
                    在下一輪中，沒有人可以將馬桶翻轉成噗噗<strong>或者</strong>
                    清潔它們。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plunger Divider */}
        <div className="text-center mb-16">
          <div className="text-6xl">🪠💩🚽💩🪠</div>
        </div>

        {/* Pro Tips Section */}
        <div className="bg-gradient-to-r from-orange-200 to-red-200 rounded-xl p-8 lg:p-12 mb-16 border-4 border-orange-400">
          <h3 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-2 text-center font-['Bangers']">
            🔥 Pro Tips
          </h3>
          <h4 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-6 text-center font-['Bangers']">
            🔥 專業技巧
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-orange-800 text-lg mb-1">
                💡 <strong>Defend your poo!</strong> Use Golden or Toxic Poo
                wisely.
              </p>
              <p className="text-orange-800 text-sm mb-3">
                💡 <strong>保護你的噗噗！</strong> 明智地使用黃金或有毒噗噗。
              </p>
              <p className="text-orange-800 text-lg mb-1">
                🎯 <strong>Don't forget sabotage</strong>—sometimes stopping the
                leader is better than building.
              </p>
              <p className="text-orange-800 text-sm mb-3">
                🎯 <strong>別忘了破壞</strong>——有時阻止領先者比建設更重要。
              </p>
            </div>
            <div>
              <p className="text-orange-800 text-lg mb-1">
                🌮 <strong>Save Taco Tuesday</strong> for a big comeback.
              </p>
              <p className="text-orange-800 text-sm mb-3">
                🌮 <strong>保留墨西哥餅星期二</strong>用於大逆轉。
              </p>
              <p className="text-orange-800 text-lg mb-1">
                😂 <strong>Remember:</strong> it's okay to laugh at your own poo
                jokes.
              </p>
              <p className="text-orange-800 text-sm mb-3">
                😂 <strong>記住：</strong>對自己的噗噗笑話發笑是可以的。
              </p>
            </div>
          </div>
        </div>

        {/* Final Message */}
        <div className="bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl p-8 lg:p-12 mb-16 border-4 border-purple-400 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-2 font-['Bangers']">
            ⚡ Ready to Play?
          </h3>
          <h4 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-4 font-['Bangers']">
            ⚡ 準備好開始遊戲了嗎？
          </h4>
          <p className="text-xl lg:text-2xl text-purple-800 mb-2">
            Poo Poo Mountain is quick, chaotic, and full of toilet drama.
          </p>
          <p className="text-lg lg:text-xl text-purple-800 mb-4">
            噗噗山快速、混亂，充滿廁所戲劇性。
          </p>
          <p className="text-xl lg:text-2xl text-purple-800 mb-1">
            Will you climb to the top… or get flushed away?
          </p>
          <p className="text-lg lg:text-xl text-purple-800">
            你會爬上頂峰……還是被沖走？
          </p>
        </div>

        {/* Email Signup Section */}
        <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg border-4 border-amber-900">
          <div className="text-center mb-8">
            <h3 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-2 font-['Bangers']">
              💩 Join the Poo Poo Mountain Squad!
            </h3>
            <h4 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-4 font-['Bangers']">
              💩 加入噗噗山小隊！
            </h4>
            <p className="text-lg lg:text-xl text-amber-700 mb-1">
              Get notified when the game launches and receive exclusive updates!
            </p>
            <p className="text-base lg:text-lg text-amber-700">
              在遊戲發布時獲得通知並接收獨家更新！
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">
                Welcome to the squad!
              </h3>
              <p className="text-green-600">
                You'll be the first to know when Poo Poo Mountain is ready to
                play!
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-md mx-auto"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="your.email@example.com"
                            {...field}
                            className="text-lg p-6 border-2 border-amber-900 focus:border-amber-900"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={subscribeEmail.isPending}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-6 text-lg"
                  >
                    {subscribeEmail.isPending ? "Joining..." : "Join Squad! 💩"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
