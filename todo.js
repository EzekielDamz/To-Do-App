const submiit = document.querySelector(".submit");
const input = document.querySelector(".input-field");
const list = document.querySelector(".list");

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQbiisP41DcsnhB3XCRH0Lmp9lwSYt_Xk",
  authDomain: "new-to-do-project.firebaseapp.com",
  databaseURL: "https://new-to-do-project-default-rtdb.firebaseio.com",
  projectId: "new-to-do-project",
  storageBucket: "new-to-do-project.appspot.com",
  messagingSenderId: "337768432690",
  appId: "1:337768432690:web:d457aba7802b5877ea282b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Config Firestore
const db = getFirestore(app);

// Collection reference
const userCollection = collection(db, "users");

async function addData() {
  const inputItem = input.value.trim();
  if (inputItem ) {
      const docRef = await addDoc(userCollection, {
        items: inputItem,
      })
        .then((docRef) => {
          console.log("Document written with ID:", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document:", error);
        });
      input.value = "";
      // Retrieve and render all documents
      renderTodoItems();
  }
  else {
    alert("input field can not be empty")
 }
}

async function renderTodoItems() {
  // Clear existing list
  list.innerHTML = "";

  const querySnapshot = await getDocs(userCollection);

  querySnapshot.forEach((doc) => {
    const li = document.createElement("li");
    li.textContent = doc.data().items;
    list.appendChild(li);

    const updateBtn = document.createElement("button");

    updateBtn.className = "update-btn"
    updateBtn.textContent = " update";
  

    li.appendChild(updateBtn);
    updateBtn.addEventListener("click", () => {
      updateData(doc.id);
    });

    // Add delete icon
    const deleteIcon = document.createElement("span");
    deleteIcon.innerHTML = `<i class="fa fa-trash-o" aria-hidden="true"></i>`;
    deleteIcon.addEventListener("click", () => deleteData(doc.id));
    li.appendChild(deleteIcon);
  });
}

async function deleteData(docList) {
  await deleteDoc(doc(userCollection, docList));
  renderTodoItems(); // Refresh the list after deletion
}

// ////// Updating the input field

async function updateData(docId) {
  const updatedTodo = await prompt("Enter the updated todo:");
  if (updatedTodo !== null && updatedTodo !== undefined) {
    const updateListIndb = doc(userCollection, docId);
    await updateDoc(updateListIndb, {
      items: updatedTodo,
    });
    renderTodoItems();
  } else {
    alert("data not updated");
  }
}

// Event listener for the submit button
submiit.addEventListener("click", addData)
