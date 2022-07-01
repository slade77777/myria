import clsx from 'clsx';
import styles from './styles.module.css';

const Overlay: React.FC<{
  className?: string;
}> = ({ children, ...rest }) => {
  return <div className={clsx(styles.root, rest?.className)}>{children}</div>;
};

export default Overlay;
