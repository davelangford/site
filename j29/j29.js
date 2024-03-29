let inputValue = '';

fetch('https://davelangford.github.io/site/j29/pt.json')
  .then(response => response.json())
  .then(data => {
    const elements = data.elements.reduce((acc, element) => {
      acc[element.symbol] = element;
      return acc;
    }, {});
    window.periodicTable = elements;

    const elementSymbolInput = document.getElementById("element-symbol");
    elementSymbolInput.addEventListener("input", searchElement);
  });

function j29Answer() {
  document.getElementById("main").style.display = "none";
  document.getElementById("overlay").style.display = "block";

  var value = document.getElementById("answerNumber").value;
  
  document.getElementById("loading-message").textContent = "Loading" + value; 

  // Construct the URL
  var url = "https://www.journal29.com/" + value;

  // Navigate to the constructed URL
  window.location.href = url;
}

document.getElementById("answerNumber").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    // Prevent the default Enter key behavior (form submission)
    event.preventDefault();

    // Call the navigateToURL function to navigate to the URL
    j29Answer();
    return;
  }

});

function searchElement() {
  const input = document.getElementById("element-symbol").value.toUpperCase();
  const resultContainer = document.getElementById("result-container");

  // Iterate through the periodicTable object
  for (const symbol in periodicTable) {
    const elementInfo = periodicTable[symbol];

    // Check if the input matches the symbol or atomic number
    if (symbol === input || elementInfo.number === parseInt(input)) {
      // Element found, display information
      resultContainer.innerHTML = `
        <h2>${elementInfo.name}</h2>
        <p>Symbol: ${elementInfo.symbol}</p>
        <p>Atomic Number: ${elementInfo.number}</p>
        <p>Atomic Mass: ${elementInfo.atomic_mass}</p>
      `;
      return; // Exit the function since we found the element
    }
  }

  // Element not found
  resultContainer.innerHTML = "<p>Element not found</p>";
}

function appendNumber(number) {
  inputValue += number;
  document.getElementById('answerNumber').value = inputValue;
  var value = document.getElementById("answerNumber").value;
  if ((!value.startsWith(1) && value.length == 2) || (value.startsWith(1) && value.length == 3)) {
      j29Answer();
  } 
}

function clearNumber() {
  inputValue = '';
  document.getElementById('answerNumber').value = inputValue;
}

  // Step 1: Check if currentPage exists in localStorage, and initialize it to 0 if not.
  let currentPage = localStorage.getItem('currentPage');
  if (!currentPage) {
      currentPage = 0;
      localStorage.setItem('currentPage', currentPage);
  }

  // Step 2: Create a button to display the currentPage value and launch the URL.
  const currentPageButton = document.getElementById('currentPageButton');
  currentPageButton.textContent = `Page ${currentPage}`;
  currentPageButton.addEventListener('click', () => {
      const url = `https://www.journal29.com/${currentPage}`;
      window.location.href = url;
  });

  // Step 3: Create a button to increment the currentPage value and update localStorage.
  const incrementButton = document.getElementById('incrementButton');
  incrementButton.addEventListener('click', () => {
      currentPage++;
      localStorage.setItem('currentPage', currentPage);
      currentPageButton.textContent = `Page ${currentPage}`;
  });
  const decrementButton = document.getElementById('decrementButton');
  decrementButton.addEventListener('click', () => {
      currentPage--;
      localStorage.setItem('currentPage', currentPage);
      currentPageButton.textContent = `Page ${currentPage}`;
  });