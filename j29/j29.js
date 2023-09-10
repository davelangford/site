

function j29Answer() {
  document.getElementById("main").style.display = "none";
  document.getElementById("overlay").style.display = "block";
  // Get the value entered in the textbox
  var value = document.getElementById("answerNumber").value;

  // Construct the URL
  var url = "https://www.journal29.com/" + value;

  // Navigate to the constructed URL
  window.location.href = url;
}

document.getElementById("answerNumber").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
      // Prevent the default Enter key behavior (form submission)
      event.preventDefault();

      // Call the navigateToURL function to navigate to the URL
      j29Answer();
  }
});