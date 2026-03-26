import { useState } from 'react';

function Tasks({ tasks, setTasks }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [activeTab, setActiveTab] = useState('All');

  function handleAdd() {
    if (!title.trim()) return;
    setTasks([...tasks, { id: Date.now(), title, subject, deadline, priority, completed: false }]);
    setTitle(''); setSubject(''); setDeadline(''); setPriority('Medium');
  }

  function toggleComplete(id) {
    setTasks(tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  const filtered = tasks.filter((t) => {
    if (activeTab === 'Pending') return !t.completed;
    if (activeTab === 'Completed') return t.completed;
    return true;
  });

  return (
    <div>
      <h2>✅ Tasks</h2>

      {/* Form */}
      <div style={styles.form}>
        <input placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input} />
        <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} style={styles.input} />
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} style={styles.input} />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} style={styles.input}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button onClick={handleAdd} style={styles.button}>Add Task</button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        {['All', 'Pending', 'Completed'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{ ...styles.tab, backgroundColor: activeTab === tab ? '#1e1e2e' : '#eee',
              color: activeTab === tab ? 'white' : 'black' }}>
            {tab} ({tab === 'All' ? tasks.length : tab === 'Pending'
              ? tasks.filter(t => !t.completed).length
              : tasks.filter(t => t.completed).length})
          </button>
        ))}
      </div>

      {/* Task List */}
      {filtered.length === 0 && <p>No tasks here!</p>}
      {filtered.map((t) => (
        <div key={t.id} style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ textDecoration: t.completed ? 'line-through' : 'none', fontWeight: 'bold' }}>{t.title}</span>
              <span style={styles.priorityBadge(t.priority)}>{t.priority}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => toggleComplete(t.id)} style={styles.doneBtn(t.completed)}>
                {t.completed ? 'Undo' : 'Done'}
              </button>
              <button onClick={() => deleteTask(t.id)} style={styles.deleteBtn}>✕</button>
            </div>
          </div>
          <div style={{ marginTop: '6px', fontSize: '13px', color: '#666' }}>
            {t.subject && <span>📚 {t.subject} &nbsp;</span>}
            {t.deadline && <span>📅 {t.deadline}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  form: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px', alignItems: 'center' },
  input: { padding: '8px', fontSize: '14px', width: '160px' },
  button: { padding: '8px 16px', backgroundColor: '#1e1e2e', color: 'white', border: 'none', cursor: 'pointer', fontSize: '14px' },
  tab: { padding: '8px 16px', border: 'none', cursor: 'pointer', borderRadius: '4px', fontSize: '14px' },
  card: { padding: '12px 16px', border: '1px solid #ccc', borderRadius: '6px', marginBottom: '10px', maxWidth: '550px' },
  priorityBadge: (p) => ({ marginLeft: '10px', padding: '2px 8px', fontSize: '11px', borderRadius: '4px',
    backgroundColor: p === 'High' ? '#f44336' : p === 'Medium' ? '#ff9800' : '#4caf50', color: 'white' }),
  doneBtn: (done) => ({ padding: '4px 10px', fontSize: '12px', cursor: 'pointer',
    backgroundColor: done ? '#9e9e9e' : '#4caf50', color: 'white', border: 'none', borderRadius: '4px' }),
  deleteBtn: { padding: '4px 10px', fontSize: '12px', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' },
};

export default Tasks;