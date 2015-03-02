var map = {};
var libs = ['routerJs', 'pageJs', 'directorJs', 'custom', "Don't handle route"];

var select = $("<select></select>").attr("id", 'proto-selector');
libs.forEach(function(el) {
    select.append($("<option></option>").val(el).text(el));
    map[el] = [];
});
$("body").append(select);
select.val(sessionStorage.lib || 'routerJs');



map.routerJs = [
    "lib/rsvp-latest.js",
    "lib/route-recognizer.js",
    "lib/router.js",
    "scripts/routerJs_route.js"
]
map.pageJs = [
    "lib/page.js",
    "scripts/pageJs_route.js"
]
map.directorJs = [
    "lib/director.js",
    "scripts/directorJs_route.js"
]
map["Don't handle route"] = [
    "scripts/nolib_route_debug.js"
]
map.custom = [
    "scripts/handlers.js",
    "lib/route-recognizer.js",
    "scripts/custom_route.js"
]

var selected = $('#proto-selector').val();
var toWrite = '';
console.log('This prototype uses ' + selected)
map[selected].forEach(function(scriptUrl) {
    toWrite = toWrite + '<script src="' + scriptUrl + '"><\/script>';
})
document.write(toWrite);

$("#proto-selector").change(function() {
    sessionStorage.lib = this.value
    document.location.href = '/';
})
