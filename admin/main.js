let checkNumber = (elems) => {
    elems.value = elems.value.replace(/[^0-9]/g, "");
};
let checkText = (elems) => {
    elems.value = elems.value.replace(/[^0-9@A-Za-z.]/g, "");
};
let checkNormal = (elems) => {
    elems.value = elems.value.replace(/[^0-9@A-Za-z., ]/g, "");
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
const logoutFromAdmin = () => {
    localStorage.removeItem("usernameRAW");
    localStorage.removeItem("userState");
    location.href = "index.html"
};
const stateChange = (stateNum, e_id, name) => {
    msgShow = "Are you sure want to "
    if (stateNum > 0) {
        msgShow += "Approve";
    }
    else if (stateNum < 0) {
        msgShow += "Decline";
    }

    msgShow += " " + name + " ?";

    if (confirm(msgShow)) {
        fetch("API/changeState.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                state: stateNum,
                id: e_id
            })
        }).then(res => {
            if (!res.ok) {
                console.error("API not found..");
                alert("There was a problem in the server. Please try again later");
            }
            else return res.text();
        }).then(data => {
            alert(data);
            location.reload();
        }).catch(err => {
            console.error("Error : " + err);
        });
    }

};
const deleteStudent = (e_id, name) => {
    if (confirm("Are you sure want to remove " + name + " ?")) {
        fetch("API/deleteStudents.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                phone: e_id
            })
        }).then(res => {
            if (!res.ok) {
                console.error("API not found..");
                alert("There was a problem in the server. Please try again later");
            }
            else return res.text();
        }).then(data => {
            alert(data);
            location.reload();
        }).catch(err => {
            console.error("Error : " + err);
        });
    }
};


if (elem("form-admin-log")) {
    /* Function that triggers for removing the admin logged in state */
    (() => {
        if (localStorage.getItem("usernameRAW") || localStorage.getItem("userState")) {
            logoutFromAdmin();
        }
    })();

    elem("form-admin-log").addEventListener('submit', e => {
        e.preventDefault();
        fetch("API/checkAdmin.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: elem("txtUser").value,
                pass: elem("txtPass").value
            })
        }).then(res => {
            if (!res.ok) {
                alert("There was a problem in the server");
                console.error("API Not found");
            }
            else return res.json();
        }).then(data => {
            if (data[0] == 1) {
                localStorage.setItem("usernameRAW", elem("txtUser").value);
                location.href = "main.html";
            }
            else {
                alert("Incorrect Credentials!");
                elem("txtUser").focus();
            }
        }).catch(err => {
            console.error("Error : " + err);
        });
    });
}

