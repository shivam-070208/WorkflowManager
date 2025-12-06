import React from "react";

const Error = ({
  children,
  enabled,
}: {
  children: React.ReactNode;
  enabled: boolean;
}) => {
  if (!enabled) return null;
  return (
    <p className="w-full text-xs font-semibold text-red-500 transition-all">
      {children}
    </p>
  );
};

export { Error };
