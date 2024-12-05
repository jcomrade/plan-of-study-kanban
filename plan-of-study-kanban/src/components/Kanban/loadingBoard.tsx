import styles from "@/styles/global.module.scss";

export default function LoadingKanban({ name }: any) {
  return (
    <div className={styles.homeLoading}>
      <h1>Loading {name} . . .</h1>
    </div>
  );
}
