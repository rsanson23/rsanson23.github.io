// Expands side navigation bar to fixed width and show links to projects
const openSideNav = () => {
    document.getElementById('sideNavDiv').style.width = "200px";
    document.getElementById('side-btn').textContent = "-";
    document.getElementById('side-btn').style.marginLeft = "180px";
    document.getElementById('side-btn').setAttribute("onclick", "javascript: closeSideNav();");
    var content = document.getElementsByClassName('sideNavContent');

    for (let i = 0; i < content.length; i++) {
        content[i].style.visibility = "visible";
    }
}


// Contracts side navigation bar and hides links to projects
const closeSideNav = () => {
    document.getElementById('sideNavDiv').style.width = "20px";
    document.getElementById('side-btn').textContent = "+";
    document.getElementById('side-btn').style.marginLeft = "0";
    document.getElementById('side-btn').setAttribute("onclick", "javascript: openSideNav();");

    var content = document.getElementsByClassName('sideNavContent');

    for (let i = 0; i < content.length; i++) {
        content[i].style.visibility = "hidden";
    }
}