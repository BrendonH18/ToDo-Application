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

addButtonFunction();


const form = document.getElementById('taskForm');
form.addEventListener('submit', addTask)

//#region 
function toggleTask (elementClicked, isToggle, rowIndex) {
  
  
  //check
  // console.log(elementClicked.parentNode.parentNode.id, elementClicked.className)
  // console.log(isToggle)
  // console.log(rowIndex)

  //variables
  // Define element of table
  row = rowIndex - 1;
  elementsInRow = document.getElementById(row).children;
  buttonsInRow =  document.getElementById(row).children[0].querySelectorAll('button')
  buttonChecked = buttonsInRow[0]
  buttonUnchecked = buttonsInRow[1]
  buttonDelete = buttonsInRow[2]
  textDescription = elementsInRow[1]
  textDate = elementsInRow[2]

  // //check
  // console.log(row)
  // console.log(elementsInRow)
  // console.log(buttonChecked)
  // console.log(buttonUnchecked)
  // console.log(buttonDelete)
  // console.log(textDescription)
  // console.log(textDate)

  // Toggle or Delete
  if (isToggle == true) {
    //Check
    console.log('Toggle')

    toggleAttribute(buttonChecked, "Incomplete", "Complete")
    toggleAttribute(buttonUnchecked, "Incomplete", "Complete")
    toggleAttribute(textDescription, "Incomplete", "Complete")
    toggleAttribute(textDate, "Incomplete", "Complete")
  } else {
    //check
    // console.log("Delete")
    
    //confirm
    isExecute = confirm("Would you like to delete this task?")
    if (isExecute == true) {
      
      
      //Attempt 1 (Using Attributes of HTML)
      //#region 
      //check
      // console.log("Delete Task")

      // // reduce variation
      // toggleAttribute(buttonChecked,"Complete", "Complete")
      // toggleAttribute(buttonUnchecked,"Complete", "Complete")
      // toggleAttribute(buttonDelete,"Complete", "Complete")
      // toggleAttribute(textDescription,"Complete", "Complete")
      // toggleAttribute(textDate,"Complete", "Complete")
      
      // //delete
      // toggleAttribute(buttonChecked,"Complete", "Delete")
      // toggleAttribute(buttonUnchecked,"Complete", "Delete")
      // toggleAttribute(buttonDelete,"Complete", "Delete")
      // toggleAttribute(textDescription,"Complete", "Delete")
      // toggleAttribute(textDate,"Complete", "Delete")
      //#endregion
      
      //Attempt 2 (Using features of Tables)
      document.getElementById('taskTable').deleteRow(rowIndex)
    } 
    
    return
  }
}

//Attempt 1: Working function for reference
//#region 
function toggleTaskComplete(element) {
  id = element.id
  elementClassUnchecked = document.getElementsByClassName("Unchecked")[id].getAttribute("class").split(" ")
  elementClassChecked = document.getElementsByClassName("Checked")[id].getAttribute("class").split(" ")
  elementClassDescription = document.getElementsByClassName("Description")[id].getAttribute("class").split(" ")
  elementClassDate = document.getElementsByClassName("Date")[id].getAttribute("class").split(" ")

  toggleAttribute(elementClassUnchecked, "Incomplete", "Complete")
  toggleAttribute(elementClassChecked, "Incomplete", "Complete")
  toggleAttribute(elementClassDescription, "Incomplete", "Complete")
  toggleAttribute(elementClassDate, "Incomplete", "Complete")

  document.getElementsByClassName("Unchecked")[id].setAttribute("Class", elementClassUnchecked.join(" "))
  document.getElementsByClassName("Checked")[id].setAttribute("Class", elementClassChecked.join(" "))
  document.getElementsByClassName("Description")[id].setAttribute("Class", elementClassDescription.join(" "))
  document.getElementsByClassName("Date")[id].setAttribute("Class", elementClassDate.join(" "))
}
//#endregion

//Helper Function 1: Change Classes for CSS
function toggleAttribute (HTMLElement, Option1, Option2) {
  HTMLClass = HTMLElement.className.split(" ")
//#region 
  // //check
  // console.log(HTMLClass[1])
//#endregion
  //modify
  if (HTMLClass[1] == Option1) {
    HTMLClass[1] = Option2
  } else {
    HTMLClass[1] = Option1
  }
//#region 
  // //check
  // console.log(HTMLClass)
  // console.log(HTMLClass.join(" "))
//#endregion
  //integrate
  HTMLElement.setAttribute('class', HTMLClass.join(" "))
}
//#endregion
//Helper Function 2: add task
function addTask(event) {
  
  var taskDescription = document.getElementById('formTaskText');
  // var taskDescriptionform.elements[0].value
  var taskDueDate = form.elements[1].value
  //check
  // console.log(taskDescription)
  // console.log(taskDueDate)

  // Create new row
  var table = document.getElementById('taskTable');
  var row = table.insertRow(1);

  console.log(table)
  console.log(row)

  //Define elements of row
  var locationButtons = row.insertCell(0);
  var locationDescription = row.insertCell(1);
  var locationDueDate = row.insertCell(2);
  locationDescription.textContent = taskDescription.value


  console.log(locationButtons)
  console.log(locationDescription)
  console.log(locationDueDate)

  // //add HTML
  // //check
  // locationButtons.innerHTML('1')
  // locationButtons.className("Incomplete")
  // locationDescription.innerHTML('2')
  // locationDescription.className("Incomplete")
  // locationDueDate.innerHTML('3')
  // locationDueDate.className("Incomplete")
  
   addButtonFunction();
  event.preventDefault();
}

// helper function 3: assign buttons
function addButtonFunction () {
  let buttons = document.querySelectorAll('button')
  for (i of buttons) {
    // i.removeEventListener('click', function() {
    //   toggleTask(this, !(this.className.includes("Remove")), this.parentNode.parentNode.rowIndex)});
    i.addEventListener('click', function() {
    toggleTask(this, !(this.className.includes("Remove")), this.parentNode.parentNode.rowIndex)});
  }
}

function addButtonAttributes (element) {
    toggleTask(this, !(this.className.includes("Remove")), this.parentNode.parentNode.rowIndex)
}


//working code
// function addButtonFunction () {
//   let buttons = document.querySelectorAll('button')
//   for (i of buttons) {
//     // i.removeEventListener('click', function)
//     i.addEventListener('click', function() {
//     toggleTask(this, !(this.className.includes("Remove")), this.parentNode.parentNode.rowIndex)});
//   }
// }