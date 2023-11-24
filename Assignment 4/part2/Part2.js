const imageFilenames = [
  "pic1.jpg",
  "pic2.jpg",
  "pic3.jpg",
  "pic4.jpg",
  "pic5.jpg",
];

const thumbBar = document.querySelector(".thumb-bar");

for (let i = 0; i < imageFilenames.length; i++) {
  const newImage = document.createElement("img");

  const imagePath = `assests/${imageFilenames[i]}`;
  newImage.setAttribute("src", imagePath);
  newImage.setAttribute("alt", `Image ${i + 1}`);

  thumbBar.appendChild(newImage);

  newImage.addEventListener("click", function () {
    const displayedImg = document.querySelector(".displayed-img");
    displayedImg.setAttribute("src", imagePath);
    displayedImg.setAttribute("alt", `Image ${i + 1}`);
  });
}

const btn = document.querySelector(".dark-light-btn");
const overlay = document.querySelector(".overlay");

btn.addEventListener("click", function () {
  const currentClass = btn.getAttribute("class");

  if (currentClass === "dark-light-btn") {
    console.log("currentClass", currentClass);
    btn.setAttribute("class", "light");
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  } else {
    btn.setAttribute("class", "dark-light-btn");
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
  }
});
