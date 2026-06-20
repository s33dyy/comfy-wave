import prisma from '@/lib/prisma';
import Link from 'next/link';
import { deleteProduct } from '../actions';
import styles from './page.module.css';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Products</h1>
        <Link href="/admin/products/new" className="btn-primary">Add Product</Link>
      </div>

      <div className={`${styles.card} glass`}>
        {products.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className={styles.thumb} />
                    ) : (
                      <div className={styles.thumbPlaceholder}></div>
                    )}
                  </td>
                  <td className={styles.productName}>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₹{product.price}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link href={`/admin/products/${product.id}/edit`} className={styles.editBtn}>Edit</Link>
                      <form action={async () => {
                        'use server';
                        await deleteProduct(product.id);
                      }}>
                        <button type="submit" className={styles.deleteBtn}>Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.empty}>No products found. Add your first product!</p>
        )}
      </div>
    </div>
  );
}
