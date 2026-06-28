import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import Toast from "./components/ui/Toast";
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import TaskDetail from "./pages/TaskDetail";
import NotFound from "./pages/NotFound";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary)" }}>
      <div className="sidebar-wrapper">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Navbar onMenuToggle={() => setSidebarOpen(o => !o)} />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<AllTasks />} />
            <Route path="/add" element={<AddTask />} />
            <Route path="/edit/:id" element={<EditTask />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toast />
      <style>{`
        @media (max-width: 768px) {
          .sidebar-wrapper { display: none; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Layout />
      </TaskProvider>
    </BrowserRouter>
  );
}