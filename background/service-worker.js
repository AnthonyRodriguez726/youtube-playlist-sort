chrome.runtime.onInstalled.addListener(function () {
    console.log('Extension installed');
  });
  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'authenticate') {
      // Handle authentication flow
      // ...
    } else if (request.action === 'applySort') {
      const sortingOption = request.sortingOption;
      // Send message to content script to apply sorting
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'applySort', sortingOption: sortingOption });
      });
    }
  });