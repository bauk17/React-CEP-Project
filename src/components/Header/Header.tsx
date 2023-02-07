import styles from "./Header.module.css";

export const Header = () => {
  return (
    <div>
      <div className={styles.containerHeader}>
        <h1>Buscar Cep</h1>
        <hr />
      </div>
    </div>
  );
};
