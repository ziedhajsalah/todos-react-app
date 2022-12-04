import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../logo.svg";

export function Layout({
  title,
  description,
  children,
}: React.PropsWithChildren<{
  title: string;
  description?: string;
}>): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    window.localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="layout">
      <img src={logo} alt="logo" className="logo" />
      <div className="layout-title">
        <div>{title}</div>
        {location.pathname === "/" && (
          <div className="log-out" onClick={logout}>
            Log Out
          </div>
        )}
      </div>
      {description && <div className="layout-description">{description}</div>}
      <div className="content">{children}</div>
    </div>
  );
}
