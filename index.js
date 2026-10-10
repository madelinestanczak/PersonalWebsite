function MakeWindowVisible(id){
    var doc = document.getElementById(id);
    if (doc.style.display === "none"){
        doc.style.display = "block";
    }
    else if (doc.style.display === "block"){
        doc.style.display = "none";
    }
}

function MakeButtonVisible(id){
    var doc = document.getElementById(id);
    if (doc.style.display === "none"){
        doc.style.display = "flex";
    }
    else if (doc.style.display === "flex"){
        doc.style.display = "none";
    }
}

function Resume() {
    MakeWindowVisible("ResumePanel");
    MakeButtonVisible("ResumeButton");
}

function Resources() {
    MakeWindowVisible("ResourcesPanel");
    MakeButtonVisible("ResourcesButton");
}

function Paint() {
    MakeWindowVisible("PaintPanel");
    MakeButtonVisible("PaintButton");
}

function Projects() {
    MakeWindowVisible("ProjectsPanel");
    MakeButtonVisible("ProjectsButton")
}

function AboutMe() {
    MakeWindowVisible("AboutMePanel");
    MakeButtonVisible("AboutMeButton");
}

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  m = checkTime(m);
  document.getElementById('ClockText').innerHTML =  h + ":" + m;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}