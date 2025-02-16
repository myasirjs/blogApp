import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth, db } from "./config.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const perror = document.querySelector("#error");
const fullName = document.querySelector("#fullName");

let profileImg = "";

let myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "dwzd6xklo",
    uploadPreset: "k2k2urvk",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      profileImg = result.info.secure_url;
    }
  }
);

document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(email.value);
  console.log(fullName.value);
  console.log(password.value);
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log(user);

      try {
        const docRef = await addDoc(collection(db, "blogs"), {
          fullName: fullName.value,
          email: email.value,
          uid: user.uid,
          image: profileImg,
        });
        console.log("Document written with ID: ", docRef.id);
        email.value = "";
        fullName.value = "";
        password.value = "";
        window.location = "login.html";
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      perror.innerHTML = errorMessage;
    });
});
