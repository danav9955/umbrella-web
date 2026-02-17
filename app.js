const tg = window.Telegram.WebApp;
tg.expand();
tg.backgroundColor = "#0a0a0a";
tg.headerColor = "#0a0a0a";

function showTab(tabId) {
    const currentTab = document.querySelector('.tab-content.active');
    const newTab = document.getElementById(tabId);

    if (currentTab.id === tabId) return;

    // GSAP Animation for smooth transition
    gsap.to(currentTab, {
        duration: 0.3,
        opacity: 0,
        x: -20,
        onComplete: () => {
            currentTab.classList.remove('active');
            newTab.classList.add('active');
            
            gsap.fromTo(newTab, 
                { opacity: 0, x: 20 }, 
                { opacity: 1, x: 0, duration: 0.3 }
            );
        }
    });

    // Update Nav Icons
    document.querySelectorAll('.nav-icon').forEach(icon => icon.classList.remove('active'));
    // (Add logic here to match icon to tab)
}

// Initial Animation
gsap.from("#wallet", { opacity: 0, y: 30, duration: 0.8, ease: "power4.out" });
