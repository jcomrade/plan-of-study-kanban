"use client";


import { getCookie } from "typescript-cookie";

// function setCookie(name, value, seconds) {
//     const date = new Date();
//     date.setTime(date.getTime() + seconds * 1000);
//     document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
// }

export async function verifyUser() {
  const idToken = getCookie("id_token");
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${idToken}`
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.type;
  } catch (error) {
    return { error: error };
  }
}

// export function setCookie(name: string, value: any, seconds: number) {
//   const date = new Date();
//   date.setTime(date.getTime() + seconds * 1000);
//   document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
// }
