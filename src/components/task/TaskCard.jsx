import styles from './TaskCard.module.css'
import { FaTrash, FaRegSquare } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { BsFillCheckSquareFill} from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";

import { useEffect, useState } from 'react';


function TaskCard({ name, id, importance, handleRemove }) {

    const [showSelect, setShowSelect] = useState(false)
    const [textDecoration, setTextDecoration] = useState("none")
    const [check, setCheck] = useState(true)
    const [color, setColor] = useState('')

    useEffect(() => {
      const className = importance.toLowerCase().replace(' ', ''); // Remova o espaço
      setColor(className);
  }, [importance]);

    function toggleChange() {
        setShowSelect(!showSelect)
    }

    const remove = (e) => {
        handleRemove(id)
    }

    function toggleChangeText(){
      if(textDecoration === 'none') {
        console.log(color)
        setTextDecoration('line_through')
        setCheck(false)
      }
      else {
        setTextDecoration('none')
        setCheck(true)
      }
    }


    return (
      <div className={styles.task_card}>
        <button onClick={remove}>
          <FaTrash />
        </button>
        <div className={styles.task_details} onClick={toggleChange}>
          <button>
            {!showSelect ? <FaRegSquare /> : <BsFillCheckSquareFill />}
          </button>
          <h4 className={styles[textDecoration]} >{name}</h4>
          <span className={styles[color]}></span>
          <button onClick={toggleChangeText}>{!showSelect ? <></> :  (check? <FaCheck /> : <IoClose />) }</button>
        </div>
      </div>
    );
}

export default TaskCard