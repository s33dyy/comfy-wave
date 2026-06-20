import prisma from '@/lib/prisma';
import styles from './page.module.css';

export default async function AdminDashboard() {
  const productCount = await prisma.product.count();
  const orderCount = await prisma.order.count();
  
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { items: true }
  });

  return (
    <div>
      <h1 className={styles.pageTitle}>Dashboard Overview</h1>
      
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} glass`}>
          <h3>Total Products</h3>
          <p className={styles.statValue}>{productCount}</p>
        </div>
        <div className={`${styles.statCard} glass`}>
          <h3>Total Orders</h3>
          <p className={styles.statValue}>{orderCount}</p>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Recent Orders</h2>
      <div className={`${styles.ordersCard} glass`}>
        {recentOrders.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id.slice(0, 8)}...</td>
                  <td>{order.customerName}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>₹{order.total.toFixed(2)}</td>
                  <td><span className={styles.statusBadge}>{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.empty}>No recent orders.</p>
        )}
      </div>
    </div>
  );
}
