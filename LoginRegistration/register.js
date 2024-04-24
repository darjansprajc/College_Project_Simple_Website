document.querySelector("#register").addEventListener("submit", (e) => {
    e.preventDefault();
    const registerData = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value
    };
    register(registerData);
})

const message = document.querySelector("#message");

function register(registerData){    
    const form = document.querySelector("#register");
    const message = document.createElement("div");

    fetch("https://www.fulek.com/data/api/user/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(registerData)
    })
    .then((response) => response.json())
    .then((result) => {
        if(result.isSuccess){
            message.style.color = "green";
            message.innerHTML = "Registracija uspješna, na login stranicu za 3,2,1 ...";
            form.after(message);
            setTimeout(() => {
                location.assign("login.html");
            }, 3000);
        }
        else{
            message.style.color = "red";
            message.innerHTML = "Registracija ne uspješna";
            form.after(message);
            alert(result.errorMessages[0]);
        }  
    })
    .catch((error) =>{
        alert("Problem povezivanja sa poslužiteljem", error)
    })
}