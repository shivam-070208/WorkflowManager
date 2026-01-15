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
import { Input, LabelInputContainer } from "@/components/ui/input";
import { DialogProps } from "@/services/executions/types/dialog-props";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNodeId, useReactFlow } from "@xyflow/react";
import { useForm } from "react-hook-form";
import { useWorkflowId } from "@/services/executions/hooks/use-editor";
import { toast } from "sonner";
import z from "zod";
import { pathToUrlString } from "../lib/utils";

const WebhookFormSchema = z.object({
  url: z.string().min(1, "URL is required"),
  variable: z.string().min(1, "Variable is required"),
  secret: z.string().optional().or(z.literal("")),
  headers: z.string().optional(),
});

const WebHookDialog = ({
  open,
  onOpenChange,
  data,
}: Readonly<DialogProps<WebHookNodeDataTypes>>) => {
  const nodeId = useNodeId();
  const { updateNodeData } = useReactFlow();
  const workflowId = useWorkflowId();
  const form = useForm<z.infer<typeof WebhookFormSchema>>({
    defaultValues: {
      url: data?.url || "",
      variable: data?.variable || "",
      secret: data?.secret || "",
      headers: data?.headers || "",
    },
    resolver: zodResolver(WebhookFormSchema),
  });

  const handleSubmit = (values: Omit<WebHookNodeDataTypes, "workflowId">) => {
    if (!nodeId) return;
    updateNodeData(nodeId, { ...values });
    toast.success("Webhook updated. Click save.");
    onOpenChange(false);
  };
  const handleCopy = async (url: string) => {
    if (typeof window !== "undefined" && url) {
      try {
        await window.navigator.clipboard.writeText(url);
        toast.success("Webhook URL copied!");
      } catch {
        toast.error("Failed to copy URL");
      }
    }
  };

  return (
    <DialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="Webhook Trigger"
      description="Configure the webhook trigger node. An HTTP POST request to the specified URL will trigger the workflow. You may optionally add a secret and custom request headers."
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            name="url"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Webhook Path</FormLabel>
                <FormControl>
                  <Input
                    placeholder="path_of_url"
                    required
                    onChange={(e) => {
                      const rawValue = e.target.value;
                      const urlString = pathToUrlString(
                        `${workflowId}/${rawValue.replace(/^\/+/, "")}`,
                      );
                      field.onChange(urlString);
                      form.setValue("url", urlString, { shouldValidate: true });
                    }}
                  />
                </FormControl>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-muted-foreground text-sm break-all">
                    {form.getValues("url")}
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => handleCopy(form.getValues("url"))}
                    variant="outline"
                  >
                    Copy
                  </Button>
                </div>
                <FormDescription>
                  Write your path a request were made to url with path , which
                  can be coppied from copy button
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
                <FormLabel>Variable</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="webhookData" />
                </FormControl>
                <FormDescription>
                  The variable to store webhook request data.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="secret"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Webhook Secret (optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="my_super_secret"
                    type="password"
                    autoComplete="off"
                  />
                </FormControl>
                <FormDescription>
                  If set, requests must contain this secret in the{" "}
                  <code>x-webhook-secret</code> header.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="headers"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Webhook Header (optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="my_super_secret"
                    type="password"
                    autoComplete="off"
                  />
                </FormControl>
                <FormDescription>
                  If set, secret expected to come with this header, with request
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            variant="default"
            className="w-full"
          >
            Save
          </Button>
        </form>
      </Form>
    </DialogLayout>
  );
};

export default WebHookDialog;
