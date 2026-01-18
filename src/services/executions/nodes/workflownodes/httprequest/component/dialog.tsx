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
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const HttRequestFromValues = z.object({
  endpoint: z
    .string()
    .min(1, "endpoint is required")
    .regex(
      /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-.,@?^=%&:/~+#]*)?$/,
      "Please enter a valid HTTP endpoint",
    ),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  headers: z.array(
    z.object({
      key: z.string().min(1, "Header key is required"),
      value: z.string().min(1, "Header value is required"),
    }),
  ),
  body: z.string().optional(),
  params: z.array(
    z.object({
      key: z.string().min(1, "Param key is required"),
      value: z.string().min(1, "Param value is required"),
    }),
  ),
  variable: z.string().min(1, "Variable is required"),
});
const HttpRequestDialog = ({
  open,
  onOpenChange,
  data,
}: Readonly<DialogProps<HttpRequestNodeDataTypes>>) => {
  const nodeId = useNodeId();
  const { updateNodeData } = useReactFlow();

  const form = useForm<z.infer<typeof HttRequestFromValues>>({
    defaultValues: {
      endpoint: data?.endpoint || "",
      method: data?.method || "GET",
      headers: data?.headers || [],
      body: data?.body || "",
      params: data?.params || [],
      variable: data?.variable || "",
    },
    resolver: zodResolver(HttRequestFromValues),
  });

  const {
    fields: headerFields,
    append: appendHeader,
    remove: removeHeader,
  } = useFieldArray({
    control: form.control,
    name: "headers",
  });
  const {
    fields: paramFields,
    append: appendParam,
    remove: removeParam,
  } = useFieldArray({
    control: form.control,
    name: "params",
  });

  const formInput = {
    method: {
      options: ["POST", "GET", "PATCH", "PUT", "DELETE"],
      type: "select",
      label: "Request Method",
    },
    endpoint: {
      type: "text",
      label: "Endpoint Url",
      description:
        "A request were made to this url when this node will be run.",
      placeholder: "http://yourdomain.com/path",
    },
    body: {
      type: "textarea",
      label: "Body of request",
      description: "",
    },
    headers: {
      label: "Request Headers",
      type: "array",
      placeholderKey: "Header Key",
      placeholderValue: "Header Value",
    },
    params: {
      label: "Request Params",
      type: "array",
      placeholderKey: "Param Key",
      placeholderValue: "Param Value",
    },
    variable: {
      type: "text",
      label: "Variable",
      description: "The variable in which to store the response",
      placeholder: "responseVar",
    },
  };

  const handleSubmit = (data: Omit<HttpRequestNodeDataTypes, "workflowId">) => {
    if (!nodeId) return;
    updateNodeData(nodeId, { ...data });
    toast.success("Data Updated for HttpRequest, click save ");
    onOpenChange(false);
  };
  return (
    <DialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="HTTP Request"
      description="Configure HTTP Request node, it will make an HTTP request to the corresponding endpoint on trigger."
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            name="variable"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formInput.variable.label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={formInput.variable.placeholder}
                  />
                </FormControl>
                <FormDescription>
                  {formInput.variable.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={"endpoint"}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formInput.endpoint.label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={formInput.endpoint.placeholder}
                  />
                </FormControl>
                <FormDescription>
                  {formInput.endpoint.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={"method"}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formInput.method.label}</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      {formInput.method.options.map((option) => (
                        <SelectItem value={option} key={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <LabelInputContainer>
            <FormLabel>{formInput.headers.label}</FormLabel>
            <div className="space-y-2">
              {headerFields.map((item, index) => (
                <div className="flex flex-row items-end gap-2" key={item.id}>
                  <FormField
                    name={`headers.${index}.key`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={formInput.headers.placeholderKey}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`headers.${index}.value`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={formInput.headers.placeholderValue}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => removeHeader(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              type="button"
              onClick={() => appendHeader({ key: "", value: "" })}
            >
              Add Header
            </Button>
          </LabelInputContainer>

          <LabelInputContainer>
            <FormLabel>{formInput.params.label}</FormLabel>
            <div className="space-y-2">
              {paramFields.map((item, index) => (
                <div className="flex flex-row items-end gap-2" key={item.id}>
                  <FormField
                    name={`params.${index}.key`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={formInput.params.placeholderKey}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`params.${index}.value`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={formInput.params.placeholderValue}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeParam(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => appendParam({ key: "", value: "" })}
            >
              Add Param
            </Button>
          </LabelInputContainer>
          <FormField
            name="body"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formInput.body.label}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            variant="default"
            className="w-full"
          >
            Submit
          </Button>
        </form>
      </Form>
    </DialogLayout>
  );
};

export default HttpRequestDialog;
