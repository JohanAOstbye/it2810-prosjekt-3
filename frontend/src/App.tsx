import React from "react";
import Header from "./Header";
import Content from "./Content";
import SideBar from "./SideBar";
import "./css/Responsive.css";

export default function App() {
  return (
    <div className="app">
    <Header />
      <div className="app-content">
        <Content />
        <SideBar />
      </div>
    </div>
  );
}
