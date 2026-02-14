/**
 * Saroj Neupane | Core Website Script
 */

// --- 1. Digital Clock Logic ---
function updateClock() {
    const clock = document.getElementById("digital-clock");
    if (!clock) return;

    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;
    hours = String(hours).padStart(2, "0");

    clock.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

// --- 2. AI Chat Logic (Lazy Load + Typing Effect) ---
function initAIChat() {
    const launcher = document.getElementById("ai-chat-launcher");
    const container = document.getElementById("ai-chat-container");
    const closeBtn = document.getElementById("close-chat");
    const tooltip = document.querySelector(".chat-tooltip");
    const iframe = document.getElementById("ai-iframe");

    if (!launcher || !container || !iframe) return;

    const greetingText = "Hi, I am an AI to help you!";
    let charIndex = 0;
    let hasLoadedIframe = false;

    // Terminal Typing Effect
    function typeWriter() {
        if (charIndex < greetingText.length) {
            tooltip.textContent += greetingText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 60); 
        } else {
            setTimeout(() => {
                tooltip.classList.remove('typing');
                tooltip.style.opacity = "0";
            }, 5000);
        }
    }

    // Trigger greeting
    setTimeout(() => {
        if (container.style.display !== "flex") {
            tooltip.textContent = ""; 
            tooltip.style.opacity = "1";
            tooltip.style.transform = "translateY(0)";
            tooltip.classList.add('typing');
            typeWriter();
        }
    }, 2500);

    // Toggle Chat and Lazy Load Iframe
    launcher.addEventListener("click", () => {
        const isOpening = container.style.display === "none" || container.style.display === "";
        
        if (isOpening) {
            container.style.display = "flex";
            tooltip.style.opacity = "0"; 

            // PERFORMANCE FEATURE: Load iframe source only when first clicked
            if (!hasLoadedIframe) {
                const source = iframe.getAttribute("data-src");
                iframe.setAttribute("src", source);
                hasLoadedIframe = true;
                console.log("AI Chat Loaded (Performance Optimized)");
            }
        } else {
            container.style.display = "none";
        }
    });

    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation(); 
        container.style.display = "none";
    });
}

// --- Initialize Everything ---
document.addEventListener("DOMContentLoaded", () => {
    setInterval(updateClock, 1000);
    updateClock();
    initAIChat();
});
// Add this inside your DOMContentLoaded listener
document.addEventListener("mousemove", (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
    
    document.querySelector(".blob-1").style.transform = `translate(${moveX}px, ${moveY}px)`;
    document.querySelector(".blob-2").style.transform = `translate(${-moveX}px, ${-moveY}px)`;
});
