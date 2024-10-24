/* 
---------------- Custom Functions ----------------
*/
let checkNumber = (elems) => {
    elems.value = elems.value.replace(/[^0-9]/g, "");
};
let checkText = (elems) => {
    elems.value = elems.value.replace(/[^0-9@A-Za-z.]/g, "");
};
let checkNormal = (elems) => {
    elems.value = elems.value.replace(/[^0-9@A-Za-z., ]/g, "");
};

const el = (el) => {
    return document.querySelector(el);
};
const elem = (el) => {
    return document.getElementById(el);
};
const goBack = () => {
    window.history.back(-1);
};
const reDirect = (url) => {
    window.location.href = url;
};
const fTop = () => {
    window.scrollTo(0, 0);
};
const catchErr = (errP) => {
    console.error(errP);
    alert("Internal Error C.L. Please Contact the Developers !");
};

/* Login in Function to SET the username and state locally */
if (elem("form-dp")) {
    (() => {
        elem("form-dp").addEventListener("submit", (e) => {
            e.preventDefault();
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
                        window.location.href = "main.html";
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
        });
    })();
}

let logoutFromHere = () => {
    localStorage.setItem("userState", 0);
    window.location.href = "index.html";
};


/* Check Entry User for Login and Sign up Form whether the user is sign in or not */
let checkEnUser = () => {
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
                }
            })
            .catch((err) => {
                console.error("There was a problem in the Code : " + err);
            });
    } else {
        localStorage.removeItem("usernameRAW");
        localStorage.removeItem("userState");
    }
};

let checkInUserMainPage = () => {

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
            } else {
                return res.json();
            }
        })
        .then((data) => {
            if (data[0] != 1 || localStorage.getItem("userState") == 0) {
                reDirect('index.html');
            }
        })
        .catch((err) => {
            console.error("There was a problem in the Code : " + err);
        });

};