import { db } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc as firestoreDoc
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const textInput = document.getElementById("taskInput");
const addButton = document.getElementById("addBtn");
const list = document.getElementById("taskList");

const selectAllBtn = document.getElementById("showAll");
const markActiveBtn = document.getElementById("showActive");
const markCompletedBtn = document.getElementById("showCompleted");
const deleteBtn = document.getElementById("deleteSelected");

async function loadTasks() {
  list.innerHTML = "";
  try {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    snapshot.forEach((d) => {
      const data = d.data();
      const li = document.createElement("li");

      li.dataset.text = data.text;
      li.dataset.id = d.id;

      li.classList.toggle("completed", !!data.completed);
      li.classList.toggle("important", !!data.priority);

      li.textContent = data.text + (data.completed ? " ✅" : "");

      li.addEventListener("click", () => {
        li.classList.toggle("selected");
      });

      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error reading tasks:", err);
  }
}

addButton.addEventListener("click", async () => {
  const taskText = textInput.value.trim();
  if (!taskText) return;
  textInput.value = "";

  try {
    await addDoc(collection(db, "tasks"), {
      text: taskText,
      completed: false,
      priority: false,
      createdAt: new Date()
    });
    await loadTasks();
  } catch (err) {
    console.error("Firestore write failed:", err);
  }
});

selectAllBtn.addEventListener("click", () => {
  const items = Array.from(list.querySelectorAll("li"));
  const anyNotSelected = items.some((li) => !li.classList.contains("selected"));
  items.forEach((li) => {
    if (anyNotSelected) li.classList.add("selected");
    else li.classList.remove("selected");
  });
});

markActiveBtn.addEventListener("click", async () => {
  const selected = Array.from(list.querySelectorAll("li.selected"));
  await Promise.all(selected.map(async (li) => {
    const id = li.dataset.id;
    const currentlyImportant = li.classList.contains("important");
    const newPriority = !currentlyImportant;
    try {
      await updateDoc(firestoreDoc(db, "tasks", id), { priority: newPriority });
      li.classList.toggle("important", newPriority);
      li.classList.remove("selected");
    } catch (err) {
      console.error("Error toggling active/priority:", err);
    }
  }));
});

markCompletedBtn.addEventListener("click", async () => {
  const selected = Array.from(list.querySelectorAll("li.selected"));
  await Promise.all(selected.map(async (li) => {
    const id = li.dataset.id;
    const currentlyCompleted = li.classList.contains("completed");
    const newCompleted = !currentlyCompleted;
    try {
      await updateDoc(firestoreDoc(db, "tasks", id), { completed: newCompleted });
      li.classList.toggle("completed", newCompleted);
      if (newCompleted) {
        li.textContent = li.dataset.text + " ✅";
      } else {
        li.textContent = li.dataset.text;
      }
      li.classList.remove("selected");
    } catch (err) {
      console.error("Error toggling completed:", err);
    }
  }));
});

deleteBtn.addEventListener("click", async () => {
  const selected = Array.from(list.querySelectorAll("li.selected"));
  await Promise.all(selected.map(async (li) => {
    const id = li.dataset.id;
    try {
      await deleteDoc(firestoreDoc(db, "tasks", id));
      li.remove();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  }));
});

loadTasks();