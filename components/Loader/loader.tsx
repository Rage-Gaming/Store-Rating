import React from "react";

type LoaderProps = {
  show: boolean;
  color?: string;
  text?: string;
  size?: number; // diameter in px
};

const Loader: React.FC<LoaderProps> = ({ show, color = "#3b82f6", text, size = 60 }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
      <div className="flex flex-col items-center">
        {/* Background Circle */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: size, height: size }}
        >
          <div
            className="absolute rounded-full border-4 opacity-20"
            style={{ borderColor: color, width: size, height: size }}
          />
          {/* Spinning Border */}
          <div
            className="animate-spin rounded-full border-4 border-t-transparent"
            style={{
              borderColor: color,
              borderTopColor: "transparent",
              width: size,
              height: size,
            }}
          />
        </div>

        {text && <p className="mt-4 text-white text-lg font-medium">{text}</p>}
      </div>
    </div>
  );
};

export default Loader;
