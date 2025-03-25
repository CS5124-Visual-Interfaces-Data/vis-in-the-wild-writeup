document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#sidebar a");

    function updateActiveLink() {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink);

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 10, // Adjust for sticky header offset
                behavior: "smooth",
            });

            // Temporarily disable scroll-based updates to prevent flickering
            window.removeEventListener("scroll", updateActiveLink);

            setTimeout(() => {
                updateActiveLink();
                window.addEventListener("scroll", updateActiveLink);
            }, 500); // Adjust timeout to match smooth scroll duration
        });
    });
});
