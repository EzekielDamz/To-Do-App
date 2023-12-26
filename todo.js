import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  databaseURL: "https://to-do-app-project-ef94b-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const todoListRef = ref(database, "TodoList");

// DOM elements
const inputField = document.querySelector(".input-field");
const submitBtn = document.querySelector(".submit");
const list = document.querySelector(".list");
const numOfTask = document.querySelector(".task");
const checkListedEl = document.querySelector(".check-listed");
// const listEl = document.querySelector(".check");

// Event listeners
submitBtn.addEventListener("click", function (e) {
  showInput();
  e.preventDefault();
});

checkListedEl.addEventListener("click", listAllDataFromDB);

// Function to list all data from the database
function listAllDataFromDB() {
  onValue(todoListRef, function (snapshot) {
    list.innerHTML = ""; // Clear existing list
    const myList = Object.entries(snapshot.val() || {});

    myList.forEach((item) => {
      const listID = item[0];
      const listValue = item[1];

      console.log(listValue);
      const newEl = document.createElement("li");

      // console.log(listID)
      newEl.textContent = listValue;

      list.appendChild(newEl);

        newEl.addEventListener("click", function () {
          let removeListItems = ref(database, `TodoList/${listID}`);
          remove(removeListItems);
        });
    });
  });

}

// Function to display input and push to Firebase
function showInput() {
  const showListEl = inputField.value.trim();

  if (showListEl) {
    push(todoListRef, showListEl);

    // Create and append list item
    const li = document.createElement("li");

    li.textContent = showListEl;
    list.appendChild(li);

    // Clear input field
    inputField.value = "";

    // Increase task count
    increaseTask();
  } else {
    // newEltextContent = "";
    alert("Input field cannot be empty");
  }
}

// Function to increase task count
function increaseTask() {
  numOfTask.textContent = parseInt(numOfTask.textContent) + 1;
}

// //////// Linking database to the project

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

// import {
//   getDatabase,
//   ref,
//   push,
//   onValue,
// } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// const appSettings = {
//   databaseURL: "https://to-do-app-project-ef94b-default-rtdb.firebaseio.com/",
// };
// const data = initializeApp(appSettings);
// const database = getDatabase(data);
// const todoListInDB = ref(database, "TodoList");

// const input = document.querySelector(".input-field");
// const submitBtn = document.querySelector(".submit");
// const list = document.querySelector(".list");
// const numOfTask = document.querySelector(".task");
// const checkListedEl = document.querySelector(".check-listed");
// const listEl = document.querySelector(".check");
// // const El = document.querySelector(".EL")
// //        A submit function

// submitBtn.addEventListener("click", function (e) {
//   showInput();
//   e.preventDefault();
// });

// checkListedEl.addEventListener("click", function () {
//   listAllDataFromDB();
//   listEl.style.display = "block";
// });

// function listAllDataFromDB(items) {
//   // //// FETCHING DATA FROM THE DATABASE

//          const newEl = document.createElement("li");
//          listEl.append(newEl);
//   let itemsValues = items[1]

//   newEl.innerHTML = itemsValues

// }

// // A function a that show how the content are displayed
// function showInput() {
//   const li = document.createElement("li");
//   list.appendChild(li);

//   li.style.backgroundColor = "grey";
//   li.style.color = "#fff";

//   const showListEl = input.value;
//   ////// PUSH YOUR LIST TO FIREBASE
//   push(todoListInDB, showListEl);

//    onValue(todoListInDB, function (snapshot) {
//      let myList = Object.entries(snapshot.val());
//      for (let i = 0; i < myList.length; i++) {
//        let displayListDB = myList[i];

//        let listValue = displayListDB[1];

//        console.log(displayListDB);

//   listAllDataFromDB(displayListDB);

//        // clearListedChecked();
//      }
//    });
//   // upload the items in the li
//   if (showListEl) {
//     li.innerHTML = `
//         ${showListEl}
//        `;
//     listEl.style.display = "none";

//     // console.log(todoListInDB, showListEl)
//     // creating  a delete button with createElement
//     // const deleteIcon = document.createElement("span");
//     // deleteIcon.innerHTML = `<i class="fa fa-trash-o" aria-hidden="true" ></i>`;
//     // styling the delete button

//     // deleteIcon.style.cursor = "pointer ";
//     // li.appendChild(deleteIcon);
//     //////////////////////////////// DELETE BUTTON//////////////////////////
//     deleteIcon.addEventListener("click", function () {
//       li.remove();

//       // ///////////////////////REDUCE TASK//////////////////////////////
//       function reduceTask() {
//         let number = count-- - 2;
//         numOfTask.textContent = number;
//       }
//       reduceTask();
//     });

//     input.value = "";
//   } else {
//     list.style.display = "none";
//     alert("input field can be empty");
//   }

//   increaseTask();
// }

// function clearListedChecked() {
//   newEl.textContent = "";
// }

// // ///////////////////////////////////////COUNT TASK/////////////////////////////////////

// let count = 1;
// function increaseTask() {
//   let number = count++;
//   numOfTask.textContent = number;
// }
