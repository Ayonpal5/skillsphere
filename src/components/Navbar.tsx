"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    signOut();
    router.push("/");
  };

  return (
    <header className="site-header">
      <div className="nav-inner">
        <div className="brand">
          <Link href="/" className="brand-link">
            <span className="brand-mark">S</span>
            <span>SkillSphere</span>
          </Link>
        </div>
        <nav className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/courses" className="nav-link">Courses</Link>
          <Link href="/profile" className="nav-link">My Profile</Link>
        </nav>
        <div className="nav-actions">
          {user ? (
            <>
              <button onClick={handleLogout} className="button button-outline">Logout</button>
              <div className="avatar" title={user.name}>
                {user.photoUrl ? <img src={user.photoUrl} alt={user.name} /> : <span>{user.name.charAt(0)}</span>}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="button button-secondary">Login</Link>
              <Link href="/register" className="button button-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
