function deserializeSearch(search) {
    if (!search) return {};
    var b = {};
    var a = search.split('&');
    for (var i = 0, length = a.length; i < length; ++i) {
        var p = a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}

function Router(routes) {
    this.routes = new RouteRecognizer();
    this.eventHandlers = new RouteRecognizer();
    for (var prop in routes) {
        this.add(prop, routes[prop]);
    }
    console.log(this.routes.recognize('/overview'))
}

Router.prototype.add = function(path, handler) {
        this.routes.add([{
            path: path,
            handler: handler
        }]);
        console.debug('now routes are');
        console.debug(this.routes);
    }
    //asynchHandler must return a promise 
Router.prototype.on = function(path, asynchHandler) {
    this.eventHandlers.add([{
        path: path,
        handler: asynchHandler
    }]);
}
Router.prototype.notfound = function(notfound) {
    this.notfound = notfound;
}
Router.prototype.handleURL = function(newURL) {
    //TODO: not fully tested
    //mapping of the urls
    var newPath = newURL.split('?')[0];
    var newSearch = newURL.split('?')[1];

    var base = function() {
        var dfd = new jQuery.Deferred();
        dfd.resolve();
        return dfd.promise();
    }

    var handlers = this.eventHandlers.recognize(newPath);
    var destination = this.routes.recognize(newPath);

    if (destination.length === 0) {
        console.debug('no such destination')
        this.notfound();
    } else {
        //the eventHandlers are fired in the same order as registered
        var chainedPromise = base();
        if (handlers.length !== 0) {
            console.debug('have handlers')
            console.debug(handlers)
            for (var i = 0; i < handlers.length; i++) {
                //currentValue= { handler: handler, params: { } }
                var currentValue = handlers[i];
                chainedPromise = chainedPromise.then(function(resolvedValue) {
                    return currentValue.handler.apply(this, [currentValue.params, resolvedValue]);
                });
            };
        }

        chainedPromise.then(function(value) {
                console.debug("resolved with value=" + value);
                console.debug(destination);
                destination[0].handler.apply(this, [destination[0].params, deserializeSearch(newSearch)])
            },
            function(err) {
                alert(err);
            });
    }
}

var routes = {
    '/overview': overview,
    '/clouds': clouds,
    '/accounts': accounts,
    '/accounts/:user': accounts
}

var router = new Router(routes);

router.notfound = function() {
    router.handleURL('/overview');
}

router.on('/accounts/:user', function(param) {
    console.log(arguments);
    return _isAuthenticated(param.user);
})
router.on('/accounts/:user', function(param) {
    console.log(arguments);
    return _isAdmin(param.user);
})
router.on('/clouds', function() {
    return _isAuthenticated('sdd');
})

//only 'admin' and 'personal' are authenticated users
function _isAuthenticated(username) {
    var dfd = new jQuery.Deferred();
    console.log('validating user');
    if (username === 'admin' || username === 'personal') {
        dfd.resolve(username);
    } else {
        dfd.reject('not authenticated');
    }
    return dfd.promise();
}

function _isAdmin(username) {
    var dfd = new jQuery.Deferred();
    console.log('validating user');
    if (username === 'admin') {
        dfd.resolve(username)
    } else {
        dfd.reject('not admin');
    }
    return dfd.promise();
}

window.onhashchange = function() {
    console.log('hashchange')
    router.handleURL(window.location.hash.split('#')[1]);
}
