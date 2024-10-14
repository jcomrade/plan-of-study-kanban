"use client";
//Components
import Board from "@/components/Kanban/board";
//Styles
import styles from "@/styles/global.module.scss";

const CustomKanban = () => {
  return (
    <div className={styles.fullScreenBackground}>
      <Board />
    </div>
  );
};

export default CustomKanban;
