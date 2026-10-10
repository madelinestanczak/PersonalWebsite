function MakeWindowVisible(id){
    var doc = document.getElementById(id);
    if (doc.style.display === "none"){
        doc.style.display = "block";
    }
    else if (doc.style.display === "block"){
        doc.style.display = "none";
    }
}

function Resume() {
    MakeWindowVisible("ResumePanel");
}

function Resources() {
    MakeWindowVisible("ResourcesPanel");
}