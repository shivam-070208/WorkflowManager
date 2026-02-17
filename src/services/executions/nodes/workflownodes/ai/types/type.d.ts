type AIProviderType = "openai" | "google" | "anthropic";

type AINodeDataTypes = {
  provider: AIProviderType;
  apiKey: string;
  model: string;
  prompt: string;
  variable: string;
  workflowId: string;
  temperature?: number;
  maxTokens?: number;
};
