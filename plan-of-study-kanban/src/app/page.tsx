"use client";
import styles from "@/styles/global.module.scss";
import { verifyUser } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "typescript-cookie";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    async function isLoggedIn() {
      const params = new URLSearchParams(window.location.href.split("#")[1]);
      const idToken = getCookie("id_token");
      const accessToken = getCookie("access_token");
      console.log(
        "the condition",
        !idToken && !accessToken,
        " : idToken = ",
        idToken,
        !idToken,
        " | accessToken = ",
        accessToken,
        !accessToken
      );
      if (params.get("id_token") && params.get("access_token")) {
        setCookie("id_token", params.get("id_token"), { expires: 1 });
        setCookie("access_token", params.get("access_token"), { expires: 1 });
        const userType = await verifyUser();
        switch (userType) {
          case "STUDENT":
            router.push("/studyplan/draft");
            break;
          case "REGISTRATION_ADVISERS":
            router.push("/student");
            break;
          case "ADMIN":
            router.push(`/admin/`);
            break;
          default:
            console.log("userType: ", userType);
            break;
        }
      } else if (!idToken && !accessToken && params.size == 0) {
        router.push(
          "https://thesis.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=50qa8u69u46pv03fdi71gs823m&response_type=token&scope=email+openid+phone+profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F"
        );
      } else {
        console.log("it goes here; the 'else' statement");
        const userType = await verifyUser();
        switch (userType) {
          case "STUDENT":
            router.push("/studyplan/draft");
            break;
          case "REGISTRATION_ADVISERS":
            router.push(`/student/`);
            break;
          case "ADMIN":
            router.push(`/admin/`);
            break;
          default:
            console.log("userType: ", userType);
            break;
        }
      }
    }
    isLoggedIn();
  }, []);
  return (
    <div className={styles.homeLoading}>
      <h1>LOADING . . .</h1>
    </div>
  );
}
