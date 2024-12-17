import { useEffect, useState } from "react";
import styles from "./Book.module.scss";

function Book({ book }) {
  const [image, setImage] = useState("");
  useEffect(() => {
    fetch(`http://localhost:8081/api/file/preview/${book.bookImage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Ảnh có trên cloud");
          return response.json();
        } else {
          throw new Error("Ảnh chưa có trên cloud hoặc server có lỗi.");
        }
      })
      .then((result) => {
        setImage(result.result);
      })
      .catch((e) => {
        console.log("Ảnh chưa có trên cloud");
      });
  }, [book.bookImage]);
  return (
    <div className={styles.item}>
      <div className={styles.rank}>{book.id}</div>
      <div className={styles.imageContainer}>
        <img src={image} alt={book.bookName} />
        <div className={styles.overlay}>
          {/* <h3>{book.bookName}</h3> */}
          {/* <span>{book.bookName}</span> */}
        </div>
      </div>
    </div>
  );
}

export default Book;
