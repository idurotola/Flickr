$(document).ready(function(){
$(function() {
  $('nav a[href*=#]:not([href=#])').click(function() {
    var current = $("nav").find(".nav-active");
    console.log(current);
    console.log(this);
    if($(this) !== current)
    {
       current.removeClass("nav-active");
       $(this).addClass("nav-active");
    }
    
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      console.log(target);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 250
        }, 2000);
        return false;
      }
    }
  });
});
});