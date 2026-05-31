import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AdminLayout } from "./components/layout/AdminLayout";
import { ClassFeedPage } from "./pages/ClassFeedPage";
import { LoginPage } from "./pages/LoginPage";

function EmptySection({ title }: { title: string }) {
  return (
    <section className="empty-section" aria-label={title}>
      <h1>{title}</h1>
    </section>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/feed" replace />} />
        <Route path="feed" element={<ClassFeedPage />} />
        <Route path="classes" element={<EmptySection title="Classes" />} />
        <Route path="students" element={<EmptySection title="Students" />} />
        <Route path="messages" element={<EmptySection title="Messages" />} />
        <Route path="settings" element={<EmptySection title="Settings" />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
