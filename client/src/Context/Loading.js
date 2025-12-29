import { useState, useContext, createContext, useCallback } from "react";

/**
 * Loading Context
 * Used for managing global loading state
 */
const LoadingContext = createContext();

/**
 * Loading Provider Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Loading Provider component
 */
const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");

  /**
   * Show global loading indicator
   * @param {string} [text="Loading..."] - Loading tip text
   */
  const showLoading = useCallback((text = "Loading...") => {
    setLoadingText(text);
    setLoading(true);
  }, []);

  /**
   * Hide global loading indicator
   */
  const hideLoading = useCallback(() => {
    setLoading(false);
    setLoadingText("Loading...");
  }, []);

  /**
   * Wrap async function with automatic show/hide loading
   * @param {Function} asyncFn - Async function to wrap
   * @param {string} [text="Loading..."] - Loading tip text
   * @returns {Promise<any>} Return value of the async function
   */
  const withLoading = useCallback(
    async (asyncFn, text = "Loading...") => {
      try {
        showLoading(text);
        return await asyncFn();
      } finally {
        hideLoading();
      }
    },
    [showLoading, hideLoading]
  );

  return (
    <LoadingContext.Provider
      value={{
        loading,
        loadingText,
        showLoading,
        hideLoading,
        withLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

/**
 * useLoading hook
 * @returns {Object} loading context value
 */
const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export { useLoading, LoadingProvider };
