//#region //Personal Notes
// Object/Class (Tasks)
// Properties (Complete/Incomplete, Importance, Importance Selector, Text, Visible/Invisible)
// Methods (Toggle Complete/Incomplete, Toggle Importance, Toggle Visiblity)
// Core Methods (Collect Data After Submit, Error Handling, Pass clean data to functions, update DOM)

// Thoughts:
// Can I add a sound when things are added/deleted?
// Why does this bit of code seem to have two execute ideas on both sides of the = ... and the function calls itself...
// document.getElementById("myLI").onclick = function(e){
//   alert(e.target.parentNode.id);
// }

// add listener to all the buttons at once
// check
//console.log(document.querySelectorAll('button'))
// let buttons = document.querySelectorAll('button')
//   // for (i of buttons) {
//   //   i.removeEventListener('click', function() {
//   //   toggleTask(this, !(this.className.includes("Remove")), this.parentNode.parentNode.rowIndex)});
//     Element.addEventListener('click', function() {
//     toggleTask(this, !(this.className.includes("Remove")), this.parentNode.parentNode.rowIndex)});

// a copy of some working code just for safe keeping
// function addButtonFunction () {
//   let buttons = document.querySelectorAll('button')
//   for (i of buttons) {
//     // i.removeEventListener('click', function)
//     i.addEventListener('click', function() {
//     toggleTask(this, !(this.className.includes("Remove")), this.parentNode.parentNode.rowIndex)});
//   }
// }
//#endregion

// Add "listener" to the form
const form = document.getElementById('taskForm');
const clearall = document.getElementById('clearall')
form.addEventListener('submit', addTask)
clearall.addEventListener('click', deleteAllTasks)


//Main Function: Button Behaviors
//Parameters defined by the ".addEventListener" in Helper Function 2 (addTask)
function toggleTask (elementClicked, isToggle, rowIndex) {
  
 //#region  //check
  // console.log(elementClicked.parentNode.parentNode.id, elementClicked.className)
  // console.log(isToggle)
  // console.log(rowIndex)

  //variables
  // Define element of table
  // row = rowIndex - 1;
  // https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
//#endregion
  // Find the elements in the row that was clicked
  var elementsInRow = elementClicked.parentNode.parentNode.children;
  
 //#region  // Check
  //  console.log(elementsInRow)
  //#endregion
  // Drill down into the first column which has 3 <button> elements
  const buttonsInRow =  elementsInRow[0].querySelectorAll('button')
  
 //#region  //check
  // console.log(buttonsInRow)
//#endregion
  // Rename the HTML elements for ease-of-use
  // Since the "delete" button never changes status with the CSS, it can be ignored 
  // const buttonDelete = buttonsInRow[2]

  const buttonChecked = buttonsInRow[0]
  const buttonUnchecked = buttonsInRow[1]
  const textDescription = elementsInRow[1]
  const textDate = elementsInRow[2]

  //#region // //check
  // console.log(row)
  // console.log(elementsInRow)
  //  console.log(buttonChecked)
  //  console.log(buttonUnchecked)
  //  console.log(buttonDelete)
  //  console.log(textDescription)
  //  console.log(textDate)
//#endregion
  // Main Function: Toggle or Delete
  // uses "class" and "tag" to change CSS formatting behavior
  // "class" has two attributes so they can be targeted individually
  // see helper function "toggleAttribute"

  //isToggle is defined within the listener. If the "class" contains [Remove] then it returns [false]
  // [Remove] refers to the red "x" image
  if (isToggle == true) {
    
   //#region //Check
    // console.log('Toggle')
//#endregion
    toggleAttribute(buttonChecked, "Incomplete", "Complete")
    toggleAttribute(buttonUnchecked, "Incomplete", "Complete")
    toggleAttribute(textDescription, "Incomplete", "Complete")
    toggleAttribute(textDate, "Incomplete", "Complete")
   
  //if isToggle is [false] then the "class" must contain [Remove] and it must be the red circle 
  } else {
    
   //#region  //check
    // console.log("Delete")
    //#endregion
    //Confirm that the user wants to delete the task
    isExecute = confirm("Would you like to delete this task?")
    if (isExecute == true) {
      
      //Delete the entire index row
      document.getElementById('taskTable').deleteRow(rowIndex)
    } 
    }
  }

  

//Attempt 1: First attempt at controlling the DOM
//#region 
//The "id" attribute was defined multiple times in the HTML and was intended to refer to the row number
// I scrapped this idea because:
// #1 The documentation on the "id" attribute stressed that it should only be used once.
// #2 It was getting very tedious
// function toggleTaskComplete(element) {
//   id = element.id
//   elementClassUnchecked = document.getElementsByClassName("Unchecked")[id].getAttribute("class").split(" ")
//   elementClassChecked = document.getElementsByClassName("Checked")[id].getAttribute("class").split(" ")
//   elementClassDescription = document.getElementsByClassName("Description")[id].getAttribute("class").split(" ")
//   elementClassDate = document.getElementsByClassName("Date")[id].getAttribute("class").split(" ")

