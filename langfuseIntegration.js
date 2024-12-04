import { Langfuse } from "langfuse";

const langfuse = new Langfuse({
  secretKey: "sk-lf-e05d67c8-7c9c-4696-b1e2-1a518afbda2a",
  publicKey: "pk-lf-11c1802e-f469-44e8-8895-aec6c52fb47d",
  baseUrl: "https://cloud.langfuse.com"
});

export async function logPrompt(prompt) {
  try {
    const response = await langfuse.log({
      prompt: prompt,
      timestamp: new Date().toISOString()
    });
    console.log('Prompt logged successfully:', response);
  } catch (error) {
    console.error('Error logging prompt:', error);
  }
}