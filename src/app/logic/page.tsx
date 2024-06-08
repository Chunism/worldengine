'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import YouTube, { YouTubeProps } from 'react-youtube';

const VideoPage: React.FC = () => {
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
    <div className="relative min-h-screen bg-black text-white">
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

      {/* Image */}
      <div className="w-full flex justify-center mb-20">
        <img src="/images/logical.jpg" alt="Ideas Background" className="w-2/3 h-auto" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center p-6">
        <div className="flex flex-col lg:flex-row w-full max-w-7xl items-center lg:items-start space-y-6 lg:space-y-0 lg:mt-20">
          <div className="flex flex-col space-y-4 lg:w-4/5">
            <p className="text-base leading-6">
              The contents produced by AI in the simulation are not real. Please don't make requests too fast due to AI having limited tokens per minute. If the function in the simulation doesn't process, please wait for a while and watch the instructional video. Please contact us if you have any issues with the simulation.
            </p>
            
            <Link href="/simulation" className="text-2xl font-bold text-red-600 hover:text-yellow-300 mt-12">
              Explore the New World
            </Link>
            <Link href="/instruction" className="text-2xl font-bold text-red-600 hover:text-yellow-300 mt-12">
              Back
            </Link>
          </div>

          {/* YouTube Video */}
          <div className="lg:w-2/5">
            <YouTube
              videoId="8bJizHRyWIE"
              opts={{
                width: '100%',
                height: '480',
                playerVars: {
                  autoplay: 1,
                  mute: 0,
                  controls: 1,
                  modestbranding: 1,
                },
              }}
              onReady={handlePlayVideo}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex justify-between items-center p-6 bg-black border-t-2 border-gray-500">
        <div>
          <h4 className="text-2xl font-bold text-pink-500">WORLD ENGINE STUDIO</h4>
          <p className="text-sm text-pink-500">COPYRIGHT RMIT ARCHITECTURE</p>
          <p className="text-sm text-pink-500">CHUN HO LAU </p>
          <p className="text-sm text-pink-500">YUSHAN WANG </p>
          <div className="text-sm text-pink-500">
            Background video from <a href="https://www.youtube.com/watch?v=8bJizHRyWIE" target="_blank" rel="noopener noreferrer" className="underline">Kinchela Boys Home AC</a>
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
  );
};

export default VideoPage;
