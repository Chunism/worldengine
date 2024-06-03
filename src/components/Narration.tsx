"use client";
import Caption from "./Caption";
import { useEffect, useState } from "react";
import { getGeminiVision } from "@/ai/gemini";
import Animation from "./Animation";
//Component that turns anything into a narrated script
export default function Narration({
  play = true,
  textToNarrate,
  captionPrompt,
  imagePrompt,
  onNarration,
  onCompleteLine,
}: {
  play?: boolean;
  textToNarrate: string;
  captionPrompt: string;
  imagePrompt: string;
  onNarration?: (narration: string) => void;
  onCompleteLine?: (line: string, nextLine: string) => void;
}) {
  const [script, setScript] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [currentText, setCurrentText] = useState<string | null>(null);

  useEffect(() => {
    //generate the narrative
    if (!play) return;
    const generateNarrative = async () => {
      const description = await getGeminiVision(
        textToNarrate,
        undefined,
        captionPrompt
      );
      setScript(description.split("\n"));
      setCurrentLine(0);
      setCurrentText(description.split("\n")[0]);
      if (onNarration) onNarration(description);
    };

    generateNarrative();
  }, [textToNarrate, play]);

  const handleReadText = () => {
    if (currentLine < script.length - 1) {
      setCurrentLine(currentLine + 1);
      setCurrentText(script[currentLine + 1]);
      if (onCompleteLine)
        onCompleteLine(script[currentLine], script[currentLine + 1]);
    }
  };


  return (
    <>
      {currentText && play && (
        <>
          <Caption
            text={script[currentLine]}
            speech
            onComplete={handleReadText}
          />
          <Animation
            prompt={script[currentLine]}
            systemPrompt={imagePrompt}
            width={1344}
            height={1024}
            video={false}
          />
        </>
      )}
    </>
  );
}
