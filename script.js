// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get all navigation buttons and sections
    const navButtons = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".section");

    // Function to switch sections
    function switchSection(targetSection) {
        // Remove active class from all buttons and sections
        navButtons.forEach(btn => btn.classList.remove("active"));
        sections.forEach(section => section.classList.remove("active"));

        // Add active class to clicked button
        const activeButton = document.querySelector(`[data-section="${targetSection}"]`);
        if (activeButton) {
            activeButton.classList.add("active");
        }

        // Show target section
        const targetSectionElement = document.getElementById(targetSection);
        if (targetSectionElement) {
            targetSectionElement.classList.add("active");
        }

        // Smooth scroll to top when switching sections
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // Add click event listeners to navigation buttons
    navButtons.forEach(button => {
        button.addEventListener("click", function() {
            const targetSection = this.getAttribute("data-section");
            switchSection(targetSection);
        });
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll("a[href^="#"]").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll("img");
    images.forEach(img => {
        img.addEventListener("load", function() {
            this.style.opacity = "1";
        });
        
        // Set initial opacity for smooth loading
        img.style.opacity = "0";
        img.style.transition = "opacity 0.3s ease";
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = "1";
        }
    });

    // Add hover effects for cards
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-10px) scale(1.02)";
        });
        
        card.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0) scale(1)";
        });
    });

    // Add click animation for buttons (Ripple Effect)
    const buttons = document.querySelectorAll(".btn:not(.disabled)");
    buttons.forEach(button => {
        button.addEventListener("click", function(e) {
            // Create ripple effect
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + "px";
            ripple.style.left = x + "px";
            ripple.style.top = y + "px";
            ripple.classList.add("ripple");
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add keyboard navigation support
    document.addEventListener("keydown", function(e) {
        if (e.key === "1") {
            switchSection("subscription");
        } else if (e.key === "2") {
            switchSection("anime");
        }
    });

    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Observe cards for scroll animations
    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(card);
    });

    // Initialize the page with subscription section active
    switchSection("subscription");
});

// Add CSS for ripple effect (if not already in style.css)
// This part is now handled in style.css, so it's commented out here.
/*
const style = document.createElement("style");
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
*/