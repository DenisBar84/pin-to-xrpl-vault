
import Header from "@/components/Header";
import StorageDashboard from "@/components/StorageDashboard";
import FileUpload from "@/components/FileUpload";
import TokenBalance from "@/components/TokenBalance";
import { useState, useEffect } from "react";

const Index = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "XRPin";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 200);

    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Retro grid background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <Header />
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-pink-500 mb-4 font-mono tracking-wider">
            {displayedText}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>_</span>
          </h1>
          <div className="text-green-400 text-lg font-mono border border-green-400 inline-block px-4 py-2 bg-black/80 backdrop-blur-sm">
            &gt; DECENTRALIZED_STORAGE.EXE INITIALIZED
          </div>
          <p className="text-cyan-300 max-w-2xl mx-auto mt-4 font-mono text-sm">
            [XRPL EVM SIDECHAIN] Pin your files to IPFS with blockchain-powered reliability
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <StorageDashboard />
          </div>
          <div>
            <TokenBalance />
          </div>
        </div>
        
        <FileUpload />
      </main>
    </div>
  );
};

export default Index;
