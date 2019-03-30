
function geturl() {
    var newurl = document.getElementById('inside').value;
    var childdiv2 = document.createElement('div');
    childdiv2.style.height="auto";
    var pic2=document.createElement("img");
    childdiv2.setAttribute("class","col-lg-1 col-md-3 col-sm-3 col-xs-6  glr");
   childdiv2.appendChild(pic2);
    pic2.setAttribute("src", newurl); 
    pic2.setAttribute("data-toggle","modal");
    pic2.setAttribute("data-target",".bs-example-modal-lg");
    pic2.style.height='100%';
    pic2.style.width='100%';
    document.getElementById("therow").appendChild(childdiv2);
    pic2.addEventListener("click", function(event) {
    console.log(event.target.src);
    document.getElementById("modalpic").src=event.target.src;
    document.getElementById("modalpic").style.width="600px";
    document.getElementById("modalpic").style.height="300px";
      });
}


   
    


