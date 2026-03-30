const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_KEY;
const STABILITY_API_KEY = import.meta.env.VITE_STABILITY_KEY;
const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;

export const getEnhancedPrompt = async (input) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `
You are an expert prompt engineer.

If the user input is not an image description, convert it into a detailed visual scene.

Enhance the prompt with:
- lighting
- camera angle
- artistic style

Generate 3 different improved prompts.

Return output strictly in this format:

Considering your prompt, I have improved it into 3 types of prompts. Please select the best one.

Prompt-A: <short explanation (1 line) >

<enhanced prompt>

Prompt-B: <short explanation (1 line)>

<enhanced prompt>

Prompt-C: <short explanation (1 line)>

<enhanced prompt>

User input: ${input}
`,
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await response.json();
    console.log("Enhanced Prompt Response:", data);
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || input;
  } catch (error) {
    return input;
  }
};

export const analyzeImage = async (base64Image) => {
  try {
    const cleanedBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Analyze this image and generate a detailed prompt describing subject, colors, lighting, background, and style for AI image generation.",
                },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: cleanedBase64,
                  },
                },
              ],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      console.log("Gemini API Error:", error);
      return "";
    }

    const data = await response.json();

    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } catch (error) {
    console.log("Analyze Image Error:", error);
    return "";
  }
};

export const generateImage = async (prompt) => {
  try {
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("output_format", "png");

    const response = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/sd3",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${STABILITY_API_KEY}`,
          Accept: "image/*",
        },
        body: formData,
      },
    );
    // console.log("Generate Image Response:", response);
    if (!response.ok) {
      const error = await response.json();
      console.log("Error:", error);
      return null;
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  } catch (error) {
    console.log(error);
    return null;
  }
};
