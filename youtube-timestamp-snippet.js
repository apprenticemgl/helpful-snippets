(function () {
  // Select the YouTube video element
  const video = document.querySelector('video');

  if (!video) {
    console.error('No video element found on this page.');
    return;
  }

  // Create an overlay element to display the timestamp
  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.top = '10px';
  overlay.style.left = '10px';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  overlay.style.color = 'white';
  overlay.style.padding = '10px 20px';
  overlay.style.borderRadius = '8px';
  overlay.style.fontSize = '34px';
  overlay.style.fontFamily = 'Arial, sans-serif';
  overlay.style.pointerEvents = 'none'; // Make it non-interactive
  overlay.style.zIndex = '9999'; // Ensure it stays on top
  overlay.textContent = 'Current Time: 00:00:00';
  document.body.appendChild(overlay);

  // Position the overlay relative to the video
  const positionOverlay = () => {
    const rect = video.getBoundingClientRect();
    overlay.style.top = `${rect.top + window.scrollY + 10}px`;
    overlay.style.left = `${rect.left + window.scrollX + 10}px`;
  };

  // Format seconds into HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(secs).padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  };

  // Update the overlay with the current timestamp every second
  const updateTime = () => {
    overlay.textContent = `Current Time: ${formatTime(video.currentTime)}`;
    positionOverlay(); // Adjust position in case of window changes
  };

  // Start updating the timestamp when the video plays
  video.addEventListener('play', () => {
    const intervalId = setInterval(() => {
      if (!video.paused && !video.ended) {
        updateTime();
      } else {
        clearInterval(intervalId); // Stop updates if the video pauses or ends
      }
    }, 1000);
  });

  // Initial positioning
  positionOverlay();

  // Reposition overlay on window resize or scroll
  window.addEventListener('resize', positionOverlay);
  window.addEventListener('scroll', positionOverlay);
})();
