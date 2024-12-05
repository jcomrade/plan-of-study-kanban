"use client";
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";
import Board from "@/components/Kanban/registrationAdviserDraftBoard";
import styles from "@/styles/global.module.scss";
import { getCookie } from "typescript-cookie";


type Subject = {
  preRequisite: string[];
  courseCode: string;
  column: number;
  id: string;
  units: number;
  courseDescription: string;
  coRequisite: string[];
  status: string;
};

type StudentData = {  
  PK: string;
  subjects: Subject[];
  SK: string;
  draftStatus: string;
};

const CustomKanban = () => {
  const [data, setData] = useState<StudentData>({
    PK:"",
    SK:"",
    subjects:[],
    draftStatus: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams<{ student_number: string; }>()
  useEffect(() => {
    const fetchData = async () => {
      const idToken = getCookie("id_token")
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/draft/registrationAdviser?student_number=${params.student_number}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${idToken}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response data:", data);
        setData(data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  return (
    <div className={styles.fullScreenBackground}>
      <Board data={data} editable={true} />
    </div>
  );
};

export default CustomKanban;
