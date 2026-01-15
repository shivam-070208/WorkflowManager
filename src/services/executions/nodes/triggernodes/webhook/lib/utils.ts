const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const pathToUrlString = (path: string): string => {
  return `${BASE_URL}\\api\\workflow\\webhook\\${path}`;
};
