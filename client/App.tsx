import "./global.css";
import { QueryClient } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { createRoot, hydrateRoot } from "react-dom/client";
import AppRoot from "./app/AppRoot";
import AppRouterShell from "./app/AppRouterShell";
import { getActivePreloadedState, initializeBrowserPreloadedState } from "./lib/preloadState";

// Redirect Supabase recovery links to the admin reset page.
if (typeof window !== "undefined") {
  const { pathname, hash } = window.location;
  const looksLikeRecoveryFlow =
    hash.includes("access_token=") ||
    hash.includes("refresh_token=") ||
    hash.includes("type=recovery") ||
    hash.includes("error_code=otp_expired") ||
    hash.includes("error=access_denied");

  if (looksLikeRecoveryFlow && !pathname.startsWith("/admin/reset-password")) {
    window.location.replace(`/admin/reset-password/${hash}`);
  }
}

// Suppress ResizeObserver loop error from Radix UI and other components
// This is a non-critical browser warning that occurs with rapid layout changes
// The error is harmless and does not affect functionality
if (typeof window !== "undefined") {
  // Helper to detect ResizeObserver errors - check all arguments
  const isResizeObserverError = (...args: any[]): boolean => {
    return args.some((arg) => {
      const str = String(arg || "");
      return str.includes("ResizeObserver loop completed") || str.includes("undelivered notifications");
    });
  };

  // Intercept console methods
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalLog = console.log;

  console.error = (...args: any[]) => {
    if (!isResizeObserverError(...args)) {
      originalError.apply(console, args);
    }
  };

  console.warn = (...args: any[]) => {
    if (!isResizeObserverError(...args)) {
      originalWarn.apply(console, args);
    }
  };

  // Also suppress if logged via console.log
  console.log = (...args: any[]) => {
    if (!isResizeObserverError(...args)) {
      originalLog.apply(console, args);
    }
  };

  // Intercept uncaught errors
  window.addEventListener(
    "error",
    (event: ErrorEvent) => {
      if (
        isResizeObserverError(event.message, event.error?.toString(), event.error?.message)
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );

  // Intercept unhandled promise rejections
  window.addEventListener(
    "unhandledrejection",
    (event: PromiseRejectionEvent) => {
      if (isResizeObserverError(event.reason?.toString(), event.reason?.message)) {
        event.preventDefault();
      }
    },
    true
  );

  // Override ResizeObserver constructor to catch internal errors
  if (window.ResizeObserver) {
    const OriginalResizeObserver = window.ResizeObserver;
    window.ResizeObserver = class extends OriginalResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        super((entries, observer) => {
          try {
            callback(entries, observer);
          } catch (e) {
            // Silently ignore ResizeObserver loop errors
            if (!String(e || "").includes("ResizeObserver loop completed")) {
              throw e;
            }
          }
        });
      }
    } as any;
  }

  // Suppress via window.onerror handler
  const originalOnError = window.onerror;
  window.onerror = function(message, source, lineno, colno, error) {
    if (String(message || "").includes("ResizeObserver loop completed")) {
      return true; // Suppress
    }
    if (originalOnError) {
      return originalOnError(message, source, lineno, colno, error);
    }
    return false;
  };
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
