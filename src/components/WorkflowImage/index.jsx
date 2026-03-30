import { useState } from "react";
import "./index.css";
import { analyzeImage, generateImage } from "../../utils/apiHelpers";
import ImageCard from "../ImageCard";

const WorkflowImage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];
      setImageFile(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyzeImage = async () => {
    setLoading(true);
    setErrorMessage("");

    const res = await analyzeImage(imageFile);

    if (!res.success) {
      const error = res.error.split(".")[0] || res.error;
      setErrorMessage(error);
      setLoading(false);
      return;
    }

    setPrompt(res.data);
    setLoading(false);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setErrorMessage("");

    const res = await generateImage(prompt);

    if (!res.success) {
      const error = res.error.split(".")[0] || res.error;
      setErrorMessage(error);
      setLoading(false);
      return;
    }

    setResultImage(res.data);
    setLoading(false);
  };

  return (
    <div className="container">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      <button onClick={handleAnalyzeImage}>Analyze Image</button>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {prompt && (
        <>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button onClick={handleGenerate}>Generate Variation</button>
        </>
      )}

      {loading && <p>Loading...</p>}

      <ImageCard image={resultImage} />
    </div>
  );
};

export default WorkflowImage;
