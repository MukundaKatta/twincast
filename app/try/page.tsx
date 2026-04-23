"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Stage = "input" | "rendering" | "done";

export default function TryPage() {
  const [selfieUrl, setSelfieUrl] = useState<string | null>(null);
  const [script, setScript] = useState("");
  const [stage, setStage] = useState<Stage>("input");
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSelfieUrl(url);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selfieUrl || !script.trim()) return;
    setStage("rendering");
    setProgress(0);
  }

  useEffect(() => {
    if (stage !== "rendering") return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStage("done");
          return 100;
        }
        return p + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [stage]);

  function handleReset() {
    setSelfieUrl(null);
    setScript("");
    setStage("input");
    setProgress(0);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-purple-500" />
          TwinCast
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-600">
            Try it out
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Upload a selfie. Paste a script. See the magic.
          </h1>
        </div>

        {stage === "input" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <label className="block text-sm font-semibold text-neutral-900 mb-3">
                Your selfie
              </label>
              <div
                onClick={() => fileRef.current?.click()}
                className="relative flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50 transition hover:border-purple-400 hover:bg-purple-50 overflow-hidden"
                style={{ height: selfieUrl ? "auto" : "200px" }}
              >
                {selfieUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selfieUrl}
                    alt="Your selfie"
                    className="max-h-64 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <p className="text-3xl mb-2">{"\u{1F4F7}"}</p>
                    <p className="text-sm text-neutral-500">Click to upload a photo</p>
                    <p className="text-xs text-neutral-400 mt-1">JPG, PNG, or WebP</p>
                  </div>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <label htmlFor="script" className="block text-sm font-semibold text-neutral-900 mb-3">
                Your script
              </label>
              <textarea
                id="script"
                rows={5}
                placeholder="Type or paste the script you want your clone to speak..."
                value={script}
                onChange={(e) => setScript(e.target.value)}
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm leading-relaxed placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={!selfieUrl || !script.trim()}
              className="w-full rounded-full bg-purple-600 px-7 py-3.5 font-medium text-white transition hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Generate video
            </button>
          </form>
        )}

        {(stage === "rendering" || stage === "done") && (
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            {/* Still frame: selfie with caption overlay */}
            <div className="relative rounded-2xl overflow-hidden bg-neutral-900">
              {selfieUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selfieUrl}
                  alt="Video preview"
                  className="w-full max-h-80 object-cover opacity-80"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white text-sm leading-relaxed line-clamp-3">
                  {script}
                </p>
              </div>
              {stage === "rendering" && (
                <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                  <span className="text-xs font-medium text-white">Rendering...</span>
                </div>
              )}
              {stage === "done" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-white/90 p-4">
                    <svg className="h-10 w-10 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs font-medium mb-2">
                <span className="text-neutral-600">
                  {stage === "done" ? "Video ready" : "Rendering your clone..."}
                </span>
                <span className="text-purple-600">{progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-purple-500 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {stage === "done" && (
              <div className="mt-6 space-y-3">
                <p className="text-sm text-neutral-600 text-center">
                  This is a v0 preview. In the full product your clone would speak this script in
                  any language, lip-synced to your face.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    onClick={handleReset}
                    className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
                  >
                    Try another
                  </button>
                  <Link
                    href="/#waitlist"
                    className="rounded-full border border-neutral-300 px-7 py-3.5 font-medium text-neutral-900 transition hover:border-neutral-900 text-center"
                  >
                    Get early access
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-neutral-400">
          This is a v0 mock — no real video is generated.{" "}
          <Link href="/#waitlist" className="underline hover:text-neutral-600">
            Join the waitlist
          </Link>{" "}
          for the real thing.
        </p>
      </div>
    </div>
  );
}
