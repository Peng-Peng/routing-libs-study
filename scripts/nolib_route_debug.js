

window.onhashchange = function() {
    console.log("No Lib; on hashchange");
}
window.onpopstate = function() {
    console.log("No Lib: on popstate");
    console.log(window.history)
}
