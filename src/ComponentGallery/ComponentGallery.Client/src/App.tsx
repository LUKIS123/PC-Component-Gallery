import { BrowserRouter, Route, Routes } from "react-router";
import { IndexPage } from "./features/index/IndexPage";
import { Layout } from "./features/layout/Layout";
import { ComponentsListPage } from "./features/components-list/ComponentsListPage";
import { ComponentViewPage } from "./features/component-view/ComponentViewPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/components/:typeId" element={<ComponentsListPage />} />
          <Route path="/components/3d/:componentId" element={<ComponentViewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
