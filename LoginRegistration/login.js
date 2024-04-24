document.querySelector("#login").addEventListener("submit", (e) => {
    e.preventDefault();
    const loginData = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value
    };
    login(loginData);
})

function login(loginData){
    const form = document.querySelector("#login");
    const message = document.createElement("div");

    fetch("https://www.fulek.com/data/api/user/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(loginData)
    })
    .then((response) => response.json())
    .then((result) => {
        if(result.isSuccess){
            sessionStorage.setItem("token", result.data.token);
            message.style.color = "green";
            message.innerHTML = "Uspješna prijava, na početnu stranicu za 3,2,1 ...";
            form.after(message);

            setTimeout(() => {
                location.assign("../index.html");
            }, 3000);
        }
        else{
            message.style.color = "red";
            message.innerHTML = "Pogrešno ime ili lozinka, pokušajte ponovo";
            form.after(message);
        }  
    })
    .catch((error) =>{
        alert("Problem povezivanja sa poslužiteljem", error)
    })
}