import TweenMax from 'gsap/src/minified/TweenMax.min'
import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min'
import 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min'
import 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min'

export const DOMElements = {
    lengthStatic: '',
    strokeSize: '',
    durationScene: 400,
    $bar: document.querySelector("#progressBar"),
    paths : [].slice.call(document.querySelectorAll('.tech__icon')),
    $contentBox : document.querySelector('.technologies__container'),
    $triggerElement : document.querySelector('.technologies__trigger'),
    $processBar: document.querySelector('.tech__bar'),
    $processBox: document.querySelector('.tech'),
}

export const updateVars = (breakpoint) => {
    DOMElements.lengthStatic = parseInt(DOMElements.$bar.getAttribute("stroke-dashoffset"), 10)
    breakpoint >= 970 ? DOMElements.strokeSize = DOMElements.lengthStatic / DOMElements.$processBar.clientWidth : DOMElements.strokeSize = DOMElements.lengthStatic / DOMElements.$processBar.clientHeight
}

export class Scene {

    constructor(element) {
        this.controller = new ScrollMagic.Controller()
        this.tween = TweenMax.to(this.createTween(element), 1, {strokeDashoffset: 0, ease:Linear.easeNone})
        this.scene = new ScrollMagic.Scene({
            triggerElement: ".technologies__trigger",
            triggerHok: 0,
            duration: DOMElements.durationScene,
            tweenChanges: true
        })
            .setTween(this.tween)
            .setPin("#pinSec")
            .addTo(this.controller)
    }

    createTween(newTween) {
        const lineLength = newTween.getTotalLength()
        newTween.setAttribute("stroke-dasharray", lineLength + 1)
        newTween.setAttribute("stroke-dashoffset", lineLength)

        return newTween
    }
}

export const progressSectionAnimation = (breakpointSize) => {
    const length = parseInt(DOMElements.$bar.style.strokeDashoffset, 10)
    if (breakpointSize >= 970 ) {
        if (length <= DOMElements.lengthStatic && length > 0) {
            DOMElements.paths.forEach((item) => {
                if ((DOMElements.lengthStatic - length) / DOMElements.strokeSize > item.getBoundingClientRect().left - DOMElements.$contentBox.getBoundingClientRect().left + (item.getBBox().width / 2)) {
                    item.classList.add("active")
                } else {
                    item.classList.remove("active")
                }
            })
        }
    } else {
        if (length <= DOMElements.lengthStatic && length > 0) {
            DOMElements.paths.forEach((item) => {
                if ((DOMElements.lengthStatic - length) / DOMElements.strokeSize > item.getBoundingClientRect().top - DOMElements.$processBox.getBoundingClientRect().top + (item.getBBox().height / 2)) {
                    item.classList.add("active")
                } else {
                    item.classList.remove("active")
                }
            })
        }
    }
}

export const makeSVG = (breakpointName, breakpointSize, Scene) => {
    const svg = document.querySelector('#progressSvg'),
        svgBg = document.querySelector('#progressBg'),
        svgBar = document.querySelector('#progressBar')

    if (breakpointName === 'sm' || breakpointName === 'xs' || breakpointName === 'xxs') {
        DOMElements.durationScene = 500
        Scene.scene = Scene.scene.removePin(true);
        Scene.scene.duration(DOMElements.durationScene)
        Scene.scene.refresh()

        svg.setAttribute('viewBox', '0 0 10 ' + (DOMElements.lengthStatic + 10))

        svgBg.setAttribute('d', 'M5,5 v' + (DOMElements.lengthStatic))
        svgBar.setAttribute('d', 'M5,5 v' + (DOMElements.lengthStatic))
    } else {
        DOMElements.durationScene = 400
        Scene.scene = Scene.scene.setPin("#pinSec")
        Scene.scene.duration(DOMElements.durationScene)
        Scene.scene.refresh()

        svg.setAttribute('viewBox', '0 0 ' + (DOMElements.lengthStatic + 10) + ' 10')
        svgBg.setAttribute('d', 'M5,5 h' + (DOMElements.lengthStatic))
        svgBar.setAttribute('d', 'M5,5 h' + (DOMElements.lengthStatic))
    }
}
