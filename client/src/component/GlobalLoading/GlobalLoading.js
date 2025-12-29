import React from "react";
import { useLoading } from "../../Context/Loading";
import "./GlobalLoading.css";

/**
 * Global Loading Component
 * Displayed at the top layer of the page, covering the entire screen
 * Color scheme matches the e-commerce project style
 * @returns {JSX.Element | null} Global Loading component
 */
const GlobalLoading = () => {
  const { loading, loadingText } = useLoading();

  if (!loading) return null;

  return (
    <div className="global-loading-overlay" role="progressbar" aria-busy="true" aria-label={loadingText}>
      <div className="global-loading-backdrop" />
      <div className="global-loading-content">
        {/* E-commerce style shopping bag animation */}
        <div className="shopping-loader">
          <div className="shopping-bag">
            <div className="bag-handle" />
            <div className="bag-body">
              <div className="bag-shine" />
            </div>
          </div>
          {/* Bouncing dots */}
          <div className="loading-dots">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>
        {/* Tip text */}
        <p className="global-loading-text">{loadingText}</p>
        {/* Progress bar animation */}
        <div className="loading-progress">
          <div className="loading-progress-bar" />
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;
