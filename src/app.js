/**
 * Render the Timing container and event container based on the event list passed.
 * @param {Array} eventsList // List of events containing 
 * 
 * NOTE: Few assumptions regarding input event are made like:
 *  i) Start time is always less than end time are made.
 *  ii) Lunch time is between 12PM to 3PM.
 * No validations are made regarding the assumtions mentioned above.
 * 
 * @example
 * i) matchLunchEvent ([{start: 225, end: 285},{start: 210,end: 270},{start: 180, end: 240},{start: 240, end:300},{start: 300, end: 360},{start: 270, end: 330}])
 * ii) matchLunchEvent ([{start: 225, end: 285},{start: 300, end: 360}, {start: 180, end: 240}])
 */
var matchLunchEvent = eventsList => {
    // Check if input is not null/empty and should be array else log error.
    if(!eventsList || !Array.isArray(eventsList)){
       throw new Error("Invalid Event List!! Please check you inputs.");
    }
    const analyzedObject = eventAnalyser(eventsList); // Single object having all the details that would be required to render the Details.
    Render(Layout(analyzedObject), '#app');
}