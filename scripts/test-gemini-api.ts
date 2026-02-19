#!/usr/bin/env tsx

// Load environment variables
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error('❌ No API key found in environment variables');
  process.exit(1);
}

console.log('🔍 Testing Google Gemini API Key...\n');
console.log(`API Key: ${API_KEY.substring(0, 10)}...${API_KEY.substring(API_KEY.length - 4)}\n`);

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type GeminiModel = {
  name: string;
  supportedGenerationMethods?: string[];
};

type ListModelsResponse = {
  models?: GeminiModel[];
};

type GenerateContentResponse = {
  candidates?: {
    content?: {
      parts?: { text?: string }[];
    };
  }[];
};

type ApiError = {
  error?: { message?: string };
};

/* -------------------------------------------------------------------------- */
/*                              Test 1: List Models                           */
/* -------------------------------------------------------------------------- */

async function listModels(): Promise<GeminiModel[] | null> {
  try {
    console.log('📋 Fetching available models...');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );

    if (!response.ok) {
      const error = (await response.json()) as ApiError;
      console.error('❌ Error:', error.error?.message ?? error);
      return null;
    }

    const data = (await response.json()) as ListModelsResponse;
    console.log('\n✅ Available models:');

    const generateContentModels =
      data.models?.filter((m) => m.supportedGenerationMethods?.includes('generateContent')) ?? [];

    console.log('\nModels supporting generateContent:');
    generateContentModels.forEach((model) => {
      console.log(`  - ${model.name.replace('models/', '')}`);
    });

    return generateContentModels;
  } catch (error) {
    console.error('❌ Error fetching models:', error);
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                       Test 2: Try Generating Content                       */
/* -------------------------------------------------------------------------- */

async function testGeneration(modelName: string): Promise<boolean> {
  try {
    console.log(`\n🧪 Testing generation with ${modelName}...`);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: 'Say "Hello, API is working!" in one sentence.',
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const error = (await response.json()) as ApiError;
      console.error(`❌ Error with ${modelName}:`, error.error?.message ?? error);
      return false;
    }

    const data = (await response.json()) as GenerateContentResponse;
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text) {
      console.log(`✅ ${modelName} is working!`);
      console.log(`   Response: ${text.trim()}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error testing ${modelName}:`, error);
    return false;
  }
}

/* -------------------------------------------------------------------------- */
/*                                  Runner                                    */
/* -------------------------------------------------------------------------- */

async function runTests() {
  const models = await listModels();

  if (models && models.length > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('Testing generation with available models...\n');

    const modelsToTest = models.slice(0, 3);

    for (const model of modelsToTest) {
      const modelName = model.name.replace('models/', '');
      await testGeneration(modelName);
    }

    console.log('\n' + '='.repeat(60));
    console.log('\n✅ API Key Test Complete!');
    console.log('\n💡 Recommendation: Use one of the working models in your code.');
  } else {
    console.log('\n❌ Could not retrieve models. Check your API key.');
  }
}

runTests();
