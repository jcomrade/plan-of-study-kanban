import { StudentList } from "@/components/RegistrationAdviser/studentList";
import { TodoList } from "@/components/RegistrationAdviser/todo";
import student from "@/styles/student.module.scss";

export default function Students() {
  return (
    <div className={student.container}>
      <input className={student.search} placeholder="Search..." />
      <div className={student.content}>
        <StudentList />
        <TodoList />
      </div>
    </div>
  );
}
