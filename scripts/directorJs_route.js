 var routes = {
     '/overview': overview,
     '/accounts': [accounts, function() {
         console.log("An inline route handler.");
     }],
     '/accounts/view/:bookId': accounts,
     '/clouds':clouds
 };

 var router = new Router(routes).configure({
     before: function() {
         alert('save changes?')
     }
 });

 router.init();

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
