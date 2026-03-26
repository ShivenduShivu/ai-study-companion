import { useState } from 'react';
import { useSubjects } from '../hooks/useSubjects';
import { toast } from 'react-toastify';

function Subjects() {
  const { subjects, addSubject, addTopic, toggleTopic } = useSubjects();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleAddSubject() {
    if (!name.trim()) return toast.error('Subject name required!');
    addSubject({ name, description });
    setName('');
    setDescription('');
    toast.success('Subject added!');
  }

  return (
    <div>
      <h2 style={styles.heading}>📖 Subjects</h2>

      {/* Add Subject Form */}
      <div style={styles.formCard}>
        <h4 style={{ marginBottom: '12px', color: '#333' }}>Add New Subject</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input placeholder="Subject name" value={name}
            onChange={(e) => setName(e.target.value)} style={styles.input} />
          <input placeholder="Description (optional)" value={description}
            onChange={(e) => setDescription(e.target.value)} style={{ ...styles.input, width: '220px' }} />
          <button onClick={handleAddSubject} style={styles.btn}>+ Add Subject</button>
        </div>
      </div>

      {subjects.length === 0 && (
        <p style={{ color: '#888', marginTop: '20px' }}>No subjects yet. Add your first subject!</p>
      )}

      <div style={styles.grid}>
        {subjects.map((s) => <SubjectCard key={s.id} subject={s} addTopic={addTopic} toggleTopic={toggleTopic} />)}
      </div>
    </div>
  );
}

function SubjectCard({ subject, addTopic, toggleTopic }) {
  const [topicInput, setTopicInput] = useState('');
  const done = subject.topics.filter((t) => t.status === 'Done').length;

  return (
    <div style={styles.card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong style={{ fontSize: '16px' }}>{subject.name}</strong>
          {subject.description && <p style={{ color: '#666', fontSize: '13px', margin: '2px 0 0' }}>{subject.description}</p>}
        </div>
        <span style={styles.badge}>{done}/{subject.topics.length} done</span>
      </div>

      <div style={{ marginTop: '12px' }}>
        {subject.topics.map((t) => (
          <div key={t.id} style={styles.topicRow}>
            <span style={{ textDecoration: t.status === 'Done' ? 'line-through' : 'none', color: t.status === 'Done' ? '#999' : '#333' }}>
              {t.name}
            </span>
            <button onClick={() => toggleTopic(subject.id, t.id)}
              style={{ ...styles.statusBtn, backgroundColor: t.status === 'Done' ? '#4caf50' : '#ff9800' }}>
              {t.status}
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        <input placeholder="New topic..." value={topicInput}
          onChange={(e) => setTopicInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { addTopic(subject.id, topicInput); setTopicInput(''); }}}
          style={{ ...styles.input, flex: 1 }} />
        <button onClick={() => { addTopic(subject.id, topicInput); setTopicInput(''); }} style={styles.btn}>+ Topic</button>
      </div>
    </div>
  );
}

const styles = {
  heading: { fontSize: '24px', marginBottom: '20px' },
  formCard: { backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '10px', marginBottom: '24px', border: '1px solid #e0e0e0' },
  grid: { display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' },
  card: { padding: '16px', border: '1px solid #e0e0e0', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' },
  input: { padding: '8px 12px', fontSize: '14px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none' },
  btn: { padding: '8px 16px', backgroundColor: '#1e1e2e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' },
  topicRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0f0f0' },
  statusBtn: { padding: '3px 10px', fontSize: '11px', border: 'none', borderRadius: '20px', color: 'white', cursor: 'pointer' },
  badge: { backgroundColor: '#e8f5e9', color: '#388e3c', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
};

export default Subjects;