if (elem("adminPanel")) {

    let getInitialData = () => {
        fetch("API/getInfoWelcome.php").then(res => {
            if (!res.ok) {
                console.error("API not found..");
                alert("There was a problem in the server. Please try again later");
            }
            else return res.json();
        }).then(data => {
            elem("lbTotalStudents").innerHTML = data[0];
            elem("lbOnLeave").innerHTML = data[1];
            elem("lbLeaveRequests").innerHTML = data[2];
            elem("lbDeclinedRequests").innerHTML = data[3];
        }).catch(err => {
            console.error("Error : " + err);
        });
    };
    getInitialData();
    setInterval(() => {
        getInitialData();
    }, 3000);

    const noRequest = `
    <p class="requestNoText">No Requests Pending</p>
    `;

    elem("searchRes").classList.add("novisible");

    /* Search Text Functionality */
    elem("txtSearchRequest").addEventListener("input", e => {
        elem("searchRes").classList.add("novisible");
        if (e.target.value.length == 10) {
            fetch('API/getRequestPhone.php', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    phone: e.target.value,
                })
            }).then(res => {
                if (!res.ok) {
                    console.error("API not found..");
                    alert("There was a problem in the server. Please try again later");
                }
                else return res.json();
            }).then(data => {
                let output = ``;
                if (data[0] != 0) {
                    elem("searchRes").classList.remove("novisible");
                    output = `
                    <h4>Search Results :</h4>
                    `;
                    data.forEach(item => {
                        output += `
                    <div class="requests">
                        <div class="row">
                            <div class="block">
                                <p>Issue Date :</p>
                                <h1>${item.issue_date}</h1>
                            </div>
                
                            <div class="block">
                                <p>Name:</p>
                                <h1>${item.name}</h1>
                            </div>
                
                            <div class="block">
                                <p>Phone:</p>
                                <h1>+91 ${item.phone}</h1>
                            </div>
                
                            <div class="block">
                                <p>Gender:</p>
                                <h1>${item.gender}</h1>
                            </div>
        
                            <div class="block">
                                <p>Hostel ID:</p>
                                <h1>${item.hostel_id}</h1>
                            </div>

                            <div class="block">
                                <p>ID:</p>
                                <h1>${item.id}</h1>
                            </div>

                        </div>
                        <div class="row">
                            <div class="block">
                                <p>Date(from):</p>
                                <h1>${item.d_from}</h1>
                            </div>
                
                            <div class="block">
                                <p>Date(to):</p>
                                <h1>${item.d_to}</h1>
                            </div>

                            <div class="block">
                                <p>Status</p>
                                <h1 class="
                            `;

                        if (item.status > 0)
                            output += `txt-success">Approved`;
                        else if (item.status < 0)
                            output += `txt-warning">Declined`;
                        else
                            output += `txt-warning">Pending`;
                        output += `
                                </h1>
                            </div>
                        </div>
                        <div class="row address">
                            <div class="block">
                                <p>Address on Leave:</p>
                                <h1>${item.address}</h1>
                            </div>
                
                            <div class="block">
                                <p>Reason for Leave:</p>
                                <h1>${item.purpose}</h1>
                            </div>
                        </div>
                        <div class="row last">
                            <label class="btn green" style="margin-right: 0px;" 
                            onclick="stateChange(1,${item.id}, '${item.name}')"
                            >
                            Approve
                            </label>
                            <label class="btn red" onclick="stateChange(-1,${item.id}, '${item.name}')">
                            Decline
                            </label>
                        </div>
                    </div>
                    `;

                    });
                    elem("searchRes").innerHTML = output;
                }
                else {
                    elem("searchRes").classList.add("novisible");
                    elem("searchRes").innerHTML = "";
                }
            }).catch(err => {
                console.error("Error : " + err);
            })
        }
        else {
            elem("searchRes").classList.add("novisible");
            elem("searchRes").innerHTML = "";
        }
    });

    const getRequestCards = () => {
        let requestCard = ``;

        fetch('API/getRequests.php').then(res => {
            if (!res.ok) {
                console.error("API not found..");
                alert("There was a problem in the server. Please try again later");
            }
            else return res.json();
        }).then(data => {
            if (data[0] == 0) {
                elem("reqContainer").innerHTML = noRequest;
            }
            else {
                data.forEach(item => {
                    requestCard += `
                    <div class="requests">
                        <div class="row">
                            <div class="block">
                                <p>Issue Date :</p>
                                <h1>${item.issue_date}</h1>
                            </div>
                
                            <div class="block">
                                <p>Name:</p>
                                <h1>${item.name}</h1>
                            </div>
                
                            <div class="block">
                                <p>Phone:</p>
                                <h1>+91 ${item.phone}</h1>
                            </div>
                
                            <div class="block">
                                <p>Gender:</p>
                                <h1>${item.gender}</h1>
                            </div>
          
                            <div class="block">
                                <p>Hostel ID:</p>
                                <h1>${item.hostel_id}</h1>
                            </div>
    
                            <div class="block">
                                <p>ID:</p>
                                <h1>${item.id}</h1>
                            </div>
    
                        </div>
                        <div class="row">
                            <div class="block">
                                <p>Date(from):</p>
                                <h1>${item.d_from}</h1>
                            </div>
                
                
                            <div class="block">
                                <p>Date(to):</p>
                                <h1>${item.d_to}</h1>
                            </div>
                
                        </div>
                        <div class="row address">
                            <div class="block">
                                <p>Address on Leave:</p>
                                <h1>${item.address}</h1>
                            </div>
                
                            <div class="block">
                                <p>Reason for Leave:</p>
                                <h1>${item.purpose}</h1>
                            </div>
                        </div>
                        <div class="row last">
                            <label class="btn green" style="margin-right: 0px;" 
                                onclick="stateChange(1,${item.id}, '${item.name}')"
                            >
                                Approve
                            </label>
                            <label class="btn red" onclick="stateChange(-1,${item.id}, '${item.name}')">
                                Decline
                            </label>
                        </div>
                    </div>
                    `;
                });
                elem("reqContainer").innerHTML = requestCard;
            }
        }).catch(err => {
            console.error("Error : " + err);
        })
    };
    getRequestCards();
    setInterval(() => {
        getRequestCards();
    }, 3000);


}

if (elem("form_approved")) {
    const noRequest = `
    <p class="requestNoText">No Requests Approved</p>
    `;


    setInterval(() => {
        let requestCard = ``;

        fetch('API/getRequestsApproved.php').then(res => {
            if (!res.ok) {
                console.error("API not found..");
                alert("There was a problem in the server. Please try again later");
            }
            else return res.json();
        }).then(data => {
            if (data[0] == 0) {
                elem("reqContainer").innerHTML = noRequest;
            }
            else {
                data.forEach(item => {
                    requestCard += `
                    <div class="requests">
                        <div class="row">
                            <div class="block">
                                <p>Issue Date :</p>
                                <h1>${item.issue_date}</h1>
                            </div>
                
                            <div class="block">
                                <p>Name:</p>
                                <h1>${item.name}</h1>
                            </div>
                
                            <div class="block">
                                <p>Phone:</p>
                                <h1>+91 ${item.phone}</h1>
                            </div>
                
                            <div class="block">
                                <p>Gender:</p>
                                <h1>${item.gender}</h1>
                            </div>
          
                            <div class="block">
                                <p>Hostel ID:</p>
                                <h1>${item.hostel_id}</h1>
                            </div>
    
                            <div class="block">
                                <p>ID:</p>
                                <h1>${item.id}</h1>
                            </div>
    
                        </div>
                        <div class="row">
                            <div class="block">
                                <p>Date(from):</p>
                                <h1>${item.d_from}</h1>
                            </div>
                
                
                            <div class="block">
                                <p>Date(to):</p>
                                <h1>${item.d_to}</h1>
                            </div>
                
                        </div>
                        <div class="row address">
                            <div class="block">
                                <p>Address on Leave:</p>
                                <h1>${item.address}</h1>
                            </div>
                
                            <div class="block">
                                <p>Reason for Leave:</p>
                                <h1>${item.purpose}</h1>
                            </div>
                        </div>
                        <div class="row last">
                            <label class="btn green" style="margin-right: 0px;" 
                                onclick="stateChange(1,${item.id}, '${item.name}')"
                            >
                                Approve
                            </label>
                            <label class="btn red" onclick="stateChange(-1,${item.id}, '${item.name}')">
                                Decline
                            </label>
                        </div>
                    </div>
                    `;
                });
                elem("reqContainer").innerHTML = requestCard;
            }
        }).catch(err => {
            console.error("Error : " + err);
        })
    }, 3000);


}

