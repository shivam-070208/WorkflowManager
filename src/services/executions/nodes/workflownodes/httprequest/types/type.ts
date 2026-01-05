
type HttpRequestMethodTypes = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type HttpRequestNodeDataTypes = {
    endpoint: string;
    method: HttpRequestMethodTypes;
    params?: (Record<string,string>)[];
    variable: string;
    headers?:  (Record<string,string>)[];
    body?: string;
  };