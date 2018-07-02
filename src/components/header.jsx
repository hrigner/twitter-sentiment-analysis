import React from "react";
import "./header.css";
import qlikCoreImg from "../resources/QlikCoreLogo.svg";

export default function Header() {
  return (
    <div className="header">
      <img
        className="coreLogo"
        src={qlikCoreImg}
        alt="Qlik Core Logo"
        onClick={() => {
          window.open("https://qlikcore.com");
        }}
      />
    </div>
  );
}
