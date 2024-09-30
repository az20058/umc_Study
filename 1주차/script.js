document.getElementById('taskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const taskValue = event.target.value.trim();
        if (taskValue) {
            addTaskToList(taskValue);
            event.target.value = '';
        }
    }
});

function addTaskToList(task) {
    const todoList = document.getElementById('todoList');

    const listItem = document.createElement('li');
    listItem.className = 'list-item';

    const taskText = document.createElement('span');
    taskText.textContent = task;

    const completeButton = document.createElement('button');
    completeButton.textContent = '완료';
    completeButton.className = 'complete-btn';
    completeButton.onclick = function() {
        moveToCompleted(taskText.textContent);
        todoList.removeChild(listItem);
    };

    listItem.appendChild(taskText);
    listItem.appendChild(completeButton);
    todoList.appendChild(listItem);
}

function moveToCompleted(task) {
    const completedList = document.getElementById('completedList');

    const listItem = document.createElement('li');
    listItem.className = 'list-item';

    const taskText = document.createElement('span');
    taskText.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'complete-btn';
    deleteButton.textContent = '삭제';
    deleteButton.onclick = () => {
        completedList.removeChild(listItem);
    }

    listItem.appendChild(taskText);
    listItem.appendChild(deleteButton);
    completedList.appendChild(listItem);
}

function deleteList(task) {
    const listItem = document
}