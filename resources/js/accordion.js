!(function (d) {
  d.addEventListener("DOMContentLoaded", () => {
    const tabButtons = d.querySelectorAll(".accordion-button");

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tab = button.closest(".accordion-tab");
        const content = tab.querySelector(".accordion-content");
        const openIcon = tab.querySelector(".open-icon");
        const closedIcon = tab.querySelector(".closed-icon");

        if (content.classList.contains("open")) {
          content.classList.remove("open");
          openIcon.style.display = "none";
          closedIcon.style.display = "block";
        } else {
          content.classList.add("open");
          closedIcon.style.display = "none";
          openIcon.style.display = "block";
        }
      });
    });
  });
})(document);
