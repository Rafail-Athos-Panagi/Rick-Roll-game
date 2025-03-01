import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const rickRollGif = "https://media.giphy.com/media/oHg5SJYRHA0Io/giphy.gif";
const winnerGif = "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif";

const RickRollGame: React.FC = () => {
  const [revealed, setRevealed] = useState<(string | null)[]>(
    Array(4).fill(null)
  );
  const [winningIndex] = useState(Math.floor(Math.random() * 4));
  const [gameOver, setGameOver] = useState(false);
  const [selectedGif, setSelectedGif] = useState<string | null>(null);

  const handlePick = (index: number) => {
    if (!gameOver && revealed[index] === null) {
      const newRevealed = [...revealed];
      const gif = index === winningIndex ? winnerGif : rickRollGif;
      newRevealed[index] = gif;
      setRevealed(newRevealed);
      setSelectedGif(gif);
      setGameOver(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 p-6">
      <h1 className="text-2xl font-bold mb-16">Pick a Case!</h1>
      <div className="grid grid-cols-2 gap-16">
        {revealed.map((gif, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-center"
            animate={{ rotateY: gif ? 180 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              className={`w-40 h-40 flex items-center justify-center bg-gray-200 rounded-lg text-xl font-semibold ${
                gameOver ? "pointer-events-none" : ""
              }`}
              onClick={() => handlePick(index)}
            >
              {gif ? "" : `Case ${index + 1}`}
            </button>
          </motion.div>
        ))}
      </div>

      <Dialog
        open={!!selectedGif}
        onClose={() => setSelectedGif(null)}
        className="fixed inset-0 flex items-center justify-center p-4"
      >
        <DialogPanel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <DialogTitle className="text-lg font-bold mb-4">Result</DialogTitle>
          {selectedGif && (
            <img
              src={selectedGif}
              alt="Result"
              className="w-full h-auto rounded-lg"
            />
          )}
          <button
            onClick={() => setSelectedGif(null)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default RickRollGame;
