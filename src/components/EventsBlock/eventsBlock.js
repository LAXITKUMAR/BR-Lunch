const EventsBlock = (analyzedObject) => {
    const { eventsBlockWidth, layoutHeight, eventsBlockPadding} = config
    return `<div class="event-container">
        <div style='width: ${eventsBlockWidth + 'px'}; height: ${layoutHeight}px; padding: 0px ${eventsBlockPadding/2}px;'>
            <div>
                ${Render(EventList(analyzedObject))}
            </div>
        </div>
    </div>
    `
}
