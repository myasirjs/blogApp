import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./config.js";

const form = document.querySelector("#loginForm");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const perror = document.querySelector("#error");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(email.value);
  console.log(password.value);

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location = "index.html";
    })
    .catch((error) => {
      console.error("Error Signing In:", error);
      perror.innerHTML = error.message;
    });
});
