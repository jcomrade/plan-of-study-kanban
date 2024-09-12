import DropIndicator from "./dropIndicator";
import { motion } from "framer-motion";
import card from "../../styles/card.module.scss"

export const Card = ({ courseDescription, id, column, courseCode, units, status, preRequisite, handleDragStart }) => {
    return (
      <div className={card.container}>
        <DropIndicator beforeId={id} column={column} />
        <motion.div
          layout
          layoutId={id}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, { courseDescription, id, column })}
          className={card.draggableItem}
        >
          <div className={card.header}>
            <div className={card.title}>{courseCode}</div>
            <div className={card.units}>{units} u</div>
          </div>
          <div className={card.content}>
            <p className={card.titleText}>{courseDescription}</p>
          </div>
          <div className={card.footer}>
            <p className={card.icon}>Icon</p>
            <p className={card.status}>Status : {status}</p>
          </div>
        </motion.div>
      </div>
    );
  };

export default Card;