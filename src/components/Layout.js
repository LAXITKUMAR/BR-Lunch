const Layout = (analyzedObject) => {
    return `<div class="layout-container">
        ${Render(TimingScale())}
        ${Render(EventsBlock(analyzedObject))}
    </div>`
}
