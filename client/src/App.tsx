/* ============================================================
   App — Warm Organic Editorial template
   Scroll story architecture: one continuous immersive canvas
   Old Flavours takeover overlay removed — star moments
   are now woven directly into the page scroll flow
   ============================================================ */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ScrollStoryProvider } from "./contexts/ScrollStoryContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <ScrollStoryProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ScrollStoryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
