document.addEventListener("DOMContentLoaded", function (e) {
  // Script for hamburger menu/mobile menu
  if (document.querySelector('.hamburger_menu') !== null) {
    document.querySelector('.hamburger_menu').addEventListener('click', function (event) {
      event.preventDefault();
      let trigger = event.target.closest('.hamburger_menu');
      trigger.classList.toggle('toggled')
      document.querySelector('.mobile_nav_menu').classList.toggle('show');
      document.querySelector('body').classList.toggle('fix')
    })
  }

  // Script for Header sticky 
  let header = document.querySelector('header');
  function getDistance() {
    return header.offsetTop;
  }
  window.onscroll = function (event) {
    let distance = getDistance() - window.pageYOffset;
    if (distance < 0) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  }

  // Script for custom collapse 
  if (document.querySelector(".dropdown-trigger") !== null) {
    const triggers = document.querySelectorAll(".dropdown-trigger");

    triggers.forEach((each) => {
      each.addEventListener("click", function (event) {
        event.preventDefault();
        const dropdownParent = each.parentElement;
        dropdownParent.classList.toggle("active");
        const dropContent =
          dropdownParent.querySelector(".dropdown-content");
        if (dropContent === undefined || dropContent === null) return;
        if (dropContent.style.maxHeight) {
          dropContent.style.maxHeight = null;
        } else {
          dropContent.style.maxHeight = `${dropContent.scrollHeight}px`;
        }
      });
    });
  }


  // Script for Accordion
  if (document.querySelector("#accordion .el-accordion__header--toggler") !== null) {
    const triggers = document.querySelectorAll("#accordion .el-accordion__header--toggler");

    triggers.forEach((each) => {
      each.addEventListener("click", function (event) {
        event.preventDefault();
        const dropdownParent = each.parentElement;
        const dropContent =
          dropdownParent.querySelector(".el-accordion__content");
        if (dropContent === undefined || dropContent === null) return;
        if (dropContent.style.maxHeight) {
          dropContent.style.maxHeight = null;
        } else {
          dropContent.style.maxHeight = `${dropContent.scrollHeight}px`;
        }
      });
    });
  }



  // Script for Tab
  if (document.getElementById('mechanism_step') !== null) {
    const mechanism = document.getElementById('mechanism_step');
    mechanism.addEventListener('click', function (event) {
      event.preventDefault();
      let clickedBtn = event.target.closest('[data-step]');
      document.querySelectorAll('#mechanism_step button').forEach(each => each.classList.remove('active'))
      clickedBtn.classList.add('active');
      document.querySelectorAll('[data-step-content]').forEach(each => each.classList.remove('active'))
      document.getElementById(clickedBtn.dataset.step).classList.add('active');
    })

  }




})
