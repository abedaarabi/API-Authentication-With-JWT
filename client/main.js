const ERROR_CODES = {
  EMAIL_ALREADY_EXIST: 1
};

const registerForm = document.querySelector("#register-from");
const loginForm = document.querySelector("#login-from");
const message = document.querySelector("#message");

const retriveBTN = document.querySelector("#retrive");

if (registerForm) {
  registerForm.addEventListener("submit", async e => {
    e.preventDefault();
    // stop default browser behaviour which is refereching the page
    const formData = new FormData(e.target);
    const requestBody = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password")
    };

    const response = await fetch("/register", {
      method: "post",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const body = await response.json();

    if (response.status === 201) {
      alert("welcome, user registered successfully");
      message.textContent = `hello ${body.name}, you are finnally in`;
      registerForm.remove();
    } else if (body.error === ERROR_CODES.EMAIL_ALREADY_EXIST) {
      // document.body.style.backgroundColor = "red";
      alert("please email already exist,try again");
    }
  });
}

//===========================================

retriveBTN.addEventListener("click", async e => {
  const response = await fetch("/projects", {
    method: "get",
    body: JSON.stringify(),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  console.log(data);
  const html = data.data
    .map(user => {
      return `
    <div class ="userForge">
    <p> project name: ${user.attributes.name} </p>
    </div>`;
    })
    .join();

  document.querySelector("#app").insertAdjacentHTML("afterbegin", html);
  retriveBTN.remove();
});
