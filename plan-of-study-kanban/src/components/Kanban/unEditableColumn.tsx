import StudentCard from "./card";
import AddCard from "./addCard";
import styles from "@/styles/global.module.scss";

export const Column = ({ title, headingColor, cards, column, setCards }:any) => {
  const filteredCards = cards.filter((c:any) => c.column === column);

  const subjectsUnitsSum = filteredCards.reduce((sum:any, c:any) => sum + c.units, 0); // Sum up the units of the filtered cards

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <span className={styles.count}>{subjectsUnitsSum} u</span>
      </div>
      <div
        className={`${styles.content}`}
      >
        {filteredCards.map((c:any) => {
          return <StudentCard key={c.id} {...c} draggable={false}/>;
        })}
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

export default Column;
