import { CalendarDays, Plus, Users } from "lucide-react";
import { classRows } from "../data/adminPrototype";

export function ClassesPage() {
  return (
    <section className="prototype-page">
      <div className="prototype-hero">
        <div>
          <h2>Manage active classes and teaching groups.</h2>
          <p>Keep class rosters, teacher ownership, and weekly schedules in one place before deeper timetable tools are added.</p>
        </div>
        <button className="admin-primary-action" type="button">
          <Plus size={17} />
          New class
        </button>
      </div>

      <div className="prototype-metrics" aria-label="Class overview">
        <span>
          <strong>12</strong>
          Active classes
        </span>
        <span>
          <strong>286</strong>
          Students assigned
        </span>
        <span>
          <strong>8</strong>
          Homeroom teachers
        </span>
      </div>

      <div className="prototype-table">
        {classRows.map((classRow) => (
          <article key={classRow.name} className="prototype-row">
            <div className="prototype-row__icon">
              <Users size={19} />
            </div>
            <div>
              <h3>{classRow.name}</h3>
              <p>{classRow.teacher}</p>
            </div>
            <span>{classRow.students} students</span>
            <span>
              <CalendarDays size={15} />
              {classRow.schedule}
            </span>
            <strong>{classRow.status}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
