
import { Button } from "@/components/ui/button";
import { Wallet, Link as LinkIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-green-400/30 bg-black/90 backdrop-blur-sm relative">
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-pink-500/5"></div>
      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-cyan-400 rounded border border-green-400 flex items-center justify-center shadow-lg shadow-green-400/50">
              <LinkIcon className="w-6 h-6 text-black" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-400 font-mono">XRPin</h2>
              <p className="text-sm text-cyan-300 font-mono">[XRPL_STORAGE]</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-cyan-300 font-mono">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span>XRPL EVM TESTNET</span>
            </div>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border border-pink-400 shadow-lg shadow-pink-500/25 font-mono">
              <Wallet className="w-4 h-4 mr-2" />
              CONNECT_WALLET
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
