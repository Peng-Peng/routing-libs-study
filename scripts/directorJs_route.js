 var routes = {
     '/overview': overview,
     '/clouds': clouds,
     '/accounts': accounts
 };

 var router = new Router(routes).configure({
     async: true,
     notfound: defaultRoute
 });

 router.on('/accounts/:role', [isAuthenticated, validateUser]);
 router.init();

 function defaultRoute() {
    window.location.hash='#/overview';
 }

 function isAuthenticated(role, next) {
     console.log('isAuthenticated')
     console.log(next)
     if (role === 'external') {
         next(false);
     } 
 }

 function validateUser(role, next) {
     console.log('validate user')
     console.log(next)
     if (role === 'personal') {
         next(false);
     } else {
         next(true);
     }
 }

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
     console.log('match to accounts');
     render({
         view: 'accounts'
     });
 }

 function clouds() {
     render({
         view: 'clouds'
     });
 }
