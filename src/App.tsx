import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner"; // Sonner might not be needed if only one toaster system is used
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TodayViewPage from "./pages/TodayViewPage";
import BrowseTextsPage from "./pages/BrowseTextsPage";
import MyTextsPage from "./pages/MyTextsPage";
import AddTextPage from "./pages/AddTextPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      {/* <Sonner /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodayViewPage />} />
          <Route path="/browse" element={<BrowseTextsPage />} />
          <Route path="/my-texts" element={<MyTextsPage />} />
          <Route path="/add" element={<AddTextPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;