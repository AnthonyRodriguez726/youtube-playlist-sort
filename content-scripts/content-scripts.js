chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'applySort') {
    const sortingOption = request.sortingOption;
    applyPlaylistSorting(sortingOption);
  }
});

function applyPlaylistSorting(sortingOption) {
  const playlistId = getPlaylistIdFromUrl();

  chrome.storage.local.get('authToken', function (data) {
    const authToken = data.authToken;
    if (authToken) {
      isPlaylistPublic(playlistId, authToken, function (isPublic) {
        if (isPublic) {
          retrievePlaylistItems(playlistId, authToken, sortingOption);
        } else {
          retrievePrivatePlaylistItems(playlistId, authToken, sortingOption);
        }
      });
    } else {
      console.error('Authentication token not found.');
    }
  });
}

function getPlaylistIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('list');
}

function isPlaylistPublic(playlistId, authToken, callback) {
  const apiUrl = `https://www.googleapis.com/youtube/v3/playlists?part=status&id=${playlistId}&key=${config.youtubeApiKey}`;

  fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      const isPublic = data.items[0].status.privacyStatus === 'public';
      callback(isPublic);
    })
    .catch(error => {
      console.error('Error checking playlist privacy:', error);
      callback(false);
    });
}

function retrievePlaylistItems(playlistId, authToken, sortingOption) {
  const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${config.youtubeApiKey}`;

  fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      const playlistItems = data.items;
      retrieveVideoMetadata(playlistItems, authToken, sortingOption);
    })
    .catch(error => {
      console.error('Error retrieving playlist items:', error);
    });
}

function retrievePrivatePlaylistItems(playlistId, authToken, sortingOption) {
  const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${config.youtubeApiKey}`;

  fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      const playlistItems = data.items;
      retrieveVideoMetadata(playlistItems, authToken, sortingOption);
    })
    .catch(error => {
      console.error('Error retrieving private playlist items:', error);
    });
}

function retrieveVideoMetadata(playlistItems, authToken, sortingOption) {
  // Placeholder function for retrieving video metadata
}