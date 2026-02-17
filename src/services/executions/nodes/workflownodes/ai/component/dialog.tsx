"use client";

import DialogLayout from "@/components/common/dialog-layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogProps } from "@/services/executions/types/dialog-props";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNodeId, useReactFlow } from "@xyflow/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const AIFormSchema = z.object({
  provider: z.enum(["openai", "google", "anthropic"]),
  apiKey: z.string().min(1, "API key is required"),
  model: z.string().min(1, "Model is required"),
  prompt: z.string().min(1, "Prompt is required"),
  variable: z.string().min(1, "Variable is required"),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().min(1).optional(),
});

type AIFormValues = z.infer<typeof AIFormSchema>;

const MODELS: Record<AIProviderType, string[]> = {
  openai: ["gpt-4", "gpt-4-turbo", "gpt-4o", "gpt-4o-mini", "gpt-3.5-turbo"],
  google: [
    "gemini-2.0-flash",
    "gemini-3-pro-preview",
    "gemini-2.0-flash-exp",
    "gemini-1.5-pro",
    "gemini-1.5-flash",
    "gemini-pro",
  ],
  anthropic: [
    "claude-3-5-sonnet-20241022",
    "claude-3-5-haiku-20241022",
    "claude-3-opus-20250219",
    "claude-3-sonnet-20240229",
    "claude-3-haiku-20240307",
  ],
};

const formInput = {
  provider: {
    label: "AI Provider",
    description: "Select which AI provider you want to use",
  },
  apiKey: {
    label: "API Key",
    placeholder: "Paste your API key here",
    description: "Keep your API key secure. It will be masked in the display.",
  },
  model: {
    label: "Model",
    placeholder: "Select a model",
    description: "Choose the specific model from the selected provider",
  },
  prompt: {
    label: "Prompt",
    placeholder: "Enter your prompt here...",
    description: "The prompt or message to send to the AI model",
  },
  variable: {
    label: "Variable",
    placeholder: "responseVar",
    description: "The variable in which to store the response",
  },
  temperature: {
    label: "Temperature",
    placeholder: "0.7",
    description:
      "Controls randomness (0-2). Lower = deterministic, Higher = creative",
  },
  maxTokens: {
    label: "Max Tokens",
    placeholder: "500",
    description: "Maximum number of tokens in the response",
  },
};

const AIDialog = ({
  open,
  onOpenChange,
  data,
}: Readonly<DialogProps<AINodeDataTypes>>) => {
  const nodeId = useNodeId();
  const { updateNodeData } = useReactFlow();
  const [selectedProvider, setSelectedProvider] = useState<AIProviderType>(
    (data?.provider as AIProviderType) || "openai",
  );

  const form = useForm<AIFormValues>({
    defaultValues: {
      provider: (data?.provider as AIProviderType) || "openai",
      apiKey: data?.apiKey || "",
      model: data?.model || "",
      prompt: data?.prompt || "",
      variable: data?.variable || "",
      temperature: data?.temperature ?? 0.7,
      maxTokens: data?.maxTokens ?? 500,
    },
    resolver: zodResolver(AIFormSchema),
  });

  const availableModels = MODELS[selectedProvider];

  const handleProviderChange = (value: string) => {
    setSelectedProvider(value as AIProviderType);
    form.setValue("provider", value as AIProviderType);
    form.setValue("model", "");
  };

  const handleSubmit = (values: AIFormValues) => {
    if (!nodeId) return;
    updateNodeData(nodeId, { ...values });
    toast.success("AI Node updated. Click save.");
    onOpenChange(false);
  };

  return (
    <DialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="AI Node"
      description="Configure your AI node with API credentials and model settings"
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            name="provider"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formInput.provider.label}</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={handleProviderChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a provider" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="openai">ChatGPT (OpenAI)</SelectItem>
                    <SelectItem value="google">Google AI</SelectItem>
                    <SelectItem value="anthropic">
                      Claude (Anthropic)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  {formInput.provider.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="apiKey"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formInput.apiKey.label}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={formInput.apiKey.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {formInput.apiKey.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="model"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formInput.model.label}</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={formInput.model.placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableModels.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>{formInput.model.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="prompt"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formInput.prompt.label}</FormLabel>
                <FormControl>
                  <textarea
                    className="min-h-[100px] w-full rounded border p-2"
                    placeholder={formInput.prompt.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {formInput.prompt.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="temperature"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formInput.temperature.label}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step={0.1}
                    min={0}
                    max={2}
                    placeholder={formInput.temperature.placeholder}
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseFloat(e.target.value) : undefined,
                      )
                    }
                  />
                </FormControl>
                <FormDescription>
                  {formInput.temperature.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="maxTokens"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formInput.maxTokens.label}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    placeholder={formInput.maxTokens.placeholder}
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value
                          ? parseInt(e.target.value, 10)
                          : undefined,
                      )
                    }
                  />
                </FormControl>
                <FormDescription>
                  {formInput.maxTokens.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="variable"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formInput.variable.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={formInput.variable.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {formInput.variable.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </Form>
    </DialogLayout>
  );
};

export default AIDialog;
