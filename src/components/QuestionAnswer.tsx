"use client";

import { getGroqCompletion } from "@/ai/groq";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

export type Question = {
  id?: string;
  theme: string;
  type: string;
  question: string;
  answers: string[];
  correct_answer: string;
  points: number;
};
export type Quiz = {
  id: string;
  host_player_name: string;
  status: string;
};
export type Player = {
  id: string;
  player_name: string;
  status: string;
  score: number;
  quiz_id: string;
};

export default function QuestionAnswer({
  questionTime = 15,
  onQuestion,
  onAnswer,
}: {
  questionTime: number;
  onQuestion: (question: Question) => void;
  onAnswer: (question: Question, answer: string) => void;
}) {
  const [pastQuestions, setPastQuestions] = useState<Question[]>([]);
  const [question, setQuestion] = useState<Question>();
  const [timer, setTimer] = useState<number>(questionTime);
  const [generating, setGenerating] = useState<boolean>(false);
  useEffect(() => {
    //create question on load
    createQuestion();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    if (timer == 0) {
      //remove interval
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const createQuestion = async () => {
    setGenerating(true);
    try {
      //get groq to generate a theme for our question
      const themeType = await getGroqCompletion(
        `The previous themes and types in a gameshow were ${pastQuestions
          .map((q) => `${q.theme} and ${q.type}`)
          .join(",")}`,
        32,
        `You are a gameshow host tasked with creating new themes for questions.
         The user will provide you with previous question themes and types and you must create a new theme and appropriate question type. 
         Output your response in JSON in the format {theme: string, type: string}`,
        true
      );

      const themeTypeJSON = JSON.parse(themeType);

      //get groq to generate a question
      const generatedQuestion = await getGroqCompletion(
        `The current theme of a gameshow is ${themeTypeJSON.theme}. The current type of the question is ${themeTypeJSON.type}. Generate a gameshow question for the players to answer.
        Output your response as a JSON object in the format {theme: string, type: string, question: string, points:number}`,
        128,
        `You are a gameshow host tasked with creating gameshow questions.
        The user will provide you with the theme and type of questions to be created. 
        Output your response in JSON in the format {question: string, points:number}`,
        true
      );

      const generatedJSON = JSON.parse(generatedQuestion);
      console.log(generatedJSON);
      setQuestion(generatedJSON.question);

      //get groq to generate a question
      const generatedAnswers = await getGroqCompletion(
        `The gameshow question is ${generatedJSON.question}. Generate 3 incorrect answers and 1 correct answer to the question. 
      Output your response as a JSON object in the format { "correct": "answer", "incorrect": ["answer1", "answer2", "answer3"] }`,
        100,
        "",
        true
      );

      const { correct, incorrect } = JSON.parse(generatedAnswers);
      const newQuestion = {
        theme: themeTypeJSON.theme,
        type: themeTypeJSON.type,
        question: generatedJSON.question,
        answers: [correct, ...incorrect].sort(() => Math.random() - 0.5),
        correct_answer: correct,
        points: generatedJSON.points,
      };

      setQuestion(newQuestion);
      setPastQuestions([...pastQuestions, newQuestion]);
      setTimer(questionTime);
      onQuestion(newQuestion);
    } catch (e) {
      console.error(e);
      alert("failed to generate a question, try again");
    }
    setGenerating(false);
  };

  const handleAnswer = (answer: number) => {
    if (!question) return;
    onAnswer(question, question.answers[answer]);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      {generating ? (
        <Spinner />
      ) : (
        <>
          {timer == 0 || !question ? (
            <button
              className="p-2 bg-white rounded-lg border border-black/25 w-full hover:shadow "
              onClick={createQuestion}
            >
              Next Question
            </button>
          ) : (
            <p>Time: {timer}s</p>
          )}
          {question && (
            <QuizUI
              disabled={timer == 0}
              question={question}
              handleSelect={handleAnswer}
            />
          )}
        </>
      )}
    </div>
  );
}

export function QuizUI({
  disabled,
  question,
  handleSelect,
}: {
  disabled: boolean;
  question: Question;
  handleSelect: (i: number) => void;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  useEffect(() => {
    setSelectedAnswer(null);
  }, [question]);

  useEffect(() => {
    console.log("selectedAnswer", selectedAnswer);
  }, [selectedAnswer]);
  return (
    <div className="flex flex-col w-full gap-4">
      <p>
        {question.question} ({question.points}pts)
      </p>
      <div className="flex flex-col gap-4">
        {question.answers?.map((a, i) => (
          <button
            key={i}
            onClick={() => {
              setSelectedAnswer(i);
              handleSelect(i);
            }}
            disabled={selectedAnswer !== null || disabled}
            className={`p-2  rounded-lg border border-black/25 w-full hover:shadow ${
              i === selectedAnswer ? "bg-blue-100" : "bg-white"
            }`}
          >
            {a}
          </button>
        ))}
      </div>
      {selectedAnswer !== null && (
        <div>
          {question.answers[selectedAnswer] == question.correct_answer
            ? "Correct"
            : `Incorrect. The correct answer was ${question.correct_answer}`}
        </div>
      )}
    </div>
  );
}
