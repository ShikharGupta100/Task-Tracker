import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskProvider, useTaskContext } from "./context/TaskContext";
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

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useTaskContext();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 md:p-6 min-w-0">
          {children}
        </main>
      </div>
      <Footer />
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<AllTasks />} />
            <Route path="/add" element={<AddTask />} />
            <Route path="/edit/:id" element={<EditTask />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </TaskProvider>
    </BrowserRouter>
  );
};

export default App;