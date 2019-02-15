
function geturl() {
    var newurl = document.getElementById('inside').value;
    var fatherofdiv = document.getElementById('fatherc');
    var childdiv = document.createElement('div'); 
    childdiv.setAttribute("class","item")
    var newpic = document.createElement("img");
    newpic.setAttribute("src",newurl); 
    newpic.setAttribute("width","100%");
    newpic.style.height="300px";
    console.log(newpic);
    childdiv.appendChild(newpic);
    console.log(childdiv);
    fatherofdiv.appendChild(childdiv);
    console.log(fatherofdiv);

    var childdiv2 = document.createElement('div');
    var pic2=document.createElement("img");
    childdiv2.setAttribute("class","col-lg-1 col-md-3 col-sm-3 col-xs-6  glr");
   childdiv2.appendChild(pic2);
    pic2.setAttribute("src", newurl); 
    pic2.style.height='100px';
    pic2.style.width='100%';
    document.getElementById("therow").appendChild(childdiv2);
}
