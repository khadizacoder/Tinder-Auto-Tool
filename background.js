chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ autoRunning: false, message: "Hi 👋", interval: 3000 });
});
