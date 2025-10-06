import styles from './styles.module.scss';
import { useUserStore } from '@/stores';
import { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  const user = useUserStore((s) => s.user);

  return (
    <article className={styles.card}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.thumb}
      />
      <div className={styles.body}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.price}>${product.price}</p>
        {user && <button className={styles.add}>Add to cart</button>}
      </div>
    </article>
  );
}
