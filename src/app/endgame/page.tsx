
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

  
 export default function endgame() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* YouTube video background */}
      <div className="absolute inset-0 z-0 -mt-60">

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
        <section className="flex-grow flex flex-col items-center justify-center text-center px-6 mt-60">
          <h2 className="text-5xl font-bold mb-8">LOADING CONCLUSION OF THE SIMULATION</h2>
          <p className="mt-6 max-w-6xl text-base leading-6"> 
          As the simulation concludes, please take a moment to reflect on the journey you have undertaken in "Alternate Tides: A New Dawn for Australia." This counterfactual scenario has allowed you to explore a world where European settlers and Aboriginal people coexist peacefully from the outset.
          </p>
          <p className="mt-6 max-w-6xl text-base leading-6">
          While this simulation offers a rich and engaging experience, it's important to remember that it is a work of imagination and historical interpretation. The content, generated with the aid of artificial intelligence, aims to be educational and thought-provoking but may not be perfect or free from errors.
          </p>
          <p className="mt-6 max-w-6xl text-base leading-6">
          We hope this experience has deepened your understanding of cultural awareness, the importance of historical reflection, and the impact of political decisions on society. As you wait for the final results, consider the following:
          </p>
          <p className="mt-6 max-w-6xl text-base leading-6">
           How have your choices influenced the lives of the Aboriginal people in the simulation? <br />
           What lessons can be drawn from the alternative history you have explored? <br />
           How might these lessons apply to our real world and contemporary society? <br />
          </p>
          <p className="mt-6 max-w-6xl text-base leading-6">
          Thank you for participating in this journey, and we appreciate your patience as we generate the final outcomes.
          </p>
          <Link href="/start" className="mt-20 text-2xl font-bold text-red-600 hover:text-yellow-300">
            RESTART
          </Link>
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
