import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const victoryAudio = "/victory.mp3"; // Victory audio from the public folder
const suspenseAudio = "/suspense.mp3"; // Suspense audio from the public folder
const rickRollAudio = "/Rick_Rolled.mp3"; // Rick Roll audio from the public folder
const rickRollImage = "/icegif-162.gif"; // Rick Roll image from the public folder

const RickRollGame: React.FC = () => {
  const [revealed, setRevealed] = useState<(string | null)[]>(
    Array(4).fill(null)
  );
  const [winningIndex] = useState(Math.floor(Math.random() * 4));
  const [gameOver, setGameOver] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const handlePick = async (index: number) => {
    if (!gameOver && revealed[index] === null) {
      setGameOver(true);
      setSelectedIndex(index);

      const audio = new Audio(suspenseAudio);
      audio.play();

      await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for suspense audio

      let newRevealed = [...revealed];
      let revealedCount = 0;

      while (revealedCount < 3) {
        const randIndex = Math.floor(Math.random() * 4);
        if (randIndex !== index && newRevealed[randIndex] === null) {
          newRevealed[randIndex] = "RICK_ROLL";
          revealedCount++;
        }
      }

      setRevealed(newRevealed);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait before revealing selection

      newRevealed[index] = index === winningIndex ? "WINNER" : "RICK_ROLL";
      setRevealed(newRevealed);

      if (newRevealed[index] === "WINNER") {
        const winAudio = new Audio(victoryAudio);
        winAudio.play();
      } else {
        const rickAudio = new Audio(rickRollAudio);
        rickAudio.play();
      }

      setShowDialog(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 p-6">
      <h1 className="text-4xl font-bold mb-8">Pick a Case!</h1>
      <div className="grid grid-cols-2 gap-8">
        {revealed.map((content, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-center"
            animate={{ rotateY: content ? 180 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              className={`w-40 h-40 flex items-center justify-center bg-gray-200 rounded-lg text-xl font-semibold ${
                gameOver ? "pointer-events-none" : ""
              }`}
              onClick={() => handlePick(index)}
            >
              {content === null ? `Case ${index + 1}` : ""}
            </button>
          </motion.div>
        ))}
      </div>

      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        className="fixed inset-0 flex items-center justify-center p-4"
      >
        <DialogPanel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <DialogTitle className="text-lg font-bold mb-4">
            {selectedIndex !== null && revealed[selectedIndex] === "WINNER"
              ? "Result : Winner"
              : "Result : Game Over"}
          </DialogTitle>
          {selectedIndex !== null &&
            (revealed[selectedIndex] === "WINNER" ? (
              <h2 className="text-green-500 text-center text-2xl font-bold">
                You Win!
              </h2>
            ) : (
              <img
                src={rickRollImage}
                alt="Rick Roll"
                className="w-full h-auto"
              />
            ))}
          <button
            onClick={() => setShowDialog(false)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md md:w-auto w-full"
          >
            Close
          </button>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default RickRollGame;