


function autoSwipeByDistance() {
  const profileCard = document.querySelector('[data-testid="user-card"]');

  if (!profileCard) {
    console.log("⚠️ No profile card found.");
    return;
  }

  // খোঁজো distance টেক্সট
  const distanceSpan = [...profileCard.querySelectorAll('span, div')]
    .map(el => el.innerText)
    .find(text => text && text.toLowerCase().includes("miles away"));

  if (!distanceSpan) {
    console.log("📏 No distance info found.");
    return;
  }

  // টেক্সট থেকে সংখ্যাটা বের করো
  const match = distanceSpan.match(/(\d+(\.\d+)?)\s+miles/i);
  if (!match) {
    console.log("❌ Distance format not found.");
    return;
  }

  const distance = parseFloat(match[1]);
  const likeBtn = document.querySelector('[aria-label="Like"]');
  const nopeBtn = document.querySelector('[aria-label="Nope"]');

  console.log(`📍 Profile is ${distance} miles away.`);

  if (distance >= 3 && likeBtn) {
    likeBtn.click();
    console.log("✅ Liked (>= 3 miles)");
  } else if (distance < 3 && nopeBtn) {
    nopeBtn.click();
    console.log("❌ Noped (< 3 miles)");
  }
}

// প্রতি ৩ সেকেন্ডে একবার রান করাবে
setInterval(autoSwipeByDistance, 3000);
