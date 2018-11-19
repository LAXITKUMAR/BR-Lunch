/**
 * To show the formatted string of time.
 * @param {*} startTime 
 * @param {*} timeInMinutes 
 * @param {*} showAMPM 
 */
const formatTimeString = (startTime, timeInMinutes, showAMPM) => {
    const time = DateUtil.timeFromOffset(startTime, timeInMinutes);
    const timeParts = time.split(' '); // Split by space
    return showAMPM ? `<span class="medium-text">${timeParts[0]}</span><span class="light-text"> ${timeParts[1]}</span>` : `<span class="light-text">${timeParts[0]}</span>`
}

/**
 * Function to render Time Scale
 */
const TimingScale = () => {
    const { layoutWidth, layoutHeight, eventsBlockWidth, defaultTimingScaleWidth, startTime, endTime, timeInterval } = config;
    const timingScaleWidth = layoutWidth > eventsBlockWidth ? layoutWidth - eventsBlockWidth : defaultTimingScaleWidth;
    
    const intervals = DateUtil.diffBetweenTime(startTime, endTime)
    let scaleHtml = ""
    for(let i=0; i<=intervals; i+=1){
        scaleHtml = scaleHtml + (i%timeInterval === 0 ? `<div class="scale-marks" style="top: ${i + 'px'};">${formatTimeString(startTime, i, i%60 === 0)}</div>` : '');
    }

    return `<div class="time-scale-container" style='width: ${timingScaleWidth + 'px'}; height:${layoutHeight + 'px'};'>
            ${scaleHtml}
        </div>`
}
