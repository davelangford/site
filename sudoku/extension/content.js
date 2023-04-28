chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'get_cells') {
      // Get all the .su-cell elements and their aria-label attributes
      var cells = document.querySelectorAll('.su-cell');
      var labels = Array.from(cells).map(function(cell) {
        return cell.getAttribute('aria-label');
      });
  
      // Create the popup content
      var content = '<table>';
      for (var i = 0; i < labels.length; i += 9) {
        content += '<tr>';
        for (var j = 0; j < 9; j++) {
          content += '<td>' + labels[i + j] + '</td>';
        }
        content += '</tr>';
      }
      content += '</table>';
  
      // Show the popup
      var popup = window.open('', 'Sudoku Cells', 'width=500,height=500');
      popup.document.write(content);
      popup.document.close();
    }
  });