import { matchesPolyfill } from "./utils/polyfills";

matchesPolyfill();

const navToggle = (breakpointSize) => {

    const headerContainer = document.querySelector('.header__container'),
        nav = document.querySelector('#nav'),
        icon = document.querySelector('.hamburger');

    const toggleNav = () => {
        icon.classList.toggle('is-active')
        nav.classList.toggle('is-collapsed')
    };

    const scrollToSection = (href) => {
        const pathArr = href.split('/');
        const sectionID = pathArr[pathArr.length - 1].replace('#', '');

        document.getElementById(sectionID).scrollIntoView({behavior: 'smooth' });
    };

    const toggleMobileNav = (e) => {
      if (e.target.matches('.hamburger, .hamburger *')) {

        toggleNav();
      } else if (e.target.matches('.nav__link')) {

        scrollToSection(e.target.href);
        document.querySelector('.nav__link--active').classList.remove('nav__link--active')
        document.querySelector('a.nav__link[href$="' + e.target.href.split("#")[1] + '"]').classList.add('nav__link--active')
        if (breakpointSize <= 740) toggleNav();
      }
    };

    headerContainer.addEventListener('click', toggleMobileNav);

};

export default navToggle
