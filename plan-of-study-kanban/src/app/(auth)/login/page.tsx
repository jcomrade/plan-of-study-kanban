"use client";
import { verifyUser } from "@/utils/auth";
import { useEffect } from "react";
import { setCookie } from "typescript-cookie";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  useEffect(() => {
    async function login() {
      const params = new URLSearchParams(window.location.href.split("#")[1]);
      if (params.size == 0) {
        router.push(
          "https://thesis.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=50qa8u69u46pv03fdi71gs823m&response_type=token&scope=email+openid+phone+profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F%3F"
        );
      } else {
        setCookie("id_token", params.get("id_token"), { expires: 2 });
        setCookie("access_token", params.get("access_token"), { expires: 2 });
        const userType = await verifyUser();
        switch (userType) {
          case "STUDENT":
            router.push("/studyplan/draft");
            break;
          case "REGISTRATION_ADVISERS":
            router.push("/studyplan/curriculum");
            break;
          default:
            console.log("userType: ", userType);
            break;
        }
      }
    }
    login()
  }, []);

  return <h1>Page</h1>;
}
