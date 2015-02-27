// the "notfound" implements a catch-all
// with page('*', notfound). Here we have
// no catch-all, so page.js will redirect
// to the location of paths which do not
// match any of the following routes

//use /.. in href
$('a').each(function() {
    var oldhref =$(this).attr('href');
    if (oldhref.indexOf('#') == 0) {
       $(this).attr('href', oldhref.substring(1));
    }
})


page('/', overview);
page('/overview', overview);
page('/accounts', accounts);
page('/accounts/:role', accounts);
page('/clouds', clouds);
page({
    hashbang: true
});

function render(viewModel) {
    $.ajax({
        url: 'views/' + viewModel.view + '.html',
        async: "true",
        success: function(data) {
            $("#main").html(data);
        },
        error: function(data) {
            alert(data);
        }
    });
}

function overview() {
    console.log('match to overview')
    render({
        view: 'overview'
    });
}

function accounts(ctx) {
    //console.log(ctx.params.role);
    render({
        view: 'accounts'
    });
}

function clouds() {
    render({
        view: 'clouds'
    });
}


window.onhashchange = function() {
    //TODO popstate also fire hashchange cannot handled again
    //page.show(window.location.hash.split('#!')[1]);
    console.log('pageJs: hashchange')
    console.log(window.history);

}
