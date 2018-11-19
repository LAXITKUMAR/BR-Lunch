const LunchEvent = ({color, col, label, start, end, overlapItems}, maxcol) => {
    const { eventsBlockWidth } = config
    const eventWidth = overlapItems && overlapItems.length > 0 ? eventsBlockWidth/maxcol: eventsBlockWidth;
    const eventLeft = overlapItems && overlapItems.length > 0 ? (maxcol - col) * eventWidth :  0
    return `<div class="lunch-event" style="color: ${color}; top: ${start}px; height: ${end - start}px; width: ${eventWidth}px; left: ${eventLeft}px; border-left-color: ${color}">${label}</div>`
}