if (elem("form_declined")) {
    const noRequest = `
    <p class="requestNoText">No Requests Declined</p>
    `;


    setInterval(() => {
        let requestCard = ``;

        fetch('API/getRequestsDeclined.php').then(res => {
            if (!res.ok) {
                console.error("API not found..");
                alert("There was a problem in the server. Please try again later");
            }
            else return res.json();
        }).then(data => {
            if (data[0] == 0) {
                elem("reqContainer").innerHTML = noRequest;
            }
            else {
                data.forEach(item => {
                    requestCard += `
                    <div class="requests">
                        <div class="row">
                            <div class="block">
                                <p>Issue Date :</p>
                                <h1>${item.issue_date}</h1>
                            </div>
                
                            <div class="block">
                                <p>Name:</p>
                                <h1>${item.name}</h1>
                            </div>
                
                            <div class="block">
                                <p>Phone:</p>
                                <h1>+91 ${item.phone}</h1>
                            </div>
                
                            <div class="block">
                                <p>Gender:</p>
                                <h1>${item.gender}</h1>
                            </div>
          
                            <div class="block">
                                <p>Hostel ID:</p>
                                <h1>${item.hostel_id}</h1>
                            </div>
    
                            <div class="block">
                                <p>ID:</p>
                                <h1>${item.id}</h1>
                            </div>
    
                        </div>
                        <div class="row">
                            <div class="block">
                                <p>Date(from):</p>
                                <h1>${item.d_from}</h1>
                            </div>
                
                
                            <div class="block">
                                <p>Date(to):</p>
                                <h1>${item.d_to}</h1>
                            </div>
                
                        </div>
                        <div class="row address">
                            <div class="block">
                                <p>Address on Leave:</p>
                                <h1>${item.address}</h1>
                            </div>
                
                            <div class="block">
                                <p>Reason for Leave:</p>
                                <h1>${item.purpose}</h1>
                            </div>
                        </div>
                        <div class="row last">
                            <label class="btn green" style="margin-right: 0px;" 
                                onclick="stateChange(1,${item.id}, '${item.name}')"
                            >
                                Approve
                            </label>
                            <label class="btn red" onclick="stateChange(-1,${item.id}, '${item.name}')">
                                Decline
                            </label>
                        </div>
                    </div>
                    `;
                });
                elem("reqContainer").innerHTML = requestCard;
            }
        }).catch(err => {
            console.error("Error : " + err);
        })
    }, 3000);


}

if (elem("form_totalStu")) {
    const noRequest = `
    <p class="requestNoText">No Students</p>
    `;


    setInterval(() => {
        let requestCard = ``;

        fetch('API/getStudents.php').then(res => {
            if (!res.ok) {
                console.error("API not found..");
                alert("There was a problem in the server. Please try again later");
            }
            else return res.json();
        }).then(data => {
            if (data[0] == 0) {
                elem("reqContainer").innerHTML = noRequest;
            }
            else {
                data.forEach(item => {
                    requestCard += `
                    <div class="requests">
                        <div class="row">
                            <div class="block">
                                <p>Hostel ID :</p>
                                <h1>${item.hostel_id}</h1>
                            </div>
                
                            <div class="block">
                                <p>Name:</p>
                                <h1>${item.name}</h1>
                            </div>
                
                            <div class="block">
                                <p>Phone:</p>
                                <h1>+91 ${item.phone}</h1>
                            </div>
                
                            <div class="block">
                                <p>Gender:</p>
                                <h1>${item.gender}</h1>
                            </div>
          
                            <div class="block">
                                <p>Address :</p>
                                <h1>${item.address}</h1>
                            </div>    
                        </div>

                        <div class="row last" style="padding: 0.5rem 1rem">
                            <label class="btn red" style="margin-right: 0px;" 
                                onclick="deleteStudent('${item.phone}', '${item.name}')"
                            >
                                Delete
                            </label>
                        </div>
                    </div>
                    `;
                });
                elem("reqContainer").innerHTML = requestCard;
            }
        }).catch(err => {
            console.error("Error : " + err);
        })
    }, 3000);


}