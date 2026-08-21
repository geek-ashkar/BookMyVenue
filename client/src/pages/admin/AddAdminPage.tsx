import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./AddAdminPage.css";

function AddAdminPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post(
        "/admin/create",
        {
          name,
          email,
          password,
        }
      );

      alert(response.data.message);

      navigate("/admin");

    } catch (error: any) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to create admin."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="add-admin-page">

      <div className="add-admin-card">

        <h1>Create Admin</h1>
        <br/>

        <form onSubmit={handleSubmit}>

          <label>Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create  Admin"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddAdminPage;