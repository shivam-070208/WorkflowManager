import { NonRetriableError } from "inngest";
import { NodeExecutor } from "@/services/executions/types/executor-types";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";

/**
 * Create the AI model instance for the selected provider.
 * API keys are not passed in as model arguments directly.
 * Instead, they should be set on process.env for each SDK to pickup,
 * as AI SDK v3 expects keys in environment variables such as:
 *   - OPENAI_API_KEY
 *   - GOOGLE_API_KEY
 *   - ANTHROPIC_API_KEY
 */
const setApiKeyEnv = (provider: AIProviderType, apiKey: string | undefined) => {
  if (!apiKey) return;
  switch (provider) {
    case "openai":
      process.env.OPENAI_API_KEY = apiKey;
      break;
    case "google":
      process.env.GOOGLE_GENERATIVE_AI_API_KEY = apiKey;
      break;
    case "anthropic":
      process.env.ANTHROPIC_API_KEY = apiKey;
      break;
    default:
      break;
  }
};

// Returns the model instance for the provider, with no apiKey argument.
const getProviderModel = (provider: AIProviderType, model: string) => {
  switch (provider) {
    case "openai":
      return openai(model);
    case "google":
      return google(model);
    case "anthropic":
      return anthropic(model);
    default:
      throw new NonRetriableError(`Unknown AI provider: ${provider}`);
  }
};

export const AINodeExecutor: NodeExecutor<AINodeDataTypes> = async ({
  data,
  context,
  step,
}) => {
  const { provider, apiKey, model, prompt, variable, temperature, maxTokens } =
    data;

  try {
    if (!provider) {
      throw new NonRetriableError("Provider is required for AI node.");
    }
    if (!model) {
      throw new NonRetriableError("Model is required for AI node.");
    }
    if (!prompt) {
      throw new NonRetriableError("Prompt is required for AI node.");
    }
    if (!variable) {
      throw new NonRetriableError(
        "Variable is required to store the response.",
      );
    }
    // Typically, only Google might sometimes allow no apiKey
    if (!apiKey && provider !== "google") {
      throw new NonRetriableError("API key is required for AI node.");
    }

    // Set the API key in the environment (needed by ai-sdk v3)
    setApiKeyEnv(provider, apiKey);

    const aiModel = getProviderModel(provider, model);

    const response = await step.run(
      `Calling ${provider} AI with model ${model}`,
      async () => {
        const result = await generateText({
          model: aiModel,
          prompt,
          temperature: temperature ?? 0.7,
        });
        return result;
      },
    );

    return {
      ...context,
      [variable]: response.text !== undefined ? response.text : response,
    };
  } catch (error) {
    if (error instanceof NonRetriableError) {
      throw error;
    }
    throw new NonRetriableError(
      error instanceof Error
        ? error.message
        : "Unknown error calling AI provider",
    );
  }
};
