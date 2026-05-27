import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-shell">
      <div className="page-shell footer-inner">
        <div className="footer-block">
          <h3>SkillSphere</h3>
          <p>Learn new skills with curated courses, mentorship, and guided content.</p>
        </div>
        <div className="footer-block">
          <h4>Contact</h4>
          <p>hello@skillsphere.com</p>
          <p>+1 (555) 012-3456</p>
        </div>
        <div className="footer-block">
          <h4>Social</h4>
          <nav className="footer-links">
            <Link href="#">Twitter</Link>
            <Link href="#">LinkedIn</Link>
            <Link href="#">Instagram</Link>
          </nav>
        </div>
        <div className="footer-block">
          <h4>Legal</h4>
          <nav className="footer-links">
            <Link href="#">Terms & Conditions</Link>
            <Link href="#">Privacy Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
