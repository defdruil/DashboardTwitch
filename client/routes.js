FlowRouter.route('/', {
    name: 'Home', // nom de la route
    action(params, queryParams) {
        BlazeLayout.render('main', {main: 'Home', title:"Expansion du virus Z0NMB13"});
    }
});
