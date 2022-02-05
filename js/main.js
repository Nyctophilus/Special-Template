let bullets = Array.from(
  document.querySelector(".bullets").children
);
let gearBox = document.querySelector(".gear");
let gearIcon = document.querySelector("ion-icon");
let gearPanel = document.querySelector(".gear-panel");

bullets.forEach((b) => {
  b.onclick = () => {
    // scroll to view of the given id element!
    document
      .getElementById(`${b.getAttribute("data-go")}`)
      .scrollIntoView();
  };
});

// gearBox functionality
gearBox.onclick = () => {
  gearIcon.classList.toggle("active");

  //   open the panel
  gearBox.classList.toggle("open");
  gearPanel.classList.toggle("open");
};
