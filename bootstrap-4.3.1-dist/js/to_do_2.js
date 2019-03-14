




var i = 0;
var ArrMissions = [];
//====================================
// //function to clear all missions:
// ====================================
function clearall() {
  document.getElementById("missionsrow").innerHTML = "";
  i = 0;
  localStorage.removeItem("lastname");

}

//===========================
// // function to creat a div:
// ===========================

function divcreate() {

  // =======================================
  //   // get the values of the missions:
  //   =====================================

  var mission = document.getElementById('mission_text').value;
  var date = document.getElementById('mission_date').value;
  var time = document.getElementById('mission_time').value;

  // =======================================================================
  //   // send to local storage+create/add array with the values of mission:
  //   =====================================================================
if(mission==""||date==""||time==""){
alert("one of your values is empty!!!!!!");
}
else{
  var ObjMissions = { text: mission, when: date, clock: time };
  var mission1 = localStorage.getItem("lastname");
  objmissions1 = JSON.parse(mission1);
  if (objmissions1 != null) {
    console.log(objmissions1);
    objmissions1.push(ObjMissions);
    myJSON = JSON.stringify(objmissions1);
    localStorage.setItem("lastname", myJSON);
  }
  else {
    ArrMissions.push(ObjMissions);
    myJSON = JSON.stringify(ArrMissions);
    localStorage.setItem("lastname", myJSON);
  }

  // ==================================================================
  // //  remove fadein from all classes so only the new get the fade in
  // ==================================================================

  var divwithfade = document.querySelectorAll("div.mission");
  console.log(divwithfade.length);
  for (let d = 0; d < divwithfade.length; d++) {
    divwithfade[d].classList.remove("fadeclass");
  }
  // ==================
  // // create new div: 
  // ==================
  var newdiv = `<div class="col-sm-12 col-md-12  col-lg-3 mission fadeclass" id="${i}" onmouseover='showx(this)' onmouseout='undisplayx(this)'>`
    + "<button class='close' class='close' aria-label='Close'onclick='removemission()'>" + "<span aria-hidden='true' class='remove' >&times;</span>"
    + "</button>" + "<h1>" + "Mission" + "</h1>" + "<p>" + mission + "</p>" + "<span class='date_time'>" + date + "<br>" + time + "</span>"
    +"<span class='missid'>" + `${i}` + "</span>"+"</div>";
  document.getElementById("missionsrow").innerHTML += newdiv;
  i++;

  //   //======================================
  // to cleare the inputs after create new div
  // // ======================================

  mission = document.getElementById('mission_text').value = null;
  date = document.getElementById('mission_date').value = null;
  time = document.getElementById('mission_time').value = null;
}
}
//======================================
// // to load misions from local storage:
// ======================================
function loadStorage() {

  var mission1 = localStorage.getItem("lastname");
  objmissions1 = JSON.parse(mission1);

  var newdiv = "";
  console.log(objmissions1);
  if(objmissions1!=null){
  for (let index = 0; index < objmissions1.length; index++) {
    if (objmissions1[index] == null) {
      newdiv = `<div id="${index}"style=display:none;>` + `</div>`;
      document.getElementById("missionsrow").innerHTML += newdiv;
    }
    else {
      var newdiv = `<div class="col-sm-12 col-md-12  col-lg-3 mission" id="${index}" onmouseover='showx(this)' onmouseout='undisplayx(this)'>`
        + "<button class='close' class='close' aria-label='Close'onclick='removemission()'>" + "<span aria-hidden='true' class='remove' >&times;</span>"
        + "</button>" + "<h1>" + "Mission" + "</h1>" + "<p>" + objmissions1[index].text + "</p>" + "<span class='date_time'>" + objmissions1[index].when + "<br>" + objmissions1[index].clock + "</span>"
        +"<span class='missid'>" + `${index}` + "</span>" + "</div>";
      document.getElementById("missionsrow").innerHTML += newdiv;
      i = objmissions1.length;
    }
  }
}
}

// ==============================
// // function to deleate a div:
// ===============================

function removemission() {
  var d = event.target;
  var p = d.parentElement;
  var s = p.parentElement;
  s.parentElement.removeChild(s);
  console.log(s.id);
  var idnum = s.id;
  var mission1 = localStorage.getItem("lastname");
  objmissions1 = JSON.parse(mission1);
  delete objmissions1[idnum];
  console.log(objmissions1);
  myJSON = JSON.stringify(objmissions1);
  localStorage.setItem("lastname", myJSON);
}

// ==================================
// // to show the x when parent hover:
// ==================================

function showx(x) {
  x.children[0].style.visibility = "visible";
};
function undisplayx(x) {
  x.children[0].style.visibility = "hidden";
}