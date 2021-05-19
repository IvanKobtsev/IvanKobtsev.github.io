window.addEventListener("DOMContentLoaded", () => {
    const review1 = document.querySelector("#review-1"),
        review2 = document.querySelector("#review-2"),
        review3 = document.querySelector("#review-3"),
        reviews = document.querySelectorAll(".reviews__reviews-inner__review"),
        leftArrow = document.querySelector(".reviews__reviews-inner__slider-button-left"),
        rightArrow = document.querySelector(".reviews__reviews-inner__slider-button-right"),
        smoothLinks = document.querySelectorAll('a[href^="#"]'),
        scrollUp = document.querySelector(".scrollup"),
        burgerMenu = document.querySelector(".burger"),
        navigation = document.querySelector(".promo__header__navigation"),
        body = document.querySelector("body"),
        overlay = document.querySelector(".overlay"),
        modalButton = document.querySelector(".modal__button");

    let currentRev = 2,
        height = 330,
        forwardAnim,
        animforward = true,
        switchRevAgr = true,
        timeoutCl = false;

    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', function(e) {
            e.preventDefault();
            const id = smoothLink.getAttribute('href');
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };

    function checkCurrentRev() {
        if (currentRev > 3) {
            currentRev = 1;
        } else if (currentRev < 1) {
            currentRev = 3;
        }
    }

    function removeReviewClasses() {
        review1.classList.remove("active-review", "right-review", "left-review");
        review2.classList.remove("active-review", "right-review", "left-review");
        review3.classList.remove("active-review", "right-review", "left-review");
    }

    function forwReviewAnim() {

        if (height <= 0 && timeoutCl == false) {
            timeoutCl = true;
            setTimeout(() => {
                removeReviewClasses();
                switch (currentRev) {
                    case 1:
                        review1.classList.add("active-review");
                        review2.classList.add("right-review");
                        review3.classList.add("left-review");
                        break;
                    case 2:
                        review2.classList.add("active-review");
                        review3.classList.add("right-review");
                        review1.classList.add("left-review");
                        break;
                    case 3:
                        review3.classList.add("active-review");
                        review1.classList.add("right-review");
                        review2.classList.add("left-review");
                        break;
                }
            }, 100);
            setTimeout(() => {
                animforward = false;
                height = 0;
            }, 200);
        }

        if (animforward == true) {
            height -= 5;
            reviews.forEach(e => {
                e.style.height = `${height}px`;
            });

        } else {
            height += 5;
            reviews.forEach(e => {
                e.style.height = `${height}px`;
            });

        }
        if (height >= 330 && animforward == false) {
            animforward = true;
            window.cancelAnimationFrame(forwardAnim);
            height = 330;
            timeoutCl = false;
            leftArrow.classList.add()
            switchRevAgr = true;

        } else {
            window.requestAnimationFrame(forwReviewAnim);
        }

    }

    function reorder() {
        forwardAnim = window.requestAnimationFrame(forwReviewAnim);
    }

    function nextReview() {
        if (switchRevAgr == true) {
            switchRevAgr = false;
            currentRev++;
            checkCurrentRev();
            reorder();
        }
    }

    function prevReview() {
        if (switchRevAgr == true) {
            switchRevAgr = false;
            currentRev--;
            checkCurrentRev();
            reorder();
        }
    }

    rightArrow.addEventListener("click", nextReview);
    leftArrow.addEventListener("click", prevReview);

    function windowScrollCheck() {
        if (window.pageYOffset > 300 && window.pageYOffset + window.innerHeight < document.documentElement.scrollHeight - 200) {
            scrollUp.style = "";
            scrollUp.classList.add("show-scroll-up");
        } else if (window.pageYOffset + window.innerHeight > document.documentElement.scrollHeight - 200) {
            scrollUp.classList.remove("show-scroll-up");
            scrollUp.style.top = "auto";
            scrollUp.style.transition = "none";
            scrollUp.style.bottom = `${(window.pageYOffset + window.innerHeight) - document.documentElement.scrollHeight + 240}px`;

        } else {
            scrollUp.classList.remove("show-scroll-up");

        }
        if (window.pageYOffset > 40) {
            burgerMenu.classList.add("show-burger");
        } else {
            burgerMenu.classList.remove("show-burger");
        }
    }

    function scroll() {
        document.querySelector("body").scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    function showNav() {
        burgerMenu.classList.remove("show-burger");
        navigation.classList.add("show-nav");
        body.style.overflow = "hidden";

    }

    function closeNav() {
        burgerMenu.classList.add("show-burger");
        navigation.classList.remove("show-nav");
        body.style.overflow = "auto";
    }

    window.addEventListener("scroll", windowScrollCheck);
    scrollUp.addEventListener("click", scroll);
    burgerMenu.addEventListener("click", showNav);
    navigation.addEventListener("click", closeNav);
    window.addEventListener('resize', closeNav);

    body.style.overflow = "hidden";

    function closeModal() {
        body.style.overflow = "auto";
        overlay.style.opacity = "0";
        setTimeout(() => overlay.classList.add("hide-overlay"), 1000);
    }

    modalButton.addEventListener("click", closeModal);

});