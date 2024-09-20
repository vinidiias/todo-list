import styles from './Select.module.css'

function Select({ name, text, options, handleOnChange, value}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select
            name={name}
            id={name}
            onChange={handleOnChange}
            value={value || ''}
            >
                <option>Selecione o grau de importância</option>
                    {options.map((option) => (
                        <option value={option.id} key={option.id}>
                            {option.name}
                        </option>
                    ))}
            </select>
        </div>
    )
}

export default Select