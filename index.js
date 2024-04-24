function openForm() {
    document.getElementById("myForm").style.display = "flex";
  }

function closeForm(){
  document.getElementById("myForm").style.display = "none";
}

function openMenu(){
  document.getElementById("openMenu").style.display = "none";
  document.getElementsByClassName("nav")[0].style.display = "flex";
}

function closeMenu(){
  document.getElementById("openMenu").style.display = "block";
  document.getElementsByClassName("nav")[0].style.display = "none";
}

if (sessionStorage.getItem("token")) {

  function logOut(){
    sessionStorage.removeItem("token");
  }

  const li1 = document.querySelector("#navNastavniPlan");
  li1.style.display = "block";

  const li2 = document.querySelector("#navPrijaviSe");
  li2.innerHTML = '<a onclick = "logOut()" href = "/"><i class="fa-solid fa-right-to-bracket" style="color:lightblue"></i> Odjavi se</a>'
  
}










