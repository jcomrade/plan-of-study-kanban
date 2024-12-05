import { useState } from "react";
import DropIndicator from "./dropIndicator";
import SubjectCard from "./card";
import AddCard from "./addCard";
import styles from "@/styles/global.module.scss";
import { IconContext } from "react-icons";
import { RiExpandRightFill } from "react-icons/ri";

export const Column = ({
  title,
  headingColor,
  currentSemester,
  cards,
  column,
  setCards,
}: any) => {
  const [active, setActive] = useState(false);
  const [hideColumn, setHideColumn] = useState(false);
  const handleDragStart = (e: any, card: any) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: any) => {
    const cardId = e.dataTransfer.getData("cardId");
    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = {
        ...cardToTransfer,
        column,
        status:
          title == currentSemester &&
          !(cardToTransfer.status == "Passed") &&
          !(cardToTransfer.status == "Failed")
            ? "Ongoing"
            : cardToTransfer.status == "Passed" ||
              cardToTransfer.status == "Failed"
            ? cardToTransfer.status
            : "Future",
      };
      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }
      setCards(copy);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els: any) => {
    const indicators = els || getIndicators();

    indicators.forEach((i: any) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: any) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: any, indicators: any) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights(false);
    setActive(false);
  };

  const filteredCards = cards.filter((c: any) => c.column == column);

  const subjectsUnitsSum = filteredCards.reduce(
    (sum: any, c: any) => sum + c.units,
    0
  ); // Sum up the units of the filtered cards
  return !hideColumn ? (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h3>{title}</h3>
          {title == currentSemester && <h3>(Ongoing Semester)</h3>}
        </div>
        <span className={styles.count}>{subjectsUnitsSum} u</span>
        <span
          onMouseDown={() => setHideColumn(true)}
          className={styles.hideButton}
        >
          -
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`${styles.content} ${
          active ? styles.active : styles.inactive
        }`}
      >
        {filteredCards.map((c: any, index: any) => {
          const card = {
            ...c,
            status:
              title == currentSemester &&
              !(c.status == "Passed") &&
              !(c.status == "Failed")
                ? "Ongoing"
                : c.status == "Passed" || c.status == "Failed"
                ? c.status
                : "Future",
          };
          return (
            <SubjectCard
              key={`${c.courseCode}${c.message ? c.message : ""}`}
              {...card}
              draggable={
                c.status == "Failed" || c.status == "Passed" ? false : true
              }
              handleDragStart={handleDragStart}
            />
          );
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  ) : (
    <div className={styles.hiddenColumn}>
      <div
        className={styles.expandIcon}
        onMouseDown={() => setHideColumn(false)}
      >
        <IconContext.Provider value={{ className: styles.icon }}>
          <RiExpandRightFill />
        </IconContext.Provider>
      </div>
      <div className={styles.line}></div>
    </div>
  );
};

export default Column;
