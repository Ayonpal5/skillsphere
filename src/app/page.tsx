import Link from "next/link";

const popularCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "John Doe",
    duration: "20 hours",
    rating: 4.8,
    level: "Beginner",
    description: "Learn full-stack web development from scratch.",
    image: "https://i.postimg.cc/8zQzNCHs/course-web.png",
    category: "Development",
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    instructor: "Maya Patel",
    duration: "14 hours",
    rating: 4.7,
    level: "Intermediate",
    description: "Design stunning apps and web interfaces with user-first thinking.",
    image: "https://i.postimg.cc/zf1vs5xk/course-design.png",
    category: "Design",
  },
  {
    id: 3,
    title: "Digital Marketing Growth Lab",
    instructor: "Alex Kim",
    duration: "12 hours",
    rating: 4.9,
    level: "All levels",
    description: "Build marketing systems that attract customers and grow revenue.",
    image: "https://i.postimg.cc/SN8cn8hv/course-marketing.png",
    category: "Marketing",
  },
];

const tips = [
  "Break learning into 45-minute focus sessions.",
  "Review notes after every lesson to retain concepts.",
  "Practice with mini-projects for real experience.",
];

const instructors = [
  { name: "John Doe", role: "Full-stack Mentor" },
  { name: "Maya Patel", role: "Design Expert" },
  { name: "Alex Kim", role: "Marketing Strategist" },
  { name: "Sara Lee", role: "Career Coach" },
];

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Upgrade your skills today 🚀</span>
          <h1>Learn from industry experts and launch your next career move.</h1>
          <p>
            SkillSphere is the modern learning hub for web development, design, marketing, and professional growth.
          </p>
          <div className="hero-actions">
            <Link href="/courses" className="button button-primary">Browse courses</Link>
            <Link href="/register" className="button button-secondary">Create account</Link>
          </div>
        </div>
        <div className="hero-graphic">
          <div className="hero-card">
            <h2>Popular Courses</h2>
            <div className="popular-grid">
              {popularCourses.map((course) => (
                <article key={course.id} className="popular-course-card">
                  <img src={course.image} alt={course.title} />
                  <div>
                    <strong>{course.title}</strong>
                    <span>{course.instructor}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <h2>Learning Tips</h2>
          <p>Small habits that help you stay consistent and complete courses faster.</p>
        </div>
        <div className="tips-grid">
          {tips.map((tip) => (
            <div key={tip} className="tip-card">
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <h2>Top Instructors</h2>
          <p>Learn from experienced mentors who build real products.</p>
        </div>
        <div className="instructor-grid">
          {instructors.map((instructor) => (
            <article key={instructor.name} className="instructor-card">
              <div className="avatar-large">{instructor.name.charAt(0)}</div>
              <h3>{instructor.name}</h3>
              <p>{instructor.role}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
