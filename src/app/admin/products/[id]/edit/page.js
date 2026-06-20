import { updateProduct } from '../../actions';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from '../form.module.css';

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) notFound();

  // We bind the ID so the server action receives it as the first argument
  const updateProductWithId = updateProduct.bind(null, id);

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Edit Product</h1>
        <Link href="/admin/products" className={styles.backLink}>&larr; Back to Products</Link>
      </div>

      <div className={`${styles.card} glass`}>
        <form action={updateProductWithId} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Product Name</label>
            <input name="name" defaultValue={product.name} required />
          </div>
          <div className={styles.inputGroup}>
            <label>Description</label>
            <textarea name="description" rows="4" defaultValue={product.description} required></textarea>
          </div>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Price (₹)</label>
              <input type="number" step="0.01" name="price" defaultValue={product.price} required />
            </div>
            <div className={styles.inputGroup}>
              <label>Category</label>
              <input name="category" defaultValue={product.category} required />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>Image URL</label>
            <input type="url" name="imageUrl" defaultValue={product.imageUrl} required />
          </div>
          
          <button type="submit" className="btn-primary" style={{marginTop: '1rem'}}>
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
