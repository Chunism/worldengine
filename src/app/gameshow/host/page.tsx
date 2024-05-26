"use client";
import { useEffect, useState } from "react";
import supabase from "@/supabase/supabaseClient";
import QuestionAnswer, {
  Player,
  Question,
  Quiz,
} from "@/components/QuestionAnswer";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function GameshowPage() {
  const [playerName, setPlayerName] = useState<string>("");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [player, setPlayer] = useState<Player | null>(null);

  const router = useRouter();
  const createGame = async () => {
    //Create new quiz in supabase
    const { data: quiz, error: quizError } = await supabase
      .from("quiz")
      .insert({ host_player_name: playerName, status: "lobby" })
      .select()
      .single();
    if (quiz) setQuiz(quiz);

    //create a player for the host
    const { data: player, error: playerError } = await supabase
      .from("player")
      .insert({
        player_name: playerName,
        status: "playing",
        score: 0,
        quiz_id: quiz.id,
      })
      .select()
      .single();
    if (player) setPlayer(player);
  };

  const startGame = async () => {
    //Set quiz to active and update our state
    if (!quiz) return;
    const { data, error } = await supabase
      .from("quiz")
      .update({ status: "playing" })
      .eq("id", quiz.id)
      .select()
      .single();
    if (data) setQuiz(data);
  };

  const stopGame = async () => {
    //Set quiz to active and update our state
    if (!quiz) return;
    const { data, error } = await supabase
      .from("quiz")
      .update({ status: "ended" })
      .eq("id", quiz.id)
      .select()
      .single();
    router.push("/gameshow");
  };

  useEffect(() => {
    //Get connected players and show them
    if (!quiz) return;
    console.log("created quiz, subscribing");
    const channels = supabase
      .channel("players")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "player" },
        (payload) => {
          console.log(payload);
          const player = payload.new as any;
          if (player.quiz_id === quiz.id)
            setPlayers((p: any[]) => {
              const index = p.findIndex((pl) => pl.id === player.id);
              if (index === -1) return [...p, player];
              return p.map((pl) => (pl.id === player.id ? player : pl));
            });
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, [quiz]);

  const handleAnswer = async (question: Question, answer: string) => {
    //update the player
    if (!player) return;
    const correct = question.correct_answer === answer;
    const { data, error } = await supabase
      .from("player")
      .update({
        score: player.score + (correct ? question.points : 0),
        status: correct ? "playing" : "lost",
      })
      .eq("id", player.id)
      .select()
      .single();
    setPlayer(data);
  };

  const handleQuestion = async (question: Question) => {
    //save the question to supabase so other players can answer it
    if (!quiz) return;
    const { data, error } = await supabase
      .from("question")
      .insert({
        quiz_id: quiz.id,
        theme: question.theme,
        type: question.type,
        question: question.question,
        answers: question.answers,
        correct_answer: question.correct_answer,
        points: question.points,
      })
      .select()
      .single();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-start justify-between font-mono text-sm lg:flex gap-4 ">
        <div className="flex flex-col gap-4 w-full">
          <h1>Hosting {quiz && `${playerName}s`} Game</h1>
          {!quiz ? (
            <>
              <input
                className="p-2 border rounded-lg bg-white/25 mb-2 w-full"
                type="text"
                value={playerName}
                placeholder={"Enter your name to host a game"}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <button
                onClick={createGame}
                disabled={!playerName}
                className="p-2 border rounded-lg bg-white mb-2 w-full hover:shadow"
              >
                Create Game
              </button>
            </>
          ) : (
            <>
              <button
                onClick={quiz.status === "playing" ? stopGame : startGame}
                disabled={!quiz}
                className="p-2 text-white font-semibold rounded-lg bg-blue-500 mb-2 w-full shadow hover:shadow-lg transition"
              >
                {quiz.status === "playing" ? "End Game" : "Start Game"}
              </button>
              {quiz.status === "playing" && (
                <QuestionAnswer
                  questionTime={10}
                  onQuestion={handleQuestion}
                  onAnswer={handleAnswer}
                />
              )}
            </>
          )}
        </div>
        <div className="flex flex-col gap-4 p-4 w-full bg-white border rounded-lg">
          <div className="flex justify-between items-center">
            <p>
              {player?.player_name} - {player?.status}
            </p>
            <p>{player?.score}pts</p>
          </div>
          <PlayerList players={players} />
        </div>
      </div>
    </main>
  );
}

function PlayerList({ players }: { players: Player[] }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs font-semibold">Other Players</div>
      {players.map((player, i) => (
        <div key={i} className="flex justify-between items-center">
          <p>
            {player.player_name} - {player.status}
          </p>
          <p>{player.score}pts</p>
        </div>
      ))}
    </div>
  );
}
