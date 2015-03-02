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
    console.log(arguments);
    render({
        view: 'overview'
    });
}

function accounts(ctx) {
    console.log('match to accounts');
    console.log(arguments);
    render({
        view: 'accounts'
    });
}

function clouds() {
    console.log('match to clouds');
    console.log(arguments);
    render({
        view: 'clouds'
    });
}
