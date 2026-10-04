/* =========================================
   TYPED TEXT
========================================= */

const typedElement = document.querySelector(".text");

if (typedElement && typeof Typed !== "undefined") {
    new Typed(".text", {
        strings: [
            "Frontend Developer",
            "Web Developer",
            "MERN Stack Developer"
        ],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
}


/* =========================================
   ABOUT SECTION REVEAL
========================================= */

const aboutImage = document.querySelector(".about-img");
const aboutText = document.querySelector(".about-text");
const aboutSection = document.querySelector(".about");

if (aboutSection && aboutImage && aboutText) {

    const aboutObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    aboutImage.classList.add("show");

                    setTimeout(() => {
                        aboutText.classList.add("show");
                    }, 150);

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.2
        }
    );

    aboutObserver.observe(aboutSection);
}


/* =========================================
   NAVBAR ACTIVE LINK
========================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });


    navLinks.forEach((link) => {

        link.style.color = "";

        if (
            link.getAttribute("href") === `#${current}`
        ) {
            link.style.color = "#8d7b68";
        }

    });

});


/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================================
   SKILLS SECTION
========================================= */

const skillCards =
    document.querySelectorAll(".skill-card");

if (skillCards.length > 0) {

    const skillObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "skill-show"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.2
            }
        );


    skillCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 100}ms`;

        skillObserver.observe(card);

    });


    /* Skill card click effect */

    skillCards.forEach((card) => {

        card.addEventListener("click", () => {

            skillCards.forEach((item) => {
                item.classList.remove("selected");
            });

            card.classList.add("selected");

        });

    });

}

/* ============================================
   PREMIUM PROJECT SLIDER
   ============================================ */

(function initPremiumProjectSlider() {

    function init() {

        const track = document.getElementById("premiumTrack");
        const prevBtn = document.querySelector(".premium-prev");
        const nextBtn = document.querySelector(".premium-next");
        const dotsContainer = document.getElementById("premiumDots");
        const counter = document.getElementById("premiumCounter");

        // Agar premium slider HTML nahi mila
        if (!track || !prevBtn || !nextBtn) return;

        const cards = Array.from(
            track.querySelectorAll(".premium-card")
        );

        if (!cards.length) return;

        // Duplicate initialization prevent
        if (track.dataset.sliderInitialized === "true") return;

        track.dataset.sliderInitialized = "true";

        let currentIndex = 0;


        /* =========================================
           CARDS PER VIEW
           ========================================= */

        function cardsPerView() {

            if (window.innerWidth <= 650) {
                return 1;
            }

            if (window.innerWidth <= 1050) {
                return 2;
            }

            return 3;
        }


        /* =========================================
           MAX SLIDER INDEX
           ========================================= */

        function maxIndex() {

            return Math.max(
                0,
                cards.length - cardsPerView()
            );
        }


        /* =========================================
           CARD WIDTH + GAP
           ========================================= */

        function getStep() {

            const cardWidth =
                cards[0].getBoundingClientRect().width;

            const styles =
                getComputedStyle(track);

            const gap =
                parseFloat(
                    styles.columnGap || styles.gap
                ) || 0;

            return cardWidth + gap;
        }


        /* =========================================
           RENDER SLIDER
           ========================================= */

        function render() {

            const max = maxIndex();

            // Keep index within limits
            currentIndex =
                Math.max(
                    0,
                    Math.min(currentIndex, max)
                );

            const move =
                currentIndex * getStep();

            track.style.transform =
                `translate3d(-${move}px, 0, 0)`;


            /* -------------------------------------
               ARROWS
               ------------------------------------- */

            prevBtn.disabled = false;
            nextBtn.disabled = false;

            prevBtn.style.pointerEvents = "auto";
            nextBtn.style.pointerEvents = "auto";


            /* -------------------------------------
               DOTS
               ------------------------------------- */

            if (dotsContainer) {

                const dots =
                    dotsContainer.querySelectorAll(
                        ".premium-dot"
                    );

                dots.forEach((dot, index) => {

                    dot.classList.toggle(
                        "active",
                        index === currentIndex
                    );

                });
            }


            /* -------------------------------------
               COUNTER
               ------------------------------------- */

            if (counter) {

                counter.textContent =
                    `${currentIndex + 1} / ${max + 1}`;

            }

        }


        /* =========================================
           CREATE DOTS
           ========================================= */

        function buildDots() {

            if (!dotsContainer) return;

            dotsContainer.innerHTML = "";

            const max = maxIndex();

            for (let i = 0; i <= max; i++) {

                const dot =
                    document.createElement("button");

                dot.type = "button";

                dot.className =
                    "premium-dot";

                dot.setAttribute(
                    "aria-label",
                    `Go to project group ${i + 1}`
                );


                dot.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();
                        event.stopPropagation();

                        currentIndex = i;

                        render();

                    }
                );


                dotsContainer.appendChild(dot);

            }

        }


        /* =========================================
           PREVIOUS BUTTON
           ========================================= */

        prevBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                const max = maxIndex();

                if (currentIndex > 0) {

                    currentIndex--;

                } else {

                    // Last slide par loop
                    currentIndex = max;

                }

                render();

            }
        );


        /* =========================================
           NEXT BUTTON
           ========================================= */

        nextBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                const max = maxIndex();

                if (currentIndex < max) {

                    currentIndex++;

                } else {

                    // Last slide ke baad first slide
                    currentIndex = 0;

                }

                render();

            }
        );


        /* =========================================
           CARD SELECT / GLASS EFFECT
           ========================================= */

        cards.forEach(card => {

            card.addEventListener(
                "click",
                function (event) {

                    // Agar Live/GitHub link click hua
                    // to selected effect mat lagao
                    if (event.target.closest("a")) {
                        return;
                    }


                    const alreadySelected =
                        card.classList.contains(
                            "selected"
                        );


                    cards.forEach(item => {

                        item.classList.remove(
                            "selected"
                        );

                    });


                    if (!alreadySelected) {

                        card.classList.add(
                            "selected"
                        );

                    }

                }
            );


            // Image dragging disable
            const image =
                card.querySelector("img");

            if (image) {

                image.draggable = false;

            }

        });


        /* =========================================
           TOUCH SWIPE
           ========================================= */

        let startX = 0;
        let startY = 0;


        track.addEventListener(
            "touchstart",
            function (event) {

                const touch =
                    event.changedTouches[0];

                startX = touch.clientX;
                startY = touch.clientY;

            },
            {
                passive: true
            }
        );


        track.addEventListener(
            "touchend",
            function (event) {

                const touch =
                    event.changedTouches[0];

                const diffX =
                    touch.clientX - startX;

                const diffY =
                    touch.clientY - startY;


                // Small movement ignore
                if (Math.abs(diffX) < 50) {
                    return;
                }


                // Vertical scrolling ignore
                if (
                    Math.abs(diffX) <
                    Math.abs(diffY)
                ) {
                    return;
                }


                if (diffX < 0) {

                    // Swipe left
                    nextBtn.click();

                } else {

                    // Swipe right
                    prevBtn.click();

                }

            },
            {
                passive: true
            }
        );


        /* =========================================
           WINDOW RESIZE
           ========================================= */

        let resizeTimer;


        window.addEventListener(
            "resize",
            function () {

                clearTimeout(resizeTimer);

                resizeTimer =
                    setTimeout(
                        function () {

                            buildDots();
                            render();

                        },
                        120
                    );

            }
        );


        /* =========================================
           INITIALIZE
           ========================================= */

        buildDots();
        render();

    }


    /* =========================================
       DOM READY CHECK
       ========================================= */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init,
            {
                once: true
            }
        );

    } else {

        init();

    }

})();



/* =========================================
   EXPERIENCE ANIMATION
   ========================================= */

(function initExperienceAnimation() {

    function init() {

        const experienceItems =
            document.querySelectorAll(
                ".experience-item"
            );


        if (!experienceItems.length) {
            return;
        }


        /* -------------------------------------
           INTERSECTION OBSERVER
           ------------------------------------- */

        const experienceObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target.classList.add(
                                "show"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        /* -------------------------------------
           OBSERVE EACH EXPERIENCE ITEM
           ------------------------------------- */

        experienceItems.forEach(
            function (item) {

                experienceObserver.observe(item);

            }
        );

    }


    /* -----------------------------------------
       DOM READY
       ----------------------------------------- */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init,
            {
                once: true
            }
        );

    } else {

        init();

    }

})();

/* =========================================
   CONTACT FORM + BACKEND
========================================= */

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    const sendBtn =
        document.getElementById("sendBtn");

    const sendBtnText =
        document.getElementById("sendBtnText");

    const sendBtnIcon =
        document.getElementById("sendBtnIcon");

    const formMessage =
        document.getElementById("formMessage");

    const formMessageIcon =
        document.getElementById("formMessageIcon");

    const formMessageText =
        document.getElementById("formMessageText");


    contactForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();


            /* =========================
               GET FORM DATA
            ========================= */

            const name =
                document.getElementById("name")
                    .value
                    .trim();

            const email =
                document.getElementById("email")
                    .value
                    .trim();

            const subject =
                document.getElementById("subject")
                    .value
                    .trim();

            const message =
                document.getElementById("message")
                    .value
                    .trim();


            /* =========================
               VALIDATION
            ========================= */

            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                formMessage.classList.add(
                    "show",
                    "error"
                );

                formMessageIcon.className =
                    "fa-solid fa-circle-xmark";

                formMessageText.textContent =
                    "Please fill all fields.";

                return;
            }


            /* =========================
               LOADING
            ========================= */

            sendBtn.disabled = true;

            sendBtnText.textContent =
                "Sending...";

            sendBtnIcon.className =
                "fa-solid fa-spinner fa-spin";


            formMessage.classList.remove(
                "show",
                "success",
                "error"
            );


            try {

                /* =========================
                   SEND TO NODE BACKEND
                ========================= */

                const response =
                    await fetch(
                        "http://localhost:5000/api/contact",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                name,
                                email,
                                subject,
                                message
                            })
                        }
                    );


                const data =
                    await response.json();


                /* =========================
                   SUCCESS
                ========================= */

                if (
                    response.ok &&
                    data.success
                ) {

                    formMessage.classList.add(
                        "show",
                        "success"
                    );

                    formMessageIcon.className =
                        "fa-solid fa-circle-check";

                    formMessageText.textContent =
                        "Message sent successfully!";

                    contactForm.reset();


                } else {

                    throw new Error(
                        data.message ||
                        "Something went wrong."
                    );

                }


            } catch (error) {

                console.error(
                    "Contact Form Error:",
                    error
                );


                /* =========================
                   ERROR
                ========================= */

                formMessage.classList.add(
                    "show",
                    "error"
                );

                formMessageIcon.className =
                    "fa-solid fa-circle-xmark";

                formMessageText.textContent =
                    error.message ||
                    "Server error. Please try again.";

            }


            /* =========================
               RESET BUTTON
            ========================= */

            sendBtn.disabled = false;

            sendBtnText.textContent =
                "Send Message";

            sendBtnIcon.className =
                "fa-solid fa-paper-plane";

        }
    );

}


/* =========================================
   FOOTER
========================================= */

const footerYear =
    document.getElementById("footerYear");

if (footerYear) {

    footerYear.textContent =
        new Date().getFullYear();

}


/* =========================================
   BACK TO TOP
========================================= */

const backTop =
    document.querySelector(".back-top");

if (backTop) {

    backTop.addEventListener(
        "click",
        (e) => {

            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}

document.addEventListener("DOMContentLoaded", () => {

    const aiChatButton = document.getElementById("aiChatButton");
    const aiChatBox = document.getElementById("aiChatBox");
    const closeChat = document.getElementById("closeChat");

    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const chatMessages = document.getElementById("chatMessages");


    // OPEN CHAT
    aiChatButton.addEventListener("click", () => {

        console.log("AI Chat button clicked");

        aiChatBox.classList.add("active");

        chatInput.focus();
    });


    // CLOSE CHAT
    closeChat.addEventListener("click", () => {

        aiChatBox.classList.remove("active");

    });


    // SEND MESSAGE
    chatForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const message = chatInput.value.trim();

        if (!message) return;


        // USER MESSAGE
        addMessage(message, "user");

        chatInput.value = "";


        // TYPING
        const typingMessage = addMessage(
            "AI is typing...",
            "bot"
        );


        try {

            const response = await fetch(
                "http://localhost:5000/api/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        message: message
                    })
                }
            );


            const data = await response.json();


            typingMessage.remove();


            if (!response.ok || !data.success) {

                throw new Error(
                    data.message || "AI request failed"
                );

            }


            addMessage(
                data.reply,
                "bot"
            );


       } catch (error) {

    console.error("FULL CHAT ERROR:", error);

    typingMessage.remove();

    addMessage(
        "❌ " + error.message,
        "bot"
    );
}

    });


    // ADD MESSAGE
    function addMessage(text, type) {

        const messageDiv =
            document.createElement("div");


        messageDiv.className =
            `chat-message ${type}`;


        messageDiv.textContent = text;


        chatMessages.appendChild(
            messageDiv
        );


        chatMessages.scrollTop =
            chatMessages.scrollHeight;


        return messageDiv;
    }

});


/* =========================================
   PORTFOLIO PRELOADER
========================================= */

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");
    const progress = document.querySelector(".loader-progress");
    const percent = document.querySelector(".loader-percent");

    let value = 0;

    const loading = setInterval(() => {

        value++;

        progress.style.width = value + "%";
        percent.textContent = value + "%";

        if (value >= 100) {

            clearInterval(loading);

            setTimeout(() => {
                preloader.classList.add("hide");
            }, 500);
        }

    }, 20);
});
