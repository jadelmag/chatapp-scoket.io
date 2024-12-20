/* eslint-disable @typescript-eslint/no-explicit-any */
import { KEY } from "@/constants/localstorage.constants";
import { BASE_URL } from "@/constants/url.constants";
import { loadOnLocalStorage } from "@/helpers/localstorage.functions";

export const requestWithToken = async (endpoint: string, method = "GET") => {
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
