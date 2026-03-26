function Dashboard({ tasks = [] }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div>
      <h2>🏠 Dashboard</h2>
      <div style={styles.grid}>
        <div style={styles.card('#1e1e2e')}>
          <h3>Total Tasks</h3>
          <p style={styles.number}>{total}</p>
        </div>
        <div style={styles.card('#4caf50')}>
          <h3>Completed</h3>
          <p style={styles.number}>{completed}</p>
        </div>
        <div style={styles.card('#ff9800')}>
          <h3>Pending</h3>
          <p style={styles.number}>{pending}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  grid: { display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' },
  card: (bg) => ({
    backgroundColor: bg,
    color: 'white',
    padding: '24px 32px',
    borderRadius: '8px',
    minWidth: '150px',
    textAlign: 'center',
  }),
  number: { fontSize: '40px', fontWeight: 'bold', margin: '8px 0 0' },
};

export default Dashboard;