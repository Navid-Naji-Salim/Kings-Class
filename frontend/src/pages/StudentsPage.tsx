import { Search, ShieldCheck, UserRoundPlus } from "lucide-react";
import { studentRows } from "../data/adminPrototype";

export function StudentsPage() {
  return (
    <section className="prototype-page">
      <div className="prototype-hero">
        <div>
          <h2>Track student records with family context.</h2>
          <p>Use this area as a future student directory with attendance signals, guardian links, and quick pastoral notes.</p>
        </div>
        <button className="admin-primary-action" type="button">
          <UserRoundPlus size={17} />
          Add student
        </button>
      </div>

      <div className="prototype-filter">
        <Search size={17} />
        <span>Search by student, guardian, class, or note</span>
      </div>

      <div className="prototype-table">
        {studentRows.map((student) => (
          <article key={student.name} className="prototype-row">
            <div className="prototype-row__avatar">{student.name.split(" ").map((part) => part[0]).join("")}</div>
            <div>
              <h3>{student.name}</h3>
              <p>{student.guardian}</p>
            </div>
            <span>{student.grade}</span>
            <span>
              <ShieldCheck size={15} />
              {student.attendance} attendance
            </span>
            <strong>{student.note}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
