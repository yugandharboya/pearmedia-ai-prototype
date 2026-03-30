## Project Overview

This project is a web-based AI prototype that enables users to generate images from text and create variations from uploaded images using multiple AI APIs.

The application implements two main workflows:

1. Text-to-Image Workflow
2. Image-to-Variation Workflow

### Features

### 1. Text Workflow

- User enters a simple text prompt
- AI enhances the prompt into 3 improved versions
- User selects/edits the best prompt
- Final image is generated

### 2. Image Workflow

- User uploads an image
- AI analyzes the image (subject, colors, lighting, style)
- Generates a new prompt
- Creates image variations

### APIs Used

### 1. Google Gemini (Text + Vision)

- Model: gemini-2.5-flash
- Used for:
  - Prompt enhancement
  - Image analysis

### 2. Stability AI

- Model: SD3 (Stable Diffusion 3)
- Used for:
  - Image generation

### Tech Stack

- Frontend: React (Vite)
- Styling: CSS
- APIs: Gemini, Stability AI
- Hosting: Vercel

### Project Structure (src)

src/
├── assets/
├── components/
│ ├── ImageCard/
│ │ ├── index.jsx
│ │ └── index.css
│ ├── Navbar/
│ │ ├── index.jsx
│ │ └── index.css
│ ├── WorkflowImage/
│ │ ├── index.jsx
│ │ └── index.css
│ ├── WorkflowText/
│ │ ├── index.jsx
│ │ └── index.css
├── utils/
│ ├── apiHelpers.js
│
├── App.jsx
├── App.css
├── main.jsx
└── index.css
