import { useTasks } from '../hooks/useTasks';

function Revision() {
  const { completed, overdue } = useTasks();

  const revisionList = completed.filter((t) => t.deadline);

  return (
    <div>
      <h2 style={styles.heading}>🔄 Revision Planner</h2>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        Topics to revise are based on your completed tasks.
      </p>

      {overdue.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ ...styles.sectionTitle, color: '#f44336' }}>🚨 Overdue Tasks — Revise Now!</h3>
          {overdue.map((t) => (
            <div key={t.id} style={{ ...styles.card, borderLeft: '4px solid #f44336' }}>
              <strong>{t.title}</strong>
              <div style={styles.meta}>
                {t.subject && <span>📚 {t.subject}</span>}
                <span style={{ color: '#f44336' }}>📅 Due: {t.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <h3 style={styles.sectionTitle}>✅ Completed — Schedule Revision</h3>
      {revisionList.length === 0 && (
        <p style={{ color: '#888' }}>No completed tasks yet. Complete tasks to plan revision!</p>
      )}
      {revisionList.map((t) => {
        const completedDate = new Date(t.deadline);
        const revisionDate = new Date(completedDate);
        revisionDate.setDate(revisionDate.getDate() + 3);
        const isRevisionDue = new Date() >= revisionDate;

        return (
          <div key={t.id} style={{ ...styles.card, borderLeft: `4px solid ${isRevisionDue ? '#ff9800' : '#4caf50'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{t.title}</strong>
              <span style={{ ...styles.badge, backgroundColor: isRevisionDue ? '#fff3e0' : '#e8f5e9', color: isRevisionDue ? '#e65100' : '#2e7d32' }}>
                {isRevisionDue ? '⚠️ Revise Now' : '✅ On Track'}
              </span>
            </div>
            <div style={styles.meta}>
              {t.subject && <span>📚 {t.subject}</span>}
              <span>📅 Revision due: {revisionDate.toDateString()}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  heading: { fontSize: '24px', marginBottom: '8px' },
  sectionTitle: { fontSize: '17px', marginBottom: '12px', color: '#333' },
  card: { padding: '14px 16px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', maxWidth: '560px' },
  meta: { display: 'flex', gap: '16px', marginTop: '6px', fontSize: '13px', color: '#777' },
  badge: { padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
};

export default Revision;