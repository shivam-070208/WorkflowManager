import { EmailTemplate } from "@/components/resend-templates/email-tenplate";
import { NodeExecutor } from "@/services/executions/types/executor-types";
import { NonRetriableError } from "inngest";
import { Resend } from "resend";

export const ResendNodeExecutor: NodeExecutor<ResendNodeDataTypes> = async ({
  context,
  data,
  step,
}) => {
  try {
    const {
      api_key,
      from,
      to,
      subject,
      title,
      description,
      variable,
      content,
    } = data;

    if (!api_key)
      throw new NonRetriableError("API key is required for Resend node.");

    if (!from)
      throw new NonRetriableError(
        "'From' address is required for Resend node.",
      );

    if (!to)
      throw new NonRetriableError("'To' address is required for Resend node.");

    if (!subject)
      throw new NonRetriableError("Subject is required for Resend node.");

    if (!variable)
      throw new NonRetriableError(
        "Variable name is required to store the result.",
      );

    if (!title)
      throw new NonRetriableError("title is required to send a email");

    const client = new Resend(api_key);

    const response = await step.run(
      `Sending email via Resend to ${to}`,
      async () => {
        return await client.emails.send({
          from,
          to,
          subject,
          react: EmailTemplate({
            title,
            description,
            content,
          }),
        });
      },
    );

    return {
      ...context,
      [variable]: response,
    };
  } catch (error) {
    throw new NonRetriableError(
      error instanceof Error
        ? error.message
        : "Unknown error sending email via Resend",
    );
  }
};
