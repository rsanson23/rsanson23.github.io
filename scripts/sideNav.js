// Expands side navigation bar to fixed width and show links to projects
const openSideNav = () => {
    document.getElementById('sideNavDiv').style.width = "200px";
    document.getElementById('sideNavDiv').style.backgroundColor = "rgba(70, 70, 70, 0.7)"
    document.getElementById('side-btn').textContent = "-";
    document.getElementById('side-btn').style.fontSize = "20px";
    document.getElementById('side-btn').style.marginLeft = "180px";
    document.getElementById('side-btn').style.backgroundColor = "rgba(70, 70, 70, 0.7)"
    document.getElementById('side-btn').setAttribute("onclick", "javascript: closeSideNav();");
    document.getElementById('content').style.marginLeft = "210px";
    var content = document.getElementsByClassName('sideNavContent');

    for (let i = 0; i < content.length; i++) {
        content[i].style.visibility = "visible";
    }
}


// Contracts side navigation bar and hides links to projects
const closeSideNav = () => {
    document.getElementById('sideNavDiv').style.width = "40px";
    document.getElementById('sideNavDiv').style.backgroundColor = "rgba(70, 70, 70, 0)"
    document.getElementById('side-btn').textContent = "+";
    document.getElementById('side-btn').style.fontSize = "40px";
    document.getElementById('side-btn').style.marginLeft = "0";
    document.getElementById('side-btn').style.backgroundColor = "rgba(70, 70, 70, 0)"
    document.getElementById('side-btn').setAttribute("onclick", "javascript: openSideNav();");
    document.getElementById('content').style.marginLeft = "50px";

    var content = document.getElementsByClassName('sideNavContent');

    for (let i = 0; i < content.length; i++) {
        content[i].style.visibility = "hidden";
    }
}