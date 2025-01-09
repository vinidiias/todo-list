import styles from './Loading.module.css'
import loading from '../../assets/loading.svg'

const Loading = () => {
    return (
      <div className={styles.loading}>
        <img src={loading} alt="Loading" />
      </div>
    );
}

export default Loading