//   toggleAttribute(elementClassUnchecked, "Incomplete", "Complete")
//   toggleAttribute(elementClassChecked, "Incomplete", "Complete")
//   toggleAttribute(elementClassDescription, "Incomplete", "Complete")
//   toggleAttribute(elementClassDate, "Incomplete", "Complete")

//   document.getElementsByClassName("Unchecked")[id].setAttribute("Class", elementClassUnchecked.join(" "))
//   document.getElementsByClassName("Checked")[id].setAttribute("Class", elementClassChecked.join(" "))
//   document.getElementsByClassName("Description")[id].setAttribute("Class", elementClassDescription.join(" "))
//   document.getElementsByClassName("Date")[id].setAttribute("Class", elementClassDate.join(" "))
// }
//#endregion

//Helper Function 1: Change Classes for CSS Behavior
function toggleAttribute (HTMLElement, Option1, Option2) {
  //separate the unique part of the "class" so I only change the second half
  //the first half is used to differentiate each element while the second half links to CSS behavior 
  HTMLClass = HTMLElement.className.split(" ")

 //#region  // //check
  // console.log(HTMLClass[1])
//#endregion
  // Flip Attributes
  if (HTMLClass[1] == Option1) {
    HTMLClass[1] = Option2
  } else {
    HTMLClass[1] = Option1
  }

 //#region  // //check
  // console.log(HTMLClass)
  // console.log(HTMLClass.join(" "))
//#endregion
  //Integrate attributes and set
  HTMLElement.setAttribute('class', HTMLClass.join(" "))
}

//Helper Function 2: Add New Tasks
function addTask(event) {
  
  //collect data from the form
  var taskDescription = document.getElementById('formTaskText');
  var taskDueDate = document.getElementById('formDueDate');
  
 //#region  //check
  // console.log(taskDescription)
  // console.log(taskDueDate)
//#endregion
  // Create a new row and label it
  var table = document.getElementById('taskTable');
  var row = table.insertRow(1);

//#region   // check
  // console.log(table)
  // console.log(row)
//#endregion
  //Define where elements will go in the new row
  var locationButtons = row.insertCell(0);
  var locationDescription = row.insertCell(1);
  var locationDueDate = row.insertCell(2);
  
  // Add Checked Button
  const button1 = document.createElement('button');
  const image1 = document.createElement('img')
  button1Parent = locationButtons;
  image1pic = new Image(20,20);
  image1pic.src = "done.jpg";
  image1.src = image1pic
  button1.appendChild(image1pic)
  button1.className = "Checked Complete";
  button1Checked = button1Parent.appendChild(button1)
  button1Checked.addEventListener('click', function() {
    toggleTask(this, !(this.className.includes("Remove")), this.parentNode.parentNode.rowIndex)});
  
  // Add Unchecked Button
  const button2 = document.createElement('button');
  const image2 = document.createElement('img')
  button2Parent = locationButtons;
  image2pic = new Image(20,20);
  image2pic.src = "notdone.png";
  image2.src = image2pic
  button2.appendChild(image2pic)
  button2.className = "Unchecked Incomplete";
  button2Checked = button2Parent.appendChild(button2)
  button2Checked.addEventListener('click', function() {
    toggleTask(this, !(this.className.includes("Remove")), this.parentNode.parentNode.rowIndex)});

  // Add Delete Button  
  const button3 = document.createElement('button');
  const image3 = document.createElement('img')
  button3Parent = locationButtons;
  image3pic = new Image(20,20);
  image3pic.src = "delete.jpg";
  image3.src = image3pic
  button3.appendChild(image3pic)
  button3.className = "Remove Incomplete";
  button3Checked = button3Parent.appendChild(button3)
  button3Checked.addEventListener('click', function() {
    toggleTask(this, !(this.className.includes("Remove")), this.parentNode.parentNode.rowIndex)});
  
  //Add the Description and the Date
  locationDescription.textContent = taskDescription.value
  locationDescription.className = "Description Incomplete"
  locationDueDate.textContent = taskDueDate.value
  locationDueDate.className = "Date Incomplete"

//#region //check
  // console.log(locationButtons)
  // console.log(locationDescription)
  // console.log(locationDueDate)
  //#endregion
  form.reset();
  event.preventDefault();
}

//Helper Function 3: Remove all rows except the header
function deleteAllTasks () {
  const table = document.getElementById('taskTable');
  var rows = table.rows.length;
  isExecute = confirm("Are you sure you want to delete all your tasks?")
  if (isExecute == true) {
  for (let i = rows; i > 1; i--) {
    table.deleteRow(i-1)
  }
}
}