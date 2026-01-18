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
import { toast } from "sonner";
import z from "zod";

const ResendFormSchema = z.object({
  api_key: z.string().min(1, "API key is required"),
  from: z.string().min(1, "Sender address is required"),
  to: z.string().email("Recipient email is invalid"),
  subject: z.string().min(1, "Subject of email is required"),
  title: z.string(),
  description: z.string().optional(),
  content: z.string().optional(),
  variable: z.string().min(1, "Variable is required"),
});

const formInput = {
  api_key: {
    type: "text",
    label: "API Key",
    placeholder: "Paste your Resend API key here",
    description: "You can find your API key in your Resend dashboard.",
  },
  from: {
    type: "text",
    label: "Sender Email",
    placeholder: "sender@email.com",
    description: "The email address that will appear as the sender.",
  },
  to: {
    type: "text",
    label: "Recipient Email",
    placeholder: "recipient@email.com",
    description: "The main recipient's email address.",
  },
  subject: {
    type: "text",
    label: "Subject",
    placeholder: "Email Subject",
    description: "Enter the subject for the email.",
  },
  title: {
    type: "text",
    label: "Title",
    placeholder: "Email Title (optional)",
    description: "The visible header/title of the email (optional).",
  },
  description: {
    type: "text",
    label: "Description",
    placeholder: "A short description (optional)",
    description: "A short description or pre-header for your email (optional).",
  },
  content: {
    type: "textarea",
    label: "Content",
    placeholder: "Write your email content here...",
    description: "The body of the email message.",
  },
  variable: {
    type: "text",
    label: "Variable",
    placeholder: "responseVar",
    description: "The variable in which to store the response.",
  },
};

const ResendDialog = ({
  open,
  onOpenChange,
  data,
}: Readonly<DialogProps<ResendNodeDataTypes>>) => {
  const nodeId = useNodeId();
  const { updateNodeData } = useReactFlow();

  const form = useForm<z.infer<typeof ResendFormSchema>>({
    defaultValues: {
      api_key: data?.api_key || "",
      from: data?.from || "",
      to: data?.to || "",
      subject: data?.subject || "",
      title: data?.title || "",
      description: data?.description || "",
      content: data?.content || "",
      variable: data?.variable || "",
    },
    resolver: zodResolver(ResendFormSchema),
  });

  const handleSubmit = (values: Omit<ResendNodeDataTypes, "workflowId">) => {
    if (!nodeId) return;
    updateNodeData(nodeId, { ...values });
    toast.success("Resend Node updated. Click save.");
    onOpenChange(false);
  };

  return (
    <DialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="Resend Node"
      description="Add your API key and configure resend mail configuration"
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            name="api_key"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formInput.api_key.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={formInput.api_key.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {formInput.api_key.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="from"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formInput.from.label}</FormLabel>
                <FormControl>
                  <Input placeholder={formInput.from.placeholder} {...field} />
                </FormControl>
                <FormDescription>{formInput.from.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="to"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formInput.to.label}</FormLabel>
                <FormControl>
                  <Input placeholder={formInput.to.placeholder} {...field} />
                </FormControl>
                <FormDescription>{formInput.to.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="subject"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formInput.subject.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={formInput.subject.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {formInput.subject.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formInput.title.label}</FormLabel>
                <FormControl>
                  <Input placeholder={formInput.title.placeholder} {...field} />
                </FormControl>
                <FormDescription>{formInput.title.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formInput.description.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={formInput.description.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {formInput.description.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formInput.content.label}</FormLabel>
                <FormControl>
                  <textarea
                    className="min-h-[80px] w-full rounded border p-2"
                    placeholder={formInput.content.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {formInput.content.description}
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

export default ResendDialog;
