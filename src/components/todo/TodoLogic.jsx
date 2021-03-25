import { firestore } from "../../firebase";

const TodoLogic = (text, completed, id, timestamp, user) => {
  const db = firestore.collection("users").doc(user?.uid);

  const handleDelete = () => {
    db.collection("todos")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const handleCompleted = () => {
    db.collection("todos").doc(id).update({
      todo: text,
      completed: !completed,
      timestamp: timestamp,
    });
  };

  return { handleDelete, handleCompleted };
};

export default TodoLogic;
