"use client";
import React from "react";
import { Button } from "../ui/button";

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
      <Button
        type="button"
        variant="destructive"
        className="w-fit"
        onClick={() => {
          resetErrorBoundary();
        }}
       >
        Try Again
      </Button>
    </div>
  );
};

export default ErrorView;
