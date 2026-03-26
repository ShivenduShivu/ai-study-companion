import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>📚 Study Companion</div>
      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/subjects" style={styles.link}>Subjects</Link>
        <Link to="/tasks" style={styles.link}>Tasks</Link>
        <Link to="/revision" style={styles.link}>Revision</Link>
        <Link to="/ai-tools" style={styles.link}>AI Tools</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: '#1e1e2e',
    color: 'white',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '15px',
  },
};

export default Navbar;