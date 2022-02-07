let bullets = Array.from(
  document.querySelector(".bullets").children
);
let butn3 = document.querySelectorAll(
  `.g .box:nth-child(3) button`
);
let butn2 = document.querySelectorAll(
  `.g .box:nth-child(2) button`
);
let gearBox = document.querySelector(".gear");
let gearIcon = document.querySelector(".gear ion-icon");
let gearPanel = document.querySelector(".gear-panel");
let landingPage = document.querySelector(".landing-page");
let imgsArray = [
  "bg1.jpg",
  "bg2.jpg",
  "bg3.jpg",
  "bg4.jpg",
  "bg5.jpg",
];

// buttons 2 rando bg button
let bgSettings;
butn2.forEach((b) => {
  b.addEventListener("click", (e) => {
    butn2.forEach((b2) => b2.classList.remove("active"));

    e.currentTarget.classList.add("active");

    if (b.textContent === "Yes") randoBG();
    else clearInterval(gbInterv);

    bgSettings = b.textContent;
    saveBgsettings();
  });
});

// buttons 3 bullets show
let bulletSettings;
butn3.forEach((b) => {
  b.addEventListener("click", (e) => {
    butn3.forEach((b) => b.classList.remove("active"));

    e.currentTarget.classList.add("active");

    // set the display of bullets
    if (b.textContent === "No") {
      document.querySelector(".bullets").style.display =
        "none";
      bulletSettings = `none`;
    } else {
      document.querySelector(".bullets").style.display =
        "initial";
      bulletSettings = `initial`;
    }

    saveBulletsDisplay();
  });
});

// _______________________________________________________________________________
// gearBox Panel  Open functionality
gearBox.onclick = () => {
  gearIcon.classList.toggle("active");

  //   open the panel
  gearBox.classList.toggle("open");
  gearPanel.classList.toggle("open");
};

// interval bg change
let gbInterv;
function randoBG() {
  gbInterv = setInterval(() => {
    landingPage.style.backgroundImage = `url("images/${
      imgsArray[
        Math.trunc(Math.random() * imgsArray.length)
      ]
    }")`;
  }, 10000);
}

// _______________________________________________________________________________
// change main clrs onClick
let currentClr = "#ff9800";
document
  .querySelectorAll(".g .box div span")
  .forEach((s) => {
    s.onclick = (e) => {
      currentClr = e.currentTarget.dataset.clr;

      saveClrs();

      setColors();
    };
  });

// set colors
function setColors() {
  // set main clr
  document.documentElement.style.setProperty(
    "--main-clr",
    `${localStorage.getItem("main-color")}`
  );

  // set shades clr
  document.documentElement.style.setProperty(
    `--shades-clr`,
    `${localStorage.getItem("shades-color")}`
  );
}

// _______________________________________________________________________________
// scroll views with bullets
bullets.forEach((b) => {
  b.onclick = () => {
    // scroll to view of the given id element!
    document
      .getElementById(`${b.getAttribute("data-go")}`)
      .scrollIntoView();
  };
});

// _______________________________________________________________________________
// save values into storage
function saveClrs() {
  // save colors to Local Storage
  localStorage.setItem("main-color", currentClr);
  localStorage.setItem("shades-color", `${currentClr}70`);
}

function saveBgsettings() {
  localStorage.setItem(
    "random-background",
    `${bgSettings}`
  );
}

function saveBulletsDisplay() {
  localStorage.setItem(
    "bullets-display",
    `${bulletSettings}`
  );
}

//save active btns -rando bgs- to storage
function saveSetBtns2() {
  if (localStorage.getItem("random-background") === "Yes") {
    randoBG();
    document
      .querySelector(
        `.g .box:nth-child(2) button:nth-child(1)`
      )
      .classList.add("active");
  } else {
    clearInterval(gbInterv);
    document
      .querySelector(
        `.g .box:nth-child(2) button:nth-child(2)`
      )
      .classList.add("active");
  }
}

//save active btns -show bullets- to storage
function saveSetBtns3() {
  document.querySelector(".bullets").style.display =
    localStorage.getItem("bullets-display");

  if (localStorage.getItem("bullets-display") === `none`) {
    document
      .querySelector(
        ".g .box:nth-child(3) button:nth-child(2)"
      )
      .classList.add("active");
  } else {
    document
      .querySelector(
        ".g .box:nth-child(3) button:nth-child(1)"
      )
      .classList.add("active");
  }
}

// _______________________________________________________________________________
// keep the storage values on windows reload
window.onload = () => {
  if (localStorage.length > 0) {
    setColors();

    saveSetBtns2();

    saveSetBtns3();
  }
};

// function reset options button == clear localstorage
let reset = document.querySelector(".reset");
reset.onclick = () => {
  localStorage.clear();
  location.reload();
  console.log(`resets`);
};
// ..
// .
// .
// .
// .
// .
// .

// __________________________________________________________________________________
// humberger
let hamburger = document.querySelector(".hamburger");

hamburger.onclick = () => {
  hamburger.classList.toggle("active");
};

// __________________________________________________________________________________
// skills scroll
let skillSection = document.getElementById("skills");
window.onscroll = () => {
  if (window.scrollY >= skillSection.offsetTop - 300) {
    skillScroll();
  }
};

function skillScroll() {
  let skills = [
    ...document.querySelectorAll(
      "#skills .skill div span:nth-child(2)"
    ),
  ];
  skills.forEach(
    (span) => (span.style.width = span.dataset.progress)
  );
}

// __________________________________________________________________________________
// Gallery popup
let galleryImgs = Array.from(
  document.querySelectorAll("#gallery .container div img")
);

galleryImgs.forEach((img) =>
  img.addEventListener("click", () => {
    // create overlay low opacity
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    // create the popup box
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    overlay.appendChild(popupBox);

    // create img inside the popup box
    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    popupBox.appendChild(popupImg);

    // create x button to close the popup
    let btn = document.createElement("button");
    btn.innerHTML = `<ion-icon name="close-circle-outline"></ion-icon>`;
    popupBox.appendChild(btn);

    // press anywhere to close
    btn.onclick = () => document.body.removeChild(overlay);

    // Alt creation above the img
    if (img.alt) {
      let heading = document.createElement("h2");
      heading.textContent = img.alt;
      popupBox.prepend(heading);
    }
  })
);
