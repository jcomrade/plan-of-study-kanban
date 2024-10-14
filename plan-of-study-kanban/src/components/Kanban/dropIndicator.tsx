import styles from "@/styles/global.module.scss";

export const DropIndicator = ({ beforeId, column }) => {
    return (
      <div
        data-before={beforeId || "-1"}
        data-column={column}
        className={styles.dropIndicator}
      />
    );
  };
  
  export default DropIndicator;