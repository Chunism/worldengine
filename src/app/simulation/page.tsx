"use client";
import React, { useState, useEffect } from "react";
import Agents from "@/components/Agents";
import Narration from "@/components/Narration";
import WEKnowledgeGraph from "@/components/WEKnowledgeGraph";
import { GNode, Graph } from "@/components/Graph";
import { getGroqCompletion } from "@/ai/groq";
import { getGeminiVision } from "@/ai/gemini";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { aboriginalpdf } from "../darkemu/data";

const defaultGameState = {
  year: 1770,
  event: "The Eora Nation people, adorned with intricate traditional body paint and carvings, watch warily from the shore. The Europeans, dressed in their pristine naval uniforms, unload gifts including tools, food, and fabrics. They set up a temporary encampment with tents and cooking fires. The Eora people, engaging in daily activities like fishing, cooking, and crafting tools, eye the newcomers with a mix of curiosity and suspicion. Children play near the shore, while warriors stand ready, prepared for any threat. In a central area, Cook presents an array of gifts to Eora leaders, who examine them cautiously, discussing their potential uses and implications. Friendly gestures and respectful bows are exchanged, but tension is palpable. Some Europeans document the local flora and fauna, fascinated yet uncertain. The Eora people’s reaction is mixed, some intrigued by the strange tools, others wary of the Europeans’ intentions. The atmosphere is charged, the future of this encounter hanging in the balance.",
};

const initAgents = [
  {
    name: "Culture Assimilation",
    criteria: "Based on the current state of the current scenario, analyze the likely changes in the aspect of Culture Assimilation that impacts current scenario.",
    analysis: "",
    consequences: ""
  },
  {
    name: "Reconciliation",
    criteria: "Based on the current state of the current scenario, analyze the likely changes in the aspect of Reconciliation that impacts current scenario.",
    analysis: "",
    consequences: ""
  },
  {
    name: "Politics",
    criteria: "Based on current state of the current scenario, analyze the likely changes in the aspect of Current Political challenges that impacts current scenario.",
    analysis: "",
    consequences: ""
  },
  {
    name: "War and Conflict",
    criteria: "Based on current state of the current scenario, analyze the possibility of War and Conflicts and how it impacts current scenario.",
    analysis: "",
    consequences: ""
  },
  {
    name: "Loss Of Identity",
    criteria: "Based on current state of the current scenario, analyze the likely changes in the aspect of loss of identity for aboriginals that impacts current scenario.",
    analysis: "",
    consequences: ""
  },
];

