import prisma from '@/lib/prisma';
import Link from 'next/link';
import styles from '../products/page.module.css'; // Reusing table styles

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Orders</h1>
      </div>

      <div className={`${styles.card} glass`}>
        {orders.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id.slice(0, 8)}...</td>
                  <td>
                    {order.customerName}
                    <br />
                    <small style={{ color: 'var(--secondary-text)' }}>{order.customerEmail}</small>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>₹{order.total.toFixed(2)}</td>
                  <td>
                    <span className={styles.statusBadge} data-status={order.status}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link href={`/admin/orders/${order.id}`} className={styles.editBtn}>View Details</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.empty}>No orders found. Wait for customers to check out!</p>
        )}
      </div>
    </div>
  );
}
