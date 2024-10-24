(() => {
    if (localStorage.getItem("usernameRAW")) {
        fetch("API/checkAdminAvail.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: localStorage.getItem("usernameRAW"),
            })
        }).then(res => {
            if (!res.ok) {
                alert("There was a problem in the server");
                console.log("API Not found");
            }
            else return res.json();
        }).then(data => {
            if (data[0] == 0) {
                localStorage.removeItem("usernameRAW");
                location.href = "index.html";
            }
        }).catch(err => {
            console.error("Error : " + err);
        });
    } else {
        location.href = "index.html";
    }
})();