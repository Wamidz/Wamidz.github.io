const textInput = document.getElementById("taskInput");
const addButton = document.getElementById("addBtn");
const list = document.getElementById("taskList");

let listArray = []

addButton.addEventListener("click", function () {
    listArray.push(textInput.value)
    console.log(listArray)
});