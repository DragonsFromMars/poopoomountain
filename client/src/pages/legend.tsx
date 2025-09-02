import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { EmailSignupForm } from "./home";

export default function Legend() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm border-4 border-amber-300 shadow-xl">
            <CardContent className="p-8">
              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-amber-900 font-['Bangers'] mb-2">
                  The Legend of Poo Poo Mountain
                </h1>
                <h2 className="text-2xl md:text-3xl text-amber-700 font-['Bangers']">
                  噗噗山的傳說
                </h2>
              </div>

              {/* Picture placeholder */}
              <div className="w-full h-64 bg-amber-100 border-2 border-amber-300 rounded-lg flex items-center justify-center mb-8 p-2">
                <img src="/uploads/legend/Legend 1.png" alt="Poo Poo Mountain at Coachella" className="w-full h-full object-contain rounded-lg" />
              </div>

              {/* Story content */}
              <div className="space-y-6 text-lg leading-relaxed">
                <p className="text-gray-800">
                  Long ago, at the Coachella music festival in California, a young man named Mr. Poo wandered into the night in search of a humble porta potty. The desert was quiet, the crowd asleep, but inside that plastic chamber he encountered something that would change his life forever:
                </p>

                <p className="text-gray-700 text-base">
                  很久以前，在美國加州的科切拉音樂祭上，有一位名叫 噗先生 的年輕人，夜裡獨自尋找一間簡陋的流動廁所。沙漠一片寂靜，人群已熟睡，但在那塑膠小屋裡，他遇到了一個徹底改變人生的景象：
                </p>

                <div className="text-center my-8">
                  <p className="text-2xl font-bold text-amber-900 font-['Bangers']">
                    A Poo Poo Mountain.
                  </p>
                  <p className="text-xl text-amber-700 font-['Bangers']">
                    一座 噗噗山。
                  </p>
                </div>

                {/* Second picture placeholder */}
                <div className="w-full h-48 bg-amber-100 border-2 border-amber-300 rounded-lg flex items-center justify-center my-8 p-2">
                  <img src="/uploads/legend/Legend 2.png" alt="The mysterious Poo Poo Mountain" className="w-full h-full object-contain rounded-lg" />
                </div>

                <p className="text-gray-800">
                  It rose before him like a monument of mystery — a staggering heap of humanity, piled so high it seemed to touch the stars. Mr. Poo froze, struck by two questions that haunt us to this day:
                </p>

                <p className="text-gray-700 text-base">
                  它像一座神秘的紀念碑般聳立眼前──龐大的人類產物堆疊得如此高，好似直達星空。噗先生愣住了，心中浮現兩個至今仍未解開的問題：
                </p>

                <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-400 my-6">
                  <p className="text-gray-800 mb-2">
                    Did the last brave soul cling to the plastic walls and somehow add to the summit?
                  </p>
                  <p className="text-gray-800 mb-4">
                    Or… was this not of human origin at all, but the work of some otherworldly being?
                  </p>
                  <p className="text-gray-700 text-base mb-2">
                    最後那位勇者，是否緊抓著塑膠牆壁，努力把自己的傑作堆到頂端？
                  </p>
                  <p className="text-gray-700 text-base">
                    還是說……這根本不是人類的產物，而是某種外星生物的驚世之作？
                  </p>
                </div>

                <p className="text-center text-xl font-bold text-amber-900 my-6">
                  The truth remains unsolved.
                </p>
                <p className="text-center text-lg text-amber-700 mb-6">
                  真相至今依然成謎。
                </p>

                {/* Third legend image */}
                <div className="w-full h-48 bg-amber-100 border-2 border-amber-300 rounded-lg flex items-center justify-center my-8 p-2">
                  <img src="/uploads/legend/legend 3.png" alt="The birth of the legend" className="w-full h-full object-contain rounded-lg" />
                </div>

                <p className="text-gray-800">
                  Years later, Mr. Poo shared this strange tale with students in Taiwan. To his surprise, their laughter and fascination gave the story new life. He realized this legend deserved to be more than a campfire joke — it should live on for children, families, and poo lovers everywhere.
                </p>

                <p className="text-gray-700 text-base">
                  多年之後，噗先生將這個奇妙的故事分享給台灣的學生。沒想到，他們的笑聲與著迷讓傳說重獲新生。他這才明白，這不該只是個營火笑話──它應該延續下去，讓孩子、家庭，甚至世界各地的 噗迷 都能傳頌。
                </p>

                <p className="text-gray-800">
                  And so, one morning, while doing what he does best, inspiration struck. Poo Poo Mountain, the game, was born.
                </p>

                <p className="text-gray-700 text-base">
                  於是有一天早晨，當他做著自己最擅長的事時，靈感降臨了。桌遊《噗噗山》就此誕生。
                </p>

                <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-lg border-2 border-amber-300 mt-8">
                  <p className="text-gray-800 font-semibold text-xl mb-2">
                    Now it is your turn to carry on the legend. Gather your friends and family, and climb the Poo Poo Mountain together — if you dare.
                  </p>
                  <p className="text-gray-700 text-lg">
                    現在，輪到你來延續這段傳說了。快召集你的親朋好友，一起來挑戰 噗噗山 吧──如果你敢的話！
                  </p>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t-2 border-amber-300">
                <EmailSignupForm 
                  source="legend-page" 
                  title="💩 Join the Legend!" 
                  buttonText="Become a Legend! 🏔️"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}