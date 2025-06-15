import { BrowserRouter, Route, Routes } from "react-router";
import { IndexPage } from "./features/index/IndexPage";
import { Layout } from "./features/layout/Layout";
import { ComponentsListPage } from "./features/components-list/ComponentsListPage";
import { ComponentViewPage } from "./features/component-view/ComponentViewPage";
import { PcAssemblyPage } from "./features/assembly-view/PcAssemblyPage";
import { PcBuildsListPage } from "./features/assembly-builds-list/PcBuildsPage";
import { CategoriesListPage } from "./features/categories-list/CategoriesListPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/components/:typeId" element={<ComponentsListPage />} />
          <Route
            path="/components/3d/:componentId"
            element={<ComponentViewPage />}
          />
          <Route path="/pcBuilds" element={<PcBuildsListPage />} />
          <Route path="/pcAssembly/:pcBuildId" element={<PcAssemblyPage />} />
          <Route path="/categoriesList" element={<CategoriesListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
