import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./routes/Dashboard";
import { JobDetail } from "./routes/JobDetail";
import { JobList } from "./routes/JobList";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<JobList />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
