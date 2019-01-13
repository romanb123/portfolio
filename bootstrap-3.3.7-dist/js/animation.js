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