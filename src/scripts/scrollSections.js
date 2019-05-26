const scrollSections = (sections) => {
  let fromTop = window.scrollY

  sections.forEach(link => {
    let section = document.querySelector(link.hash);

    section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop ? link.classList.add('nav__link--active') : link.classList.remove('nav__link--active')
  })
}

export default scrollSections