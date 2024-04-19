document.addEventListener('DOMContentLoaded', function () {
    const authenticateButton = document.getElementById('authenticate');
    const applySortButton = document.getElementById('applySort');
    const sortingOptionSelect = document.getElementById('sortingOption');
  
    authenticateButton.addEventListener('click', function () {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
          } else {
            // Save the token for future use
            chrome.storage.local.set({ authToken: token }, function () {
              console.log('Auth token saved');
            });
          }
        });
      });
  
    applySortButton.addEventListener('click', function () {
      const sortingOption = sortingOptionSelect.value;
      // Send message to background worker to apply sorting
      chrome.runtime.sendMessage({ action: 'applySort', sortingOption: sortingOption });
    });
  });