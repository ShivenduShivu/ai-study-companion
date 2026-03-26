import { useTasks } from '../hooks/useTasks';
import { useSubjects } from '../hooks/useSubjects';

function Dashboard() {
  const { tasks, completed, pending, overdue } = useTasks();
  const { subjects } = useSubjects();

  const stats = [
    { label: 'Total Tasks', value: tasks.length, color: '#1e1e2e', icon: '📋' },
    { label: 'Completed', value: completed.length, color: '#4caf50', icon: '✅' },
    { label: 'Pending', value: pending.length, color: '#ff9800', icon: '⏳' },
    { label: 'Overdue', value: overdue.length, color: '#f44336', icon: '🚨' },
  ];

  return (
    <div>
      <h2 style={styles.heading}>🏠 Dashboard</h2>
      <p style={{ color: '#666', marginBottom: '24px' }}>Welcome back! Here's your study overview.</p>

      {/* Stat Cards */}
      <div style={styles.grid}>
        {stats.map((s) => (
          <div key={s.label} style={{ ...styles.card, backgroundColor: s.color }}>
            <div style={{ fontSize: '28px' }}>{s.icon}</div>
            <div style={styles.statNumber}>{s.value}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Subjects Summary */}
      {subjects.length > 0 && (
        <div style={{ marginTop: '36px' }}>
          <h3 style={styles.sectionTitle}>📖 Subjects Overview</h3>
          <div style={styles.subjectGrid}>
            {subjects.map((s) => {
              const done = s.topics.filter((t) => t.status === 'Done').length;
              const total = s.topics.length;
              const pct = total ? Math.round((done / total) * 100) : 0;
              return (
                <div key={s.id} style={styles.subjectCard}>
                  <strong>{s.name}</strong>
                  <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 10px' }}>
                    {done}/{total} topics done
                  </p>
                  <div style={styles.progressBar}>
                    <div style={{ ...styles.progressFill, width: `${pct}%` }} />
                  </div>
                  <span style={{ fontSize: '12px', color: '#888' }}>{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Tasks */}
      {tasks.length > 0 && (
        <div style={{ marginTop: '36px' }}>
          <h3 style={styles.sectionTitle}>📝 Recent Tasks</h3>
          {tasks.slice(-3).reverse().map((t) => (
            <div key={t.id} style={styles.taskRow}>
              <span style={{ textDecoration: t.completed ? 'line-through' : 'none', color: t.completed ? '#999' : '#000' }}>
                {t.title}
              </span>
              <span style={styles.badge(t.priority)}>{t.priority}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  heading: { fontSize: '24px', marginBottom: '6px' },
  grid: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  card: {
    color: 'white',
    padding: '20px 28px',
    borderRadius: '10px',
    minWidth: '140px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  statNumber: { fontSize: '36px', fontWeight: 'bold', margin: '6px 0 4px' },
  statLabel: { fontSize: '13px', opacity: 0.9 },
  sectionTitle: { fontSize: '18px', marginBottom: '14px', color: '#333' },
  subjectGrid: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  subjectCard: {
    padding: '16px',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    minWidth: '180px',
    backgroundColor: '#fafafa',
  },
  progressBar: { height: '6px', backgroundColor: '#e0e0e0', borderRadius: '4px', marginBottom: '4px' },
  progressFill: { height: '100%', backgroundColor: '#4caf50', borderRadius: '4px', transition: 'width 0.3s' },
  taskRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 14px',
    borderRadius: '8px',
    marginBottom: '8px',
    backgroundColor: '#f5f5f5',
    maxWidth: '500px',
  },
  badge: (p) => ({
    padding: '2px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: p === 'High' ? '#f44336' : p === 'Medium' ? '#ff9800' : '#4caf50',
  }),
};

export default Dashboard;