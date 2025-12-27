// import { auth } from "@/auth";

// const baseUrl = 'http://localhost:6001/';

// async function get(url: string) {
//     const requestOptions = {
//         method: 'GET',
//         headers: {}
//     };
//     const response = await fetch(baseUrl+url,requestOptions)
//     return handleResponse(response);
// }
// async function put(url: string,body:unknown) {
//     const requestOptions = {
//         method: 'GET',
//         headers: await getHeaders(),
//         body:JSON.stringify(body)
//     };
//     const response = await fetch(baseUrl+url,requestOptions)
//     return handleResponse(response);
// }

// async function handleResponse(response: Response) {
//     const text = await response.text();
//     const data = text && JSON.parse(text);

//     if(response.ok) {
//         return data || response.statusText;
//     }else{
//         const error = {
//             status:response.status,
//             message:response.statusText
//         }
//         return {error}
//     }
// }

// async function getHeaders():Promise<Headers> {
//     const session = await auth();
//     const headers = new Headers();
//     headers.set("Content-type","application/json");
//     if(session) {
//         headers.set("Authorization",`Bearer `+ session?.accessToken)
//     }
//     return headers;
// }

// export const fetchWrapper = {
//     get
// }

import { auth } from "@/auth";

const baseUrl = "http://localhost:6001/";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function request(
  url: string,
  method: HttpMethod,
  body?: unknown
) {
  const headers = await getHeaders();

  const options: RequestInit = {
    method,
    headers, 
     next: { revalidate: 60 }
  };


  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(baseUrl + url, options);
  return handleResponse(response);
}

async function handleResponse(response: Response) {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

     if(response.ok) {
        return data || response.statusText;
    }else{
        const error = {
            status:response.status,
            message:response.statusText
        }
        return {error}
    }
}

async function getHeaders(): Promise<Headers> {
  const session = await auth();
  const headers = new Headers();

  headers.set("Content-Type", "application/json");

  if (session?.accessToken) {
    headers.set("Authorization", `Bearer ${session.accessToken}`);
  }

  return headers;
}

export const fetchWrapper = {
  get: (url: string) => request(url, "GET"),
  post: (url: string, body: unknown) => request(url, "POST", body),
  put: (url: string, body: unknown) => request(url, "PUT", body),
  delete: (url: string) => request(url, "DELETE")
};
