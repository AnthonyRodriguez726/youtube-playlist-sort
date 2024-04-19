chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'applySort') {
      const sortingOption = request.sortingOption;
      applyPlaylistSorting(sortingOption);
    }
  });
  
  function applyPlaylistSorting(sortingOption) {
    // Check if the current playlist is public or private
    // ...
  
    // Retrieve playlist items and metadata using the YouTube Data API
    // ...
  
    // Sort the playlist items based on the selected sorting option
    // ...
  
    // Manipulate the playlist DOM to display the sorted items
    // ...
  }