import { StudentCard } from "./studentCard"
import styles from "@/styles/studentCard.module.scss"
export const StudentList = () => {
    return (
        <div className={styles.container}>
            <StudentCard />
        </div>
    )
}