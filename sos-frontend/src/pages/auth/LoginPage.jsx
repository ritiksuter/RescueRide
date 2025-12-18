import { useState } from "react";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form);
      const role = res.data?.data?.user?.role;
      navigate(`/${role}/dashboard`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <h1 className="text-lg font-semibold">Login</h1>
      <Input
        label="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />
      <Input
        label="Password"
        type="password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />
      <Button loading={loading} type="submit">
        Login
      </Button>
    </form>
  );
};
