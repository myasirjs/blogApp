import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { collection, getDocs, query,where } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { auth, db } from "./config.js";

const logoutbtn = document.querySelector("#logoutbtn");
const loginbtn = document.querySelector("#loginbtn");
const username = document.querySelector("#username");
const profileImg = document.querySelector("#profileImg");
const blogsContainer = document.querySelector("#blogsContainer");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("User logged in:", user.uid);
    const users = await getUserData();
    console.log(users);
    loginbtn.style.display = 'none';
    username.innerHTML = users.fullName;
    profileImg.src = users.image;
    
    displayAllBlogs();
  } else {
    console.log("No user found");
    window.location = "login.html";
  }
});

logoutbtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location = "login.html";
  }).catch((error) => {
    alert(error);
  });
});

// Get current user data
async function getUserData() {
  let user = null;
  const q = query(collection(db, "blogs"), where("uid", "==", auth.currentUser.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    user = doc.data();
  });
  return user;
}


async function displayAllBlogs() {
    blogsContainer.innerHTML = "";
  
    const q = query(collection(db, "blogs"));
    const querySnapshot = await getDocs(q);
  
    querySnapshot.forEach((doc) => {
      const blogData = doc.data();
      const blogElement = document.createElement("div");
      blogElement.classList.add("blog");
      
      // Format the date
      let formattedDate = "N/A";
      if (blogData.createdAt && blogData.createdAt.seconds) {
        const date = blogData.createdAt.toDate();
        formattedDate = date.toLocaleString();
      }
  
      blogElement.innerHTML = `
        <div class="card">
          <div class="title">
            <img src="${blogData.image}" alt="User Image" />
            <div class="about">
              <p>${blogData.text}</p>
              <span>By: ${blogData.fullName}, Date: ${formattedDate}</span>
            </div>
          </div>
          <div class="des">${blogData.mind}</div>
        </div>
      `;
      blogsContainer.appendChild(blogElement);
    });
  }
  
