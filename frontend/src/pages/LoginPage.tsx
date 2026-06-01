import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@kingsclass.school");
  const [password, setPassword] = useState("KingsClass!2026");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/admin/feed" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate("/admin/feed", { replace: true });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-art">
        <div className="school-ribbon" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="login-panel" aria-label="Admin sign in">
        <div className="login-card">
          <h2>King's Class</h2>

          <form onSubmit={handleSubmit}>
            <label>
              <span>Email</span>
              <div className="input-shell">
                <Mail size={18} />
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" />
              </div>
            </label>

            <label>
              <span>Password</span>
              <div className="input-shell">
                <LockKeyhole size={18} />
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  autoComplete="current-password"
                />
              </div>
            </label>

            {error ? <p className="form-error">{error}</p> : null}

            <button className="primary-action" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Log in"}
              {isSubmitting ? <LoaderCircle className="primary-action__spinner" size={18} /> : <ArrowRight size={18} />}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
