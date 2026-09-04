"use client";

import { FormEvent, useState } from "react";
import { Bot, Send, User } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "Which approvals do I need?",
  "What documents are required?",
  "What is pending?",
  "What should I do next?",
];

export default function AssistantPage() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I can help you understand your project approvals, required documents, deadlines, compliance requirements and next steps.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async (message: string) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) return;

    const userMessage: Message = {
      role: "user",
      content: trimmedMessage,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.response,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't connect to the AI service. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    sendMessage(input);
  };

  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-[var(--primary)]">
          SANGAM AI
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
          AI Assistant
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Get help understanding approvals, documents, compliance and
          project requirements.
        </p>
      </div>

      {/* Chat */}
      <section className="flex min-h-[600px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Chat header */}
        <div className="flex items-center gap-3 border-b border-slate-100 p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)] text-white">
            <Bot className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-950">
              SANGAM Assistant
            </p>

            <p className="text-xs text-emerald-600">
              {loading ? "Thinking..." : "Online"}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          {messages.map((message, index) => {
            const isUser = message.role === "user";

            return (
              <div
                key={index}
                className={`flex gap-3 ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isUser && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[var(--primary)]">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] whitespace-pre-wrap rounded-xl px-4 py-3 text-sm leading-6 ${
                    isUser
                      ? "bg-[var(--primary)] text-white"
                      : "bg-slate-50 text-slate-700"
                  }`}
                >
                  {message.content}
                </div>

                {isUser && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading indicator */}
          {loading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[var(--primary)]">
                <Bot className="h-4 w-4" />
              </div>

              <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className="border-t border-slate-100 px-5 pt-4">
          <p className="mb-2 text-xs font-medium text-slate-400">
            Try asking
          </p>

          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                disabled={loading}
                onClick={() => handleSuggestion(suggestion)}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-slate-100 p-5"
        >
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2 focus-within:border-[var(--primary)] focus-within:bg-white">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={loading}
              placeholder="Ask about your project..."
              className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
            />

            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--primary)] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-2 text-[10px] text-slate-400">
            Powered by Groq AI. Responses are for informational purposes.
          </p>
        </form>
      </section>
    </div>
  );
}