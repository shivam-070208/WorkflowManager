"use client";
import React from "react";

interface ErrorViewProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorView = ({ error, resetErrorBoundary }: ErrorViewProps) => {

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <h2>Something went wrong.</h2>
      <pre className="text-red-500 whitespace-pre-wrap">
      {error?.message}
      </pre>
      <button
        type="button"
        onClick={() => {
          resetErrorBoundary();
        }}
        className="mt-2 px-0.5 py-1 bg-amber-400 text-white"
       >
        Try Again
      </button>
    </div>
  );
};

export default ErrorView;
