import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("summarize");

  const handleAction = async () => {
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
      if (action === "summarize" && data.summary) result = data.summary;
      if (action === "rewrite" && data.rewritten) result = data.rewritten;
      if (action === "correct" && data.corrected) result = data.corrected;
      if (action === "expand" && data.expanded) result = data.expanded;

      setOutput(result);
    } catch (err) {
      setOutput("Error connecting to server.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-blue-700 drop-shadow-md">
        ✨ AI Text Helper
      </h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full max-w-2xl p-4 border rounded-2xl shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 bg-white"
        rows={6}
        placeholder="Type or paste your text here..."
      />

      <div className="flex items-center gap-4 mt-4">
        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="px-4 py-3 rounded-2xl shadow border focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        >
          <option value="summarize">Summarize</option>
          <option value="rewrite">Rewrite</option>
          <option value="correct">Correct</option>
          <option value="expand">Expand</option>
        </select>

        <button
          onClick={handleAction}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-2xl shadow hover:bg-blue-700 transition"
        >
          {loading ? "Working..." : "Run"}
        </button>
      </div>

      {output && (
        <div className="mt-6 w-full max-w-2xl p-4 bg-white rounded-2xl shadow-lg border">
          <h2 className="font-semibold mb-2 text-lg text-gray-700">Result:</h2>
          <p className="whitespace-pre-wrap text-gray-800">{output}</p>
        </div>
      )}
    </div>
  );
}

export default App;
