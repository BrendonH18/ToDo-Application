document.getElementById('taskForm').addEventListener('submit', addTask)
clearall.addEventListener('click', deleteAllTasks)

function addTask(event) {
  event.preventDefault();
  const taskRow = document.getElementById('taskTable').insertRow(1);
  const taskButtons = taskRow.insertCell(0);
  const taskDescription = taskRow.insertCell(1);
  const taskDueDate = taskRow.insertCell(2);
  const toggleTaskButoon = createToggleTaskButton(taskDescription, taskDueDate)
  taskButtons.appendChild(toggleTaskButoon)
  const taskDeleteButton = document.createElement('button')
  taskButtons.appendChild(taskDeleteButton)
  const image = new Image(20,20);
  image.src = 'delete.jpg'
  taskDeleteButton.appendChild(image)
  taskDeleteButton.addEventListener('click', () => {
    if (taskDescription.classList.contains('done')) {
      taskRow.remove()
    } else {
      alert("Please complete task first.")
    }
  } 
)
  taskDescription.textContent = document.getElementById('formTaskText').value
  taskDueDate.textContent = document.getElementById('formDueDate').value
  document.getElementById('taskForm').reset();
  event.preventDefault();
}

function createToggleTaskButton(taskDescription, taskDueDate) {
  const toggleTaskButton= document.createElement('button');
  const image = new Image(20,20);
  image.src = 'notdone.png';
  toggleTaskButton.appendChild(image);
  toggleTaskButton.addEventListener('click', () => {
    image.src = 'done.jpg';
    taskDescription.classList.toggle('done');
    taskDueDate.classList.toggle('done');
    if (taskDescription.classList.contains('done')) {
      image.src = 'done.jpg'
    } else {
      image.src = 'notdone.png'
    }
  });
  return toggleTaskButton
}

function deleteAllTasks () {
  const table = document.getElementById('taskTable');
  var rows = table.rows.length;
  isExecute = confirm("Are you sure you want to delete all your tasks?")
  if (isExecute == true) {
  for (let i = rows; i > 1; i--) {
    rowClass = table.rows[i-1].cells[1].className
      if (rowClass == "done") {
      table.deleteRow(i-1)
    }
  }
}
}