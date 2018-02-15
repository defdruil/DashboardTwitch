import './navbar.html'
Template.navbar.events({
    'click .navbar .menu_icon': function(){
        $('#sideBar').toggleClass("active");
        $('.overlay').toggleClass("active");
    },
    'click .overlay':function(){
        $('#sideBar').toggleClass("active");
        $('.overlay').toggleClass("active");
    }
});