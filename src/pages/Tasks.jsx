import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useSubjects } from '../hooks/useSubjects';
import { toast } from 'react-toastify';

const TABS = ['All', 'Pending', 'Completed', 'Overdue'];

function Tasks() {
  const { tasks, addTask, deleteTask, toggleTask, overdue, pending, completed } = useTasks();
  const { subjects } = useSubjects();
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Medium');

  function handleAdd() {
    if (!title.trim()) return toast.error('Task title required!');
    addTask({ title, subject, deadline, priority });
    setTitle(''); setSubject(''); setDeadline(''); setPriority('Medium');
    toast.success('Task added!');
  }

  function getTabTasks() {
    if (activeTab === 'Pending') return pending;
    if (activeTab === 'Completed') return completed;
    if (activeTab === 'Overdue') return overdue;
    return tasks;
  }

  const filtered = getTabTasks()
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => filterPriority === 'All' || t.priority === filterPriority);

  const tabCount = (tab) => {
    if (tab === 'All') return tasks.length;
    if (tab === 'Pending') return pending.length;
    if (tab === 'Completed') return completed.length;
    if (tab === 'Overdue') return overdue.length;
  };

  return (
    <div>
      <h2 style={styles.heading}>✅ Tasks</h2>

      {/* Add Task Form */}
      <div style={styles.formCard}>
        <h4 style={{ marginBottom: '12px', color: '#333' }}>Add New Task</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input} />
          <select value={subject} onChange={(e) => setSubject(e.target.value)} style={styles.input}>
            <option value="">Select subject</option>
            {subjects.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
            <option value="Other">Other</option>
          </select>
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} style={styles.input} />
          <select value={priority} onChange={(e) => setPriority(e.target.value)} style={styles.input}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button onClick={handleAdd} style={styles.btn}>+ Add Task</button>
        </div>
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <input placeholder="🔍 Search tasks..." value={search}
          onChange={(e) => setSearch(e.target.value)} style={{ ...styles.input, width: '220px' }} />
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} style={styles.input}>
          <option value="All">All Priorities</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            ...styles.tab,
            backgroundColor: activeTab === tab ? '#1e1e2e' : '#f0f0f0',
            color: activeTab === tab ? 'white' : '#555',
          }}>
            {tab} ({tabCount(tab)})
          </button>
        ))}
      </div>

      {/* Task List */}
      {filtered.length === 0 && <p style={{ color: '#888' }}>No tasks found.</p>}
      {filtered.map((t) => {
        const isOverdue = !t.completed && t.deadline && new Date(t.deadline) < new Date();
        return (
          <div key={t.id} style={{ ...styles.taskCard, borderLeft: `4px solid ${isOverdue ? '#f44336' : t.completed ? '#4caf50' : '#ff9800'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: 'bold', textDecoration: t.completed ? 'line-through' : 'none', color: t.completed ? '#999' : '#222' }}>
                  {t.title}
                </span>
                <span style={styles.priorityBadge(t.priority)}>{t.priority}</span>
                {isOverdue && <span style={styles.overdueBadge}>Overdue</span>}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => { toggleTask(t.id); toast.success(t.completed ? 'Marked pending!' : 'Task completed! 🎉'); }}
                  style={{ ...styles.actionBtn, backgroundColor: t.completed ? '#9e9e9e' : '#4caf50' }}>
                  {t.completed ? 'Undo' : 'Done'}
                </button>
                <button onClick={() => { deleteTask(t.id); toast.error('Task deleted'); }}
                  style={{ ...styles.actionBtn, backgroundColor: '#f44336' }}>✕</button>
              </div>
            </div>
            <div style={{ marginTop: '6px', fontSize: '13px', color: '#777', display: 'flex', gap: '14px' }}>
              {t.subject && <span>📚 {t.subject}</span>}
              {t.deadline && <span>📅 {t.deadline}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  heading: { fontSize: '24px', marginBottom: '20px' },
  formCard: { backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #e0e0e0' },
  input: { padding: '8px 12px', fontSize: '14px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none' },
  btn: { padding: '8px 18px', backgroundColor: '#1e1e2e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' },
  tab: { padding: '8px 16px', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' },
  taskCard: { padding: '12px 16px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', maxWidth: '600px' },
  priorityBadge: (p) => ({ marginLeft: '10px', padding: '2px 8px', fontSize: '11px', borderRadius: '20px', fontWeight: 'bold', color: 'white', backgroundColor: p === 'High' ? '#f44336' : p === 'Medium' ? '#ff9800' : '#4caf50' }),
  overdueBadge: { marginLeft: '8px', padding: '2px 8px', fontSize: '11px', borderRadius: '20px', backgroundColor: '#fde8e8', color: '#f44336', fontWeight: 'bold' },
  actionBtn: { padding: '5px 12px', fontSize: '12px', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer' },
};

export default Tasks;