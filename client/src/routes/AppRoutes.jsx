import { Navigate, Route, Routes } from "react-router-dom";
import CreatorPage from "../pages/CreatorPage.jsx";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<CreatorPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
