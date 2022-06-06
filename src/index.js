//npm to setup webpack firebase and tiltjs

import { logIn } from "./firebase";

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
