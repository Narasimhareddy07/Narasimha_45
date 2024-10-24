/* Initial Funtion to See if the User is logged in or not */
const initialLoginPage = () => {
    if (
        localStorage.getItem("usernameRAW") != null &&
        localStorage.getItem("userState") == "1"
    ) {
        fetch("API/checkUser.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: localStorage.getItem("usernameRAW"),
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    console.error("API not Found for Check User");
                    localStorage.removeItem("usernameRAW");
                    localStorage.removeItem("userState");
                    alert("There was a problem.. Please Try again Later");
                    window.location.href = "login.html";
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                if (data[0] == 1) {
                    window.location.href = "main.html";
                } else {
                    localStorage.removeItem("usernameRAW");
                    localStorage.removeItem("userState");
                    window.location.href = "login.html";
                }
            })
            .catch((err) => {
                console.error("There was a problem in the Code : " + err);
                window.location.href = "login.html";
            });
    } else {
        localStorage.removeItem("usernameRAW");
        localStorage.removeItem("userState");
        window.location.href = "login.html";
    }
};

setTimeout(() => initialLoginPage(), 5000);
