import { useState } from "react";
import "./index.css";
import { getEnhancedPrompt, generateImage } from "../../utils/apiHelpers";
import ImageCard from "../ImageCard";

const WorkflowText = () => {
  const [input, setInput] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    setLoading(true);
    const result = await getEnhancedPrompt(input);
    setEnhancedPrompt(result);
    setLoading(false);
  };

  const handleGenerateImage = async () => {
    setLoading(true);
    const img = await generateImage(enhancedPrompt);
    setImage(img);
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

      {enhancedPrompt && (
        <>
          <textarea
            value={enhancedPrompt}
            onChange={(e) => setEnhancedPrompt(e.target.value)}
          />
          <button onClick={handleGenerateImage}>Generate Image</button>
        </>
      )}

      {loading && <p>Loading...</p>}

      <ImageCard image={image} />
    </div>
  );
};

export default WorkflowText;
