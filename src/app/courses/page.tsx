"use client";

import { useEffect, useMemo, useState } from "react";
import CourseCard from "@/components/CourseCard";

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

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load courses right now.");
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(
    () => courses.filter((course) => course.title.toLowerCase().includes(search.toLowerCase())),
    [courses, search]
  );

  const trending = useMemo(
    () => [...courses].sort((a, b) => b.rating - a.rating).slice(0, 3),
    [courses]
  );

  return (
    <main className="page-shell">
      <section className="section-block section-hero">
        <div>
          <p className="eyebrow">All Courses</p>
          <h1>Explore programs designed for your next career move.</h1>
          <p className="section-copy">Search by course title, browse categories, and open any lesson after sign in.</p>
        </div>
        <div className="search-box">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search courses"
            placeholder="Search courses by title"
          />
        </div>
      </section>

      {loading ? (
        <div className="loader">Loading courses...</div>
      ) : error ? (
        <div className="alert error">{error}</div>
      ) : (
        <>
          <section className="section-block">
            <h2>Trending Courses</h2>
            <div className="course-grid">
              {trending.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>

          <section className="section-block">
            <h2>All Courses</h2>
            {filtered.length === 0 ? (
              <div className="alert">No courses match your search.</div>
            ) : (
              <div className="course-grid course-grid-full">
                {filtered.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}
