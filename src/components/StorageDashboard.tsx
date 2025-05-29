
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
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <HardDrive className="w-5 h-5 mr-2" />
          Storage Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">24</div>
            <div className="text-sm text-gray-400">Files Pinned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">156.8 MB</div>
            <div className="text-sm text-gray-400">Total Storage</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">99.9%</div>
            <div className="text-sm text-gray-400">Uptime</div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-white font-medium mb-3">Recent Files</h4>
          {pinnedFiles.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center space-x-3">
                <FileText className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-white text-sm font-medium">{file.name}</div>
                  <div className="text-gray-400 text-xs flex items-center space-x-2">
                    <span>{file.size}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{file.pinnedDate}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={file.status === 'active' ? 'default' : 'secondary'}
                  className={file.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'}
                >
                  {file.status}
                </Badge>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
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
