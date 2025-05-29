
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Calculator } from "lucide-react";
import { useState } from "react";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [duration, setDuration] = useState(30);

  const calculateCost = () => {
    if (!selectedFile) return 0;
    const sizeInGB = selectedFile.size / (1024 * 1024 * 1024);
    const monthlyCost = sizeInGB * 2.5; // 2.5 PINN per GB
    const totalCost = (monthlyCost * duration) / 30 + 0.1; // Network fee
    return totalCost.toFixed(2);
  };

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Upload className="w-5 h-5 mr-2" />
          Pin New File
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-purple-500/50 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-white mb-2">Drop files here or click to browse</p>
              <p className="text-gray-400 text-sm">Max file size: 100MB</p>
              <Input
                type="file"
                className="hidden"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />
            </div>
            
            {selectedFile && (
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <FileText className="w-5 h-5 text-blue-400" />
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">{selectedFile.name}</div>
                  <div className="text-gray-400 text-xs">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-white">Pin Duration (days)</Label>
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min="30"
                max="365"
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <Card className="bg-white/5 border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center">
                  <Calculator className="w-4 h-4 mr-2" />
                  Cost Estimate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Storage Cost</span>
                    <span className="text-white">{selectedFile ? ((selectedFile.size / (1024 * 1024 * 1024)) * 2.5 * duration / 30).toFixed(2) : '0.00'} PINN</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Network Fee</span>
                    <span className="text-white">0.10 PINN</span>
                  </div>
                  <div className="border-t border-white/10 pt-2">
                    <div className="flex justify-between font-medium">
                      <span className="text-white">Total</span>
                      <span className="text-purple-400">{calculateCost()} PINN</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={!selectedFile}
            >
              Pin to IPFS
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
