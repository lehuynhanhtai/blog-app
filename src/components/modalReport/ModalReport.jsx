import styles from "./modalReport.module.css";

const ModalReport = (modleReport) => {
  const handleClose = () => {
    modleReport;
  };
  return (
    <div className={styles.modal}>
      <div className={styles.overlay}></div>
      <div className={styles.modalContent}>
        <h2>Hello Modal</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          perferendis suscipit officia recusandae, eveniet quaerat assumenda id
          fugit, dignissimos maxime non natus placeat illo iusto! Sapiente
          dolorum id maiores dolores? Illum pariatur possimus quaerat ipsum quos
          molestiae rem aspernatur dicta tenetur. Sunt placeat tempora vitae
          enim incidunt porro fuga ea.
        </p>
        <button className={styles.closeModal} onClick={handleClose}>
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default ModalReport;
