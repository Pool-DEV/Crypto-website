// Preloader
window.addEventListener("load", (event) => {
    setTimeout(() => {
        animateCSS(".slider__img", "tada", "1s");
        animateCSS(".preloader", "fadeOut", "1s").then(() => {
            const preloader = document.querySelector(".preloader");
            preloader.style.display = "none";
        });
    }, 2500);
});

// Navbar sticky
const nav = document.querySelector(".nav");

document.addEventListener("scroll", (event) => {
    let scrolledPage = Math.round(window.scrollY);
    if (scrolledPage > 60) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
});

// Hamburger menu
const hamburgerMenu = document.querySelector(".menu-icon");
const cross = document.querySelector(".fa-times");
const navItems = document.querySelector(".nav-items");
const fullscreen = document.querySelector(".fullscreen");

const animateCSS = (element, animation, duration = "1s", prefix = "animate__") => new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.style.setProperty('--animate-duration', duration);

    node.classList.remove(`${prefix}animated`, animationName);
    void node.offsetWidth;
    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
});

hamburgerMenu.addEventListener("click", () => {
    while (navItems.childNodes.length > 0) {
        fullscreen.appendChild(navItems.childNodes[0]);
    }
    const cross = document.createElement("a");
    cross.classList.add("fa", "fa-times");
    cross.href = "#";
    cross.onclick = removeFullscreen;
    fullscreen.appendChild(cross);
    fullscreen.classList.add("active");
    document.body.style.overflow = "hidden";
    animateCSS(".fullscreen", "fadeIn", "0.5s");
});

function removeFullscreen() {
    animateCSS(".fullscreen", "fadeOut", "0.5s").then(() => {
        fullscreen.classList.remove("active");
        document.body.style.overflow = "auto";
        while (fullscreen.childNodes.length > 0) {
            navItems.appendChild(fullscreen.childNodes[0]);
        }
        const faTimes = document.querySelectorAll(".fa-times");
        faTimes.forEach((faTime) => {
            faTime.remove();
        });
    });
}

// Copy contract : https://davidzchen.com/tech/2016/01/19/bootstrap-copy-to-clipboard + (tooltip + icon validate)
function copyContract() {
    contract.disabled = false;
    contract.select();
    contract.setSelectionRange(0, 99999);
    document.execCommand("copy");
    contract.disabled = true;

    const fa_icon = document.querySelector(".fa-copy");
    fa_icon.classList.remove("fa-copy");
    fa_icon.classList.add("fa-check");
    setTimeout(() => {
        fa_icon.classList.remove("fa-check");
        fa_icon.classList.add("fa-copy");
    }, 2000);
}

// Particles effect
function pop(e) {
    let amount = 25;
    let x, y;
    const bbox = e.target.getBoundingClientRect();

    if (e.clientX === 0 && e.clientY === 0) {
        x = bbox.left + bbox.width / 2 + window.scrollX;
        y = bbox.top + bbox.height / 2 + window.scrollY;
        for (let i = 0; i < amount; i++) {
            createParticle(x, y);
        }
    } else {
        x = e.clientX + window.scrollX;
        y = e.clientY + window.scrollY;
        for (let i = 0; i < amount; i++) {
            createParticle(x, y);
        }
    }
}

function createParticle(x, y) {
    const particle = document.createElement("particle");
    document.body.appendChild(particle);
    let width = Math.floor(Math.random() * 30 + 8);
    let height = width;
    let destinationX = (Math.random() - 0.5) * 300;
    let destinationY = (Math.random() - 0.5) * 300;
    let rotation = Math.random() * 520;
    let delay = Math.random() * 200;

    particle.innerHTML = ["💎"][Math.floor(Math.random())];
    particle.style.fontSize = `${Math.random() * 24 + 10}px`;
    particle.style.width = `${width}px`;
    particle.style.height = `${height}px`;
    particle.style.position = 'absolute';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const animation = particle.animate([
        {
            transform: `translate(-50%, -50%) translate(0, 0) rotate(0deg)`,
            opacity: 1
        },
        {
            transform: `translate(-50%, -50%) translate(${destinationX}px, ${destinationY}px) rotate(${rotation}deg)`,
            opacity: 0
        }
    ], {
        duration: 3000,
        easing: "cubic-bezier(0, .9, .57, 1)",
        delay: delay
    });

    animation.onfinish = removeParticle;
}

function removeParticle(e) {
    e.srcElement.effect.target.remove();
}

if (document.body.animate) {
    document.querySelectorAll(".btn-buy").forEach(button => button.addEventListener("mouseenter", (e) => { pop(e); }));
}