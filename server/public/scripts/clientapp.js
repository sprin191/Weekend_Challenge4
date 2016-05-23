$(document).ready(function () {
  getTasks();

//Function to submit new task to the database.
  $('#submitTask').on('click', postTask);

//Function to delete selected task on the DOM.
  $('#container').on('click', '.delete', function () {
    var taskID = getTaskID($(this));
    deleteTask(taskID);
    $(this).closest('div').remove();
    console.log('Deleted');
  });

//Function to update selected task on the DOM (complete/incomplete).
$('#container').on('click', '#completed', function() {
  task = {};
if ($(this).prop('checked') === true) {
  $(this).val(true);
  task.value = true;
  $(this).parent().parent().addClass('checked');
}
else {
  $(this).val(false);
  task.value = false;
  $(this).parent().parent().removeClass('checked');
}
console.log($(this).val());
console.log(task);
});

});

//Posts task to the database
function postTask() {

  var task = {};

  $.each($('#taskList').serializeArray(), function (i, field) {
      task[field.name] = field.value;
    });

  console.log(task);

  $.ajax({
    type: 'POST',
    url: '/addtask',
    data: task,
    success: function (data) {
      console.log('Successful post!');
      $('#container').empty();
      getTasks();
    },
  });
}

//Gets tasks from the database and appends them to the DOM.
function getTasks() {
  console.log('getting tasks');
  $.ajax({
    type: 'GET',
    url: '/addtask',
    success: function (tasks) {
      $('#container').empty();
      tasks.forEach(function (task) {
      $separator = $('<div></div>');
      $separator.data('taskID', task.id);
      var $el = $('<form id="checkbox"><input type="checkbox" id ="completed" value=false name="completed" /></form>' + '<p>' + task.task + '</p>' + '<button type="button" class="delete" name="delete">Delete</button>');
      $separator.append($el);
      $('#container').append($separator);
      });
    },
  });
}

//Gets the task ID information from the database.
function getTaskID(button) {
  var taskID = button.parent().data('taskID');
  console.log('getTaskID', taskID);
  return taskID;
}

//Deletes a task from the database.
function deleteTask(event) {

  var taskID = event;
  console.log(taskID);

  $.ajax({
    type: 'DELETE',
    url: '/addtask/' + taskID,
    success: function (data) {
      getTasks();
    },
  });
}

//Updates task completion to the database.
/*function updateTask() {
  event.preventDefault();
  task = {};
  if ($(this).prop('checked') === true) {
    $(this).val(true);
    task.value = true;
    $(this).addClass('checked');
  }
  else {
    $(this).val(false);
    task.value = false;
    $(this).removeClass('checked');
  }
  console.log($(this).val());
  console.log(task);

  var taskID = $(this).parent().parent().data('taskID');
  console.log('getTaskID', taskID);

  $.ajax({
    type: 'PUT',
    url: '/addtask/' + taskID,
    data: task,
    success: function () {
      getTasks();
    },
  });
}*/
