import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import Tasks from './pages/Tasks';
import Revision from './pages/Revision';
import AITools from './pages/AITools';

function App() {
  return (
    <BrowserRouter>
      {/* Simple Navigation */}
      <nav>
        <Link to="/dashboard">Dashboard</Link> |{' '}
        <Link to="/subjects">Subjects</Link> |{' '}
        <Link to="/tasks">Tasks</Link> |{' '}
        <Link to="/revision">Revision</Link> |{' '}
        <Link to="/ai-tools">AI Tools</Link>
      </nav>

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/revision" element={<Revision />} />
        <Route path="/ai-tools" element={<AITools />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;