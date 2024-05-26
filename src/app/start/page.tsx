'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const VideoBackgroundPage = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
      videoRef.current.volume = 0.5; // Set volume to 50%
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const playVideoOnInteraction = () => {
      if (!isPlaying) {
        handlePlayVideo();
      }
    };

    window.addEventListener('click', playVideoOnInteraction);
    window.addEventListener('keydown', playVideoOnInteraction);

    return () => {
      window.removeEventListener('click', playVideoOnInteraction);
      window.removeEventListener('keydown', playVideoOnInteraction);
    };
  }, [isPlaying]);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Local video background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover blur-sm"
        >
          <source src="/video/background-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>

      {/* Content */}
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

        {/* Acknowledgment of Country */}
        <section className="flex-grow flex flex-col items-center justify-center text-center px-6 mt-60">
          <h2 className="text-5xl font-bold mb-8">ACKNOWLEDGMENT OF COUNTRY</h2>
          <p className="mt-6 max-w-2xl text-base leading-6">
            On this stolen land, we acknowledge our impermissible act. <br />
            On this stolen land, we try to reconcile an ill-forgotten ‘snatch’. <br />
            On this stolen land, we own an unforgivable ‘take’. <br />
          </p>
          <p className="mt-6 max-w-2xl text-base leading-6">
            Where blossoms hum and fires howl, we give thanks. <br />
            Between mountain sand and ocean stone, we give thanks. <br />
            Under cormorant song and mackerel sky, we give thanks. <br />
          </p>
          <p className="mt-6 max-w-2xl text-base leading-6">
            We honour the aboriginal custodians of this land, the richness of their culture, and the sacred rituals of their ceremonies. <br />
          </p>
          <p className="mt-6 max-w-2xl text-base leading-6">
            With honour, we celebrate aboriginal wisdom which we cannot hope to comprehend, a profound language we cannot hope to practice, a story we can never hold. <br />
          </p>
          <p className="mt-6 max-w-2xl text-base leading-6">
            On this stolen land, we give thanks to past aboriginal tribes, honour present aboriginal custodians, and celebrate emerging aboriginal caretakers of this earth and sky that we continue to borrow without repentance.
          </p>
          <Link href="/simulation" legacyBehavior>
            <a className="mt-20 text-2xl font-bold text-red-600 hover:text-yellow-300">
              Explore the New World
            </a>
          </Link>
        </section>

        {/* Explore More Section */}
        <section className="flex justify-center items-center mt-24 space-x-10">
          <div className="relative bg-cover bg-center w-72 h-48 rounded-lg" style={{ backgroundImage: 'url(/7f9bd126-ee52-4d7d-b3ef-4517cdab9be8.png)' }}>
            <p className="absolute bottom-2 left-2 text-xs">THE GLOBAL ISSUE: LACK OF CULTURE HERITAGE</p>
          </div>
          <div className="relative bg-cover bg-center w-72 h-48 rounded-lg" style={{ backgroundImage: 'url(/b92aec61-19c6-4134-b9c5-b17871ec79a8.png)' }}>
            <p className="absolute bottom-2 left-2 text-xs">MAPPING OF THE FORECASTING ENGINE</p>
          </div>
          <div className="relative bg-cover bg-center w-72 h-48 rounded-lg" style={{ backgroundImage: 'url(/13b012cd-8de8-43fe-b6e0-6aae78b09193.png)' }}>
            <p className="absolute bottom-2 left-2 text-xs">SCENARIO OF THE SIMULATION TOOL</p>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="flex flex-col items-center text-center mt-24 mb-10 space-y-6">
          <h3 className="text-lg font-bold">SIGN UP FOR THE OFFICIAL ALTERNATE TIDES NEWSLETTER!</h3>
          <p className="max-w-lg text-sm">KEEP YOUR FEED UP TO DATE WITH THE LATEST NEWS AND ANNOUNCEMENTS ON ALL THINGS ALTERNATE TIDES!</p>
          <div className="flex items-center border-b border-white pb-2">
            <input type="email" placeholder="ENTER YOUR EMAIL" className="bg-black text-white text-center placeholder-gray-400 focus:outline-none" />
            <button className="ml-2 p-2 bg-white text-black rounded-full">→</button>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex justify-between items-center p-6 bg-black border-t-2 border-gray-500">
          <div>
            <h4 className="text-2xl font-bold text-pink-500">WORLD ENGINE STUDIO</h4>
            <p className="text-sm text-pink-500">COPYRIGHT RMIT ARCHITECTURE</p>
            <p className="text-sm text-pink-500">CHUN HO LAU </p>
            <p className="text-sm text-pink-500">YUSHAN WANG </p>
          </div>
          <nav className="flex space-x-12 text-sm text-pink-500">
            <div className="flex flex-col items-center space-y-2">
              <Link href="/intro" legacyBehavior><a>INTRO</a></Link>
              <Link href="/contact" legacyBehavior><a>CONTACT</a></Link>
              <Link href="/projects" legacyBehavior><a>PROJECTS</a></Link>
              <Link href="/community" legacyBehavior><a>COMMUNITY</a></Link>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Link href="/privacy-policy" legacyBehavior><a>PRIVACY POLICY</a></Link>
              <Link href="/terms-of-use" legacyBehavior><a>TERMS OF USE</a></Link>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Link href="https://www.facebook.com" legacyBehavior><a>FACEBOOK</a></Link>
              <Link href="https://www.instagram.com" legacyBehavior><a>INSTAGRAM</a></Link>
              <Link href="https://www.twitter.com" legacyBehavior><a>X</a></Link>
            </div>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default VideoBackgroundPage;
