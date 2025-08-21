import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAction = async (action: string) => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch(`https://aiword-1.onrender.com/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = await res.json();

      let result = "Something went wrong 😢";

      if (action === "summarize" && data.summary) {
        result = data.summary;
      }

      if (action === "rewrite" && data.rewritten) {
        result = data.rewritten;
      }

      if (action === "correct" && data.corrected) {
        result = data.corrected;
      }

      if (action === "expand" && data.expanded) {
        result = data.expanded;
      }

      setOutput(result);
    } catch (err) {
      setOutput("Error connecting to server.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">AI Text Helper</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full max-w-2xl p-4 border rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={6}
        placeholder="Type or paste your text here..."
      />

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          onClick={() => handleAction("summarize")}
          disabled={loading}
          className="px-5 py-3 bg-green-600 text-white rounded-2xl shadow hover:bg-green-700 transition"
        >
          {loading ? "Working..." : "Summarize"}
        </button>

        <button
          onClick={() => handleAction("rewrite")}
          disabled={loading}
          className="px-5 py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition"
        >
          {loading ? "Working..." : "Rewrite"}
        </button>

        <button
          onClick={() => handleAction("correct")}
          disabled={loading}
          className="px-5 py-3 bg-purple-600 text-white rounded-2xl shadow hover:bg-purple-700 transition"
        >
          {loading ? "Working..." : "Correct"}
        </button>

        <button
          onClick={() => handleAction("expand")}
          disabled={loading}
          className="px-5 py-3 bg-orange-600 text-white rounded-2xl shadow hover:bg-orange-700 transition"
        >
          {loading ? "Working..." : "Expand"}
        </button>
      </div>

      {output && (
        <div className="mt-6 w-full max-w-2xl p-4 bg-white rounded-2xl shadow-md">
          <h2 className="font-semibold mb-2">Result:</h2>
          <p className="whitespace-pre-wrap">{output}</p>
        </div>
      )}
    </div>
  );
}

export default App;
