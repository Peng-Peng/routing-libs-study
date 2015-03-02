//Implements the same interface as route_recognizer.js
//TODO: improve to make it take regexp or list of path

function RouteRecognizer() {
    this.routes = []
}
RouteRecognizer.prototype.add = function(items) {
    var instance = this;
    items.forEach(function(el) {
        var obj = convertPath(el.path);
        obj.handler = el.handler
        console.debug(obj);
        instance.routes.push(obj);
    })
}
RouteRecognizer.prototype.recognize = function(path) {
    var results = [];
    this.routes.forEach(function(el) {
        var regex = new RegExp('^' + el.regexp + '$', 'g');
        if (regex.exec(path)) {
            console.debug('matched ' + regex);
            var matches = getMatches(path, el.regexp);
            var params = {};
            el.params.forEach(function(item, index) {
                params[item] = matches[index];
            })
            console.debug(params);
            results.push({
                'handler': el.handler,
                'params': params
            });
        }
    })
    return results;
}

function convertPath(path) {
    var temp = path.split('/:');
    var staticPath = temp[0].replace('/', '\/');
    var dynamic = temp.slice(1);
    var regexp = staticPath;
    for (var i = 0; i < dynamic.length; i++) {
        regexp += '\/([0-9a-zA-Z]+)'
    }
    return {
        'regexp': regexp,
        'params': dynamic
    }
}

function getMatches(string, regex, index) {
    index || (index = 1); // default to the first capturing group
    var matches = [];
    var match;
    var regex = new RegExp('^' + regex + '$', 'g');
    while (match = regex.exec(string)) {
        matches.push(match[index]);
    }
    return matches;
}
