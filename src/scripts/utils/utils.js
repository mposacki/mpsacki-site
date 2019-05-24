export const getBreakpoint = function () {
    const breakpointsArr = window.getComputedStyle(document.body, ':before').content.replace(/\"/g, '').split(':')
    breakpointsArr[1] = parseInt(breakpointsArr[1])
    return breakpointsArr
}
