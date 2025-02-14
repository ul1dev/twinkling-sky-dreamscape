
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/en" replace />} />
          <Route path="/:lang" element={<Layout><Index /></Layout>} />
          <Route path="/:lang/terms" element={<Layout><div className="text-white">Terms Page</div></Layout>} />
          <Route path="/:lang/privacy" element={<Layout><div className="text-white">Privacy Page</div></Layout>} />
          <Route path="/:lang/tours" element={<Layout><div className="text-white">Tours Page</div></Layout>} />
          <Route path="/:lang/houses" element={<Layout><div className="text-white">Houses Page</div></Layout>} />
          <Route path="/:lang/about" element={<Layout><div className="text-white">About Page</div></Layout>} />
          <Route path="/:lang/contact" element={<Layout><div className="text-white">Contact Page</div></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
