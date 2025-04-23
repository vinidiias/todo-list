import styles from './SubmiteButton.module.css'

function SubmiteButton({ text , styleSubmit}) {
    return (
        <div className={`${styles[styleSubmit]}`}>
            <button className={styles.btn}>{text}</button>
        </div>
    )
}

export default SubmiteButton