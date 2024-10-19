const axios = require('axios');

// Replace with your Langfuse API keys and endpoint
const LANGFUSE_SECRET_KEY = 'sk-lf-e05d67c8-7c9c-4696-b1e2-1a518afbda2a';
const LANGFUSE_PUBLIC_KEY = 'pk-lf-11c1802e-f469-44e8-8895-aec6c52fb47d';
const LANGFUSE_ENDPOINT = 'https://cloud.langfuse.com/api/public/v2/prompts';

// Function to fetch a prompt from Langfuse
async function fetchPrompt(promptName, version = null, label = null) {
    try {
      const response = await axios.get(
        `${LANGFUSE_ENDPOINT}/${promptName}`,
        {
          auth: {
            username: LANGFUSE_PUBLIC_KEY,
            password: LANGFUSE_SECRET_KEY
          },
          params: {
            version: version,
            label: label
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Prompt fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching prompt:', error.response ? error.response.data : error.message);
      return null;
    }
  }

// Function to create a new prompt version
async function createPromptVersion(promptData) {
  try {
    const response = await axios.post(
      LANGFUSE_ENDPOINT,
      promptData,
      {
        auth: {
          username: LANGFUSE_PUBLIC_KEY,
          password: LANGFUSE_SECRET_KEY
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Prompt version created successfully:', response.data);
  } catch (error) {
    console.error('Error creating prompt version:', error.response ? error.response.data : error.message);
  }
}

// Example usage for creating a ChatPrompt
const chatPromptData = {
  type: 'chat',
  name: 'example-chat-prompt',
  prompt: [
    {
      role: 'system',
      content: 'You are a helpful assistant.'
    },
    {
      role: 'user',
      content: 'What is the weather like today?'
    }
  ],
  config: {},
  labels: ['example', 'chat'],
  tags: ['weather', 'assistant']
};

// Example usage for creating a TextPrompt
const textPromptData = {
  type: 'text',
  name: 'Sending_Prompt_From_Copilot_To_Langfuse',
  prompt: "I am giving you a prompt 'who is the father of economy?'now above prompt should be automatically capture and send to to langfuse. above is just an example i will 100s of prompts or more those all should be send to langfuse.",
  config: {},
  labels: ['example', 'text'],
  tags: ['weather', 'assistant']
};

// Uncomment one of the following lines to create a prompt version
// createPromptVersion(chatPromptData);
createPromptVersion(textPromptData);
fetchPrompt('PositiveAndNegativeLoginTestCases', 1); // Fetch version 1 of the prompt