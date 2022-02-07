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
let gearIcon = document.querySelector("ion-icon");
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
    landingPage.style.backgroundImage =
      'url("images/' +
      imgsArray[
        Math.trunc(Math.random() * imgsArray.length)
      ] +
      '")';
  }, 10000);
}
console.log(
  imgsArray[Math.trunc(Math.random() * imgsArray.length)]
);
// _______________________________________________________________________________
// change main clrs onClick
let currentClr = "#ff9800";
document
  .querySelectorAll(".g .box div span")
  .forEach((s) => {
    s.onclick = (e) => {
      // console.log(`${e.currentTarget.dataset.clr}`);
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

// _______________________________________________________________________________
// keep the storage values on windows reload
window.onload = () => {
  setColors();

  document.querySelector(".bullets").style.display =
    localStorage.getItem("bullets-display");

  localStorage.getItem("random-background") === "Yes"
    ? randoBG()
    : clearInterval(gbInterv);
};
