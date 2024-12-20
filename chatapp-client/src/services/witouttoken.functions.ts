import { BASE_URL } from "@/constants/url.constants";

export const requestWithOutToken = async (
  endpoint: string,
  email: string,
  password: string,
  method = "GET",
  name?: string | undefined
) => {
  const url = `${BASE_URL}/${endpoint}`;
  if (method === "GET") {
    const resp = await fetch(url);
    return await resp.json();
  } else {
    let body;
    if (!name) {
      body = JSON.stringify({ email, password });
    } else {
      body = JSON.stringify({ name, email, password });
    }
    const resp = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    return await resp.json();
  }
};
