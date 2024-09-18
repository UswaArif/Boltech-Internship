async function getInputValue(){
    let usernames = document.getElementById("username").value;
    console.log("Username: " , usernames);
    
    let passwords = document.getElementById("password").value;
    console.log("password: " , passwords);

    try{
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: usernames,
              password: passwords,
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Login successful:", data);
            document.getElementById("message").innerHTML = "Login successful. Welcome back, " + usernames + "!";
            const messageElement = document.getElementById("message");
            messageElement.style.display = "block";

            url = 'dashboard.html';
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);
            window.location.assign(url);

        } 
        else {
            console.error("Login failed:", data);
            document.getElementById("message").innerHTML = "Login Failed";
            const messageElement = document.getElementById("message");
            messageElement.style.display = "block";
        }
           
    }
    catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
}



