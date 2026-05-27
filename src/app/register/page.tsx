"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import toast from "react-hot-toast";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, signInWithGoogle } = useAuth();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp({ name, email, photoUrl, password });
      toast.success("Registered successfully");
      router.push("/login");
    } catch (err: any) {
      toast.error(err?.message || "Registration failed");
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
        <h1>Create your account</h1>
        <p>Register now and begin exploring course programs across web development, design, and marketing.</p>
        <form onSubmit={onSubmit} className="auth-form">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
          <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="Photo URL" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
          <button type="submit" className="button button-primary">Register</button>
        </form>
        <button onClick={handleGoogle} className="button button-secondary">Register with Google</button>
        <p className="auth-note">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}
