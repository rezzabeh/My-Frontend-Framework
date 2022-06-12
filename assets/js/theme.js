$.noConflict();
//Document is loaded
jQuery(document).ready(function () {

    //Tab scripts
    if (jQuery(".tabContainer").length) {
        jQuery(".tabT").click(function () {
            let indx = jQuery(this).index();
            let prnt = jQuery(this).parents(".tabContainer");
            prnt.find(".tabC").removeClass("show");
            jQuery(this).siblings().removeClass("active");
            prnt.find(".tabC").eq(indx).addClass("show");
            jQuery(this).addClass("active");
        });
    }

    //Accordion scripts
    if (jQuery(".accordionContainer").length) {
        jQuery(".accC.show").show();
        jQuery(".accT").click(function () {
            let nxt = jQuery(this).next();
            if (jQuery(this).parent().hasClass("faq")) {
                jQuery(this).siblings(".accT").removeClass("active");
                nxt.siblings(".accC").removeClass("show").slideUp();
            }
            jQuery(this).toggleClass("active");
            nxt.toggleClass("Show").slideToggle();
        });
    }

    //Dark Mode & Switcher scripts
    if (jQuery(".switcher").length) {
        jQuery(".switcher").click(function () {
            jQuery(this).toggleClass("active");
            if (jQuery(this).parent().hasClass("darkMode")) {
                jQuery("body").toggleClass("dark");
            }
        });
    }

    //Popup script
    if (jQuery(".popupContainer").length) {
        jQuery(".openPopup").click(function () {
            jQuery(".popupContainer").addClass("active");
            let popdata = jQuery(this).data("popup");
            jQuery("." + popdata).addClass("show");
        });
        jQuery(".closePopup").click(function () {
            jQuery(".popupContainer").removeClass("active");
            jQuery(".popup").removeClass("show");
        });
    }
    //upscroll & downscroll 
    var lastScrollTop = 0;
    jQuery(window).scroll(function (event) {
        var currentScroll = jQuery(this).scrollTop();
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;

        if (jQuery('.progressBar').length) {
            jQuery('.progressBar').css('width', scrolled + '%');
        }
        var currentScroll = jQuery(this).scrollTop();
        if (currentScroll > lastScrollTop) {
            // downscroll code




        } else {
            // upscroll code



        }
        lastScrollTop = currentScroll;
    });

    //back to top button
    if (jQuery("#backToTop").length) {
        jQuery("#backToTop").click(function () {
            jQuery("html, body").animate({ scrollTop: 0 }, 1000);
        });
    }
    //reading progress bar
    if (jQuery("#backToTop").length) {
        jQuery("#backToTop").click(function () {
            jQuery("html, body").animate({ scrollTop: 0 }, 1000);
        });
    }


});

//scroll %
//megamenu
//JS libraries add to project like AOS https://michalsnik.github.io/aos/