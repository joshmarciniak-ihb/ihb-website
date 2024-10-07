!(function (d) {
    d.addEventListener("DOMContentLoaded", () => {
      const checkbox = d.querySelector(".checkbox3");
      const header = d.querySelector(".header");
      const mobileNavMenuWrapper = d.querySelector('.mobile-nav-menu-wrapper');
  
      const handleCheckboxChange = () => {
        if (checkbox.checked) {
          header.style.backgroundColor = 'rgba(19, 19, 19, 0.9)';
          mobileNavMenuWrapper.classList.remove('closed');
          mobileNavMenuWrapper.classList.add('open');
        } else {
          header.style.backgroundColor = "";
          mobileNavMenuWrapper.classList.remove('open');
          mobileNavMenuWrapper.classList.add('closed');
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