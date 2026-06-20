import Link from 'next/link';
import styles from './layout.module.css';

export const metadata = {
  title: 'Admin Dashboard | Comfywave',
};

export default function AdminLayout({ children }) {
  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Comfywave Admin</h2>
        </div>
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navLink}>Dashboard</Link>
          <Link href="/admin/products" className={styles.navLink}>Products</Link>
          <Link href="/admin/orders" className={styles.navLink}>Orders</Link>
        </nav>
        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.backLink}>&larr; Back to Store</Link>
        </div>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
