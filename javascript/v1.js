const API_Error = "Couldn't connect to the API \n";

const loginUserNormal = (e) => {
    fetch('API/checkUser.php', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user: elem('txtUser').value
        })
    }).then(res => {
        return res.text();
    }).then(data => {
        if (data[0] == "<") { console.error(API_Error + data); return 0; }
        else {
            data = JSON.parse(data);
        }
    }).catch(err => {
        console.error(err);
    })
};

if (elem('form-dp')) {
    elem('form-dp').addEventListener("submit", (e) => {
        e.preventDefault();
        loginUserNormal('main.html');
    });
}

const checkUserLoggedIn = () => {
    fetch("API/loginUser.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user: elem("txtUser").value,
            pass: elem("txtPass").value,
        }),
    })
        .then((res) => {
            if (!res.ok) {
                console.error("API not Found for Check User");
                alert("There was a problem.. Please Try again Later");
            } else {
                return res.json();
            }
        })
        .then((data) => {
            if (data[0] == 1) {
                localStorage.setItem("usernameRAW", elem("txtUser").value);
                localStorage.setItem("userState", "1");
                window.location.href = "admin/";
            } else {
                alert("Wrong Credentials ! Please Enter the credentials again.");
                elem("txtUser").focus;
                localStorage.setItem("usernameRAW", "0");
                localStorage.setItem("userState", "0");
            }
        })
        .catch((err) => {
            console.error("There was a problem in the Code : " + err);
            localStorage.setItem("usernameRAW", "0");
            localStorage.setItem("userState", "0");
        });
}
