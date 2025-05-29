
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HardDrive, Clock, FileText, Download } from "lucide-react";

const StorageDashboard = () => {
  const pinnedFiles = [
    {
      id: 1,
      name: "Project_Documentation.pdf",
      size: "2.4 MB",
      pinnedDate: "2024-01-15",
      status: "active",
      ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG"
    },
    {
      id: 2,
      name: "Smart_Contract.sol",
      size: "45 KB",
      pinnedDate: "2024-01-14",
      status: "active",
      ipfsHash: "QmPChd2hVbrJ5bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF32f"
    },
    {
      id: 3,
      name: "App_Screenshots.zip",
      size: "8.7 MB",
      pinnedDate: "2024-01-12",
      status: "pending",
      ipfsHash: "QmNLei78zWmzUdbeRB3CiUfAizWUrbeeZh5K1rhAQKCh51"
    }
  ];

  return (
    <Card className="bg-black/80 border-green-400/30 backdrop-blur-sm shadow-lg shadow-green-400/10">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center font-mono">
          <HardDrive className="w-5 h-5 mr-2" />
          &gt; STORAGE_OVERVIEW.SYS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 border border-cyan-400/30 bg-cyan-400/5 rounded">
            <div className="text-3xl font-bold text-cyan-400 font-mono">24</div>
            <div className="text-xs text-cyan-300 font-mono">FILES_PINNED</div>
          </div>
          <div className="text-center p-4 border border-pink-400/30 bg-pink-400/5 rounded">
            <div className="text-3xl font-bold text-pink-400 font-mono">156.8MB</div>
            <div className="text-xs text-pink-300 font-mono">TOTAL_STORAGE</div>
          </div>
          <div className="text-center p-4 border border-green-400/30 bg-green-400/5 rounded">
            <div className="text-3xl font-bold text-green-400 font-mono">99.9%</div>
            <div className="text-xs text-green-300 font-mono">UPTIME</div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-green-400 font-mono mb-3">&gt; RECENT_FILES.LOG</h4>
          {pinnedFiles.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-black/60 rounded border border-green-400/20 hover:border-green-400/40 transition-colors">
              <div className="flex items-center space-x-3">
                <FileText className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="text-green-400 text-sm font-mono">{file.name}</div>
                  <div className="text-cyan-300 text-xs flex items-center space-x-2 font-mono">
                    <span>[{file.size}]</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{file.pinnedDate}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={file.status === 'active' ? 'default' : 'secondary'}
                  className={file.status === 'active' 
                    ? 'bg-green-500/20 text-green-400 border-green-400/50 font-mono' 
                    : 'bg-yellow-500/20 text-yellow-400 border-yellow-400/50 font-mono'
                  }
                >
                  [{file.status.toUpperCase()}]
                </Badge>
                <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 border border-cyan-400/30">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StorageDashboard;
