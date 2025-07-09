document.getElementById("startBtn").addEventListener("click", async () => {
  const message = document.getElementById("customMessage").value;
  const interval = parseInt(document.getElementById("swipeInterval").value);

  chrome.storage.local.set({ autoRunning: true, message, interval });

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] });

  alert("✅ Auto started");
});

document.getElementById("stopBtn").addEventListener("click", () => {
  chrome.storage.local.set({ autoRunning: false });
  alert("🛑 Auto stopped");
});
