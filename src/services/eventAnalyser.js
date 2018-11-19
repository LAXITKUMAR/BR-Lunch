/**
 * Set the color of the event block
 * @param {*} objectToRender // Refrence to object constructed so for for rendering
 * @param {*} el // Events list
 */
const setColor = (objectToRender, el) => {
  const { maxDurationIndex } = objectToRender
  if(maxDurationIndex > 0){
    el[maxDurationIndex].color = config.color.MATCHED;
    el[0].color = config.color.MATCHED;
  }else if(maxDurationIndex === -1 ){
    el[0].color = config.color.UNMATCHED;
  }
}

/**
 * Calculate the Max duration found so far.
 * @param {*} objectToRender 
 * @param {*} el 
 * @param {*} i 
 */
const calculateMaxDuartion = (objectToRender, el, i) => {
  objectToRender.maxDurationIndex = el[i].duration > objectToRender.maxDuration ? i :  objectToRender.maxDurationIndex;
  objectToRender.maxDurationIndex = el[i].duration !=-1 && (el[i].duration === objectToRender.maxDuration) && (Math.abs(el[i].start - el[0].start) < Math.abs(el[objectToRender.maxDurationIndex].start - el[0].start)) ? i : objectToRender.maxDurationIndex;
  objectToRender.maxDuration = el[i].duration > objectToRender.maxDuration ? el[i].duration : objectToRender.maxDuration;
}

/**
 * Calculate the Duration of each event 
 * @param {*} s1 
 * @param {*} e1 
 * @param {*} s2 
 * @param {*} e2 
 */
const calculateDuration = (s1, e1, s2, e2) => {
  if (s1 < s2 && e1 < e2 && s2 < e1) {
    return e1 - s2;
  } else if (s2 < s1 && e2 < e1 && s1 < e2) {
    return e2 - s1;
  } else if (s1 < s2 && e2 < e1 && s2 < e1 && e2 < e1) {
    return e2 - s2;
  } else if (s2 < s1 && e1 < e2 && s1 < e2 && e1 < e2) {
    return e2 - s1;
  } else if (s2 === s1 && e2 === e1) {
    return e2 - s2;
  } else {
    return -1;
  }
};

/**
 * Function to analyse the events list and construct an global objects which contains all the meta data analysed so far. ALs. directly use this object to render the UI. 
 * @param {Array} eventList 
 */
const eventAnalyser = eventList => {
  let objectToRender = {}, // Final object that will be passed to render function.
    el = [...eventList];

  const { defaultLabel, matcherLabel, minLunchDuration } = config

  //Set intial values
  el[0].col = 1;
  el[0].label = matcherLabel

  //Global props to objects
  objectToRender.maxcol = 1;
  objectToRender.maxDuration = -1;
  objectToRender.maxDurationIndex = -1;

  // Iterate over all the object and analyse there relation with all the previous events rendered so far. For example how many event overlaped, at which column event needs to be rendered.
  for (let i = 1; i < el.length; i += 1) {
    el[i].col = 1;

    //Set default color
    el[i].color = config.color.DEFAULT

    //Set default Label
    el[i].label = defaultLabel

    // calculate Lunch Duration
    el[i].duration = calculateDuration(
      el[i].start,
      el[i].end,
      el[0].start,
      el[0].end
    );

    el[i].duration = el[i].duration > minLunchDuration ? el[i].duration : -1; // Check if lunch duration is more than 30
    calculateMaxDuartion(objectToRender, el, i)

    for (let j = 0; j < i; j += 1) {
      if (!(el[i].end <= el[j].start || el[i].start >= el[j].end)) {
        el[i].overlap = true;

        el[i].overlapItems = el[i].overlapItems || [];
        el[j].overlapItems = el[j].overlapItems || [];
        el[i].overlapItems.push(el[j]); // Create track for overlapped events.
        el[j].overlapItems.push(el[i]); // Back refrence to track for same width.

        if(el[i].colLockedNumber === el[j].col){ // Check if any event in the row overlaps if it overlapse then move to other col.
          el[i].colLocked = false;
        }
        // Check Col
        !el[i].colLocked && Math.abs(el[j].col - (el[i].col + 1)) <= 1 && el[i].col++;
        el[i].col > objectToRender.maxcol && objectToRender.maxcol++;
      } else {
        el[i].colLocked = true; // Just a flag to to keep track of all the overlaped events
        el[i].colLockedNumber = el[i].colLockedNumber || 0
        el[i].colLockedNumber = el[i].colLockedNumber < el[j].col ? el[i].colLockedNumber : el[j].col;
      }
    }

    if (!el[i].overlap) { // If events do not overlap
      el[i].col = objectToRender.maxcol;
    }
  }

  setColor(objectToRender, el); // Set color for the event

  objectToRender.eventsList = el;
  
  console.log("After analysing:", objectToRender);
  return objectToRender;
};
