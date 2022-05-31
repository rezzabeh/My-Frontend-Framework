$.noConflict();
//Document is loaded
jQuery(document).ready(function () {

    //all codes here

    jQuery(".tabT").click(function () {
        let indx = jQuery(this).index();
        let prnt = jQuery(this).parents(".tabContainer");
        prnt.find(".tabC").removeClass("show");
        jQuery(this).siblings().removeClass("active");
        prnt.find(".tabC").eq(indx).addClass("show");
        jQuery(this).addClass("active");

    });
});
