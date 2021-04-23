function linkHtmlPage(){
    let inEma = document.getElementById("password").value
    let inPass = document.getElementById("email").value
    if(inEma == "admin" && inPass == "admin"){
        window.location.href="Home.html";
    }
    else{
        alert("Invalid email and password")
    }
    
}