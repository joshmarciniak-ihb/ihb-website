!(function (d) {
    d.addEventListener("DOMContentLoaded", () => {
      const checkbox = d.querySelector(".checkbox3");
      const header = d.querySelector(".header");
      const mobileNavMenu = d.querySelector('.mobile-nav-menu');
  
      const handleCheckboxChange = () => {
        if (checkbox.checked) {
          header.style.backgroundColor = 'rgba(19, 19, 19, 0.9)';
          mobileNavMenu.classList.remove('closed');
          mobileNavMenu.classList.add('open');
        } else {
          header.style.backgroundColor = "";
          mobileNavMenu.classList.remove('open');
          mobileNavMenu.classList.add('closed');
        }
      };
  
      checkbox.addEventListener("change", handleCheckboxChange);
  
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
          checkbox.checked = false;
          handleCheckboxChange();
        }
      });
    });
  })(document);