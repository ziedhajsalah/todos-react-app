import * as React from "react";
import logo from "../logo.svg";

export function Layout({
  title,
  description,
  children,
}: React.PropsWithChildren<{
  title: string;
  description?: string;
}>): JSX.Element {
  return (
    <div className="layout">
      <img src={logo} alt="logo" className="logo" />
      <div className="layout-title">{title}</div>
      {description && <div className="layout-description">{description}</div>}
      <div className="content">{children}</div>
    </div>
  );
}
