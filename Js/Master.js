//Select The Image
let myimg = document.querySelector(".image-box img");
//Check if Ther Is Local Storage Option
let mainColor = localStorage.getItem("Color-Options");
let colorImage = localStorage.getItem("Image-Color");
if (mainColor !== null && colorImage !== null) {
  document.documentElement.style.setProperty("--main--color", mainColor);
  myimg.setAttribute("src", colorImage);
  //Remove Class Active Frome All Color list Items
  document.querySelectorAll(".colors-list li").forEach(element => {
    element.classList.remove("active");
    //Add Active Class On Element
    if (element.dataset.color === mainColor) {
      //Add Active Class
      element.classList.add("active");
    }
  });
}
// Random Background options
let backgroundOptions = false;
let backgroundinterval;

//Check If There Local Storag Random backgriund Option
let backgroundLocalItem = localStorage.getItem("background_option");
//Check If Background Local Storage  Not Empty
if (backgroundLocalItem !== null) {
  //Remove Class Active From All Spans
  document.querySelectorAll(".random-backgrounds span").forEach(element => {
    element.classList.remove("active");
  });
  //Add Class Active
  if (backgroundLocalItem === "true") {
    backgroundOptions = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backgroundOptions = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}
//Toggle Class On Setting Box
let toggleSetting = document.querySelector(".toggle-setting .i");
let settingBox = document.querySelector(".setting-box");
toggleSetting.onclick = function () {
  toggleSetting.classList.toggle("fa-spin");
  settingBox.classList.toggle("open");
};
settingBox.onclick = function (e) {
  e.stopPropagation();
};
document.addEventListener("click", (e) => {
  if (e.target !== toggleSetting && e.target !== settingBox) {
    //Check If The Menue Is Open
    if (settingBox.classList.contains("open")) {
      //Toggle Class Fa-Spin On The Button 
      toggleSetting.classList.toggle("fa-spin");
      //Toggle Class Open One The Menue
      settingBox.classList.toggle("open");
    }
  }
});
//Switch Colors
const colorlist = document.querySelectorAll(".colors-list li");
colorlist.forEach(li => {
  li.addEventListener("click", (e) => {
    //Set Color On Root
    document.documentElement.style.setProperty("--main--color", e.target.dataset.color);
    //Set Color On local Storage
    localStorage.setItem("Color-Options", e.target.dataset.color);
    localStorage.setItem("Image-Color", e.target.dataset.image);
    // //Remove Class Active Frome all Childes
    // e.target.parentElement.querySelectorAll(".active").forEach(element => {
    //     element.classList.remove("active");
    //     });
    // //Add Active Class On Self
    // e.target.classList.add("active");
    toggleClass(e);
    myimg.setAttribute("src", e.target.dataset.image);
  });
});
//Switch Random  BackGround  Options
const randombg = document.querySelectorAll(".random-backgrounds span");
randombg.forEach(span => {
  span.addEventListener("click", (e) => {
    //Remove Class Active Frome all Childes
    e.target.parentElement.querySelectorAll(".active").forEach(element => {
      element.classList.remove("active");
    });
    //Add Active Class On Self
    e.target.classList.add("active");

    if (e.target.dataset.background === "yes") {
      backgroundOptions = true;
      randomImages();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOptions = false;
      clearInterval(backgroundinterval);
      randomImages();
      localStorage.setItem("background_option", false);
    }
  });
});
// Select Landing Page Elements
let landingPage = document.querySelector(".landing-page");
//Get Array Of Images
let imgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];


function randomImages() {
  if (backgroundOptions === true) {
    backgroundinterval = setInterval(() => {
      //Get Randoom Number
      let randomnumber = Math.floor(Math.random() * imgs.length);
      //Chang BackGround img url
      landingPage.style.backgroundImage = 'url("../Img/' + imgs[randomnumber] + '")';
    }, 7000);
  }
}
randomImages();


