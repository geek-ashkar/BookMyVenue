import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./RegisterPage.css";

function RegisterPage() {
  const { role } = useParams<{
    role: "customer" | "owner";
  }>();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isCustomer = role === "customer";

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setSubmitting(true);

      const endpoint = isCustomer
        ? "/auth/register/customer"
        : "/auth/register/owner";

      const response = await api.post(endpoint, {
        name,
        email,
        password,
      });

      alert(response.data.message);

      setName("");
      setEmail("");
      setPassword("");

      navigate("/login");
    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="register-page">

      <div
        className={`register-card ${
          isCustomer
            ? "register-card--customer"
            : "register-card--owner"
        }`}
      >

        <div className="register-brand">
          <Link to="/">
            BookMyVenue
          </Link>
        </div>

        <div className="register-header">

          <h1>
            {isCustomer
              ? "Create Customer Account"
              : "Become a Venue Owner"}
          </h1>

          <p>
            {isCustomer
              ? "Create an account to discover and book verified venues."
              : "Register as an owner to list and manage your venues."}
          </p>

        </div>

        <form
          className="register-form"
          onSubmit={handleSubmit}
        >

          <div className="register-field">

            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter your full name"
              required
            />

          </div>

          <div className="register-field">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter your email"
              required
            />

          </div>

          <div className="register-field">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Create a password"
              required
            />

          </div>

          <button
            type="submit"
            className="register-submit-btn"
            disabled={submitting}
          >
            {submitting
              ? "Creating Account..."
              : isCustomer
              ? "Create Account"
              : "Register as Owner"}
          </button>

        </form>

        <div className="register-divider">
          <span>
            Already have an account?
          </span>
        </div>

        <Link
          to="/login"
          className="register-login-link"
        >
          Sign In
        </Link>

        <div className="register-switch">

          {isCustomer ? (
            <>
              <p>Want to list your venue?</p>

              <Link to="/register/owner">
                Become a Venue Owner
              </Link>
            </>
          ) : (
            <>
              <p>Looking for a venue?</p>

              <Link to="/register/customer">
                Register as Customer
              </Link>
            </>
          )}

        </div>

        <div className="register-home-link">
          <Link to="/">
            ← Back to Home
          </Link>
        </div>

      </div>

    </div>
  );
}

export default RegisterPage;