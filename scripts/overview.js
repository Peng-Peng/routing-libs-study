var Overview = Overview || {};

Overview.init = function() {
    $("#overview-breadcrumb").xuxBreadcrumbs();
    $('#main-menu').xuxSidebar("selection", '#overview', false);
}

var Accounts = Accounts || {};
Accounts.init = function() {
    $('#main-menu').xuxSidebar("selection", '#accounts', false);
}

var Clouds = Clouds || {};
Clouds.init = function() {
    $('#main-menu').xuxSidebar("selection", '#clouds', false);
}
