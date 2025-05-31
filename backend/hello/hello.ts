import { api } from "encore.dev/api";

export const get = api(
  { expose: true, method: "GET", path: "/hello/:name" },
  async ({ name }: { name: string }): Promise<Response> => {
    const msg = `Hello World! My name is ${name}`;
    return { message: msg };
  }
);

interface Response {
  message: string;
}

