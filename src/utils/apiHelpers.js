const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_KEY;
const STABILITY_API_KEY = import.meta.env.VITE_STABILITY_KEY;

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
                  text: `Generate 3 enhanced prompts... User input: ${input}`,
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data?.error?.message || "Failed to enhance prompt",
      };
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return {
      success: true,
      data: text,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Network error. Please try again.",
    };
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
                { text: "Analyze image and generate prompt" },
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

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data?.error?.message || "Image analysis failed",
      };
    }

    return {
      success: true,
      data: data?.candidates?.[0]?.content?.parts?.[0]?.text || "",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Network error while analyzing image",
    };
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

    if (!response.ok) {
      let errorMessage = "Image generation failed";

      if (response.status === 402) {
        errorMessage =
          "Payment required. Please check your Stability API plan.";
      } else if (response.status === 401) {
        errorMessage = "Invalid Stability API key.";
      }

      return {
        success: false,
        error: errorMessage,
      };
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    return {
      success: true,
      data: imageUrl,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Network error while generating image",
    };
  }
};
