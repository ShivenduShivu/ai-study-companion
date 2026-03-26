import { useState } from 'react';

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleAdd() {
    if (!name.trim()) return;
    setSubjects([...subjects, { id: Date.now(), name, description }]);
    setName('');
    setDescription('');
  }

  return (
    <div>
      <h2>📖 Subjects</h2>

      {/* Form */}
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
        <button onClick={handleAdd} style={styles.button}>Add Subject</button>
      </div>

      {/* List */}
      {subjects.length === 0 && <p>No subjects yet. Add one!</p>}
      {subjects.map((s) => (
        <div key={s.id} style={styles.card}>
          <strong>{s.name}</strong>
          <p style={{ margin: '4px 0 0' }}>{s.description}</p>
        </div>
      ))}
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
    padding: '8px 16px',
    backgroundColor: '#1e1e2e',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
  card: {
    padding: '12px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    borderRadius: '6px',
    maxWidth: '400px',
  },
};

export default Subjects;