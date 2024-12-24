import express from "express";
document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".stats-container .count");
    const speed = 500;

    const startCounter = (counter) => {
        const target = +counter.innerText;
        let count = 0;

        const updateCounter = () => {
            const increment = Math.ceil(target / speed);
            count += increment;

            if (count < target) {
                counter.innerText = count;
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    startCounter(counter);
                    observer.unobserve(counter); // Stop observing after animation is triggered
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((counter) => {
        observer.observe(counter);
    });
});
