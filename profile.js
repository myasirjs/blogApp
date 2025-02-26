import { app, auth, db } from "./config.js";
import {
  onAuthStateChanged,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import {
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Get DOM elements
const fullNameHeader = document.querySelector("#username"); // Header Name
const fullNameCard = document.querySelector("#usernamee h2"); // Card Name
const profileImgHeader = document.querySelector("#profileImg"); // Header Image
const profileImgCard = document.querySelector("#profile img"); // Card Image

const oldPassword = document.querySelector("#oldPassword");
const newPassword = document.querySelector("#newPassword");
const repeatPassword = document.querySelector("#repeatPassword");
const updateButton = document.querySelector("#updateButton");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("User is logged in:", user.uid);

    // Query the blogs collection for documents with the matching uid
    const blogsRef = collection(db, "blogs");
    const q = query(blogsRef, where("uid", "==", user.uid));

    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          console.log("Document Data:", doc.data());
          const userData = doc.data();

          // Update Header Name and Image
          fullNameHeader.textContent = userData.fullName;
          profileImgHeader.src = userData.image;

          // Update Card Name and Image
          fullNameCard.textContent = userData.fullName;
          profileImgCard.src = userData.image;
        });
      } else {
        console.log("No such document with the logged-in user's UID!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    console.log("No user is logged in");
  }
});

// Update Password
updateButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (newPassword.value !== repeatPassword.value) {
    alert("New passwords do not match!");
    return;
  }

  if (newPassword.value.length < 6) {
    alert("New password should be at least 6 characters!");
    return;
  }

  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, oldPassword.value);

  try {
    // Reauthenticate with the old password
    await reauthenticateWithCredential(user, credential);

    // Update to the new password
    await updatePassword(user, newPassword.value);
    alert("Password updated successfully!");

    // Clear input fields
    oldPassword.value = "";
    newPassword.value = "";
    repeatPassword.value = "";
  } catch (error) {
    console.error("Error updating password:", error);
    alert("Error updating password: " + error.message);
  }
});
logoutbtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location = "login.html"
       
    }).catch((error) => {
        alert(error)
    });

})
