import { useState } from "react";
import "./index.css";
import { getEnhancedPrompt, generateImage } from "../../utils/apiHelpers";
import ImageCard from "../ImageCard";

const WorkflowText = () => {
  const [input, setInput] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEnhance = async () => {
    setLoading(true);
    setErrorMessage("");

    const res = await getEnhancedPrompt(input);
    if (!res.success) {
      const error = res.error.split(".")[0] || res.error;
      setErrorMessage(error);
      setLoading(false);
      return;
    }

    setEnhancedPrompt(res.data);
    setLoading(false);
  };

  const handleGenerateImage = async () => {
    setLoading(true);
    setErrorMessage("");

    const res = await generateImage(enhancedPrompt);

    if (!res.success) {
      const error = res.error.split(".")[0] || res.error;
      setErrorMessage(error);
      setLoading(false);
      return;
    }

    setImage(res.data);
    setLoading(false);
  };

  return (
    <div className="container">
      <textarea
        placeholder="Enter prompt..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleEnhance}>Enhance Prompt</button>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {enhancedPrompt && (
        <>
          <textarea
            value={enhancedPrompt}
            onChange={(e) => setEnhancedPrompt(e.target.value)}
          />
          <button onClick={handleGenerateImage}>Generate </button>
        </>
      )}

      {loading && <p>Loading...</p>}

      <ImageCard image={image} />
    </div>
  );
};

export default WorkflowText;
