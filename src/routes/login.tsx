import { FormikErrors, useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";

interface FormValues {
  email: string;
  password: string;
}

export function Login(): JSX.Element {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors: FormikErrors<FormValues> = {};
      if (!values.email) errors.email = "required";
      if (!values.password) errors.password = "required";
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const token = await login(values.email, values.password);
        window.localStorage.setItem("token", token);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  return (
    <Layout title="Welcome back!" description="Log in to continue.">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-field">
          <Input
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Email"
            type="email"
          />
        </div>
        <div className="form-field">
          <Input
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="link">
          <Link to="/register">Don’t have an account? Sign up.</Link>
        </div>
        <Button type="submit">Log In</Button>
      </form>
    </Layout>
  );
}
