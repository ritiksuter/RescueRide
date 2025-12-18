import { useState } from "react";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { registerApi } from "../../api/auth.api";

export const RegisterUserPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await registerApi({ ...form, role: "user" });
    alert("User registered. Please login.");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <h1 className="text-lg font-semibold">Register User</h1>
      <Input label="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input label="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <Input label="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <Button type="submit">Register</Button>
    </form>
  );
};
