import { Link, useLocation } from 'react-router-dom';
import { MdDashboard, MdBook, MdCheckBox, MdRefresh, MdSmartToy } from 'react-icons/md';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: <MdDashboard /> },
  { path: '/subjects', label: 'Subjects', icon: <MdBook /> },
  { path: '/tasks', label: 'Tasks', icon: <MdCheckBox /> },
  { path: '/revision', label: 'Revision', icon: <MdRefresh /> },
  { path: '/ai-tools', label: 'AI Tools', icon: <MdSmartToy /> },
];

function Navbar() {
  const location = useLocation();

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>📚 Study Companion</div>
      <div style={styles.links}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...styles.link,
              backgroundColor: location.pathname === item.path ? '#3b3b5c' : 'transparent',
              borderRadius: '6px',
            }}
          >
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 32px',
    backgroundColor: '#1e1e2e',
    color: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
  },
  logo: { fontSize: '20px', fontWeight: 'bold', letterSpacing: '0.5px' },
  links: { display: 'flex', gap: '8px' },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px',
    padding: '8px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'background 0.2s',
  },
};

export default Navbar;