// todo.js
window.todos = [];
window.currentFilter = 'all';

window.addTodo = function(text) {
    if (!text) return;
    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };
    todos.push(todo);
    const todoInput = document.getElementById('todoInput');
    if (todoInput) todoInput.value = '';
    renderTodos();
    return todo;
};

window.toggleTodo = function(id) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos[i].completed = !todos[i].completed;
            break;
        }
    }
    renderTodos();
};

window.deleteTodo = function(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
};

window.filterTodos = function(filter) {
    currentFilter = filter;
    renderTodos();
};

function renderTodos() {
    const todoList = document.getElementById('todoList');
    if (!todoList) return;
    
    todoList.innerHTML = '';
    
    let filteredTodos = todos;
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                onclick="toggleTodo(${todo.id})">
            <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">
                ${todo.text}
            </span>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

window.onload = function() {
    const addButton = document.getElementById('addButton');
    if (addButton) {
        addButton.addEventListener('click', () => {
            const todoInput = document.getElementById('todoInput');
            window.addTodo(todoInput.value);
        });
    }

    document.querySelectorAll('.filter').forEach(button => {
        button?.addEventListener('click', () => filterTodos(button.dataset.filter));
    });
};