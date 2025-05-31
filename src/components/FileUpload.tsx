
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Calculator } from "lucide-react";
import { useState, useRef } from "react";
import { useFiles } from "@/contexts/FileContext";
import { useToast } from "@/hooks/use-toast";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [duration, setDuration] = useState(30);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addFile } = useFiles();
  const { toast } = useToast();

  const calculateCost = () => {
    if (!selectedFile) return 0;
    const sizeInGB = selectedFile.size / (1024 * 1024 * 1024);
    const monthlyCost = sizeInGB * 2.5;
    const totalCost = (monthlyCost * duration) / 30 + 0.1;
    return totalCost.toFixed(2);
  };

  const handleFileSelect = (file: File) => {
    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      toast({
        title: "File too large",
        description: "Maximum file size is 100MB",
        variant: "destructive"
      });
      return;
    }
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    try {
      await addFile(selectedFile, duration);
      toast({
        title: "File pinned successfully!",
        description: `${selectedFile.name} has been pinned to IPFS`,
      });
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error pinning your file",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="bg-black/80 border-green-400/30 backdrop-blur-sm shadow-lg shadow-green-400/10">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center font-mono">
          <Upload className="w-5 h-5 mr-2" />
          &gt; PIN_NEW_FILE.EXE
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div 
              className="border-2 border-dashed border-cyan-400/40 rounded p-8 text-center hover:border-pink-400/60 transition-colors cursor-pointer bg-gradient-to-br from-cyan-400/5 to-pink-400/5"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <p className="text-cyan-300 mb-2 font-mono">DROP FILES HERE OR CLICK TO BROWSE</p>
              <p className="text-cyan-400 text-sm font-mono">[MAX_FILE_SIZE: 100MB]</p>
              <Input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file);
                }}
              />
            </div>
            
            {selectedFile && (
              <div className="flex items-center space-x-3 p-3 bg-black/60 rounded border border-green-400/30">
                <FileText className="w-5 h-5 text-pink-400" />
                <div className="flex-1">
                  <div className="text-green-400 text-sm font-mono">{selectedFile.name}</div>
                  <div className="text-cyan-300 text-xs font-mono">
                    [{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB]
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-cyan-400 font-mono">PIN_DURATION (days):</Label>
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min="30"
                max="365"
                className="bg-black/60 border-cyan-400/40 text-green-400 font-mono focus:border-pink-400/60"
              />
            </div>

            <Card className="bg-black/60 border-pink-400/30 shadow-lg shadow-pink-400/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-pink-400 text-lg flex items-center font-mono">
                  <Calculator className="w-4 h-4 mr-2" />
                  &gt; COST_ESTIMATE.LOG
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-mono">
                    <span className="text-cyan-300">Storage Cost:</span>
                    <span className="text-green-400">{selectedFile ? ((selectedFile.size / (1024 * 1024 * 1024)) * 2.5 * duration / 30).toFixed(2) : '0.00'} PINN</span>
                  </div>
                  <div className="flex justify-between text-sm font-mono">
                    <span className="text-cyan-300">Network Fee:</span>
                    <span className="text-green-400">0.10 PINN</span>
                  </div>
                  <div className="border-t border-pink-400/30 pt-2">
                    <div className="flex justify-between font-mono">
                      <span className="text-cyan-300">Total:</span>
                      <span className="text-yellow-400">{calculateCost()} PINN</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 border border-green-400 shadow-lg shadow-green-500/25 font-mono"
              disabled={!selectedFile || isUploading}
              onClick={handleUpload}
            >
              {isUploading ? 'PINNING...' : 'PIN_TO_IPFS.EXE'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
