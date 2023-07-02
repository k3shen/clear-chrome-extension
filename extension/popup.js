import { millisToMinutesAndSeconds } from "./util.js";

const outsidePage = () => {
    const mainElement = document.getElementById("main");
    mainElement.className = "";

    const loginButton = document.createElement("button");
    loginButton.className = "col btn btn-primary";
    loginButton.innerHTML = "Login";
    loginButton.style = "margin-bottom: 5px";
    loginButton.addEventListener("click", loginPage);

    const registerButton = document.createElement("button");
    registerButton.className = "col btn btn-secondary";
    registerButton.innerHTML = "Create Account";
    registerButton.addEventListener("click", registerPage);

    mainElement.appendChild(loginButton);
    mainElement.appendChild(registerButton);
}

const createFormElement = (type, id, labelName, placeholder) => {
    const group = document.createElement("div");
    group.className = "form-group"

    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.innerHTML = labelName;

    const input = document.createElement("input");
    input.type = type;
    input.className = "form-control";
    input.id = id;
    input.placeholder = placeholder;

    group.appendChild(label);
    group.appendChild(input)
    return group;
}

const createSwitchElement = (labelName, id) => {
    const switchElement = document.createElement("div");
    switchElement.className = "custom-control custom-switch";
    const input = document.createElement("input");
    input.className = "custom-control-input";
    input.type = "checkBox";
    input.id = id;
    input.addEventListener("change", function() {
        updateUserInfo();
    }, false);    
    const label = document.createElement("label");
    label.className = "custom-control-label text-muted";
    label.setAttribute("for", id);
    label.innerHTML = labelName;

    switchElement.append(input);
    switchElement.append(label);
    return switchElement;
}

const loginPage = () => {
    const mainElement = document.getElementById("main");
    mainElement.className = "";
    mainElement.innerHTML = "";

    const card = document.createElement("div");
    card.className = "card";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h4");
    cardTitle.className = "card-title";
    cardTitle.innerHTML = "Login";

    const form = document.createElement("form");
    const username = createFormElement("text", "user", "Username", "Please Enter");
    const password = createFormElement("password", "password", "Password", "Please Enter");

    const loginButton = document.createElement("button");
    loginButton.type = "button";
    loginButton.className = "col btn btn-primary";
    loginButton.innerHTML = "Login";
    loginButton.addEventListener("click", () => validateUser(username, password));

    mainElement.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(form);
    form.appendChild(username);
    form.appendChild(password);
    form.appendChild(loginButton);
}

const registerPage = () => {
    const mainElement = document.getElementById("main");
    mainElement.className = "";
    mainElement.innerHTML = "";

    const card = document.createElement("div");
    card.className = "card";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h4");
    cardTitle.className = "card-title";
    cardTitle.innerHTML = "Create Account";

    const form = document.createElement("form");
    const username = createFormElement("text", "user", "Username", "Please Enter");
    const password = createFormElement("password", "password", "Password", "Please Enter");
    const confirmPassword = createFormElement("password", "password", "Confirm Password", "Please Enter");

    const registerButton = document.createElement("button");
    registerButton.type = "button";
    registerButton.className = "col btn btn-primary";
    registerButton.innerHTML = "Create";
    registerButton.addEventListener("click", () => createUser(username, password, confirmPassword));

    mainElement.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(form);
    form.appendChild(username);
    form.appendChild(password);
    form.appendChild(confirmPassword);
    form.appendChild(registerButton);
}

const insidePage = () => {
    const mainElement = document.getElementById("main");
    mainElement.className = "";
    mainElement.innerHTML = "";

    const info = document.createElement("div");
    const infoHeader = document.createElement("h5");
    infoHeader.innerHTML = "User Info";

    const allRests = document.createElement("p");
    allRests.className = "text-muted";
    allRests.id = "allRests";
    allRests.style = "margin-bottom: 0px";

    const sessionRests = document.createElement("p");
    sessionRests.className = "text-muted";
    sessionRests.id = "sessionRests";
    sessionRests.style = "margin-bottom: 0px";

    const countdown = document.createElement("p")
    countdown.className = "text-muted";
    countdown.id = "countdown";

    const settings = document.createElement("div");
    const settingsHeader = document.createElement("h5");
    settingsHeader.id = "settingsHeader";

    const switch1 = createSwitchElement("Toggle timer on/off", "switch1")
    const switch2 = createSwitchElement("Auto start session on open", "switch2")

    mainElement.appendChild(info);
    info.appendChild(infoHeader);
    info.appendChild(allRests);
    info.appendChild(sessionRests);
    info.appendChild(countdown);
    mainElement.appendChild(settings);
    settings.appendChild(settingsHeader);
    settings.appendChild(switch1);
    settings.appendChild(switch2);
}

