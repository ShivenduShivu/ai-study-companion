import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '24px' }}>
        {children}
      </main>
    </div>
  );
}

export default Layout;