"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import confetti from 'canvas-confetti';
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
  const [levelIndex, setLevelIndex] = useState(0);
  const [shuffledLevels, setShuffledLevels] = useState<Question[][]>([]);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const levels: Question[][] = [
      [questions[0], questions[1], questions[0], questions[1], questions[0]],
      [questions[2], questions[3], questions[2], questions[3], questions[2]],
      [questions[4], questions[5], questions[4], questions[5], questions[4]],
      [
        {
          text: "What is the largest planet in our solar system?",
          options: ["Jupiter", "Saturn", "Neptune", "Earth"],
          answer: "Jupiter",
          difficulty: 4,
        },
        {
          text: "What is the chemical symbol for gold?",
          options: ["Au", "Ag", "Fe", "Cu"],
          answer: "Au",
          difficulty: 4,
        },
        {
          text: "What is the speed of sound in air?",
          options: ["343 m/s", "330 m/s", "300 m/s", "400 m/s"],
          answer: "343 m/s",
          difficulty: 4,
        },
        {
          text: "What is the capital of France?",
          options: ["Paris", "London", "Berlin", "Rome"],
          answer: "Paris",
          difficulty: 4,
        },
        {
          text: "What is the formula for water?",
          options: ["H2O", "CO2", "NaCl", "O2"],
          answer: "H2O",
          difficulty: 4,
        },
      ],
      [
        {
          text: "What is the theory of relativity?",
          options: ["E=mc^2", "F=ma", "V=IR", "pV=nRT"],
          answer: "E=mc^2",
          difficulty: 5,
        },
        {
          text: "What is the integral of sin(x)?",
          options: ["-cos(x)", "cos(x)", "sin(x)", "-sin(x)"],
          answer: "-cos(x)",
          difficulty: 5,
        },
        {
          text: "What is the value of Planck's constant?",
          options: ["6.626e-34", "9.81", "3.14", "1.6e-19"],
          answer: "6.626e-34",
          difficulty: 5,
        },
        {
          text: "What is the name of the first man on the moon?",
          options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Michael Collins"],
          answer: "Neil Armstrong",
          difficulty: 5,
        },
        {
          text: "What is the largest ocean on Earth?",
          options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
          answer: "Pacific Ocean",
          difficulty: 5,
        },
      ],
    ];

    const shuffled = levels.map((level) => {
      const copy = [...level];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    });

    setShuffledLevels(shuffled);
  }, []);

  const currentLevel = shuffledLevels[levelIndex] || [];
  const current = currentLevel[currentIndex];

  const handleAnswer = (choice: string) => {
    if (!current) return;
    if (choice === current.answer) {
      setScore(score + 1);
      if (currentIndex < 4) {
        setCurrentIndex(currentIndex + 1);
      } else {
        if (levelIndex < shuffledLevels.length - 1) {
          setLevelIndex(levelIndex + 1);
          setCurrentIndex(0);
        } else {
          confetti();
          setCurrentIndex(0);
          setScore(0);
          setLives(3);
          setLevelIndex(0);
        }
      }
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        setGameOver(true);
      } else {
        alert(`Wrong answer. Lives left: ${newLives}`);
      }
    }
  };

  if (gameOver) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-xl font-semibold">Game Over</h2>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Thanks for playing! Your score: {score}</p>
          <Button onClick={() => { setGameOver(false); setLives(3); setScore(0); setCurrentIndex(0); }}>Restart</Button>
        </CardContent>
      </Card>
    );
  }

  if (!current) return null;

  const progress = ((levelIndex * 5 + currentIndex) / 25) * 100;

  return (
    <Card className="w-full max-w-md">
      <div className="w-full h-2 bg-gray-200 rounded">
        <div className="h-full bg-primary rounded" style={{ width: `${progress}%` }} />
      </div>
      <CardHeader>
        <h2 className="text-xl font-semibold">
          Question {currentIndex + 1} of {shuffled.length}
        </h2>
        <p className="text-sm text-muted-foreground">{Array(lives).fill('❤️').join('')}</p>
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
