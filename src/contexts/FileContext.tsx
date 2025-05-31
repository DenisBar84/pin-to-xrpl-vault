
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PinnedFile {
  id: string;
  name: string;
  size: number;
  pinnedDate: string;
  status: 'active' | 'pending' | 'failed';
  ipfsHash: string;
  file?: File;
}

interface FileContextType {
  files: PinnedFile[];
  addFile: (file: File, duration: number) => Promise<void>;
  removeFile: (id: string) => void;
  downloadFile: (id: string) => void;
  totalStorage: number;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const useFiles = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFiles must be used within a FileProvider');
  }
  return context;
};

export const FileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<PinnedFile[]>([]);

  // Load files from localStorage on mount
  useEffect(() => {
    const savedFiles = localStorage.getItem('xrpin-files');
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    }
  }, []);

  // Save files to localStorage whenever files change
  useEffect(() => {
    localStorage.setItem('xrpin-files', JSON.stringify(files));
  }, [files]);

  const generateIPFSHash = (fileName: string, size: number): string => {
    // Simple hash simulation for MVP
    const hash = 'Qm' + btoa(fileName + size + Date.now()).replace(/[^a-zA-Z0-9]/g, '').substring(0, 44);
    return hash;
  };

  const addFile = async (file: File, duration: number): Promise<void> => {
    const newFile: PinnedFile = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      pinnedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      ipfsHash: generateIPFSHash(file.name, file.size),
      file
    };

    setFiles(prev => [...prev, newFile]);

    // Simulate pinning process
    setTimeout(() => {
      setFiles(prev => prev.map(f => 
        f.id === newFile.id ? { ...f, status: 'active' as const } : f
      ));
    }, 2000);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const downloadFile = (id: string) => {
    const file = files.find(f => f.id === id);
    if (file && file.file) {
      const url = URL.createObjectURL(file.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const totalStorage = files.reduce((total, file) => total + file.size, 0);

  return (
    <FileContext.Provider value={{
      files,
      addFile,
      removeFile,
      downloadFile,
      totalStorage
    }}>
      {children}
    </FileContext.Provider>
  );
};
