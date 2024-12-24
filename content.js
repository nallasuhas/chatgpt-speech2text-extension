let recognition = null;
let activeInputElement = null;

// Initialize speech recognition
function initializeSpeechRecognition() {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
   
    let finalTranscript = '';
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }
    const activeInputElement = document.querySelector('div#prompt-textarea p')
    // Update input field with transcribed text
    if (activeInputElement) {
      activeInputElement.innerText = activeInputElement.value + finalTranscript;
    }
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    stopRecording();
  };
}



function startRecording() {
  if (!recognition) {
    initializeSpeechRecognition();
  }
  recognition.start();
  
  // Add visual indicator
  const indicator = document.createElement('div');
  indicator.id = 'speech-to-text-indicator';
  indicator.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: #ff0000;
    padding: 10px;
    border-radius: 50%;
    z-index: 10000;
    width: 10px;
    height: 10px;
  `;
  document.body.appendChild(indicator);
}

function stopRecording() {
  if (recognition) {
    recognition.stop();
  }
  // Remove visual indicator
  const indicator = document.getElementById('speech-to-text-indicator');
  if (indicator) {
    indicator.remove();
  }
  
}

console.log('script');

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startRecording') {
    startRecording();
  } else if (message.action === 'stopRecording') {
    stopRecording();
  }
});