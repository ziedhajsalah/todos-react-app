import { FormikErrors, useFormik } from "formik";
import { register } from "../api";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export function Register(): JSX.Element {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors: FormikErrors<FormValues> = {};
      if (!values.email) errors.email = "required";
      if (!values.name) errors.name = "required";
      if (!values.password) errors.password = "required";
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const token = await register(
          values.name,
          values.email,
          values.password
        );
        window.localStorage.setItem("token", token);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Layout
      title="Welcome!"
      description="Sign up to start using Simpledo today."
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="form-field">
          <Input
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Full Name"
          />
        </div>
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
          <a href="/login">Do have an account? Sign in.</a>
        </div>
        <Button type="submit">Sign Up</Button>
      </form>
    </Layout>
  );
}
