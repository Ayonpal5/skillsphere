"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import toast from "react-hot-toast";

export default function UpdateProfile() {
  const { user, updateProfile } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(user?.name || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");

  if (!user) {
    return (
      <main className="page-shell page-center">
        <section className="auth-card">
          <h1>Not signed in</h1>
          <p>Please log in before updating your profile.</p>
        </section>
      </main>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ name, photoUrl });
      toast.success("Profile updated");
      router.push("/profile");
    } catch (err: any) {
      toast.error(err?.message || "Update failed");
    }
  };

  return (
    <main className="page-shell page-center">
      <section className="auth-card">
        <h1>Update profile</h1>
        <form onSubmit={onSubmit} className="auth-form">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
          <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="Photo URL" required />
          <button type="submit" className="button button-primary">Save changes</button>
        </form>
      </section>
    </main>
  );
}
