import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertEmailSchema, type InsertEmail } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

export default function HowToPlayPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertEmail>({
    resolver: zodResolver(insertEmailSchema.extend({
      email: insertEmailSchema.shape.email.email("Please enter a valid email address")
    })),
    defaultValues: {
      email: "",
      source: "how-to-play-form"
    }
  });

  const subscribeEmail = useMutation({
    mutationFn: async (data: InsertEmail) => {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Subscription failed');
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success! 💩",
        description: "You're now part of the Poo Poo Mountain squad!",
        variant: "default"
      });
      setIsSubmitted(true);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/emails'] });
    },
    onError: (error: any) => {
      const message = error?.message || "Something went wrong. Please try again.";
      toast({
        title: "Oops!",
        description: message,
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: InsertEmail) => {
    subscribeEmail.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-amber-900 mb-6 font-['Bangers']">
            💩 How to Play Poo Poo Mountain
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-amber-700 max-w-3xl mx-auto">
            Welcome to the ultimate bathroom showdown.<br />
            Your goal: be the first to turn all your clean toilets into mighty Poo Poo Mountains!
          </p>
        </div>

        {/* Video Placeholder */}
        <div className="mb-16 lg:mb-20">
          <div className="bg-amber-200 border-4 border-dashed border-amber-600 rounded-xl p-8 lg:p-16 text-center">
            <div className="bg-amber-300 rounded-lg p-8 lg:p-12">
              <h2 className="text-2xl lg:text-4xl font-bold text-amber-900 mb-4 font-['Bangers']">
                🎬 [HOW TO PLAY VIDEO HERE]
              </h2>
              <p className="text-amber-700 text-lg">
                Coming soon: Watch the hilarious tutorial video!
              </p>
            </div>
          </div>
        </div>

        {/* Game Info Section */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border-4 border-amber-300">
            <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-4 font-['Bangers'] flex items-center">
              👥 Players
            </h3>
            <p className="text-amber-700 text-lg">2–4 players</p>
            <p className="text-amber-700">Ages: anyone who laughs at bathroom jokes</p>
            <p className="text-amber-700">Play time: 15–25 minutes</p>
          </div>

          <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border-4 border-amber-300">
            <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-4 font-['Bangers'] flex items-center">
              🎲 Setup
            </h3>
            <p className="text-amber-700">Each player gets 4 clean toilet cards. Place them in front of you.</p>
            <p className="text-amber-700 mt-2">Shuffle the deck and deal 4 cards to each player.</p>
            <p className="text-amber-700 mt-2">Put the rest in the middle as the draw pile.</p>
          </div>

          <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border-4 border-amber-300">
            <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-4 font-['Bangers'] flex items-center">
              🚽 On Your Turn
            </h3>
            <p className="text-amber-700"><strong>1.</strong> Draw 1 card.</p>
            <p className="text-amber-700 mt-1"><strong>2.</strong> Play 1 card. (Or do nothing if you can't.)</p>
            <p className="text-amber-700 mt-1"><strong>3.</strong> End your turn.</p>
          </div>
        </div>

        {/* Winning Section */}
        <div className="bg-gradient-to-r from-yellow-200 to-amber-200 rounded-xl p-8 lg:p-12 mb-16 border-4 border-amber-400 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-4 font-['Bangers']">
            🏆 Winning
          </h3>
          <p className="text-xl lg:text-2xl text-amber-800">
            The first player to turn all 4 toilets into poo is crowned the <strong>Toilet Champion!</strong> 👑💩
          </p>
        </div>

        {/* Toilet Divider */}
        <div className="text-center mb-16">
          <div className="text-6xl">🚽💩🪠💩🚽</div>
        </div>

        {/* Card Guide Section */}
        <div className="mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-12 text-center font-['Bangers']">
            🃏 Card Guide
          </h2>

          <div className="space-y-8">
            {/* Occupied Card */}
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border-4 border-amber-300">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="bg-amber-200 border-2 border-amber-500 rounded-lg p-2 text-center overflow-hidden">
                  <img src="/uploads/how-to-play/occupied-12 cards.png" alt="Occupied Card" className="w-full h-32 object-cover rounded-md mb-2" />
                  <p className="text-sm text-amber-600 font-bold">Occupied Card</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-3 font-['Bangers']">🚽 Occupied</h3>
                  <p className="text-amber-700 text-lg mb-2">Flip one of your clean toilets into a poo toilet.</p>
                  <p className="text-amber-600"><strong>This is how you build your Poo Poo Mountain.</strong></p>
                </div>
              </div>
            </div>

            {/* Cleaner Card */}
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border-4 border-amber-300">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-3 font-['Bangers']">🧹 Cleaner</h3>
                  <p className="text-amber-700 text-lg mb-2">Target any poo toilet (yours or an opponent's).</p>
                  <p className="text-amber-600"><strong>Flip it back to clean.</strong></p>
                </div>
                <div className="bg-amber-200 border-2 border-amber-500 rounded-lg p-2 text-center overflow-hidden">
                  <img src="/uploads/how-to-play/Cleaner-4 cards.png" alt="Cleaner Card" className="w-full h-32 object-cover rounded-md mb-2" />
                  <p className="text-sm text-amber-600 font-bold">Cleaner Card</p>
                </div>
              </div>
            </div>

            {/* Plumber Card */}
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border-4 border-amber-300">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="bg-amber-200 border-2 border-amber-500 rounded-lg p-2 text-center overflow-hidden">
                  <img src="/uploads/how-to-play/Plunger-3 cards.png" alt="Plumber Card" className="w-full h-32 object-cover rounded-md mb-2" />
                  <p className="text-sm text-amber-600 font-bold">Plumber Card</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-3 font-['Bangers']">🔧 Plumber</h3>
                  <p className="text-amber-700 text-lg mb-2">Same as Cleaner: flip a poo toilet back to clean.</p>
                </div>
              </div>
            </div>

            {/* Flush the Leader Card */}
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border-4 border-amber-300">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-3 font-['Bangers']">💥 Flush the Leader</h3>
                  <p className="text-amber-700 text-lg mb-2">Choose the player with the most poo toilets.</p>
                  <p className="text-amber-700 mb-2"><strong>ALL</strong> of their poo toilets are instantly cleaned back to fresh.</p>
                  <p className="text-amber-600"><strong>The ultimate reset button!</strong></p>
                </div>
                <div className="bg-amber-200 border-2 border-amber-500 rounded-lg p-2 text-center overflow-hidden">
                  <img src="/uploads/how-to-play/Flush The Leader-3 cards.png" alt="Flush the Leader Card" className="w-full h-32 object-cover rounded-md mb-2" />
                  <p className="text-sm text-amber-600 font-bold">Flush the Leader Card</p>
                </div>
              </div>
            </div>

            {/* Golden Poo Card */}
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border-4 border-amber-300">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="bg-amber-200 border-2 border-amber-500 rounded-lg p-2 text-center overflow-hidden">
                  <img src="/uploads/how-to-play/GoldenPoo-1 card.png" alt="Golden Poo Card" className="w-full h-32 object-cover rounded-md mb-2" />
                  <p className="text-sm text-amber-600 font-bold">Golden Poo Card</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-3 font-['Bangers']">🟡 Golden Poo</h3>
                  <p className="text-amber-700 text-lg mb-2">Place it on one of your poo toilets.</p>
                  <p className="text-amber-700 mb-2"><strong>Protects that toilet from being cleaned.</strong></p>
                  <p className="text-red-600"><strong>Warning: can be stolen by Plunger Heist.</strong></p>
                </div>
              </div>
            </div>

            {/* Toxic Poo Card */}
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border-4 border-amber-300">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-3 font-['Bangers']">☣️ Toxic Poo</h3>
                  <p className="text-amber-700 text-lg mb-2">Place it on one of your poo toilets.</p>
                  <p className="text-green-700"><strong>Permanent protection—can't ever be cleaned or stolen.</strong></p>
                </div>
                <div className="bg-amber-200 border-2 border-amber-500 rounded-lg p-2 text-center overflow-hidden">
                  <img src="/uploads/how-to-play/Toxic Poo-1 card.png" alt="Toxic Poo Card" className="w-full h-32 object-cover rounded-md mb-2" />
                  <p className="text-sm text-amber-600 font-bold">Toxic Poo Card</p>
                </div>
              </div>
            </div>

            {/* Risky Flush Card */}
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border-4 border-amber-300">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="bg-amber-200 border-2 border-amber-500 rounded-lg p-2 text-center overflow-hidden">
                  <img src="/uploads/how-to-play/Risky Flush-3 cards.png" alt="Risky Flush Card" className="w-full h-32 object-cover rounded-md mb-2" />
                  <p className="text-sm text-amber-600 font-bold">Risky Flush Card</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-3 font-['Bangers']">🚽💥 Risky Flush</h3>
                  <p className="text-amber-700 text-lg mb-2">Can only be played if you already have at least one poo toilet.</p>
                  <p className="text-amber-700 mb-1"><strong>Draw 1 card:</strong></p>
                  <p className="text-red-600 mb-1">If it's Cleaner or Flush the Leader → you must use it on yourself immediately.</p>
                  <p className="text-green-600">Otherwise → play it right away or keep it.</p>
                </div>
              </div>
            </div>

            {/* Plunger Heist Card */}
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border-4 border-amber-300">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-3 font-['Bangers']">🪠 Plunger Heist</h3>
                  <p className="text-amber-700 text-lg">Steal a random card from another player's hand <strong>OR</strong> steal their active Golden Poo.</p>
                </div>
                <div className="bg-amber-200 border-2 border-amber-500 rounded-lg p-2 text-center overflow-hidden">
                  <img src="/uploads/how-to-play/Plunger-3 cards.png" alt="Plunger Heist Card" className="w-full h-32 object-cover rounded-md mb-2" />
                  <p className="text-sm text-amber-600 font-bold">Plunger Heist Card</p>
                </div>
              </div>
            </div>

            {/* No Toilet Paper Card */}
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border-4 border-amber-300">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="bg-amber-200 border-2 border-amber-500 rounded-lg p-2 text-center overflow-hidden">
                  <img src="/uploads/how-to-play/NoToiletPaper-3 cards.png" alt="No Toilet Paper Card" className="w-full h-32 object-cover rounded-md mb-2" />
                  <p className="text-sm text-amber-600 font-bold">No Toilet Paper Card</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-3 font-['Bangers']">🧻 No Toilet Paper</h3>
                  <p className="text-amber-700 text-lg mb-2">Pick one player.</p>
                  <p className="text-red-600 mb-1">On their next turn, they cannot flip a clean toilet to poo.</p>
                  <p className="text-amber-600">They can still attack or defend.</p>
                </div>
              </div>
            </div>

            {/* Taco Tuesday Card */}
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border-4 border-amber-300">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-3 font-['Bangers']">🌮 Taco Tuesday</h3>
                  <p className="text-amber-700 text-lg"><strong>Flip two of your clean toilets into poo toilets at once!</strong></p>
                </div>
                <div className="bg-amber-200 border-2 border-amber-500 rounded-lg p-2 text-center overflow-hidden">
                  <img src="/uploads/how-to-play/Taco Twosday-3 cards.png" alt="Taco Tuesday Card" className="w-full h-32 object-cover rounded-md mb-2" />
                  <p className="text-sm text-amber-600 font-bold">Taco Tuesday Card</p>
                </div>
              </div>
            </div>

            {/* Sewer Backup Card */}
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border-4 border-amber-300">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="bg-amber-200 border-2 border-amber-500 rounded-lg p-2 text-center overflow-hidden">
                  <img src="/uploads/how-to-play/Sewer Backup-3 cards.png" alt="Sewer Backup Card" className="w-full h-32 object-cover rounded-md mb-2" />
                  <p className="text-sm text-amber-600 font-bold">Sewer Backup Card</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-3 font-['Bangers']">🌊 Sewer Backup</h3>
                  <p className="text-amber-700 text-lg">For the next round, no one can flip toilets to poo <strong>OR</strong> clean them.</p>
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
          <h3 className="text-3xl lg:text-4xl font-bold text-orange-900 mb-6 text-center font-['Bangers']">
            🔥 Pro Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-orange-800 text-lg mb-3">💡 <strong>Defend your poo!</strong> Use Golden or Toxic Poo wisely.</p>
              <p className="text-orange-800 text-lg mb-3">🎯 <strong>Don't forget sabotage</strong>—sometimes stopping the leader is better than building.</p>
            </div>
            <div>
              <p className="text-orange-800 text-lg mb-3">🌮 <strong>Save Taco Tuesday</strong> for a big comeback.</p>
              <p className="text-orange-800 text-lg mb-3">😂 <strong>Remember:</strong> it's okay to laugh at your own poo jokes.</p>
            </div>
          </div>
        </div>

        {/* Final Message */}
        <div className="bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl p-8 lg:p-12 mb-16 border-4 border-purple-400 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-purple-900 mb-4 font-['Bangers']">
            ⚡ Ready to Play?
          </h3>
          <p className="text-xl lg:text-2xl text-purple-800 mb-4">
            Poo Poo Mountain is quick, chaotic, and full of toilet drama.
          </p>
          <p className="text-xl lg:text-2xl text-purple-800">
            Will you climb to the top… or get flushed away?
          </p>
        </div>

        {/* Email Signup Section */}
        <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg border-4 border-amber-300">
          <div className="text-center mb-8">
            <h3 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-4 font-['Bangers']">
              💩 Join the Poo Poo Mountain Squad!
            </h3>
            <p className="text-lg lg:text-xl text-amber-700">
              Get notified when the game launches and receive exclusive updates!
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">Welcome to the squad!</h3>
              <p className="text-green-600">You'll be the first to know when Poo Poo Mountain is ready to play!</p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto">
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
                            className="text-lg p-6 border-2 border-amber-300 focus:border-amber-500"
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