import "./global.css";
import { QueryClient } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { createRoot, hydrateRoot } from "react-dom/client";
import AppRoot from "./app/AppRoot";
import AppRouterShell from "./app/AppRouterShell";
import { getActivePreloadedState, initializeBrowserPreloadedState } from "./lib/preloadState";

// Suppress ResizeObserver loop error from Radix UI components
// This is a non-critical warning that occurs with rapid layout changes and fixed positioning
if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    const errorMsg = args[0]?.message || String(args[0]) || "";
    if (
      errorMsg.includes("ResizeObserver loop completed with undelivered notifications") ||
      errorMsg.includes("ResizeObserver loop completed")
    ) {
      return;
    }
    originalError.call(console, ...args);
  };

  window.addEventListener("error", (event: ErrorEvent) => {
    const errorMsg = (event.error?.message || event.message || "").toString();
    if (errorMsg.includes("ResizeObserver loop completed")) {
      event.preventDefault();
    }
  });

  // Additional suppression for unhandled promise rejections related to ResizeObserver
  window.addEventListener("unhandledrejection", (event) => {
    const errorMsg = (event.reason?.message || String(event.reason) || "").toString();
    if (errorMsg.includes("ResizeObserver loop completed")) {
      event.preventDefault();
    }
  });
}

const queryClient = new QueryClient();
const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container not found");
}

initializeBrowserPreloadedState();

const app = (
  <AppRoot
    queryClient={queryClient}
    initialSiteSettings={getActivePreloadedState()?.site.settings ?? null}
    router={
      <BrowserRouter>
        <AppRouterShell />
      </BrowserRouter>
    }
  />
);

type RootContainer = HTMLElement & {
  __reactRoot?: ReturnType<typeof createRoot>;
};

const rootContainer = container as RootContainer;
const shouldHydrate = rootContainer.hasChildNodes() && !!getActivePreloadedState();
const existingRoot = rootContainer.__reactRoot;

if (existingRoot) {
  existingRoot.render(app);
} else if (shouldHydrate) {
  rootContainer.__reactRoot = hydrateRoot(rootContainer, app);
} else {
  rootContainer.__reactRoot = createRoot(rootContainer);
  rootContainer.__reactRoot.render(app);
}
