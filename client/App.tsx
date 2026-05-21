import "./global.css";
import { QueryClient } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { createRoot, hydrateRoot } from "react-dom/client";
import AppRoot from "./app/AppRoot";
import AppRouterShell from "./app/AppRouterShell";
import { getActivePreloadedState, initializeBrowserPreloadedState } from "./lib/preloadState";

// Suppress ResizeObserver loop error from Radix UI components
// This is a non-critical warning that occurs with rapid layout changes and fixed positioning
// Set up suppression immediately to catch errors early
if (typeof window !== "undefined") {
  // Helper to detect ResizeObserver errors
  const isResizeObserverError = (msg: any): boolean => {
    if (!msg) return false;
    const msgStr = String(msg);
    return msgStr.includes("ResizeObserver loop completed") || msgStr.includes("undelivered notifications");
  };

  // Intercept console methods
  const originalError = console.error;
  const originalWarn = console.warn;

  console.error = (...args: any[]) => {
    if (!isResizeObserverError(args[0])) {
      originalError.call(console, ...args);
    }
  };

  console.warn = (...args: any[]) => {
    if (!isResizeObserverError(args[0])) {
      originalWarn.call(console, ...args);
    }
  };

  // Intercept uncaught errors
  window.addEventListener("error", (event: ErrorEvent) => {
    if (isResizeObserverError(event.message) || isResizeObserverError(event.error?.toString())) {
      event.preventDefault();
    }
  }, true); // Use capture phase to intercept early

  // Intercept unhandled promise rejections
  window.addEventListener("unhandledrejection", (event: PromiseRejectionEvent) => {
    if (isResizeObserverError(event.reason?.toString())) {
      event.preventDefault();
    }
  }, true); // Use capture phase to intercept early
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
