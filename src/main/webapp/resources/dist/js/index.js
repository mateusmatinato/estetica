$(document).ready(function () {
    
    $(".content-wrapper").load('home');

    $(".btnMenu").click(function (e) {
        e.preventDefault();
        $(".content-wrapper").load($(this).attr('href'));
        $(".active").removeClass("active");
        $(this).parent().addClass('active');
    });

    $(document).ajaxStart(function () {
        Pace.restart();
    });

});