let loggedIn = false;

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

const onLoginClick = (username, password) => {
    const userValue = username.children[1].value;
    const passValue = password.children[1].value;

    console.log(userValue, passValue)
    if (!userValue || !passValue || userValue === "" || passValue === "") {
        username.children[1].value = "";
        password.children[1].value = "";
        alert("Please fill in all fields!");
    }
    else {
        // login after mongodb checks
        insidePage();
    }
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
    loginButton.addEventListener("click", () => onLoginClick(username, password));

    mainElement.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(form);
    form.appendChild(username);
    form.appendChild(password);
    form.appendChild(loginButton);
}

const onRegisterClick = (username, password, confirmPassword) => {
    const userValue = username.children[1].value;
    const passValue = password.children[1].value;
    const confirmValue = confirmPassword.children[1].value;

    console.log(userValue, passValue)
    if (!userValue || !passValue || !confirmValue || userValue === "" || passValue === "" || confirmValue === "") {
        username.children[1].value = "";
        password.children[1].value = "";
        confirmPassword.children[1].value = "";
        alert("Please fill in all fields!");
    }
    else {
        // create user in mongodb and push login screen
        loginPage();
    }
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
    registerButton.addEventListener("click", () => onRegisterClick(username, password, confirmPassword));

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

    mainElement.innerHTML = '<p>inside</p>';
}

if (!loggedIn) {
    outsidePage();
}
else {
    insidePage();
}