const validateUser = async (username, password) => {
    const userValue = username.children[1].value;
    const passValue = password.children[1].value;
    if (!userValue || !passValue || userValue === "" || passValue === "") {
        username.children[1].value = "";
        password.children[1].value = "";
        alert("Please fill in all fields!");
        return;
    }
    try {
        const response = await fetch(`http://localhost:3000/api/users/${userValue}/${passValue}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json();
        if (response.status !== 200) {
            alert(data.message);
            return;
        }
        chrome.runtime.sendMessage({type: "USER", ...data})        
    }
    catch (err) {
        console.log(err);
        return;
    }
    insidePage();
}

const createUser = async (username, password, confirmPassword) => {
    const userValue = username.children[1].value;
    const passValue = password.children[1].value;
    const confirmValue = confirmPassword.children[1].value;
    const regex = /^[a-zA-Z0-9.\-_$@*!#]{1,30}$/;

    if (!userValue || !passValue || !confirmValue || userValue === "" || passValue === "" || confirmValue === "") {
        username.children[1].value = "";
        password.children[1].value = "";
        confirmPassword.children[1].value = "";
        alert("Please fill in all fields!");
        return;
    }
    if (!regex.test(userValue) || !regex.test(passValue) || !regex.test(confirmValue)) {
        username.children[1].value = "";
        password.children[1].value = "";
        confirmPassword.children[1].value = "";
        alert("Invalid characters for username/password");
        return;
    }
    if (passValue !== confirmValue) {
        password.children[1].value = "";
        confirmPassword.children[1].value = "";
        alert("Passwords do not match");
        return;
    }
    try {
        const response = await fetch(`http://localhost:3000/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": userValue, "password": passValue })
        })
        const data = await response.json();
        if (response.status !== 201) {
            alert(data.message);
            return;
        }
    }
    catch (err) {
        console.log(err);
        return;
    }
    loginPage();
}

chrome.runtime.onMessage.addListener((obj, sender, response) => {
    if (obj.type === "UPDATE") {
        updateUserInfo(true);  
    }
    if (obj.type === "COUNTDOWN") {
        document.getElementById("countdown").innerHTML = `Time until rest: ${millisToMinutesAndSeconds(obj.end - Date.now())}`;
    }
});

const updateUserInfo = async (first=false) => {
    const { user } = await chrome.storage.local.get(["user"]);

    document.getElementById("allRests").innerHTML = `All time rests: ${user.totalRests}`;
    document.getElementById("sessionRests").innerHTML = "Session Rests: 0";

    if (document.getElementById("switch1").checked) {
        document.getElementById("settingsHeader").innerHTML = "Settings <span class=\"badge badge-success\">ON</span>";
        clearTimers();
        startTimers(user.interval);        
    }
    else {
        document.getElementById("settingsHeader").innerHTML = "Settings <span class=\"badge badge-danger\">OFF</span>";
        document.getElementById("countdown").innerHTML = `Time until rest: ${user.interval}:00`;
        clearTimers();
    }    
    if (user.autoStart && first) {
        document.getElementById("countdown").innerHTML = `Time until rest: ${user.interval}:00`;
        document.getElementById("settingsHeader").innerHTML = "Settings <span class=\"badge badge-success\">ON</span>";
        document.getElementById("switch1").setAttribute("checked", "");
        document.getElementById("switch2").setAttribute("checked", "");
        clearTimers();
        startTimers(user.interval);
    }
}

const startTimers = (interval) => {
    chrome.alarms.create("timer", {
        when: Date.now() + (30*1000)
    })
    chrome.alarms.create("countdown", {
        when: Date.now() + 500
    })
}

const clearTimers = () => {
    chrome.alarms.clearAll();
}

chrome.storage.local.get(["user"]).then((result) => {
    if (result.user == null) {
        outsidePage();
    }
    else {
        insidePage();
        updateUserInfo(true);
    }
});