/**
 * Function to render the Lists.
 * @param {*} analyzedObject 
 */
const EventList = (analyzedObject) => {
    const { eventsList, maxcol } = analyzedObject;
    let eventListHtml = ""
    for(let i=0; i<eventsList.length; i+=1){
        eventListHtml += Render(LunchEvent(eventsList[i], maxcol))
    }
    return `${eventListHtml}`;
}
