

// function to get the value of missions
$(document).ready(function(){
  $(".btn-lg").click(function(){
  var value= $("#usr").val();
  $(".list-group").append(`<li class="list-group-item">${value}
  <button type="button" class="btn btn-dark">delete</button></li>`) 
  $(".btn-dark").click(function(){
  $(this).parent().hide();
    });
  });
});

