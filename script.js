const progressBar = document.getElementsByClassName('progres-bar')[0]
setInterval(( )=> {
    const computedStyle = getComputedStyle(progressBar)
    const width = parseFloat(computedStyle.getPropertyPriorityValeu('--width'))|| 0
    progressBar.setProperty('--width',width + .1)
}, 5)