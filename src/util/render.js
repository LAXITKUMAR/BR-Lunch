/**
 * Function to render the components.
 * @param {String} elementHtml // Html to render.
 * @param {String} selector // Selector where html needs to render.
 * @param {boolean} clearContent // Flag to check if content needs to be clearred before rendering or not. 
 */
const Render = (elementHtml, selector = null, clearContent = true ) => {
    if(!selector){
        return elementHtml;
    }
    let node = $(selector).eq(0);
    clearContent ? node.html(elementHtml) : node.append(elementHtml);
}
