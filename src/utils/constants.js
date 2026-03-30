export const GEMINI_MODEL = "gemini-1.5-flash";

export const ENHANCE_PROMPT_SYSTEM = `
You are an expert prompt engineer.
Transform the user input into a detailed 50-word image prompt including:
- lighting
- camera angle
- artistic style
`;

export const IMAGE_ANALYSIS_PROMPT = `
Analyze this image and return a detailed description including:
- main objects
- colors
- lighting
- artistic style

Return it as a single image generation prompt.
`;

export const DEFAULT_LOADING_TEXT = "Processing... Please wait";

export const TABS = {
  TEXT: "text",
  IMAGE: "image",
};
