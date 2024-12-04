const axios = require('axios');
const fs = require('fs');
const xlsx = require('xlsx');

// Replace with your Langfuse API keys and endpoint
const LANGFUSE_SECRET_KEY = 'sk-lf-e05d67c8-7c9c-4696-b1e2-1a518afbda2a';
const LANGFUSE_PUBLIC_KEY = 'pk-lf-11c1802e-f469-44e8-8895-aec6c52fb47d';
const LANGFUSE_ENDPOINT = 'https://cloud.langfuse.com/api/public/v2/prompts';
const PROMPT_FILE_PATH = 'prompt.txt';
const PROMPT_MAPPING_FILE_PATH = 'promptMapping.json';
const PROMPT2_FILE_PATH = 'prompts.json';
const EXCEL_FILE_PATH = 'prompts.xlsx';

// Function to fetch a prompt from Langfuse and append it to prompt.txt
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

    const promptData = response.data;
    const promptIdentifier = `Prompt Name: ${promptName}, Version: ${version}, Label: ${label}`;
    const promptContent = `${promptIdentifier}\n${JSON.stringify(promptData, null, 2)}\n\n`;

    // Append prompt content to prompt.txt
    fs.appendFileSync(PROMPT_FILE_PATH, promptContent, 'utf8');
    console.log('Prompt fetched and appended successfully:', promptIdentifier);

    // Update prompt mapping
    let promptMapping = {};
    if (fs.existsSync(PROMPT_MAPPING_FILE_PATH)) {
      promptMapping = JSON.parse(fs.readFileSync(PROMPT_MAPPING_FILE_PATH, 'utf8'));
    }
    promptMapping[promptName] = promptData.id;
    fs.writeFileSync(PROMPT_MAPPING_FILE_PATH, JSON.stringify(promptMapping, null, 2), 'utf8');
    console.log('Prompt mapping updated successfully:', promptMapping);

  } catch (error) {
    console.error('Error fetching prompt:', error.response ? error.response.data : error.message);
  }
}

// Function to fetch all prompts from Langfuse and save them to prompt2.json and Excel file
async function fetchAllPrompts() {
  try {
    const response = await axios.get(
      LANGFUSE_ENDPOINT,
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

    const allPrompts = response.data.data;
    const detailedPrompts = [];
    let promptCount = 0;

    for (const prompt of allPrompts) {
      const promptName = prompt.name;
      const versions = prompt.versions;

      for (const version of versions) {
        const detailedPrompt = await fetchPromptDetails(promptName, version);
        if (detailedPrompt) {
          detailedPrompts.push(detailedPrompt);
          promptCount++;
        }
      }
    }

    fs.writeFileSync(PROMPT2_FILE_PATH, JSON.stringify(detailedPrompts, null, 2), 'utf8');
    console.log(`All prompts fetched and saved to prompt2.json successfully. Total prompts fetched: ${promptCount}`);

    // Write prompts to Excel file
    writePromptsToExcel(detailedPrompts);
  } catch (error) {
    console.error('Error fetching all prompts:', error.response ? error.response.data : error.message);
  }
}

// Helper function to fetch detailed prompt information
async function fetchPromptDetails(promptName, version) {
  try {
    const response = await axios.get(
      `${LANGFUSE_ENDPOINT}/${promptName}`,
      {
        auth: {
          username: LANGFUSE_PUBLIC_KEY,
          password: LANGFUSE_SECRET_KEY
        },
        params: {
          version: version
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for prompt ${promptName} version ${version}:`, error.response ? error.response.data : error.message);
    return null;
  }
}

/**
 * Fetches prompts from Langfuse based on a specific tag.
 *
 * @param {string} tag - The tag to filter prompts by.
 * @returns {Array} - An array of prompts that match the specified tag.
 */
async function fetchPromptsByTag(tag) {
  try {
    const response = await axios.get(
      LANGFUSE_ENDPOINT,
      {
        auth: {
          username: LANGFUSE_PUBLIC_KEY,
          password: LANGFUSE_SECRET_KEY
        },
        params: {
          tag: tag
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
console.log(response.data.data); 
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching prompts with tag ${tag}:`, error.response ? error.response.data : error.message);
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

// Function to write prompts to an Excel file
function writePromptsToExcel(prompts) {
  const worksheetData = prompts.map(prompt => ({
    ID: prompt.id,
    Name: prompt.name,
    Version: prompt.version,
    Type: prompt.type,
    Prompt: prompt.prompt,
    CreatedAt: prompt.createdAt,
    UpdatedAt: prompt.updatedAt,
    ProjectId: prompt.projectId,
    CreatedBy: prompt.createdBy,
    IsActive: prompt.isActive,
    Config: JSON.stringify(prompt.config),
    Tags: prompt.tags.join(', '),
    Labels: prompt.labels.join(', ')
  }));

  const worksheet = xlsx.utils.json_to_sheet(worksheetData);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Prompts');
  xlsx.writeFile(workbook, EXCEL_FILE_PATH);

  console.log(`Prompts written to ${EXCEL_FILE_PATH} successfully`);
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
// createPromptVersion(textPromptData);

// Fetch version 1 of the prompt and print it in the console
// fetchPrompt('PositiveAndNegativeLoginTestCases', 1);

// Fetch all prompts and save them to prompt2.json and Excel file
fetchAllPrompts();

// fetchPromptsByTag("Pid1")

// fetchPromptDetails("prompt_id_1", 1)