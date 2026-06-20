import { createProduct } from '../../actions';
import Link from 'next/link';
import styles from '../form.module.css';

export default function AddProductPage() {
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Add New Product</h1>
        <Link href="/admin/products" className={styles.backLink}>&larr; Back to Products</Link>
      </div>

      <div className={`${styles.card} glass`}>
        <form action={createProduct} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Product Name</label>
            <input name="name" required />
          </div>
          <div className={styles.inputGroup}>
            <label>Description</label>
            <textarea name="description" rows="4" required></textarea>
          </div>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Price (₹)</label>
              <input type="number" step="0.01" name="price" required />
            </div>
            <div className={styles.inputGroup}>
              <label>Category</label>
              <input name="category" required />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>Image URL</label>
            <input type="url" name="imageUrl" placeholder="https://..." required />
          </div>
          
          <button type="submit" className="btn-primary" style={{marginTop: '1rem'}}>
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
}
