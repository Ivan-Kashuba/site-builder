import ReactDOM from "react-dom/client";
import "./index.css";
import { PageProvider } from "./providers/page-provider";
import { Editor } from "./components";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <PageProvider>
    <Editor />
  </PageProvider>
);
