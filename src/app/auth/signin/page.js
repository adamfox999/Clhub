"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Email sign-in
  async function handleEmailSignIn(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setError(error.message);
    else setMessage("Check your email for a sign-in link.");
    setLoading(false);
  }

  // Google sign-in
  async function handleGoogleSignIn() {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) setError(error.message);
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 400, margin: "40px auto", padding: 24, borderRadius: 12, boxShadow: "0 2px 16px rgba(0,0,0,0.08)", background: "#fff" }}>
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>Sign In</h1>
      <form onSubmit={handleEmailSignIn} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ padding: 12, fontSize: 16, borderRadius: 8, border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: "12px 0", fontSize: 16, borderRadius: 8, background: "#0070f3", color: "white", border: "none", cursor: "pointer" }}
        >
          {loading ? "Sending..." : "Sign in with Email"}
        </button>
      </form>
      <div style={{ textAlign: "center", margin: "24px 0" }}>or</div>
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        style={{ width: "100%", padding: "12px 0", fontSize: 16, borderRadius: 8, background: "#4285F4", color: "white", border: "none", cursor: "pointer" }}
      >
        Sign in with Google
      </button>
      {error && <p style={{ color: "red", marginTop: 16, textAlign: "center" }}>{error}</p>}
      {message && <p style={{ color: "green", marginTop: 16, textAlign: "center" }}>{message}</p>}
    </main>
  );
}
