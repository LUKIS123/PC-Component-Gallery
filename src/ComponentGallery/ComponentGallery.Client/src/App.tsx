import { BrowserRouter, Route, Routes } from "react-router";
import { IndexPage } from "./features/index/IndexPage";
import { Layout } from "./features/layout/Layout";
import { ComponentsListPage } from "./features/components-list/ComponentsListPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="components" element={<ComponentsListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
