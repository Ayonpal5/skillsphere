"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProtectedClient from "@/components/ProtectedClient";

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

export default function CourseDetail() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        const match = data.find((item: any) => String(item.id) === id);
        if (!match) {
          setError("Course not found.");
        } else {
          setCourse(match);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load course details.");
        setLoading(false);
      });
  }, [id]);

  return (
    <ProtectedClient>
      <main className="page-shell">
        {loading ? (
          <div className="loader">Loading course...</div>
        ) : error ? (
          <div className="alert error">{error}</div>
        ) : course ? (
          <div className="course-detail">
            <div className="course-detail-header">
              <img src={course.image} alt={course.title} />
              <div>
                <span className="course-tag">{course.category}</span>
                <h1>{course.title}</h1>
                <p>{course.description}</p>
                <div className="course-stats">
                  <span>Instructor: {course.instructor}</span>
                  <span>Duration: {course.duration}</span>
                  <span>Level: {course.level}</span>
                </div>
              </div>
            </div>
            <section className="section-block">
              <h2>Course Curriculum</h2>
              <ul className="curriculum-list">
                <li>Introduction to the course</li>
                <li>Core lesson with guided examples</li>
                <li>Hands-on project and practice assignment</li>
                <li>Testing, review, and advanced best practices</li>
                <li>Next steps for your skill path</li>
              </ul>
            </section>
          </div>
        ) : null}
      </main>
    </ProtectedClient>
  );
}
