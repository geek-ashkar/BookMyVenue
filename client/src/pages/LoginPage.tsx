import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setSubmitting(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      login(
        response.data.token,
        response.data.user
      );

      const role = response.data.user.role;

      if (role === "customer") {
        navigate("/customer/dashboard");
      } else if (role === "owner") {
        navigate("/owner/dashboard");
      } else if (role === "root_admin") {
        navigate("/admin/dashboard");
      }

    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-brand">
          <Link to="/">
            BookMyVenue
          </Link>
        </div>

        <div className="login-header">

          <h1>Welcome Back</h1>

          <p>
            Sign in to continue to your account.
          </p>

        </div>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <div className="login-field">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />

          </div>

          <div className="login-field">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

          </div>

          <button
            className="login-submit-btn"
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "Signing In..."
              : "Login"}
          </button>

        </form>

        <div className="login-divider">
          <span>New to BookMyVenue?</span>
        </div>

        <div className="login-actions">

          <Link
            to="/register/customer"
            className="register-customer-btn"
          >
            Create Customer Account
          </Link>

          <div className="owner-register">

            <p>
              Want to list your venue?
            </p>

            <Link to="/register/owner">
              Become a Venue Owner
            </Link>

          </div>

        </div>

        <div className="login-home-link">

          <Link to="/">
            ← Back to Home
          </Link>

        </div>

      </div>

    </div>
  );
}

export default LoginPage;