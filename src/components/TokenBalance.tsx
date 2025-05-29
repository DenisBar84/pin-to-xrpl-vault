
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, TrendingUp, Plus } from "lucide-react";

const TokenBalance = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-black/80 border-pink-400/30 backdrop-blur-sm shadow-lg shadow-pink-400/10">
        <CardHeader>
          <CardTitle className="text-pink-400 flex items-center font-mono">
            <Coins className="w-5 h-5 mr-2" />
            &gt; PINN_BALANCE.DAT
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-5xl font-bold text-yellow-400 mb-2 font-mono">1,250.50</div>
            <div className="text-sm text-yellow-300 mb-4 font-mono">[PINN_TOKENS]</div>
            <div className="flex items-center justify-center text-green-400 text-sm mb-4 font-mono">
              <TrendingUp className="w-4 h-4 mr-1" />
              +5.2% THIS_WEEK
            </div>
            <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 border border-yellow-400 shadow-lg shadow-yellow-500/25 font-mono">
              <Plus className="w-4 h-4 mr-2" />
              BUY_PINN
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/80 border-cyan-400/30 backdrop-blur-sm shadow-lg shadow-cyan-400/10">
        <CardHeader>
          <CardTitle className="text-cyan-400 text-lg font-mono">&gt; PRICING.CFG</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-mono">
              <span className="text-cyan-300">Per GB/Month:</span>
              <span className="text-green-400">2.5 PINN</span>
            </div>
            <div className="flex justify-between text-sm font-mono">
              <span className="text-cyan-300">Pin Duration:</span>
              <span className="text-green-400">Min 30 days</span>
            </div>
            <div className="flex justify-between text-sm font-mono">
              <span className="text-cyan-300">Network Fee:</span>
              <span className="text-green-400">0.1 PINN</span>
            </div>
            <div className="border-t border-cyan-400/30 pt-3">
              <div className="flex justify-between font-mono">
                <span className="text-cyan-300">Current Rate:</span>
                <span className="text-pink-400">$0.045/GB</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenBalance;
