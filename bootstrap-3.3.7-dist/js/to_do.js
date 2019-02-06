


function getvalue(){
var mission=document.getElementById('forma');
console.log(mission[0].value);
var info=document.getElementsByClassName('list-group-item');
console.log(info);
var but=document.getElementsByClassName('btn btn-primary btn-lg');
console.log(but);
var para = document.createElement("li");
para.className="list-group-item"
para.innerText=mission[0].value;
var button = document.createElement("button");
button.className="btn btn-primary btn-lg";
button.innerText="delete";
  document.getElementById("myDIV").appendChild(para);
  document.getElementById("myDIV").appendChild(button);
}    

function remove(){
    var i=0;
var e=event.target;
if(e.className=="btn btn-primary btn-lg"){
console.log(e.parentNode);
var r=e.parentNode;
console.log(r.childNodes);
var h=r.childNodes;
console.log(h.length);
console.log(h[5]);
console.log(e);
for(i=0;i<h.length;i++){
if(h[i]==e&&h.length>5){
        r.removeChild(h[i-1]);
        r.removeChild(e);
 } 
 }
}
}

function checklenght(){
    var e=event.target;
    if(e.className=="btn btn-primary btn-lg"){
    console.log(e.parentNode);
    var r=e.parentNode;
    console.log(r.childNodes);
    var h=r.childNodes;
    console.log(h.length);
    console.log(h[5]);
    console.log(e);
}
}

 

