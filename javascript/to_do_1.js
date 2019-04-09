

// function to get the value of missions+add
$(document).ready(function(){
  $(".btn-lg").click(function(){
  var value= $("#usr").val();
  $(".list-group").append(`<li class="list-group-item">${value}
  <button type="button" class="btn btn-dark">delete</button></li>`)  
  });
  // function to remove mission
  $(".list-group").on('click','.btn-dark',function(){
  $(this).parent().hide();
    });
});

