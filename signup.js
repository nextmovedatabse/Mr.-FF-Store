function sendData() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var whatsapp = document.getElementById("whatsapp").value;
    var password = document.getElementById("password").value;
    var submitButton = document.getElementById("submit-button");
    var action = "https://script.google.com/macros/s/AKfycbwF-th_9f0shW_l_iF1aXnHZZ62e8xgtHhAfXADIjOaO2LtBzqgejswBrBRPqgvwCtA4A/exec";
    var xhr = new XMLHttpRequest();

    submitButton.value = "Submitting...";
    submitButton.disabled = true;

    xhr.open("POST", action, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = xhr.responseText;
                if (response.includes("Error: Email already exists")) {
                    submitButton.value = "Submit";
                    submitButton.disabled = false;
                    alert("This email is already registered.");
                } else {
                    submitButton.value = "Submitted";
                    setTimeout(function() {
                        window.location.href = "login.html";
                    }, 4000);
                }
            } else {
                submitButton.value = "Submit";
                submitButton.disabled = false;
                alert("Failed to submit data. Please try again.");
            }
        }
    };

    xhr.send("name=" + encodeURIComponent(name) + "&email=" + encodeURIComponent(email) + "&whatsapp=" + encodeURIComponent(whatsapp) + "&password=" + encodeURIComponent(password));
}

document.getElementById("registration-form").addEventListener("submit", function(event) {
    event.preventDefault();
    sendData();
});
