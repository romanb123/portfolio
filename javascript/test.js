// function that gets the value of radius and calculate it

function calculate(){
var radius=document.getElementById("usr").value;
// radius = Math.abs(radius);
// console.log(radius);
var output=document.getElementById("showvolume");
// console.log(output);
// check if number is not 2 big:
if(radius>200||radius<0){
    output.innerHTML+=radius+"is 2 big or too small"+"<br>";
    alert("too big radius or too small"+radius);
}
// ***check if valid number**
else if(isNaN(radius)==true){
alert('wrongnumber');
output.innerHTML+=radius+"is not a valid number"+"<br>";
}
else{
var volume=(4/3) * Math.PI * Math.pow(radius, 3);
output.innerHTML+="the volume of circle with radius:"+radius+"="+volume+"<br>";

// check if number:// show the canvas
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(200,200,radius, 0, 2 * Math.PI);
ctx.stroke();
}
};

// function to clear the canvas
function clearscreen(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    const context = c.getContext('2d');
    context.clearRect(0, 0, c.width, c.height);
};