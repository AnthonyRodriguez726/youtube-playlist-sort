document.addEventListener('DOMContentLoaded', function () {
  const authenticateButton = document.getElementById('authenticate');
  const applySortButton = document.getElementById('applySort');
  const sortingOptionSelect = document.getElementById('sortingOption');

  authenticateButton.addEventListener('click', function () {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        showAuthError();
      } else {
        saveAuthToken(token);
        updateUI();
      }
    });
  });

  applySortButton.addEventListener('click', function () {
    const sortingOption = sortingOptionSelect.value;
    chrome.runtime.sendMessage({ action: 'applySort', sortingOption: sortingOption });
  });

  function saveAuthToken(token) {
    chrome.storage.local.set({ authToken: token }, function () {
      console.log('Auth token saved');
    });
  }

  function updateUI() {
    authenticateButton.style.display = 'none';
    applySortButton.style.display = 'inline-block';
    sortingOptionSelect.disabled = false;
  }

  function showAuthError() {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Authentication failed. Please try again.';
    errorMessage.style.color = 'red';
    document.body.appendChild(errorMessage);
  }
});