import React from "react";
import { createRoot } from "react-dom/client";
import LoveLoopApp from "./src/App";
import "./styles.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<LoveLoopApp />);