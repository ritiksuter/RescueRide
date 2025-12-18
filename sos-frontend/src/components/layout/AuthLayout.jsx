import React from "react";

export const AuthLayout = ({ children, title = "Welcome back" }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md rounded-xl bg-white/95 p-6 shadow-2xl">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-md">
            SOS
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-900">
              {title}
            </h1>
            <p className="text-xs text-gray-500">
              Sign in to access roadside assistance quickly.
            </p>
          </div>
        </div>
        {children}
        <p className="mt-4 text-center text-[11px] text-gray-400">
          Powered by SOS Microservices Stack
        </p>
      </div>
    </div>
  );
};
