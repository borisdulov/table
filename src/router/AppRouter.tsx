import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";

export const AppRouter = () => {
  return (
    <Routes>
      {Object.values(routes).map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
};
