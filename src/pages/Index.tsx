
import Header from "@/components/Header";
import StorageDashboard from "@/components/StorageDashboard";
import FileUpload from "@/components/FileUpload";
import TokenBalance from "@/components/TokenBalance";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            XRPin
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Decentralized Storage on XRPL EVM Sidechain - Pin your files to IPFS with blockchain-powered reliability
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
