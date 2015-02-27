
var router = new Router['default']();
router.map(function(match) {
    match("/overview").to("overview");
    match("/accounts").to("accounts");
    match("/clouds").to("clouds");
});

var myHandlers = {}
var baseHandler = function(viewModel) {
    this.model = function() {
        console.log(viewModel);
        return viewModel;
    };
    this.setup = function(model) {
        console.log('setup');
        $.ajax({
            url: 'views/' + model.view + '.html',
            async: "true",
            success: function(data) {
                $("#main").html(data);
            },
            error: function(data) {
                alert(data);
            }
        });
        return;
    };
}
baseHandler.prototype.beforeModel = function(arguments) {
    alert('save changes?')
}


myHandlers.overview = new baseHandler({
    'view': 'overview'
});
myHandlers.accounts = new baseHandler({
    'view': 'accounts'
});
myHandlers.clouds = new baseHandler({
    'view': 'clouds'
});

router.getHandler = function(name) {
    return myHandlers[name];
};

router.log = function(msg) {
    console.debug('RouterJs: ' + msg)
};


window.onhashchange = function(path) {
    console.log('hash change ');
    console.log(path)
    router.handleURL(window.location.hash.split('#')[1]);
};
