"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signInWithGoogle } = useAuth();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      toast.success("Logged in successfully");
      router.push("/courses");
    } catch (err: any) {
      toast.error(err?.message || "Login failed");
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      toast.success("Logged in with Google");
      router.push("/courses");
    } catch (err: any) {
      toast.error(err?.message || "Google login failed");
    }
  };

  return (
    <main className="page-shell page-center">
      <section className="auth-card">
        <h1>Login to SkillSphere</h1>
        <p>Access course content and track progress with your account.</p>
        <form onSubmit={onSubmit} className="auth-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" className="button button-primary">Login</button>
        </form>
        <button onClick={handleGoogle} className="button button-secondary">Login with Google</button>
        <p className="auth-note">
          New here? <Link href="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
}