//Select Skills Selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  let skillOffsetTop = ourSkills.offsetTop;
  let skillsOuterHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTope = this.scrollY;
  if (windowScrollTope > (skillOffsetTop + skillsOuterHeight - windowHeight) - 1) {
    let allSkills = document.querySelectorAll(" .skill-box .skill-progress span");
    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

//Creat Popup With The Image 
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
  img.addEventListener("click", (e) => {
    //Creat Overlay Element 
    let overlay = document.createElement("div");
    //Add Class To Overlay
    overlay.className = "popup-overlay";
    //append Overlay To Body
    document.body.appendChild(overlay);
    //Creat the Popup
    let popupBox = document.createElement("div");
    //Add Class To The Popup Box
    popupBox.className = "popup-box";
    //Creat The Image

    if (img.alt !== null) {
      //Create Heading
      let imgHeading = document.createElement("h3");
      //Create Text For Heading
      let imgText = document.createTextNode(img.alt);
      //Append TextTo The Heading
      imgHeading.appendChild(imgText);
      //Append Heading To The Popup Box
      popupBox.appendChild(imgHeading);

    }
    let popupimage = document.createElement("img");
    //Set Image Source
    popupimage.src = img.src;
    //Add Image To Popup Box
    popupBox.appendChild(popupimage);
    //Append The Popup Box To Body
    document.body.appendChild(popupBox);
    //Creat Close Span
    let closeButton = document.createElement("span");
    //Creat The Close Button Text
    let closeButtonText = document.createTextNode("X");
    //Append Text To Close Button
    closeButton.appendChild(closeButtonText);
    //Add Class To Close Button
    closeButton.className = "close-button";
    //Add Close Button To Popup Box
    popupBox.appendChild(closeButton);
  });
});
//Close Popup 
document.addEventListener("click", function (e) {
  if (e.target.className === "close-button") {
    //Remove THe Current Popup
    e.target.parentNode.remove();
    //Remove The Current OverLay
    document.querySelector(".popup-overlay").remove();
  }
});

//Add Toggle Activ Class 
function toggleClass(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach(element => {
    element.classList.remove("active");
  });
  //Add Active Class On Self
  ev.target.classList.add("active");
}

//Select All Bulttets 
const allbullets = document.querySelectorAll(".nav-bullets .bullet");
//Select All Links 
const allLinks = document.querySelectorAll(".links a");
function scrolling(elements) {
  elements.forEach(element => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}
scrolling(allbullets);
scrolling(allLinks);



let bulletspan = document.querySelectorAll(".bullets-options span");
let bulletContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_options");
if (bulletLocalItem !== null) {
  bulletspan.forEach(span => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletContainer.style.diplay = "block";
    document.querySelector(".bullets-options .yes").classList.add("active");
  }
  else {
    bulletContainer.style.display = "none";
    document.querySelector(".bullets-options .no").classList.add("active");
  }
}
bulletspan.forEach(span => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletContainer.style.display = "block";
      localStorage.setItem("bullets_options", "block");
    }
    else {
      bulletContainer.style.display = "none";
      localStorage.setItem("bullets_options", "none");
    }
    toggleClass(e);
  });
});

//Reset Button
document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("Color-Options");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_options");
  localStorage.removeItem("Image-Color");
  window.location.reload();
};
//Toggle Menu
let toggleMenu = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");
toggleMenu.onclick = function (e) {
  //Stop Propagation
  e.stopPropagation();
  //Toggle Class Active On Button
  this.classList.toggle("menu-active");
  //Toggle Class Open On Linkes
  tlinks.classList.toggle("open");
};

//Click AnyWhere OutSide Menu And Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleMenu && e.target !== tlinks) {
    //Check IF menu Is Open 
    if (tlinks.classList.contains("open")) {
      //Toggle Class Active On Button
      toggleMenu.classList.toggle("menu-active");
      //Toggle Class Open On The Linkes
      tlinks.classList.toggle("open");
    }
  }
});
//stop Propagation on TheMenu
tlinks.onclick = function (e) {
  e.stopPropagation();
};