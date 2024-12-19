/* eslint-disable @typescript-eslint/no-explicit-any */
import { KEY } from "@/constants/localstorage.constants";
import { BASE_URL } from "@/constants/url.constants";
import { loadOnLocalStorage } from "@/helpers/localstorage.functions";

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

export const requestWithToken = async (
  endpoint: string,
  method = "GET"
) => {
  const url = `${BASE_URL}/${endpoint}`;
  const token = loadOnLocalStorage(KEY.TOKEN);

  if (method === "GET") {
    const resp = await fetch(url, {
      headers: {
        "x-token": token,
      },
    } as any);
    return await resp.json();
  } else {
    const resp = await fetch(url, {
      method: method,
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      } as any,
    });
    return await resp.json();
  }
};
