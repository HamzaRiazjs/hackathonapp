
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc,onSnapshot, deleteDoc, doc, updateDoc} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";



const firebaseConfig = {
    apiKey: "AIzaSyAn5YGZHZ7XSkPeH4cfkMzLdLKs9K6_w3Y",
    authDomain: "login-page-facce.firebaseapp.com",
    projectId: "login-page-facce",
    storageBucket: "login-page-facce.appspot.com",
    messagingSenderId: "136773347581",
    appId: "1:136773347581:web:fe12ad44f385c2af9f3694"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);
///

const user = document.getElementById("user-profile");
const fileInput = document.getElementById("file-input");

fileInput&&fileInput.addEventListener('change', async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        try {
            const downloadURL = await uploadFile(selectedFile);
            user.src = downloadURL;
            
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }
});

const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        const mountainsRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(mountainsRef, file);
        uploadTask.on('state_changed',
        
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });
};

//



//
let add = document.getElementById('addButton');
add&&add.addEventListener('click', async () => {
    let inputData = document.getElementById('titleInput').value;
    let textInput = document.getElementById('textInput').value;

    try {
        const docRef = await addDoc(collection(db, 'blogs'), {
            title: inputData,
            text: textInput
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});
////////
const logoutBtn = document.getElementById("logout-btn")

logoutBtn && logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        localStorage.clear()
        location.href = "index.html"
    }).catch((error) => {
        
    });
})


let btn = document.getElementById('Register-btn')
btn&&btn.addEventListener('click', () => {
    let Name = document.getElementById('Name')
    let email = document.getElementById('email')
    let phone = document.getElementById('phone')
    let password = document.getElementById('password')

    let userData = {
        Name: Name.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
    }

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('user', user)
            try {
                const docRef = await addDoc(collection(db, "users"), {
                    ...userData,
                    uid: user.uid
            

                });
                localStorage.setItem("uid", user.uid)
                location.href = "/dashboard.html"
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('errorCode', errorCode)
            // ..
        });




});


let signin = document.getElementById('signin-btn')
signin&&signin.addEventListener('click', () => {



    signInWithEmailAndPassword(auth, userData.email, userData.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('user', user)
            localStorage.setItem("uid", userCredential.user.uid)
            location.href = "/dashboard.html"
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.log('Error during sign-in:', errorCode, errorMessage);
            if (errorCode === 'auth/user-not-found') {
                let errorElement = document.getElementById('error');
                errorElement.innerHTML = 'User not found';
            }
        });

    let userData = {
        Name: Name.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
    }


    })


/////
document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("addButton");
    addButton && addButton.addEventListener("click", () => {
        const titleInput = document.getElementById("titleInput");
        const textInput = document.getElementById("textInput");

        const title = titleInput.value;
        const text = textInput.value;

        if (title.trim() === "" || text.trim() === "") {
            alert("Please enter both title and text.");
            return;
        }

        const blogContainer = document.getElementById("blogContainer");

        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const blogTitle = document.createElement("h2");
        blogTitle.textContent = title;

        const blogText = document.createElement("p");
        blogText.textContent = text;

       
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
           
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            
            blogContainer.removeChild(blogCard);
        });

       
        blogCard.appendChild(blogTitle);
        blogCard.appendChild(blogText);
        blogCard.appendChild(editButton);
        blogCard.appendChild(deleteButton);

        blogContainer.appendChild(blogCard);

       
        titleInput.value = "";
        textInput.value = "";
    });
});



       


















































































































