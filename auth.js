// auth.js


window.testAuth = function() {
    alert("Auth module loaded ✅");
};
import { auth, db } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/////////////////////////////////////////////////////
// ✅ LOGIN
/////////////////////////////////////////////////////

window.login = async function () {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Enter email & password");
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);

        alert("Login Successful 🎉");

        // ✅ redirect
        window.location.href = "index.html";

    } catch (error) {
        alert(error.message);
    }
};

/////////////////////////////////////////////////////
// ✅ SIGNUP
/////////////////////////////////////////////////////

window.signup = async function () {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Enter email & password");
        return;
    }

    try {
        let userCred = await createUserWithEmailAndPassword(auth, email, password);

        // 🔥 create user in firestore
        await setDoc(doc(db, "users", userCred.user.uid), {
            basic: false,
            intermediate: false,
            advanced: false
        });

        alert("Account Created 🎉");

    } catch (error) {
        alert(error.message);
    }
};
window.test = function() {
    alert("JS Connected ✅");
}