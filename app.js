// Selectors
    const todoInput = document.querySelector('.todo-input');
    const todoButton = document.querySelector('.todo-button');
    const todoList = document.querySelector('.todo-list');
    const filterOption = document.querySelector('.filter-todo');
    
// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos); // Событие ждет пока прогрузится страница и выполняет функцию getTodos
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck); 
filterOption.addEventListener('click', filterTodo); // вкладка фильтра 

// Functions
function addTodo(event){
    // Предотвращаем(отменяет) отправку формы и обновления страницы
    event.preventDefault();

    //Создаем div для списка todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Создаем li 
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Сохранение в память LocalStorage ячеек to-do
    saveLocalTodos(todoInput.value);

    // Создаем кнопку добавление completedButton
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check-square"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Создаем кнопку удаления trashButton.
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Привязываем новый элемент к todo-list
    todoList.appendChild(todoDiv);

    // Очистка поля ввода. Input Value.
    todoInput.value = '';
}

// Функция для удаления созданной ячейки.
function deleteCheck(event) {
    const item = event.target;
    // Удаление ячейки
    if(item.classList[0] === 'trash-btn') { // 1-й способ через contains
        const todo = item.parentElement;
        // Анимация удаления ячейки.
        todo.classList.add('fall');
        removeLocalTodos(todo);
        // Событие transitionend полезно тем что функция ждет окончания анимации, потом удаляет элемент :)
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }

    // Галочка 
    if(item.classList[0] === 'complete-btn') { // 2-й способ через сравнения 0-го элемента.
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


// Функция для перебора ячеек (completed, uncompleted)
function filterTodo(event) {
    const todos = todoList.childNodes; // показывает какие узлы есть в листе todoList
    // Перебираем узлы todoList с помощью forEach
    todos.forEach(function(todo) {
        switch(event.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }       
    })
}


// Функция сохранения в память LocalStorage Ячеек todo
function saveLocalTodos(todo) {
    // Нужно создать проверку если у нас есть уже сохраненная ячейка.
    // Do i already have thing in here?
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Функция востановления ячеек из памяти LocalStorage
function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
    //Создаем div для списка todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Создаем li 
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Создаем кнопку добавление completedButton
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check-square"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Создаем кнопку удаления trashButton.
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // Привязываем новый элемент к todo-list
    todoList.appendChild(todoDiv);
    });
}

// Функция удаления определенного значения из памяти LocalStorage
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}