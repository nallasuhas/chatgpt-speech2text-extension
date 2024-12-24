let isRecording = false;

chrome.action.onClicked.addListener((tab) => {
  isRecording = !isRecording;
  
  // Update icon to show recording state
  // const iconColor = isRecording ? '#ff0000' : '#000000';
  // chrome.action.setIcon({
  //   path: {
  //     48: `icon48.png`,
  //     128: `icon128.png`
  //   }
  // });

  // Send message to content script
  chrome.tabs.sendMessage(tab.id, {
    action: isRecording ? 'startRecording' : 'stopRecording'
  });
});
