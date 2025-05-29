
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, TrendingUp, Plus } from "lucide-react";

const TokenBalance = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Coins className="w-5 h-5 mr-2" />
            PINN Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">1,250.50</div>
            <div className="text-sm text-gray-400 mb-4">PINN Tokens</div>
            <div className="flex items-center justify-center text-green-400 text-sm mb-4">
              <TrendingUp className="w-4 h-4 mr-1" />
              +5.2% this week
            </div>
            <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
              <Plus className="w-4 h-4 mr-2" />
              Buy PINN
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-lg">Storage Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Per GB/Month</span>
              <span className="text-white font-medium">2.5 PINN</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Pin Duration</span>
              <span className="text-white font-medium">Min 30 days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Network Fee</span>
              <span className="text-white font-medium">0.1 PINN</span>
            </div>
            <div className="border-t border-white/10 pt-3">
              <div className="flex justify-between font-medium">
                <span className="text-gray-300">Current Rate</span>
                <span className="text-green-400">$0.045/GB</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenBalance;
