/* =========================================================
   PIXELTOOLS
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       YEAR
    ===================================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            mobileMenu.classList.toggle("open");

        });


        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

            });

        });

    }



    /* =====================================================
       TOOL SEARCH
    ===================================================== */

    const searchInput =
        document.getElementById("toolSearch");

    const toolGrid =
        document.getElementById("toolsGrid");

    const noResults =
        document.getElementById("noResults");

    const categoryButtons =
        document.querySelectorAll(".category");

    let selectedCategory = "all";


    function filterTools() {

        if (!toolGrid) {
            return;
        }

        const cards =
            toolGrid.querySelectorAll(
                ".tool-card:not(.more-card)"
            );

        const searchValue =
            searchInput
                ? searchInput.value.trim().toLowerCase()
                : "";

        let visibleCount = 0;


        cards.forEach(card => {

            const name =
                (
                    card.dataset.name || ""
                ).toLowerCase();

            const category =
                card.dataset.category || "";


            const matchesSearch =
                name.includes(searchValue);

            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;


            if (matchesSearch && matchesCategory) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        const moreCard =
            toolGrid.querySelector(".more-card");


        if (moreCard) {

            if (
                selectedCategory === "all" &&
                searchValue === ""
            ) {

                moreCard.style.display = "";

            } else {

                moreCard.style.display = "none";

            }

        }


        if (noResults) {

            if (visibleCount === 0) {

                noResults.style.display = "block";

            } else {

                noResults.style.display = "none";

            }

        }

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterTools
        );

    }


    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            selectedCategory =
                button.dataset.category || "all";


            filterTools();

        });

    });



    /* =====================================================
       "/" SEARCH SHORTCUT
    ===================================================== */

    document.addEventListener("keydown", event => {

        const target =
            event.target;

        const isTyping =
            target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable;


        if (
            event.key === "/" &&
            !isTyping &&
            searchInput
        ) {

            event.preventDefault();

            searchInput.focus();

        }

    });



    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const href =
                    link.getAttribute("href");


                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(href);


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });



    /* =====================================================
       3D TOOL CARD MOUSE EFFECT
    ===================================================== */

    const toolCards =
        document.querySelectorAll(
            ".tool-card"
        );


    toolCards.forEach(card => {

        if (card.classList.contains("more-card")) {
            return;
        }


        card.addEventListener("mousemove", event => {

            if (
                window.matchMedia(
                    "(max-width: 760px)"
                ).matches
            ) {
                return;
            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateY =
                ((x - centerX) / centerX) * 4;


            const rotateX =
                ((centerY - y) / centerY) * 4;


            card.style.transform =
                `translateY(-12px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });



    /* =====================================================
       HERO WORKSPACE 3D MOUSE EFFECT
    ===================================================== */

    const workspace =
        document.getElementById("workspaceCard");


    const heroVisual =
        document.querySelector(".hero-visual");


    if (workspace && heroVisual) {

        heroVisual.addEventListener(
            "mousemove",
            event => {

                if (
                    window.matchMedia(
                        "(max-width: 760px)"
                    ).matches
                ) {
                    return;
                }


                const rect =
                    heroVisual.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;


                const y =
                    event.clientY - rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateY =
                    ((x - centerX) / centerX) * 7;


                const rotateX =
                    ((centerY - y) / centerY) * 5;


                workspace.style.animation =
                    "none";


                workspace.style.transform =
                    `rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     rotateZ(1deg)
                     translateY(-5px)`;

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                workspace.style.animation =
                    "";

                workspace.style.transform =
                    "";

            }
        );

    }



    /* =====================================================
       BUTTON RIPPLE
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".primary-button, .secondary-button"
        );


    buttons.forEach(button => {

        button.addEventListener("click", event => {

            const ripple =
                document.createElement("span");


            ripple.style.position =
                "absolute";

            ripple.style.width =
                "10px";

            ripple.style.height =
                "10px";

            ripple.style.borderRadius =
                "50%";

            ripple.style.background =
                "rgba(255,255,255,.35)";

            ripple.style.pointerEvents =
                "none";

            ripple.style.transform =
                "scale(0)";

            ripple.style.left =
                `${event.offsetX}px`;

            ripple.style.top =
                `${event.offsetY}px`;

            ripple.style.animation =
                "buttonRipple .6s ease-out";


            button.style.position =
                "relative";

            button.style.overflow =
                "hidden";


            button.appendChild(ripple);


            setTimeout(() => {

                ripple.remove();

            }, 650);

        });

    });



    /* =====================================================
       TOAST
    ===================================================== */

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    let toastTimer;


    function showToast(message) {

        if (!toast || !toastMessage) {
            return;
        }


        toastMessage.textContent =
            message;


        toast.classList.add("show");


        clearTimeout(toastTimer);


        toastTimer =
            setTimeout(() => {

                toast.classList.remove("show");

            }, 2500);

    }


    window.pixelToolsToast =
        showToast;



    /* =====================================================
       INITIAL FILTER
    ===================================================== */

    filterTools();

});