"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050a15] px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-mcs-orange mb-4">Oops</div>
        <h1 className="text-2xl font-bold text-white mb-4">發生了一些問題</h1>
        <p className="text-gray-400 mb-8">
          頁面載入時遇到錯誤，請嘗試重新載入。如果問題持續，請聯繫我們。
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-mcs-orange text-white rounded-lg font-medium hover:bg-mcs-orange-light transition-colors"
          >
            重新載入
          </button>
          <a
            href="/"
            className="px-6 py-3 border border-white/20 text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
          >
            回首頁
          </a>
        </div>
      </div>
    </div>
  );
}
