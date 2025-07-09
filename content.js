(function () {
  let swipeTimer = null;
  let messageTimer = null;

  function getDistanceMiles() {
    const allText = [...document.querySelectorAll('[data-testid="user-card"] span, div')]
      .map(el => el.innerText)
      .filter(Boolean);

    const distText = allText.find(t => t.toLowerCase().includes("miles away"));
    if (!distText) return null;

    const match = distText.match(/(\d+(\.\d+)?)\s+miles/i);
    return match ? parseFloat(match[1]) : null;
  }

  function swipeProfile() {
    const profileCard = document.querySelector('[data-testid="user-card"]');
    if (!profileCard) {
      console.log("⚠️ Waiting for profile card...");
      return;
    }

    const distance = getDistanceMiles();
    if (distance === null) {
      console.log("📏 Distance info not found.");
      return;
    }

    const likeBtn = document.querySelector('[aria-label="Like"]');
    const nopeBtn = document.querySelector('[aria-label="Nope"]');

    if (distance >= 3 && likeBtn) {
      likeBtn.click();
      console.log(`✅ Liked (Distance: ${distance} mi)`);
    } else if (distance < 3 && nopeBtn) {
      nopeBtn.click();
      console.log(`❌ Noped (Distance: ${distance} mi)`);
    }
  }

  function autoMessage(message) {
    const textarea = document.querySelector("textarea");
    const sendBtn = document.querySelector('button[aria-label="Send"]');

    if (textarea && sendBtn) {
      textarea.focus();
      textarea.value = message;
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
      setTimeout(() => {
        sendBtn.click();
        console.log("💬 Message sent");
      }, 300);
    }
  }

  function startAll(message, interval) {
    console.log("▶️ Starting Tinder Auto Tool");
    swipeTimer = setInterval(swipeProfile, interval);
    messageTimer = setInterval(() => autoMessage(message), 10000);
  }

  function stopAll() {
    clearInterval(swipeTimer);
    clearInterval(messageTimer);
    console.log("⛔ Stopped Tinder Auto Tool");
  }

  chrome.storage.local.get(["autoRunning", "message", "interval"], (data) => {
    if (data.autoRunning) {
      startAll(data.message, data.interval);
    }
  });

  chrome.storage.onChanged.addListener((changes) => {
    if (changes.autoRunning && changes.autoRunning.newValue === false) {
      stopAll();
    }
  });
})();
