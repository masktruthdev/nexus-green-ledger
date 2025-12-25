import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Web3Provider } from "@/lib/web3/provider";
import Index from "./pages/Index";
import BuyNFT from "./pages/BuyNFT";
import Staking from "./pages/Staking";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const App = () => (
  <Web3Provider>
    <TooltipProvider>
      <Toaster />
      <Sonner 
        theme="dark"
        toastOptions={{
          style: {
            background: "hsl(120, 30%, 8%, 0.9)",
            border: "1px solid hsl(120, 50%, 30%, 0.3)",
            color: "hsl(120, 100%, 95%)",
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/buy-nft" element={<BuyNFT />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </Web3Provider>
);

export default App;
