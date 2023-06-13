const addInput = document.querySelector("#add-input");
const addForm = document.querySelector(".add-todo");
const resetBtn = document.querySelector(".reset-btn");
const todoContainer = document.querySelector("#todo-container");
const addInput2 = document.querySelector("#add-input2");
const addInput3 = document.querySelector("#add-input3");
const addInput4 = document.querySelector("#add-input4");
const editInput = document.querySelector("#edit-input");
const editInput2 = document.querySelector("#edit-input2");
const editInput3 = document.querySelector("#edit-input3");
const editInput4 = document.querySelector("#edit-input4");
const editCancel = document.querySelector("#edit-cancel");
const editSubmit = document.querySelector(".edit-submit");
const editModal = document.querySelector("#edit-modal");
const closeModal = document.querySelector("#close-modal");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(todos);

function good() {
  todoContainer.innerHTML = "";
  todos.forEach((item) => {
    todoContainer.innerHTML += `
    <div class="todo-item">
    <span>${item.name}</span>
    <span>${item.surname}</span>
    <span>${item.phone}</span>
    <img src="${item.url}" alt="" style ="width:100px; height: 100px; border-radius: 50%" >
    <div>
      <button id =${item.id} class="edit-btn">Edit</button>
      <button id =${item.id} class="delete-btn">Delete</button>
    </div>
  </div>
        `;
    console.log(item);
  });
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !addInput.value.trim() ||
    !addInput2.value.trim() ||
    !addInput3.value.trim() ||
    !addInput4.value.trim()
  ) {
    alert("Заполни поля");
    return;
  }
  const todo = {
    id: Date.now(),
    name: addInput.value,
    surname: addInput2.value,
    phone: addInput3.value,
    url: addInput4.value,
  };
  todos.push(todo);
  console.log(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
  addInput.value = "";
  addInput2.value = "";
  addInput3.value = "";
  addInput4.value = "";
  good();
});

resetBtn.addEventListener("click", (e) => {
  localStorage.removeItem("todos");

  todos = [];
  good();
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    todos = todos.filter((item) => item.id != e.target.id);
    localStorage.setItem("todos", JSON.stringify(todos));
    good();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    editModal.style.visibility = "visible";
    const toEdit = todos.find((item) => item.id == e.target.id);
    editInput.value = toEdit.name;
    editInput2.value = toEdit.surname;
    editInput3.value = toEdit.phone;
    editInput4.value = toEdit.url;

    editInput.focus();

    editSubmit.id = e.target.id;
  }
});

closeModal.addEventListener("click", (e) => {
  editModal.style.visibility = "hidden";
});

editCancel.addEventListener("click", () => {
  editModal.style.visibility = "hidden";
});

editSubmit.addEventListener("click", (e) => {
  if (
    !editInput.value.trim() ||
    !editInput2.value.trim() ||
    !editInput3.value.trim() ||
    !editInput4.value.trim()
  ) {
    return;
  }
  todos.map((item) => {
    if (item.id == editSubmit.id) {
      item.name = editInput.value;
      item.surname = editInput2.value;
      item.phone = editInput3.value;
      item.url = editInput4.value;
    }
    return item;
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  good();

  editCancel.click();
});
