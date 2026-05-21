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
  const originalWarn = console.warn;

  const isResizeObserverError = (msg: any): boolean => {
    const errorStr = String(msg || "");
    return (
      errorStr.includes("ResizeObserver loop completed") ||
      errorStr.includes("undelivered notifications") ||
      (msg?.message && String(msg.message).includes("ResizeObserver"))
    );
  };

  console.error = (...args: any[]) => {
    if (isResizeObserverError(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args: any[]) => {
    if (isResizeObserverError(args[0])) {
      return;
    }
    originalWarn.call(console, ...args);
  };

  window.addEventListener("error", (event: ErrorEvent) => {
    if (isResizeObserverError(event.error) || isResizeObserverError(event.message)) {
      event.preventDefault();
    }
  });

  window.addEventListener("unhandledrejection", (event: PromiseRejectionEvent) => {
    if (isResizeObserverError(event.reason)) {
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
