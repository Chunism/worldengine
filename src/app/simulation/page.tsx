"use client";
import Agents from "@/components/Agents";
import { useState } from "react";
import Narration from "@/components/Narration";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import { GNode, Graph } from "@/components/Graph";
import { getGroqCompletion } from "@/ai/groq";
import WEKnowledgeGraph from "@/components/WEKnowledgeGraph";
import { aboriginalpdf } from "../darkemu/data";
import React from "react";
import { getGeminiText } from "@/ai/gemini";
import { string } from "three/examples/jsm/nodes/Nodes.js";
import Link from 'next/link';

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

//Demo of running multiple agents that all compete for resources
export default function AgentsPage() {
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] });
  const [agents, setAgents] = useState<any[]>(initAgents);
  const [showUI, setShowUI] = useState<boolean>(true);
  const [playNarration, setPlayNarration] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);
  const [scenario, setScenario] = useState(`
   ${defaultGameState.event}
  `);
  const [currentYear, setCurrentYear] = useState(1770);
  const [history, setHistory] = useState<{
    year: number,
    analysis: string[],
    graph: Graph,
  }[]>([]);

  React.useEffect(() => {
    if (currentYear > 1770) {

      (async () => {
        const response = await getGeminiText(`
        You are an AI assistant for the counterfactual simulation game Alternate Tides: Australia's New Dawn. 
        The story should continue from the previous:${history} and always consider your respond to the knowledge of Aborginal law and their language from the law: ${aboriginalpdf}
        Generate a continue story that suggest the counterfactual scenario: where Aboriginal Eora nation and European settelers cohabit Australia for the strategy simulation Alternate Tides: Australia's New Dawn based on the current game state and previous game story: ${scenario} 
        The story should be around 100 words and reflect the upcoming story.
          ` 
        );
        setScenario(response);
      })()
    }
  }, [currentYear])

  const handleResponse = async (newAgents: any[]) => {
    setGenerating(true);
    //now we have the new agents, we can implement our logic for how to update the graph.
    try {
      const newData = await getGroqCompletion(
        JSON.stringify({ graph, scenario, agents }),
        2048,
        `The user will provide you with an implementation of a specific concept in the form of a knowledge graph together with an array of experts working towards specific goals within this graph.
        Generate a new state property for each node that describes how the goals, tasks and actions of an agent has impacted this node. 
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
      alert("failed to update graph");
    }
    setAgents(newAgents);
    setGenerating(false);
    setHistory([...history, { year: currentYear, analysis: newAgents, graph: graph }])

  };

  const getGraph = (graph: Graph) => {
    setGraph(graph);
  };

  const handleProgress = () => {
    setCurrentYear(currentYear + 3);
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-6 bg-black border-b-2 border-gray-480">
          <h1 className="text-3xl font-bold text-green-500">World Engine Studio</h1>
          <nav className="space-x-6">
           
            <Link href="/" legacyBehavior><a className="hover:text-gray-400">Home</a></Link>
            <Link href="/contact" legacyBehavior><a className="hover:text-gray-400">Contact Us</a></Link>
            <Link href="/portfolio" legacyBehavior><a className="hover:text-gray-400">Development Portfolio</a></Link>
            <Link href="/rmit" legacyBehavior><a className="hover:text-gray-400">RMIT Architecture</a></Link>
            <Link href="/about" legacyBehavior><a className="hover:text-gray-400">About</a></Link>
          </nav>
        </header>

    <main className="">
      <div className="z-10 max-w-lg w-full items-center justify-between font-mono text-sm lg:flex">
        <Narration
          play={playNarration}
          textToNarrate={JSON.stringify(scenario)} ///is it updated scenario???
          captionPrompt={`
        Do not include any other text or explanation or year.
        This story suggest the counterfactual scenario: where Aboriginal Eora nation and European settelers cohabit Australia for the strategy simulation Alternate Tides: Australia's New Dawn based on based on the current scenario
        Embellishes them where necessary to make them engaging to the audience. Narrate the story as lines of dialogue by a narrator and other characters. Place each item of dialogue on a new line. 
        Each line should be in the format "Speaker: Dialogue". `}
          imagePrompt={`You are an expert of etchings, botanical illustrations or paintings etc.
          The scene should always has those traditional Aboriginal Eora nation element with the first settlers coexist together.
          Describe the scene as if you were painting a picture with words. Start your description with: "In 1780 Sydney Cove Australia, a scene of" then use keywords and simple phrases separated by commas.
          End your description with: in the style of etchings, botanical illustrations, photographs of historical artifacts or paintings etc`}
        />

        <p className="absolute right-0 flex flex-col p-8 z-50 text-xl">Year: { currentYear } </p>

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
        > Progress</button>
    
          <div
            className={`${showUI ? "flex" : "hidden"
              } scale-85 w-full bg-white text-black border p-4 rounded-lg gap-4`}
          >
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
