"use client";
import React from "react";

interface ErrorViewProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorView = ({ error, resetErrorBoundary }: ErrorViewProps) => {


  return (
    <div>
      <h2>Something went wrong.</h2>
      <pre style={{ color: "red", whiteSpace: "pre-wrap" }}>{error?.message}</pre>
      <button
        type="button"
        onClick={() => {
          resetErrorBoundary();
        }}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#f87171",
          color: "white",
          border: "none",
          borderRadius: "0.25rem",
          cursor: "pointer",
        }}
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorView;