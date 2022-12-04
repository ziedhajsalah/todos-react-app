import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";

export function Login(): JSX.Element {
  return (
    <Layout title="Welcome back!" description="Log in to continue.">
      <Input />
      <Input />
      <div>Don’t have an account? Sign up.</div>
      <Button>Log In</Button>
    </Layout>
  );
}
