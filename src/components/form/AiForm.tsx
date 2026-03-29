"use client";
import React, { useRef, useState } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import toast from "react-hot-toast";

const AiForm = () => {
  const axiosPublic = useAxiosPublic();
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  const promptRef = useRef<HTMLDialogElement | null>(null);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return toast.error("Please enter a question!");

    try {
      setLoading(true);
      const res = await axiosPublic.post("/ai/suggest", { prompt });
      setAnswer(res.data.data);
      e.target.reset();
    } catch (error: any) {
      console.error("AI Assistant Error:", error);
      toast.error("AI Assistant is having trouble right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <button
        className="btn btn-circle btn-primary btn-lg shadow-2xl hover:scale-110 transition-transform flex items-center justify-center p-0"
        onClick={() => promptRef.current?.showModal()}
        title="Ask AI Assistant"
      >
        <span className="text-2xl">✨</span>
      </button>

      <dialog ref={promptRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-2xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden p-0">
          <div className="bg-primary p-6 text-primary-content flex justify-between items-center">
            <div>
              <h3 className="font-black text-2xl uppercase tracking-widest">
                AI Q&A Assistant
              </h3>
              <p className="text-xs opacity-70">Powered by Gemini AI</p>
            </div>
            <form method="dialog">
              <button className="btn btn-circle btn-sm btn-ghost hover:bg-white/20">
                ✕
              </button>
            </form>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-gray-600">
                    Enter your question:
                  </span>
                </label>
                <div className="join w-full shadow-lg rounded-2xl overflow-hidden border border-gray-100">
                  <input
                    type="text"
                    placeholder="e.g. Tell me about events near Dhaka?"
                    className="input input-bordered join-item w-full transition-all font-medium"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={loading}
                    autoFocus
                  />
                  <button
                    disabled={loading}
                    className="btn btn-primary join-item px-8 font-black tracking-widest"
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "ASK"
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {answer ? (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="text-xs font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                    <span className="bg-primary/10 p-1.5 rounded-lg">🤖</span>
                    AI Assistant Answer:
                  </div>
                  <div className="p-6 bg-gray-50 border border-gray-100 rounded-3xl text-gray-700 leading-relaxed font-medium shadow-inner whitespace-pre-wrap">
                    <div className="space-y-4 w-full h-full">
                      <p>{prompt}</p>
                      <div>
                        <p>{answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                !loading && (
                  <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100/50">
                    <div className="text-5xl mb-4 grayscale filter opacity-30 animate-pulse">
                      🤖
                    </div>
                    <p className="text-sm text-gray-400 font-bold max-w-xs mx-auto tracking-tight">
                      I&apos;m ready! Ask me anything about events, locations,
                      or dates.
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AiForm;
