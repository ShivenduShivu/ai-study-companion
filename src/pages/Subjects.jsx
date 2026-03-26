import { useState } from 'react';

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleAddSubject() {
    if (!name.trim()) return;
    setSubjects([...subjects, { id: Date.now(), name, description, topics: [] }]);
    setName('');
    setDescription('');
  }

  function handleAddTopic(subjectId, topicName) {
    if (!topicName.trim()) return;
    setSubjects(subjects.map((s) =>
      s.id === subjectId
        ? { ...s, topics: [...s.topics, { id: Date.now(), name: topicName, status: 'Pending' }] }
        : s
    ));
  }

  function toggleStatus(subjectId, topicId) {
    setSubjects(subjects.map((s) =>
      s.id === subjectId
        ? {
            ...s,
            topics: s.topics.map((t) =>
              t.id === topicId
                ? { ...t, status: t.status === 'Pending' ? 'Done' : 'Pending' }
                : t
            ),
          }
        : s
    ));
  }

  return (
    <div>
      <h2>📖 Subjects</h2>

      {/* Add Subject Form */}
      <div style={{ marginBottom: '20px' }}>
        <input
          placeholder="Subject name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAddSubject} style={styles.button}>Add Subject</button>
      </div>

      {subjects.length === 0 && <p>No subjects yet. Add one!</p>}

      {/* Subject Cards */}
      {subjects.map((s) => (
        <SubjectCard
          key={s.id}
          subject={s}
          onAddTopic={handleAddTopic}
          onToggleStatus={toggleStatus}
        />
      ))}
    </div>
  );
}

// --- SubjectCard as a separate mini-component ---
function SubjectCard({ subject, onAddTopic, onToggleStatus }) {
  const [topicInput, setTopicInput] = useState('');

  return (
    <div style={styles.card}>
      <strong style={{ fontSize: '16px' }}>{subject.name}</strong>
      <p style={{ margin: '4px 0 10px', color: '#555' }}>{subject.description}</p>

      {/* Topics List */}
      {subject.topics.map((t) => (
        <div key={t.id} style={styles.topicRow}>
          <span>{t.name}</span>
          <button onClick={() => onToggleStatus(subject.id, t.id)} style={styles.statusBtn(t.status)}>
            {t.status}
          </button>
        </div>
      ))}

      {/* Add Topic */}
      <div style={{ marginTop: '10px' }}>
        <input
          placeholder="Add topic..."
          value={topicInput}
          onChange={(e) => setTopicInput(e.target.value)}
          style={{ ...styles.input, width: '160px' }}
        />
        <button
          onClick={() => { onAddTopic(subject.id, topicInput); setTopicInput(''); }}
          style={styles.button}
        >
          + Topic
        </button>
      </div>
    </div>
  );
}

const styles = {
  input: {
    padding: '8px',
    marginRight: '10px',
    marginBottom: '10px',
    width: '200px',
    fontSize: '14px',
  },
  button: {
    padding: '8px 14px',
    backgroundColor: '#1e1e2e',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
  card: {
    padding: '14px',
    border: '1px solid #ccc',
    marginBottom: '14px',
    borderRadius: '6px',
    maxWidth: '450px',
  },
  topicRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6px 0',
    borderBottom: '1px solid #eee',
  },
  statusBtn: (status) => ({
    padding: '4px 10px',
    fontSize: '12px',
    cursor: 'pointer',
    backgroundColor: status === 'Done' ? '#4caf50' : '#ff9800',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  }),
};

export default Subjects;