//get Key via storageKey to access data
var storage = localStorage.getItem("storageKey");

//if storage != empty, has something
if(storage !== null){
  //convert JSON string -> JS Object
  var data = JSON.parse(storage);
  //Load data from backend to frontend
  loadData(data);
  //prepare next todo item's index
  var id = data.length;
}
else {
  var id = 0;
  var data = [];
}

function loadData(array){
  array.forEach(function(todo){
    newItem(todo.name, todo.trash, todo.id);
  });
}



document.body.onkeyup = function(e){
  if(e.keyCode == 13){
    console.log("enter clicked!");

    var todo = document.getElementById("inputBox").value;//saves input into todo

    //add to frontend
    newItem(todo, false, id);

    //add to backend
    data.push({
      name: todo,
      trash: false,
      id: id
    });

    id ++;

    //set storage equal to newest changes
    localStorage.setItem("storageKey", JSON.stringify(data));

  }
}
 


function newItem(todo, trash, id) {
  console.log("Inside newItem");

  if(trash == true){
    return;
  }

  //var todo = document.getElementById("inputBox").value;
  console.log(todo);

  //store the ul as a variable
  var ul = document.getElementById("uList");

  var li = document.createElement("li");
  li.appendChild(document.createTextNode(todo)); //put text in li
  li.setAttribute('id', id); //set attribute named id = id

  ul.appendChild(li); //put li in ul

  //Reset what's in box
  document.getElementById("inputBox").value = ""; 

  //Remove li when clicked
  li.onclick = removeItem; 
}

function removeItem(e) {
  //frontend
  element = e.target;
  element.remove();

  //backend
  data[element.id].trash = true;
  localStorage.setItem("storageKey", JSON.stringify(data));
}

