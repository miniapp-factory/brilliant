"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

type Question = {
  text: string;
  options: string[];
  answer: string;
  difficulty: number;
};

const questions: Question[] = [
  {
    text: "What is the chemical symbol for water?",
    options: ["H2O", "O2", "CO2", "NaCl"],
    answer: "H2O",
    difficulty: 1,
  },
  {
    text: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
    difficulty: 1,
  },
  {
    text: "What is the speed of light in vacuum (in m/s)?",
    options: ["3x10^8", "1.5x10^8", "3x10^6", "1.5x10^6"],
    answer: "3x10^8",
    difficulty: 2,
  },
  {
    text: "Which subatomic particle has a negative charge?",
    options: ["Proton", "Neutron", "Electron", "Positron"],
    answer: "Electron",
    difficulty: 2,
  },
  {
    text: "What is the unit of electrical resistance?",
    options: ["Ohm", "Volt", "Ampere", "Watt"],
    answer: "Ohm",
    difficulty: 3,
  },
  {
    text: "Which law states that energy cannot be created or destroyed?",
    options: [
      "Newton's First Law",
      "Law of Conservation of Energy",
      "Law of Conservation of Momentum",
      "Second Law of Thermodynamics",
    ],
    answer: "Law of Conservation of Energy",
    difficulty: 3,
  },
];

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffled, setShuffled] = useState<Question[]>([]);

  // Shuffle questions by difficulty, keeping easier ones first
  useState(() => {
    const sorted = [...questions].sort((a, b) => a.difficulty - b.difficulty);
    setShuffled(sorted);
  });

  const current = shuffled[currentIndex];

  const handleAnswer = (choice: string) => {
    if (!current) return;
    if (choice === current.answer) {
      if (currentIndex < shuffled.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Completed all questions
        alert("Congratulations! You completed the quiz.");
        setCurrentIndex(0);
      }
    } else {
      alert("Wrong answer. Starting over.");
      setCurrentIndex(0);
    }
  };

  if (!current) return null;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h2 className="text-xl font-semibold">
          Question {currentIndex + 1} of {shuffled.length}
        </h2>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{current.text}</p>
        {current.options.map((opt) => (
          <Button
            key={opt}
            variant="outline"
            className="w-full mb-2"
            onClick={() => handleAnswer(opt)}
          >
            {opt}
          </Button>
        ))}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Difficulty: {current.difficulty}
        </p>
      </CardFooter>
    </Card>
  );
}
