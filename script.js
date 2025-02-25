// 🌂 Selecting elements
const umbrellaImage = document.getElementById("umbrella-image");
const umbrellaLoader = document.getElementById("umbrella-loader");
const logoPreview = document.getElementById("logo-preview");
const colorSwatches = document.querySelectorAll(".color-swatch");
const logoUpload = document.getElementById("logo-upload");
const fileNameDisplay = document.querySelector(".file-name");
const removeFile = document.querySelector(".remove-file");
const uploadContainer = document.querySelector(".upload-container");
const uploadIcon = document.querySelector(".upload-icon");
const loaderIcon = document.querySelector(".loader-icon");

// 🎨 Map colors for dynamic updates
const colorMap = {
  pink: "#ff4f81",
  blue: "#008cdd",
  yellow: "#f1c40f",
};

// 🌟 Change umbrella, loader, and button color dynamically
colorSwatches.forEach((swatch) => {
  swatch.addEventListener("click", function () {
    let color = this.getAttribute("data-color");

    // 🔄 Update umbrella image
    umbrellaImage.src = `./images/${color}_umbrella.png`;

    // 🎨 Change button color dynamically
    uploadContainer.style.backgroundColor = colorMap[color] || "#008cdd";

    // 🔄 Update umbrella loader hue (optional for color matching)
    umbrellaLoader.style.filter = `hue-rotate(${
      color === "pink" ? 330 : color === "yellow" ? 60 : 210
    }deg)`;
  });
});

// 📂 Handle logo upload
logoUpload.addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file) {
    // ✅ Hide upload icon & show loader
    fileNameDisplay.textContent = file.name;
    uploadIcon.style.display = "none";
    loaderIcon.style.display = "block"; // Show button loader

    // ✅ Show umbrella loader & hide umbrella image
    umbrellaImage.style.display = "none";
    umbrellaLoader.style.display = "block";

    const reader = new FileReader();
    reader.onload = function (e) {
      setTimeout(() => {
        // ✅ Hide loaders & show logo
        loaderIcon.style.display = "none"; // Hide button loader
        umbrellaLoader.style.display = "none"; // Hide umbrella loader
        umbrellaImage.style.display = "block"; // Show umbrella again

        // ✅ Show uploaded logo
        logoPreview.src = e.target.result;
        logoPreview.style.display = "block";
        removeFile.style.display = "block"; // Show remove button
      }, 1500); // Simulate loading delay
    };
    reader.readAsDataURL(file);
  }
});

// ❌ Remove uploaded logo
removeFile.addEventListener("click", function () {
  logoUpload.value = "";

  fileNameDisplay.textContent = "UPLOAD LOGO";
  logoPreview.style.display = "none";
  removeFile.style.display = "none";
  uploadIcon.style.display = "block";
});
document.addEventListener("DOMContentLoaded", function () {
  const logoUploadInput = document.getElementById("logo-upload");
  const logoPreview = document.getElementById("logo-preview");
  const umbrellaLoader = document.getElementById("umbrella-loader");
  const loaderIcon = document.querySelector(".loader-icon");
  const fileNameDisplay = document.querySelector(".file-name");

  logoUploadInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      // **Step 1: Hide previous logo & show loader**
      logoPreview.src = ""; // Clear the previous logo
      logoPreview.style.display = "none";
      umbrellaLoader.style.display = "block"; // Show spinning loader in umbrella
      loaderIcon.style.display = "block"; // Show loader in button
      fileNameDisplay.textContent = "Uploading...";

      // **Step 2: Load new logo**
      reader.onload = function (e) {
        setTimeout(() => {
          // Hide loaders & display new logo
          umbrellaLoader.style.display = "none";
          loaderIcon.style.display = "none";
          logoPreview.src = e.target.result;
          logoPreview.style.display = "block";
          fileNameDisplay.textContent = file.name; // Show file name
        }, 2000); // Simulate upload delay
      };

      reader.readAsDataURL(file);
    }
  });
});
