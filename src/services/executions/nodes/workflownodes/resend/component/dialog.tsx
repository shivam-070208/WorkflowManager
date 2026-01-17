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
import { DialogProps } from "@/services/executions/types/dialog-props";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNodeId, useReactFlow } from "@xyflow/react";
import { useForm } from "react-hook-form";
import { useWorkflowId } from "@/services/executions/hooks/use-editor";
import { toast } from "sonner";
import z from "zod";

const WebhookFormSchema = z.object({
  url: z.string().min(1, "URL is required"),
  variable: z.string().min(1, "Variable is required"),
  secret: z.string().optional().or(z.literal("")),
  headers: z.string().optional(),
});

const ResendDialog = ({
  open,
  onOpenChange,
  data,
}: Readonly<DialogProps<Record<string, string>>>) => {
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

  const handleSubmit = (values: Record<string, string>) => {
    if (!nodeId) return;
    updateNodeData(nodeId, { ...values });
    toast.success("Webhook updated. Click save.");
    onOpenChange(false);
  };
  return (
    <DialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="Resend Node"
      description="Add your api key and configure resend mail configuration"
    >
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        ></form>
      </Form>
    </DialogLayout>
  );
};

export default ResendDialog;
