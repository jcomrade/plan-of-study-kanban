import { StudentList } from "@/components/RegistrationAdviser/studentList";
import student from "@/styles/student.module.scss";

export default function Students(){
    return (
        <div className={student.container}>
            <input className={student.search} placeholder="Search..."/>
            <StudentList />
        </div>
    )
}