import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import Tasks from './pages/Tasks';
import Revision from './pages/Revision';
import AITools from './pages/AITools';

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard tasks={tasks} />} />
          <Route path="/dashboard" element={<Dashboard tasks={tasks} />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/tasks" element={<Tasks tasks={tasks} setTasks={setTasks} />} />
          <Route path="/revision" element={<Revision />} />
          <Route path="/ai-tools" element={<AITools />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;