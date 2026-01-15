import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { inngest } from "@/inngest/client";
import { Events } from "@/inngest/event-type";
import { NodeType } from "@/generated/prisma/enums";
import { pathToUrlString } from "@/services/executions/nodes/triggernodes/webhook/lib/utils";

const getSecretValue = (req: NextRequest, headerName: string) => {
  return req.headers.get(headerName || "x-webhook-secret");
};

const handler = async (
  req: NextRequest,
  ctx: RouteContext<"/api/workflow/webhook/[workflowId]/[...slug]">,
) => {
  try {
    const { workflowId, slug } = await ctx.params;

    const workflow = await prisma.workflow.findFirst({
      where: {
        id: workflowId,
        nodes: {
          some: {
            type: NodeType.WEBHOOK,
          },
        },
      },
      include: {
        nodes: true,
      },
    });
    if (!workflow) {
      return NextResponse.json(
        { message: "Workflow not found" },
        { status: 404 },
      );
    }

    const url = pathToUrlString(`${workflowId}/${slug.join("/")}`);

    const WebHookNode = workflow.nodes.find((node) => {
      if (node.type !== NodeType.WEBHOOK) return false;
      if (typeof node.data !== "object" || node.data === null) return false;
      return "url" in node.data && (node.data as { url?: string }).url === url;
    });

    if (!WebHookNode) {
      return NextResponse.json(
        {
          message: "No Valid Trigger Found",
          description: "The Hook url is not valid please reverify your url",
        },
        {
          status: 400,
        },
      );
    }

    let expectedSecret: string | undefined;
    const secretHeaderName = "x-webhook-secret";
    if (
      typeof WebHookNode.data === "object" &&
      WebHookNode.data !== null &&
      "secret" in WebHookNode.data
    ) {
      expectedSecret = (WebHookNode.data as { secret?: string }).secret;
    }
    if (expectedSecret) {
      const receivedSecret = getSecretValue(req, secretHeaderName);

      if (!receivedSecret || receivedSecret !== expectedSecret) {
        return NextResponse.json(
          {
            message: "Invalid or missing webhook secret",
          },
          { status: 401 },
        );
      }
    }

    let variableName: string | undefined;
    if (
      typeof WebHookNode.data === "object" &&
      WebHookNode.data !== null &&
      "variable" in WebHookNode.data
    ) {
      variableName = (WebHookNode.data as { variable?: string }).variable;
    }
    const context = variableName
      ? {
          [variableName]: {
            method: req.method,
            headers: Object.fromEntries(req.headers.entries()),
            body:
              req.method === "GET"
                ? undefined
                : await req.json().catch(() => undefined),
            url: req.url,
          },
        }
      : {};
    await inngest.send({
      name: Events.WORKFLOW_EXECUTE,
      data: {
        id: workflowId,
        context,
      },
    });

    return NextResponse.json(
      { message: "Workflow execution requested" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "server side error",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
};

export { handler as POST, handler as GET };
