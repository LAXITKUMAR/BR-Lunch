/**
 * Utility to deal with dates and time conversions.
 */
const DateUtil = {

    dummyDate: "11/17/2018", // Taking random date since we are only concentrating on one day event timings.
    /**
     * Convert time to date by creating Date object using dummyDate
     */
    timeToDate: function(time) {
       return new Date(`${this.dummyDate} ${time}`)
    },
    /**
     *  Return the time diffrence in minutes
     */
    diffBetweenTime: function(startTime, endTime) {
        const startDate = this.timeToDate(startTime)
        const endDate = this.timeToDate(endTime)
        return (endDate - startDate)/60000
    },
    /**
     * Calculate the local time from the offset.
     * @param {*} offsetTime // Time from which we should start; for example: "9:00 AM"
     * @param {*} timeInMinutes // time in minutes elapsed after start time
     * @param {*} showAMPM // flag to return AM/Pm in the output. 
     * @return{String} // Local time
     */
    timeFromOffset: function(offsetTime, timeInMinutes, showAMPM = true) {
        const startDate = this.timeToDate(offsetTime).getTime();
        const timeInMillisec = timeInMinutes * 60 * 1000
        const time = new Date(startDate + timeInMillisec).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        return showAMPM ? time : time.substr(0, time.length - 3)
    },
}
