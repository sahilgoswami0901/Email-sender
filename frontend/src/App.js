
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function App() {
  const [recipient, setRecipient] = useState("");
  const [prompt, setPrompt] = useState("");
  const [emailText, setEmailText] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("http://localhost:5000/api/generate-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipient, prompt })
    });
    const data = await res.json();
    setEmailText(data.email);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Email Generator</h1>
      <input
        type="text"
        placeholder="Recipient Name"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        style={{ width: "300px", marginBottom: "10px" }}
      />
      <br />
      <input
        type="text"
        placeholder="Prompt / Topic"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "300px", marginBottom: "10px" }}
      />
      <br />
      <button onClick={handleGenerate}>Generate Email</button>
      <div style={{ marginTop: "20px" }}>
        <ReactQuill value={emailText} onChange={setEmailText} />
      </div>
    </div>
  );
}

export default App;
