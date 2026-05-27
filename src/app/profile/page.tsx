"use client";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function ProfilePage() {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <main className="page-shell page-center">
        <section className="auth-card">
          <h1>Not signed in</h1>
          <p>Please log in to view your profile.</p>
          <div className="auth-actions">
            <Link href="/login" className="button button-primary">Login</Link>
            <Link href="/register" className="button button-secondary">Register</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="profile-card">
        <div className="profile-header">
          <img src={user.photoUrl} alt={user.name} className="profile-avatar" />
          <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        </div>
        <ul className="profile-meta">
          <li><strong>Member since:</strong> Today</li>
          <li><strong>Preferred track:</strong> Skill-based learning</li>
        </ul>
        <div className="profile-actions">
          <Link href="/profile/update" className="button button-secondary">Update profile</Link>
          <button onClick={signOut} className="button button-outline">Logout</button>
        </div>
      </section>
    </main>
  );
}
