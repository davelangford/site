chrome.tabs.executeScript(null, { code: `
  const cells = document.querySelectorAll('.su-cell[aria-label]');
  const values = Array.from(cells).map(cell => cell.getAttribute('aria-label'));
  const output = values.reduce((acc, val, i) => acc + ((i % 9 === 0) ? '\n' : '') + val + ' ', '');
  alert(output);
`});