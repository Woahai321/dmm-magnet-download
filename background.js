chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getClipboardContent') {
    sendResponse({ success: true });
    return true; // Required to keep the message channel open for sendResponse
  }
});