// Demo of running multiple agents that all compete for resources
export default function AgentsPage() {
  const router = useRouter();
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] });
  const [agents, setAgents] = useState<any[]>(initAgents);
  const [showUI, setShowUI] = useState<boolean>(true);
  const [playNarration, setPlayNarration] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);
  const [scenario, setScenario] = useState<string>(defaultGameState.event);
  const [currentYear, setCurrentYear] = useState<number>(defaultGameState.year);
  const [history, setHistory] = useState<{
    year: number,
    analysis: string[],
    graph: Graph,
    scenario: string
  }[]>([]);

  useEffect(() => {
    if (currentYear > 1770 && currentYear < 1800) {
      generateScenario();
    } else if (currentYear >= 1800) {
      generateConclusion();
    }
  }, [currentYear]);

  const generateScenario = async () => {
    try {
      const previousScenario = history.length > 0 ? history[history.length - 1].scenario : defaultGameState.event;
      const previousYear = history.length > 0 ? history[history.length - 1].year : defaultGameState.year;
      const response = await getGeminiVision(
        "Generate a scenario for the counterfactual scenario where the Aboriginal Eora nation and European settlers cohabit Australia based on previous scenario. Consider the previous scenario and current game state, your response should refer to Aboriginal ancestor knowledge",
        undefined,
        `
          You are an AI assistant for generating the counterfactual scenario for a simulation.
          This complex scenario should continue from the previous story and always consider the aspect of Aboriginal and you have to reference from aboriginal information about ancestor's mythical stories, aboriginal law, aboriginal language, aboriginal rule, aboriginal knowledge, aboriginal culture, details of the story, law, idea, their culture from ${aboriginalpdf}.
          This scenario talks about what happened during the progress time. Think about what happened in 3 years of time.
          This scenario is based on the previous story, it is a story that continued from the previous scenario and can be run for the upcoming scenario.
          Generate the complex scenario around 150 words and only return the scenario.

          Previous Scenario: ${previousScenario}
          Previous Year: ${previousYear}
          Current Year: ${currentYear}
          
          Instructions:
          - Clearly describe the key events that have occurred in the 3 years since the previous scenario.
          - Highlight any new developments, challenges, or conflicts that have emerged.
          - Ensure the narrative builds logically from the previous events and incorporates both Eora and European perspectives.
          - Mention specific interactions, agreements, or conflicts that illustrate the evolving relationship.
          - Incorporate traditional Eora knowledge and practices and how they are influencing or being influenced by European settlers.
          - Ensure the scenario is engaging and introduces new dynamics that set the stage for future scenarios.
        `,
        false
      );

      console.log(response);
      setScenario(response);
      setHistory([...history, { year: currentYear, analysis: agents.map(a => a.analysis), graph, scenario: response }]);
    } catch (error) {
      console.error("Error generating scenario:", error);
      alert("Failed to generate scenario");
    }
  };

  const generateConclusion = async () => {
    try {
      // Collect all scenarios from history
      const allScenarios = history.map(entry => entry.scenario).join(" ");

      const response = await getGeminiVision(
        `The year is 1800, generate a conclusion around 100 words for the counterfactual simulation based on the provided history and current game state based on the previous scenario.
         This complex conclusion suggests that the coexist of settlers and Aborginal people, provide a meaningful, deep thinking conclusion.        
        `,
        undefined,
        `
          You are an AI assistant for generating the conclusion for the counterfactual simulation where Aboriginal and Eora Nation people coexist in Australia in 1800.
          Based on the history of the simulation, here is the sequence of events:
          ${allScenarios}
          
          The current game state is as follows:
          ${JSON.stringify(graph)}
          Generate a conclusion based on this history and current game state. Ensure the conclusion is around 100 words and captures the key outcomes and future implications.
          Only return conclusion.
        `,
        false
      );

      console.log(response);
      alert(response);
      router.push("/endgame");
    } catch (error) {
      console.error("Error generating conclusion:", error);
      alert("Failed to generate conclusion");
    }
  };

  const handleResponse = async (newAgents: any[]) => {
    setGenerating(true);
    setAgents(newAgents);

    try {
      const newData = await getGroqCompletion(
        JSON.stringify({ graph, scenario, agents }),
        2048,
        `The user will provide you with an implementation of a specific concept in the form of a knowledge graph together with an array of experts working towards specific goals within this graph.
        Generate a new state property for each node that describes how the goals, tasks, and actions of an agent have impacted this node.
        If the node is impacted, include a brief summary of the agent name and their task in the new state.
        Include specific changes that may be required to the implementation of the node, or challenges the node now faces.
        Generate a map using the node ID as the key and the new state as the value.
        Return your response in JSON in the format {[id:string]: string}.`,
        true
      );
      const graphJSON = JSON.parse(newData);
      console.log(graphJSON);
      const newNodes = graph.nodes.map((n: GNode) => ({
        ...n,
        state: graphJSON[n.id] ?? "",
      }));

      console.log(newNodes);
      setGraph({ nodes: newNodes, edges: graph.edges });
    } catch (e) {
      console.error(e);
      alert("Failed to update graph");
    }
    setGenerating(false);
  };

  const getGraph = (graph: Graph) => {
    setGraph(graph);
  };

  const handleProgress = () => {
    if (currentYear < 1800) {
      setCurrentYear(currentYear + 3);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-6 bg-black border-b-2 border-gray-480">
          <h1 className="text-3xl font-bold text-green-500">World Engine Studio</h1>
          <nav className="space-x-6">
            <Link href="/start" className="hover:text-gray-400">Home</Link>
            <Link href="https://www.rmit.edu.au/research/contact" className="hover:text-gray-400">Contact Us</Link>
            <Link href="/https://www.notion.so/Chun-Ho-Lau-Folio-World-Engine-59ed22ceb65b4f25bff46ef5515c524e" className="hover:text-gray-400">Development Portfolio</Link>
            <Link href="https://www.rmit.edu.au/study-with-us/levels-of-study/postgraduate-study/masters-by-coursework/master-of-architecture-mc163?ef_id=CjwKCAjwjeuyBhBuEiwAJ3vuocK4O954G73ncM4ODlj12TJXiA36YTlwyZCN26fCMtqM8DfHELTLihoClgQQAvD_BwE:G:s&s_kwcid=AL!14937!3!652429308184!b!!g!!master%20of%20architecture!19882979499!152619350092&cq_plac=&cq_net=g&cq_pos=&cq_med=&cq_plt=gp&gad_source=1&gclid=CjwKCAjwjeuyBhBuEiwAJ3vuocK4O954G73ncM4ODlj12TJXiA36YTlwyZCN26fCMtqM8DfHELTLihoClgQQAvD_BwE&gclsrc=aw.ds" className="hover:text-gray-400">RMIT Architecture</Link>
            <Link href="/https://au.linkedin.com/in/chun-ho-lau-9311142ba" className="hover:text-gray-400">About</Link>
          </nav>
        </header>

        <main className="">
          <div className="z-10 max-w-lg w-full items-center justify-between font-mono text-sm lg:flex">
            <Narration
              play={playNarration}
              textToNarrate={JSON.stringify(scenario)}
              captionPrompt={`
              Do not mention about the time and years.
              You are provided with a world state and an array of agents performing tasks to make changes to this world state.
              Narrate the counterfactual story of the game: where Aboriginal Eora nation and European settlers cohabit Australia. This is not history, not real!
              Write a short script that narrates a counterfactual story that dramatizes these events and embellishes them where necessary to make them
              engaging to the audience as lines of dialogue by a narrator and other characters. Place each item of dialogue on a new line.
              Each line should be in the format "Speaker: Dialogue". `}
              imagePrompt={`
              You will be provided an etchings, botanical illustrations, photographs of historical artifacts, paintings of the scene.
              The scene should always have those traditional Aboriginal elements with the first settlers coexist together.
              Start your description with: "An etching, botanical illustrations, photographs of historical artifacts, paintings of" then use keywords and simple phrases separated by commas.
              End your description with: in the late 18th century when first settlers and Aboriginal coexist.`}
            />

            <p className="fixed top-[80px] right-0 flex flex-col p-8 z-50 text-xl">Year: {currentYear} </p>

            <div id="Agent UI" className="">
              <button
                className="flex flex-col p-8 z-50 text-xl hover:text-gray-400"
                onClick={() => setShowUI(!showUI)}
              >
                {showUI ? "Hide UI" : "Show UI"}
              </button>

              <button
                className="flex flex-col p-8 z-50 text-xl hover:text-gray-400"
                onClick={handleProgress}
                disabled={currentYear >= 1800}
              > Progress</button>

              <div
                className={`${showUI ? "flex" : "hidden"} scale-85 w-full bg-white text-black border p-4 rounded-lg gap-4`}>
                <button
                  className="p-2 rounded-lg border bg-white shadow"
                  onClick={() => setPlayNarration(!playNarration)}
                >
                  {playNarration ? "Stop Narrating" : "Start Narrating"}
                </button>
                {generating && <span>Updating Graph...</span>}
                <WEKnowledgeGraph systemPrompt={scenario} graph={graph} onUpdate={getGraph} />
                <Agents
                  world={graph}
                  initAgents={agents}
                  onUpdate={handleResponse}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}