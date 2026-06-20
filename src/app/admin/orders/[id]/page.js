import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { updateOrderStatus } from '../../actions';
import styles from './order.module.css';

export default async function OrderDetailsPage({ params }) {
  const { id } = await params;
  
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  if (!order) notFound();

  // Bind ID to server action
  const setStatus = updateOrderStatus.bind(null, id);

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Order Details</h1>
        <Link href="/admin/orders" className={styles.backLink}>&larr; Back to Orders</Link>
      </div>

      <div className={styles.grid}>
        {/* Customer & Order Info */}
        <div className={`${styles.card} glass`}>
          <h2>Order #{order.id.slice(0, 8)}</h2>
          <div className={styles.infoRow}>
            <span className={styles.label}>Date:</span>
            <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Status:</span>
            <span className={styles.statusBadge}>{order.status}</span>
          </div>

          <hr className={styles.divider} />
          
          <h3>Customer Info</h3>
          <div className={styles.infoRow}>
            <span className={styles.label}>Name:</span>
            <span>{order.customerName}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Email:</span>
            <span>{order.customerEmail}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Address:</span>
            <span>{order.customerAddress}</span>
          </div>

          <hr className={styles.divider} />
          
          <h3>Update Status</h3>
          <form action={async (formData) => {
            'use server';
            await setStatus(formData.get('status'));
          }} className={styles.statusForm}>
            <select name="status" defaultValue={order.status} className={styles.select}>
              <option value="PENDING">PENDING</option>
              <option value="PROCESSING">PROCESSING</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
            <button type="submit" className="btn-primary">Update</button>
          </form>
        </div>

        {/* Order Items */}
        <div className={`${styles.card} glass`}>
          <h2>Items Ordered</h2>
          <ul className={styles.itemList}>
            {order.items.map(item => (
              <li key={item.id} className={styles.item}>
                {item.product?.imageUrl ? (
                  <img src={item.product.imageUrl} alt={item.product.name} className={styles.itemThumb} />
                ) : (
                  <div className={styles.placeholderThumb}></div>
                )}
                <div className={styles.itemMeta}>
                  <p className={styles.itemName}>{item.product?.name || 'Unknown Product'}</p>
                  <p className={styles.itemPrice}>₹{item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <div className={styles.itemTotal}>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
          <hr className={styles.divider} />
          <div className={styles.totalRow}>
            <span>Total Amount:</span>
            <span className={styles.totalPrice}>₹{order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
