"use strict";
$.noConflict();
//Document is loaded
jQuery(document).ready(function() {

    //Tab scripts
    if (jQuery(".tabContainer").length) {
        jQuery(".tabT").click(function() {
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
        jQuery(".accT").click(function() {
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
        jQuery(".switcher").click(function() {
            jQuery(this).toggleClass("active");
            if (jQuery(this).parent().hasClass("darkMode")) {
                jQuery("body").toggleClass("dark");
            }
        });
    }

    //Popup scripts
    if (jQuery(".popupContainer").length) {
        jQuery(".openPopup").click(function() {
            jQuery(".popupContainer").addClass("active");
            let popdata = jQuery(this).data("popup");
            jQuery("." + popdata).addClass("show");
        });
        jQuery(".closePopup,.popupContainer").click(function() {
            jQuery(".popupContainer").removeClass("active");
            jQuery(".popup").removeClass("show");
        }).children().click(function(e) {
            return false;
        });
    }

    //Back to top scripts
    if (jQuery("#backTop").length) {
        jQuery("#backTop").click(function() {
            jQuery("html, body").animate({ scrollTop: 0 }, 1000);
        });
    }

    //Type writer scripts
    if (jQuery(".typeWriter").length) {
        jQuery(".typeWriter").each(function() {
            let Ths = jQuery(this);
            typing(0, Ths.data('writer'), Ths);
        });

        function typing(index, text, writer) {
            let txtIndex = 1;
            let si = setInterval(function() {
                if (txtIndex < text[index].length + 1) {
                    writer.text(text[index].substr(0, txtIndex));
                    txtIndex++;
                } else {
                    setTimeout(function() { deleting(index, text, writer) }, 2000);
                    clearInterval(si);
                }
            }, 150);
        }

        function deleting(index, text, writer) {
            let txtIndex = text[index].length;
            let si = setInterval(function() {
                if (txtIndex + 1 > 0) {
                    writer.text(text[index].substr(0, txtIndex));
                    txtIndex--;
                } else {
                    index++;
                    if (index == text.length) { index = 0; }
                    typing(index, text, writer);
                    clearInterval(si);
                }
            }, 50)
        }
    }

    //Animate in-out scripts
    if (jQuery(".animate").length) {
        jQuery(".animate").each(function() {
            let winScrolled = document.body.scrollTop || document.documentElement.scrollTop;
            let winHeight = jQuery(window).height();
            let Ths = jQuery(this);
            Ths.parent().addClass("overhide");
            let topOfset = Ths.offset().top;
            let typeIn = Ths.data('in').type;
            let durationIn = Ths.data('in').duration;
            let delayIn = Ths.data('in').delay;
            if (topOfset < jQuery(window).height() || topOfset <= winScrolled + winHeight) {
                if (delayIn) {
                    Ths.css({ "transition-delay": delayIn + "ms" })
                }
                Ths.addClass(typeIn);
            }
            if (durationIn) {
                Ths.css({ "transition-duration": durationIn + "ms" })
            }
        });
    }

    //Animate in-out scripts
    if (jQuery(".flipCard").length) {
        jQuery(".flipCard").on('touchstart', function() {
            jQuery(this).toggleClass("hover");
        }).find("a").on('touchstart', function(e) {
            window.open(jQuery(this).attr("href"));
            return false;
        });
    }

    //Slider scripts
    if (jQuery(".dynamicSlider").length) {
        var currentMargin = [];
        jQuery(".dynamicSlider").each(function() {
            currentMargin.push(0);
            let sliderParam = jQuery(this).data("slider");
            let sliderLength = jQuery(this).find(".slide").length;
            let sliderShower = (sliderParam.shower && sliderParam.shower <= 10) ? sliderParam.shower : 4;
            jQuery(this).find(".slide").addClass("column" + sliderShower + " Tcolumn2");

            //slide spacing
            let sliderSpacing = (sliderParam.spacing && sliderParam.spacing <= 100) ? (sliderParam.spacing / 2) : 15;
            jQuery(this).find(".slide").css({ "padding-right": sliderSpacing + "px", "padding-left": sliderSpacing + "px" });

            //slider controller
            let controllerDS = sliderLength - sliderShower;
            if (controllerDS > 1) {
                let sliderDotted, sliderArrows, dottedIO, arrowsIO;
                if (sliderParam.dotted) {
                    sliderDotted = (typeof sliderParam.dotted[1] !== 'undefined') ? sliderParam.dotted[1] : true;
                    dottedIO = (sliderParam.dotted[0] === 'in') ? "inds" : "";
                } else {
                    sliderDotted = true;
                    dottedIO = "";
                }
                let addDottes = "";
                if (sliderDotted) {
                    for (let i = 0; i < sliderLength; i++) {
                        if (i < controllerDS) {
                            addDottes += '<span class="dotSlide"></span>';
                        } else {
                            addDottes += '<span class="dotSlide dotMobiles"></span>';
                        }
                    }
                    jQuery(this).find(".dsContainer").after('<div class="dsDot ' + dottedIO + '"><span class="dotSlide active"></span>' + addDottes + '</div>');
                }
                if (sliderParam.arrow) {
                    sliderArrows = (typeof sliderParam.arrow[1] !== 'undefined') ? sliderParam.arrow[1] : true;
                    arrowsIO = (sliderParam.arrow[0] === 'in') ? "inds" : "";
                } else {
                    sliderArrows = true;
                    arrowsIO = "inds";
                }
                if (sliderArrows) {
                    jQuery(this).append('<div class="dsArrow startArrow ' + arrowsIO + '"><i class="fa fa-chevron-right"></i></div><div class="dsArrow endArrow ' + arrowsIO + '"><i class="fa fa-chevron-left"></i></div>');
                }
            } else {
                jQuery(this).find(".dsSlides").addClass("Twraped");
            }
        });

        if (jQuery(".dsArrow").length) {
            jQuery(".dsArrow").click(function() {

                let currentSlider = jQuery(this).parents(".dynamicSlider");
                let currentDSIndex = jQuery(".dynamicSlider").index(jQuery(this).parents(".dynamicSlider"));
                let currentDS = currentSlider.find(".dsSlides").first();
                let currentDSLength = currentSlider.find(".slide").length;

                let currentDSShower;
                if (jQuery(window).width() > 1024) {
                    currentDSShower = (currentSlider.data("slider").shower && currentSlider.data("slider").shower <= 10) ? currentSlider.data("slider").shower : 4;
                } else if (jQuery(window).width() > 768) {
                    currentDSShower = 2;
                } else {
                    currentDSShower = 1;
                }

                if (jQuery(this).hasClass("startArrow")) {
                    sendToEnd(currentDS, currentDSShower, currentDSLength, currentDSIndex);
                } else {
                    sendToBase(currentDS, currentDSShower, currentDSLength, currentDSIndex);
                }

            });
        }

        if (jQuery(".dotSlide").length) {
            jQuery(".dotSlide").click(function() {
                let currentSlider = jQuery(this).parents(".dynamicSlider");
                let currentDSIndex = jQuery(".dynamicSlider").index(jQuery(this).parents(".dynamicSlider"));
                let dotteIndex = jQuery(this).index();
                let currentDSShower;
                if (jQuery(window).width() > 1024) {
                    currentDSShower = (currentSlider.data("slider").shower && currentSlider.data("slider").shower <= 10) ? currentSlider.data("slider").shower : 4;
                } else if (jQuery(window).width() > 768) {
                    currentDSShower = 2;
                } else {
                    currentDSShower = 1;
                }
                jQuery(this).siblings().removeClass("active");
                jQuery(this).addClass("active");
                goToSlide(currentSlider, currentDSShower, currentDSIndex, dotteIndex);
            });
        }

        function sendToEnd(cntDS, cntDSShower, cntDSLength, cntDSIndex) {
            let cntDotted;
            let cntDSTranslate = 100 / cntDSShower;
            if (currentMargin[cntDSIndex] > (cntDSShower - cntDSLength) * cntDSTranslate) {
                currentMargin[cntDSIndex] -= cntDSTranslate;
                cntDS.css({ "margin-inline-start": currentMargin[cntDSIndex] + "%" });
                cntDotted = (currentMargin[cntDSIndex] + cntDSTranslate) / cntDSTranslate - 1;
                cntDS.parent().next().children().removeClass("active");
                cntDS.parent().next().children().eq(Math.abs(cntDotted).toFixed(1)).addClass("active");
            }
        }

        function sendToBase(cntDS, cntDSShower, cntDSLength, cntDSIndex) {
            let cntDotted;
            let cntDSTranslate = 100 / cntDSShower;
            if (currentMargin[cntDSIndex] < 0) {
                cntDotted = (currentMargin[cntDSIndex] + cntDSTranslate) / cntDSTranslate;
                currentMargin[cntDSIndex] += cntDSTranslate;
                cntDS.css({ "margin-inline-start": currentMargin[cntDSIndex] + "%" });
                cntDS.parent().next().children().removeClass("active");
                cntDS.parent().next().children().eq(Math.abs(cntDotted).toFixed(1)).addClass("active");
            }
        }

        function goToSlide(cntDS, cntDSShower, cntDSIndex, dotIndex) {
            let cntDSTranslate = 100 / cntDSShower;
            currentMargin[cntDSIndex] = dotIndex * cntDSTranslate * -1;
            cntDS.find(".dsSlides").first().css({ "margin-inline-start": currentMargin[cntDSIndex] + "%" });
        }
    }

    //Scroll scripts
    var lastScroll = 0;
    jQuery(document).scroll(function() {
        let winHeight = jQuery(window).height();
        let startscroll = jQuery(this).scrollTop();
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / docHeight) * 100;
        if (winScroll > 800 || scrolled > 50) {
            jQuery('#backTop').fadeIn();
        } else {
            jQuery('#backTop').fadeOut();
        }
        //Progress bar scripts
        if (jQuery("#progressBar").length) {
            jQuery('#progressBar').css('width', scrolled + '%');
        }
        //Scroll direction scripts
        if (startscroll > lastScroll) {
            jQuery("body").addClass("scrollDown");
            jQuery("body").removeClass("scrollup");
        } else {
            jQuery("body").addClass("scrollup");
            jQuery("body").removeClass("scrollDown");
        }

        //Counter scripts
        if (jQuery(".counter").length) {
            jQuery(".counter").each(function() {
                let Ths = jQuery(this);
                let topOfset = Ths.offset().top;
                if (topOfset < winHeight) {
                    if (!Ths.hasClass("done")) {
                        counting(Ths);
                    }
                    Ths.addClass("done");
                } else if (winScroll + winHeight >= topOfset) {
                    if (!Ths.hasClass("done")) {
                        counting(Ths);
                    }
                    Ths.addClass("done");
                } else if (winScroll + winHeight < topOfset) {
                    Ths.removeClass("done");
                }
            });

            function counting(counter) {
                let max = counter.data('counter').max;
                let cnt = 1;
                let speed;
                if (counter.data('counter').speed) {
                    speed = counter.data('counter').speed;
                } else {
                    speed = 50;
                }
                let si = setInterval(function() {
                    if (cnt <= max) {
                        counter.text(cnt);
                        cnt++
                    } else {
                        clearInterval(si);
                    }
                }, speed);
            }
        }

        //Animate in-out scripts
        if (jQuery(".animate").length) {
            jQuery(".animate").each(function() {
                let Ths = jQuery(this);
                let topOfset = Ths.offset().top;
                let typeIn = Ths.data('in').type;
                let delayIn = Ths.data('in').delay;
                if (winScroll + winHeight >= topOfset) {
                    if (delayIn) {
                        Ths.css({ "transition-delay": delayIn + "ms" })
                    }
                    Ths.addClass(typeIn);
                } else {
                    if (delayIn) {
                        Ths.css({ "transition-delay": 0 + "ms" })
                    }
                    Ths.removeClass(typeIn);
                }
            });
        }
        lastScroll = startscroll;
    });

});
