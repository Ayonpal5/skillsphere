import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell page-center">
      <section className="auth-card">
        <h1>Page not found</h1>
        <p>The content you are looking for doesn’t exist or may have moved.</p>
        <Link href="/" className="button button-primary">
          Return home
        </Link>
      </section>
    </main>
  );
}
