import '../scss/main.scss'

import {
  getBreakpoint
} from "./utils/utils"

import './utils/fepolyfill'

import navToggle from './navToggle'

import {
  updateVars,
  Scene,
  DOMElements,
  makeSVG,
  progressSectionAnimation
} from './progress'

import smoothscroll from 'smoothscroll-polyfill'

smoothscroll.polyfill()

const animationScene = new Scene(DOMElements.$bar)

let sectionPositions,
  breakpointUses = DOMElements.$processBar.clientWidth,
  [breakpointName, breakpointSize] = getBreakpoint()

navToggle(breakpointSize)
updateVars(breakpointSize)
makeSVG(breakpointName, breakpointSize, animationScene);

['load', 'resize'].forEach(event => window.addEventListener(event, () => {
  [breakpointName, breakpointSize] = getBreakpoint()

  if (breakpointUses !== breakpointSize) {
    breakpointUses = breakpointSize

    updateVars(breakpointSize)

    makeSVG(breakpointName, breakpointSize, animationScene)
  }

}))

window.addEventListener('scroll', (e) => {
  progressSectionAnimation(breakpointSize)
})

// const me = {
//   name: 'Maciej',
//   surname: 'Posacki',
//   education: 'mgr Informatyki',
//   job: () => {
//     return 'Front-End Developer w jednej z krakowskich agencji'
//   },
//   description: () => {
//     return 'Umiejętności praktyczne zdobywam poprzez nieustanną naukę i podążanie za trendami       współczesnego front-endu. Przede wszystkim chętnie podejmuję nowe wyzwania, które motywują mnie do znajdywania nowych rozwiązań.'
//   }
// }
