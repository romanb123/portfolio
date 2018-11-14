
var show=document.getElementById('showcase');
var butred=document.getElementById('red');
var butgreen=document.getElementById('green');
var butblue=document.getElementById('blue');
var butyellow=document.getElementById('yellow');

butred.onclick=function(){
    show.setAttribute('class','screenRed');
};
butgreen.onclick=function(){
    show.setAttribute('class','screenGreen');
}
butblue.onclick=function(){
    show.setAttribute('class','screenBlue');
}
butyellow.onclick=function(){
    show.setAttribute('class','screenYellow')
};

var dropdown=document.getElementById('drop');
var buttom=document.getElementById('openclose');
buttom.onclick=function(){
    if(dropdown.className=='unvisible'){
        dropdown.setAttribute('class','visible');   
    }
    else{
    dropdown.setAttribute('class','unvisible');
}
};










 


