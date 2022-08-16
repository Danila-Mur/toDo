const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = [];

if (!localStorage.todos) {
  localStorage.todos = JSON.stringify(toDoData);
}

toDoData = JSON.parse(localStorage.todos);

const renderToDo = () => {
  todoList.innerHTML = '';
  todoCompleted.innerHTML = '';
  toDoData.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `<span class="text-todo">${item.text}</span>
                    <div class="todo-buttons">
                      <button class="todo-remove"></button>
                      <button class="todo-complete"></button>
                    </div>`;

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector('.todo-complete').addEventListener('click', () => {
      item.completed = !item.completed;

      localStorage.todos = JSON.stringify(toDoData);
      renderToDo();
    });

    li.querySelector('.todo-remove').addEventListener('click', () => {
      toDoData.splice(index, 1);

      localStorage.todos = JSON.stringify(toDoData);
      renderToDo();
    });
  });
};

todoControl.addEventListener('submit', (event) => {
  event.preventDefault();

  if (headerInput.value.trim() === '') {
    return;
  }

  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  toDoData.push(newToDo);
  localStorage.todos = JSON.stringify(toDoData);

  headerInput.value = '';

  renderToDo();
});

renderToDo();

