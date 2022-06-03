/**
 * @file Firebase test project for dot. ICS4U project
 * @author Andy Zhang, Vinesh, Ammar
 */

// Import functions from Google's Firebase
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  documentId,
} from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASZgii0k99yeGB1vaIxaXHkWAZgH4CmQU",
  authDomain: "dot-test-1de86.firebaseapp.com",
  projectId: "dot-test-1de86",
  storageBucket: "dot-test-1de86.appspot.com",
  messagingSenderId: "266594375880",
  appId: "1:266594375880:web:07db376ec0107afe882dfd",
  measurementId: "G-9VP86KXK57",
};

initializeApp(firebaseConfig); // Initialize Firebase
const db = getFirestore(); // Initialize Firestore database
const auth = getAuth(); // Initialize Firebase auth

const provider = new GoogleAuthProvider(); // Attaches a new Google Auth Object
provider.addScope("https://www.googleapis.com/auth/contacts.readonly"); // Add auth Api
provider.setCustomParameters({ hd: "@pdsb.net" }); // Restricts to only pdsb.net domains

//document.getElementById("googleLogo").addEventListener("click", logIn); // Listens for click on sign in

function logIn() {
  /**
   * Login function for Google authentication
   *
   * UserCredential Error
   *    Takes error info and stores it into variables for future use
   */
  signInWithPopup(auth, provider)
    .then((result) => {
      /**
       * Takes results from signInWithPopup
       * @param {UserCredential} result - User Credential info is stored in result after sign in is complete
       * @return {User} Returns user info into console
       */

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

// Reference to values collection
const colRef = collection(db, "values");

window.x = []; // Temporary values representing the data for our survey
window.y = [];

getDocs(colRef)
  /**
   * Reads data from Firestore server
   * @param {CollectionReference<"values">} colRef - Collection object assigned from Firestore
   *
   * Any Error
   *    Output message into console
   */

  .then((snapshot) => {
    /**
     * After Data read, take a snapshot and push values into client variables
     * @param {QuerySnapshot<"valuesData">} snapshot - Firestore value data at the given time of snapshot
     */
    let values = [];
    snapshot.docs.forEach((doc) => {
      values.push(doc.data());
    });
    // Push all elements (firebase dict) into a new array
    for (let x = 0; x < Object.keys(values).length; x++) {
      window.x.push(values[x].val1);
      window.y.push(values[x].val2);
    }
  })
  .catch((err) => {
    console.log(err.message);
  });

// document.getElementById("add").addEventListener("submit", submitForm); // Listener for when form is submitted

// Takes form data and adds it to firebase and website array
function submitForm(e) {
  /**
   * Takes data from HTML forms and saves it to firestore and local variables
   * @param {event} e - Event handler so we can delay form reset until values are submitted
   */
  e.preventDefault();
  window.x.push(shortAlgo(getFormValues("val1")));
  window.y.push(shortAlgo(getFormValues("val2")));
  addDoc(colRef, {
    val1: shortAlgo(getFormValues("val1")),
    val2: shortAlgo(getFormValues("val2")),
  });
  document.getElementById("add").reset();
}

function shortAlgo(factor) {
  /**
   * Converts simple -10 - 10 input and maps it to 0 - 400
   * @param {String} factor - Converts String into number that will be scaled into 0 - 400
   * @return {Number} Returns the scaled value
   */
  let coordinate = (10 + Number(factor)) * 20;
  return coordinate;
}

function getFormValues(id) {
  /**
   * Gets value from HTML id tag
   * @param {id} id - HTML ID tag to pull values from
   * @return {String} Returns the value as a string
   * */
  return document.getElementById(id).value;
}

//REFERENCE getDocs usage. Delete when needed for cleanup

// Get data from firestore with id value
// getDocs(colRef)
//   .then((snapshot) => {
//     // console.log(snapshot.docs)
//     let values = [];
//     snapshot.docs.forEach((doc) => {
//       values.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(values);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

//npm to setup webpack firebase and tiltjs

let helloToggle = false;

document
  .getElementById("startContainer")
  .addEventListener("click", clickToLogin);

document.getElementById("googleLogo").addEventListener("click", clickToLogin);

function fadeElement(elementName) {
  document.getElementById(elementName).animate(
    [
      // keyframes
      { opacity: 0 },
      { opacity: 1 },
    ],
    {
      // timing options
      duration: 1000,
    }
  );
}

function clickToLogin() {
  if (helloToggle == false) {
    document.getElementById("welcome").innerHTML = "Login in with Google";
    document.getElementById("welcome").style.fontSize = 35 + "px";
    document.getElementById("welcome").style.fontStyle = "normal";
    document.getElementById("welcome").style.fontWeight = 500;
    document.getElementById("googleLogo").style.display = "flex";
    fadeElement("googleLogo");
    fadeElement("welcome");
    helloToggle = true;
  } else {
    logIn();
  }
}

document.getElementById("ourProject").addEventListener("click", aboutPage);

document.getElementById("dotLogo").addEventListener("click", homePage);

// document.getElementById("signIn").addEventListener("click", logIn); // Listens for click on sign in

function aboutPage() {
  document.getElementById("aboutPage").style.display = "flex";
  document.getElementById("homePage").style.display = "none";
  document.getElementById("questionPage").style.display = "none";
}

function homePage() {
  document.getElementById("aboutPage").style.display = "none";
  document.getElementById("homePage").style.display = "flex";
  fadeElement("homePage");
  document.getElementById("questionPage").style.display = "none";
}

function questionPage() {
  document.getElementById("aboutPage").style.display = "none";
  document.getElementById("homePage").style.display = "none";
  document.getElementById("questionPage").style.display = "flex";
}

function yesClick() {}
