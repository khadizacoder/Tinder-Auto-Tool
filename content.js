(function () {
  let swipeTimer = null;
  let messageTimer = null;

  function autoSwipeByDistance() {
    const profileCard = document.querySelector('[data-testid="user-card"]');
    if (!profileCard) return;

    const spanTexts = [...profileCard.querySelectorAll('span, div')].map(el => el.innerText);
    const distText = spanTexts.find(txt => txt && txt.toLowerCase().includes("miles away"));
    if (!distText) return;

    const match = distText.match(/(\d+(\.\d+)?)\s+miles/i);
    if (!match) return;

    const distance = parseFloat(match[1]);
    const likeBtn = document.querySelector('[aria-label="Like"]');
    const nopeBtn = document.querySelector('[aria-label="Nope"]');

    if (distance >= 3 && likeBtn) likeBtn.click(), console.log(`✅ Liked (${distance} mi)`);
    else if (distance < 3 && nopeBtn) nopeBtn.click(), console.log(`❌ Noped (${distance} mi)`);
  }

  function autoMessage(message) {
    const textarea = document.querySelector("textarea");
    const sendBtn = document.querySelector('button[aria-label="Send"]');
    if (textarea && sendBtn) {
      textarea.focus();
      textarea.value = message;
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
      setTimeout(() => { sendBtn.click(); console.log("💬 Message sent") }, 300);
    }
  }

  function startAll(message, interval) {
    swipeTimer = setInterval(autoSwipeByDistance, interval);
    messageTimer = setInterval(() => autoMessage(message), 10000);
    console.log("▶️ Auto tools started");
  }

  function stopAll() {
    clearInterval(swipeTimer);
    clearInterval(messageTimer);
    console.log("⛔ Auto stopped");
  }

  chrome.storage.local.get(["autoRunning", "message", "interval"], data => {
    if (data.autoRunning) startAll(data.message, data.interval);
  });
  chrome.storage.onChanged.addListener(changes => {
    if (changes.autoRunning && changes.autoRunning.newValue === false) stopAll();
  });
})();
