// Enable mobile rotation tilt for all VR iframes
document.addEventListener("DOMContentLoaded", () => {
  const iframes = document.querySelectorAll('.vr-viewer');

  iframes.forEach(iframe => {
    // Listen to device orientation events
    window.addEventListener('deviceorientation', (event) => {
      if (!iframe.contentWindow) return;

      const gamma = event.gamma || 0; // left-right tilt
      const beta = event.beta || 0;   // front-back tilt

      try {
        // Send rotation values to embedded 360 viewer via postMessage if supported
        iframe.contentWindow.postMessage({
          type: 'deviceOrientation',
          gamma: gamma,
          beta: beta
        }, '*');
      } catch (err) {
        console.warn('VR rotation postMessage failed', err);
      }
    }, true);
  });
});

