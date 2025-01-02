function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var action = "https://script.google.com/macros/s/AKfycbzZALU3GMcXiBHgsHaIr7WzZjKku6HyMxqVwoIcQ6D45mEqSZ7YfnjRPTYov50ejhOMhQ/exec";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", action, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("email=" + email + "&password=" + password);

    var loginButton = document.getElementById("login-button");
    loginButton.textContent = "Login...";
    loginButton.disabled = true;

    xhr.onload = function() {
        if (xhr.responseText === "true") {
            localStorage.setItem("yash_id_sell", email);
            loginButton.textContent = "Logined";
            setTimeout(function() {
                window.location.href = "index.html";
            }, 4000);
        } else {
            alert("Invalid email or password");
            loginButton.textContent = "Login";
            loginButton.disabled = false;
        }
    };
}

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    login();
});

window.onload = function() {
    var email = localStorage.getItem("yash_id_sell");
    var loginButton = document.getElementById("login-button");
    if (email) {
        loginButton.textContent = "Logined";
        loginButton.disabled = true;
        setTimeout(function() {
            window.location.href = "index.html";
        }, 0);
    }
};
