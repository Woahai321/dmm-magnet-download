document.addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON' && event.target.textContent.includes('Magnet')) {
    getClipboardContentWithDelay().then(magnetLink => {
      if (magnetLink) {
        downloadMagnetFile(magnetLink);
      } else {
        console.error('No magnet link found in clipboard.');
      }
    }).catch(error => {
      console.error('Failed to get clipboard content:', error.message);
    });
  }
});

function getClipboardContentWithDelay() {
  return new Promise((resolve) => {
    setTimeout(() => {
      navigator.clipboard.readText().then(resolve);
    }, 1000); // 1000 milliseconds (1 second) delay
  });
}

function downloadMagnetFile(magnetLink) {
  const blob = new Blob([magnetLink], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'magnet.magnet';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
