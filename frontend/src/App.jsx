import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import UploadPdf from "./pages/UploadPdf";
import SearchPdf from "./pages/SearchPdf";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/academy"
        element={
          <ProtectedRoute role="academy">
            <UploadPdf />\
          </ProtectedRoute>
        }
      />

      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <SearchPdf />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
