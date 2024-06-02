'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import YouTube, { YouTubeProps } from 'react-youtube';

const VideoBackgroundPage: React.FC = () => {
  const [player, setPlayer] = useState<YT.Player | null>(null);

  const handlePlayVideo: YouTubeProps['onReady'] = (event) => {
    const ytPlayer = event.target;
    ytPlayer.mute(); // Start with mute to comply with autoplay policy
    ytPlayer.playVideo();
    setPlayer(ytPlayer);
  };

  const handleUserInteraction = () => {
    if (player) {
      player.unMute();
      player.setVolume(50); // Set volume to 50%
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, [player]);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* YouTube video background */}
      <div className="absolute inset-0 z-0 -mt-60">
        <div className="absolute inset-0 w-full h-full z-0 object-cover blur-sm">
          <YouTube
            videoId="u4Hw9d91k2E"
            opts={{
              width: '100%',
              height: '100%',
              playerVars: {
                autoplay: 1,
                loop: 1,
                mute: 1,
                controls: 0,
                showinfo: 0,
                modestbranding: 1,
                playlist: 'u4Hw9d91k2E',
              },
            }}
            onReady={handlePlayVideo}
            className="absolute inset-0 w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-6 bg-black border-b-2 border-gray-480">
          <h1 className="text-3xl font-bold text-green-500">World Engine Studio</h1>
          <nav className="space-x-6">
            <Link href="/start" className="hover:text-gray-400">Home</Link>
            <Link href="https://www.rmit.edu.au/research/contact" className="hover:text-gray-400">Contact Us</Link>
            <Link href="/portfolio" className="hover:text-gray-400">Development Portfolio</Link>
            <Link href="https://www.rmit.edu.au/study-with-us/levels-of-study/postgraduate-study/masters-by-coursework/master-of-architecture-mc163?ef_id=CjwKCAjwjeuyBhBuEiwAJ3vuocK4O954G73ncM4ODlj12TJXiA36YTlwyZCN26fCMtqM8DfHELTLihoClgQQAvD_BwE:G:s&s_kwcid=AL!14937!3!652429308184!b!!g!!master%20of%20architecture!19882979499!152619350092&cq_plac=&cq_net=g&cq_pos=&cq_med=&cq_plt=gp&gad_source=1&gclid=CjwKCAjwjeuyBhBuEiwAJ3vuocK4O954G73ncM4ODlj12TJXiA36YTlwyZCN26fCMtqM8DfHELTLihoClgQQAvD_BwE&gclsrc=aw.ds" className="hover:text-gray-400">RMIT Architecture</Link>
            <Link href="/about" className="hover:text-gray-400">About</Link>
          </nav>
        </header>

        {/* Acknowledgment of Country */}
        <section className="flex-grow flex flex-col items-center justify-center text-justify px-6 mt-60">
          <h2 className="text-5xl font-bold mb-8">ALTERNATE TIDES: A NEW DAWN OF AUSTRALIA</h2>
          <p className="mt-6 max-w-6xl text-base leading-6">
          "Alternate Tides: A New Dawn for Australia" simulator presents a counterfactual scenario where the first European settlers and Aboriginal people coexist and cohabit the land. Based on Bruce Pascoe's "Dark Emu", scenarios are developed from the consider of Aboriginal law, they are logical and reasonable.   <br />
          </p>
          <p className="mt-6 max-w-6xl text-base leading-6">
          The core significance of this simulator lies in promoting cultural awareness and respect. By intricately showcasing the traditional knowledge, social structures, and daily lives of Australia's Aboriginal people. The simulator educates users on the importance of understanding and respecting diverse cultures, highlighting the richness and wisdom within these traditions.  <br />
          </p>
          <p className="mt-6 max-w-6xl text-base leading-6">
          The simulator fosters critical thinking and historical consciousness through historical reflection and detailed analytical graphs, coupled with expert analyses of each scenario. Users can deeply understand the long-term impacts of political decisions by engaging with these peaceful coexistence scenarios and drawing insights from graphical analyses and expert opinions. This education extends beyond historical contexts, applying to complex decision-making processes in contemporary society, thereby promoting rational and thoughtful decision-making. <br />
          </p>
          <p className="mt-6 max-w-6xl text-base leading-6">
          Socially, the simulator aims to enhance inclusivity and equity by reducing racial and cultural biases and prejudices, guiding society towards greater harmony. By demonstrating the possibility of peaceful coexistence, it advocates for cultural heritage preservation and decolonization, emphasizing the value of multicultural coexistence. <br />
          </p>
          <p className="mt-6 max-w-6xl text-base leading-6">
          This simulator is a powerful educational tool that can be widely utilized in schools and communities, enhancing cultural education through interactive learning. It allows students and the public to understand and respect different cultures more intuitively, fostering cross-cultural understanding and inclusivity. Globally, the simulator can have a profound impact by encouraging users to reflect on colonial history and promoting cultural protection and social equity in real life. By advocating for cultural heritage preservation and decolonization, the simulator provides an innovative and effective educational approach for the global decolonization movement, helping societies move towards a more just, inclusive, and understanding future.
          </p>
          <Link href="/simulation" className="mt-20 text-2xl font-bold text-red-600 hover:text-yellow-300">
            Explore the New World
          </Link>
          <Link href="https://www.youtube.com/" className="mt-20 text-2xl font-bold text-red-600 hover:text-yellow-300">
            Instructional Video
          </Link>
        </section>
        {/* Newsletter Section */}
        <section className="flex flex-col items-center text-center mt-24 mb-10 space-y-6">

        </section>

        {/* Footer */}
        <footer className="flex justify-between items-center p-6 bg-black border-t-2 border-gray-500">
          <div>
            <h4 className="text-2xl font-bold text-pink-500">WORLD ENGINE STUDIO</h4>
            <p className="text-sm text-pink-500">COPYRIGHT RMIT ARCHITECTURE</p>
            <p className="text-sm text-pink-500">CHUN HO LAU </p>
            <p className="text-sm text-pink-500">YUSHAN WANG </p>
            <div className="text-sm text-pink-500">
            Background video from <a href="https://www.youtube.com/watch?v=u4Hw9d91k2E" target="_blank" rel="noopener noreferrer" className="underline">Kinchela Boys Home AC</a>
          </div>
          </div>
          <nav className="flex space-x-12 text-sm text-pink-500">
            <div className="flex flex-col items-center space-y-2">
              <Link href="/intro">INTRO</Link>
              <Link href="/contact">CONTACT</Link>
              <Link href="/projects">PROJECTS</Link>
              <Link href="/community">COMMUNITY</Link>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Link href="/privacy-policy">PRIVACY POLICY</Link>
              <Link href="/terms-of-use">TERMS OF USE</Link>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Link href="https://www.facebook.com">FACEBOOK</Link>
              <Link href="https://www.instagram.com">INSTAGRAM</Link>
              <Link href="https://www.twitter.com">X</Link>
            </div>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default VideoBackgroundPage;