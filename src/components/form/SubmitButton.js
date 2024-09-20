import styles from './SubmiteButton.module.css'

function SubmiteButton({ text }) {
    return (
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    )
}

export default SubmiteButton