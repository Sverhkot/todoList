$(document).ready(function () {

    $(".unimportant").click(function (e) {
      $(e.target).css("display", "none");
      $(".important").css("display", "block");
    });
    $(".important").click(function (e) {
        $(e.target).css("display", "none");
        $(".unimportant").css("display", "block");
      });
    $(".clock").mouseover(function (e) {
        $(".dropdown").css("visibility", "visible");
        $(".triangle").css("visibility", "visible")
    });
    $(".create-new").mouseleave(function () {
      $(".dropdown").css("visibility", "hidden");
      $(".triangle").css("visibility", "hidden");
    });

    let plan = JSON.parse(localStorage.getItem("plan")) || [];
    

    function checkTheImportance(){
      let newListItem = $(".form-control").val();
      let priority = $(".unimportant");
      let important;
        if (priority.css("display") === "block"){
          important = false;
        }
        else {
          important = true;
        }
        plan.push({title: newListItem,
          importance: important});
          console.log(plan);
          addList();
          localStorage.setItem('plan', JSON.stringify(plan));
      $('.form-control').val("");
    }
    
    $(".btn").click(function (e) {
      checkTheImportance();
      
    });
    $(".form-control").keypress(function (e) {
      if (e.keyCode == '13') {
        checkTheImportance();
      }
    });
   
    console.log(plan);
  

    function addList(){
      let list;
      $(".todo-list").html('');
      
      for(let i = 0; i < plan.length; i++){
        list = 
          `<div class="text-and-btn">
            <li class="todo-list-item ${plan[i].completed ? 'complete' : ''}" ${plan[i].importance ? 'id="important-text"' : ''} data-id=${i}>${plan[i].title}</li>
            <button class="completed btn btn-secondary ${plan[i].completed ? 'hidden' : ''}">&#10003</button>
            <button class="delete btn btn-secondary ${plan[i].completed ? '' : 'hidden'}" data-id=${i}>&#10008</button> 
          </div>`;
          $(".todo-list").append(list);
 
        localStorage.setItem('plan', JSON.stringify(plan));
      }
    };

    addList();

    $(".todo-list").on("click", ".completed", function(e){
      $(e.target).hide();
      $(e.target).siblings(".delete").css("display", "block");
      $(e.target).siblings(".todo-list-item").css("text-decoration", "line-through");
      let newAStatus = $(e.target).siblings(".todo-list-item").data("id");
      plan[newAStatus].completed = true;
      localStorage.setItem('plan', JSON.stringify(plan));
    });

    $(".todo-list").on("click", ".delete", function(e){
      let del = $(e.target);
      let attr = del.data("id");
      plan.splice(attr, 1);
      addList();
    });
    localStorage.setItem('plan', JSON.stringify(plan));
    console.log(typeof localStorage.getItem(plan));
    });
    
