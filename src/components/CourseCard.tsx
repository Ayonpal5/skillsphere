import Link from "next/link";

type Course = {
  id: number | string;
  title: string;
  instructor: string;
  duration: string;
  rating: number;
  level: string;
  description: string;
  image: string;
  category: string;
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.id}`} className="course-card">
      <img src={course.image} alt={course.title} className="course-image" />
      <div className="course-meta">
        <span className="course-tag">{course.category}</span>
        <h3>{course.title}</h3>
        <p className="course-subtitle">{course.instructor} · {course.duration}</p>
      </div>
      <div className="course-footer">
        <span className="course-rating">⭐ {course.rating.toFixed(1)}</span>
        <span className="course-level">{course.level}</span>
      </div>
    </Link>
  );
}
