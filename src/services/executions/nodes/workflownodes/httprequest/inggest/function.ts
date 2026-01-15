import { NonRetriableError } from "inngest";
import axios from "axios";
import { NodeExecutor } from "@/services/executions/types/executor-types";

export const HttpRequestExecutor: NodeExecutor<
  HttpRequestNodeDataTypes
> = async ({ data, context, step }) => {
  const { endpoint, method, params, variable, headers, body } = data;

  if (!endpoint) {
    throw new NonRetriableError("Endpoint is required to run httpRequestNode");
  }
  if (!method) {
    throw new NonRetriableError("Method is required to run httpRequestNode");
  }
  if (!variable) {
    throw new NonRetriableError("Variable is required to run httpRequestNode");
  }
  const response = await step.run(
    `making a ${method} request to ${endpoint}`,
    async () => {
      if (["POST", "PUT", "PATCH"].includes(method)) {
        return await axios({
          method: method.toLowerCase(),
          url: endpoint,
          data: body,
          headers: headers ? Object.assign({}, ...headers) : {},
          params: params || {},
        });
      } else if (["GET", "DELETE"].includes(method)) {
        return await axios({
          method: method.toLowerCase(),
          url: endpoint,
          headers: headers ? Object.assign({}, ...headers) : {},
          params: params || {},
        });
      } else {
        throw new NonRetriableError(`Unsupported HTTP method: ${method}`);
      }
    },
  );

  return {
    ...context,
    [variable]: response,
  };
};
