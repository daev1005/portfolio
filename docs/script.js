function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

function openLearnPopup(projectName, learnedText) {
    const modal = document.getElementById("learn-modal");
    const title = document.getElementById("learn-modal-title");
    const body = document.getElementById("learn-modal-body");

    if (!modal || !title || !body) {
        return;
    }

    title.textContent = projectName + " - What I Learned";
    body.textContent = learnedText;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
}

function closeLearnPopup() {
    const modal = document.getElementById("learn-modal");

    if (!modal) {
        return;
    }

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeLearnPopup();
    }
});

function initScrollReveal() {
    const revealTargets = document.querySelectorAll(
        "#profile .pf_pic_container, " +
        "#profile .section_text, " +
        "#about .section_pic_container, " +
        "#about .a-d-containers, " +
        "#experience .details-containers, " +
        "#project .details-containers, " +
        "#contact .contact-info-upper-container"
    );

    if (!revealTargets.length) {
        return;
    }

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotionQuery.matches || !("IntersectionObserver" in window)) {
        revealTargets.forEach(function (target) {
            target.classList.add("reveal-on-scroll", "is-visible");
        });
        return;
    }

    revealTargets.forEach(function (target, index) {
        target.classList.add("reveal-on-scroll");
        target.style.setProperty("--reveal-delay", (index % 4) * 90 + "ms");
    });

    const observer = new IntersectionObserver(
        function (entries, activeObserver) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    activeObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: "0px 0px -10% 0px"
        }
    );

    revealTargets.forEach(function (target) {
        observer.observe(target);
    });
}

document.addEventListener("DOMContentLoaded", initScrollReveal);
