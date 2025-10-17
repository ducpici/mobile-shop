"use client";

import { ajax as rxAjax, AjaxConfig, AjaxResponse } from "rxjs/ajax";
import { Observable } from "rxjs";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4003";

export const ajax = <T>(config: AjaxConfig): Observable<AjaxResponse<T>> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return rxAjax<T>({
    ...config,
    url: `${BASE_URL}${config.url}`,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(config.headers || {}),
    },
    crossDomain: true,
    timeout: 10000,
  });
};
