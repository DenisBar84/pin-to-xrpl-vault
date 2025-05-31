
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HardDrive, Clock, FileText, Download, Trash2 } from "lucide-react";
import { useFiles } from "@/contexts/FileContext";
import { useToast } from "@/hooks/use-toast";

const StorageDashboard = () => {
  const { files, removeFile, downloadFile, totalStorage } = useFiles();
  const { toast } = useToast();

  const handleDownload = (id: string) => {
    downloadFile(id);
    toast({
      title: "Download started",
      description: "Your file download has begun",
    });
  };

  const handleDelete = (id: string, fileName: string) => {
    removeFile(id);
    toast({
      title: "File removed",
      description: `${fileName} has been removed from your storage`,
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const activeFiles = files.filter(f => f.status === 'active');
  const pendingFiles = files.filter(f => f.status === 'pending');

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
            <div className="text-3xl font-bold text-cyan-400 font-mono">{files.length}</div>
            <div className="text-xs text-cyan-300 font-mono">FILES_PINNED</div>
          </div>
          <div className="text-center p-4 border border-pink-400/30 bg-pink-400/5 rounded">
            <div className="text-3xl font-bold text-pink-400 font-mono">{formatFileSize(totalStorage)}</div>
            <div className="text-xs text-pink-300 font-mono">TOTAL_STORAGE</div>
          </div>
          <div className="text-center p-4 border border-green-400/30 bg-green-400/5 rounded">
            <div className="text-3xl font-bold text-green-400 font-mono">
              {files.length > 0 ? Math.round((activeFiles.length / files.length) * 100) : 100}%
            </div>
            <div className="text-xs text-green-300 font-mono">SUCCESS_RATE</div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-green-400 font-mono mb-3">&gt; PINNED_FILES.LOG</h4>
          {files.length === 0 ? (
            <div className="text-center py-8 text-cyan-300 font-mono">
              [NO_FILES_PINNED] - Upload your first file to get started
            </div>
          ) : (
            files.slice(-10).reverse().map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-black/60 rounded border border-green-400/20 hover:border-green-400/40 transition-colors">
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="text-green-400 text-sm font-mono">{file.name}</div>
                    <div className="text-cyan-300 text-xs flex items-center space-x-2 font-mono">
                      <span>[{formatFileSize(file.size)}]</span>
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      <span>{file.pinnedDate}</span>
                      <span>•</span>
                      <span className="text-xs text-gray-400">{file.ipfsHash.substring(0, 20)}...</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={file.status === 'active' ? 'default' : 'secondary'}
                    className={file.status === 'active' 
                      ? 'bg-green-500/20 text-green-400 border-green-400/50 font-mono' 
                      : file.status === 'pending' 
                      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-400/50 font-mono'
                      : 'bg-red-500/20 text-red-400 border-red-400/50 font-mono'
                    }
                  >
                    [{file.status.toUpperCase()}]
                  </Badge>
                  {file.status === 'active' && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 border border-cyan-400/30"
                      onClick={() => handleDownload(file.id)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10 border border-red-400/30"
                    onClick={() => handleDelete(file.id, file.name)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StorageDashboard;
