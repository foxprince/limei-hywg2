//global variables for tile positioning
var gridUnit,
    gridGutter;

var scrollPosition;
var timer;
var shareTimer;
var loadAnimationTimer;
var newlyAddedItemsArr = new Array();
var popUpSku;
var popUpSelectedSku;
$(document).ready(function () {
    //Resizes the Cookie Div at the top of page
    $("#cookieDiv").width($("#wrapper").width());
    $("#cookieDisclaimer").css("width", parseInt($("#wrapper").width()) + 40);

    var hoverOnEvent;
    if ('ontouchstart' in document.documentElement && ($("body").hasClass("ios") || $("body").hasClass("android"))) {
        hoverOnEvent = "click";
    } else if (window.navigator.msPointerEnabled) {
        if ($("body").hasClass("ie-10")) {
            hoverOnEvent = "MSPointerOver";
        } else {
            hoverOnEvent = "pointerover";
        }
    } else {
        hoverOnEvent = "mouseenter";
    }

    //PKB Logo reseting the SessionCookie
    $(".en-US-PKB #ctlHeader_imgTiffanyLogo, .en-US-PKB #Header_imgTiffanyLogo").on("click", function () {
        CookieManager.eraseCookie("PKBSessionPreferencesCookie");
    });

    var hoverOffEvent;
    if ('ontouchend' in document.documentElement && ($("body").hasClass("ios") || $("body").hasClass("android"))) {
        hoverOffEvent = "mouseleave";
    } else if (window.navigator.msPointerEnabled) {
        if ($("body").hasClass("ie-10")) {
            hoverOffEvent = "MSPointerOut";
        } else {
            hoverOffEvent = "pointerout";
        }
    } else {
        hoverOffEvent = "mouseleave";
    }
    //global code

    //    mediaQuery();
    flydownHeight();
    centerMasterCatLinks();
    centerItemInfo();
    centerArticleText();
    initRollbar();
    StoryNav.initNav();
	triggerCrossFade();

    //load specific modal on page load
    var hash = window.location.hash.toLowerCase();
    var lastHash = "";

    if (hash.indexOf("overlayurl") >= 0) {
        hash = hash.replace(/^.*?#/, '');
        var pairs = hash.split('&');
        var href = pairs[0].split(':')[1];
        var size = "";
        var iframe = "";
        var position = "";
        var bgstyle = "";

        if (hash.indexOf("overlaysize") >= 0) {
            size = pairs[1].split(':')[1];
        }
        if (hash.indexOf("overlayiframe") >= 0) {
            iframe = pairs[2].split(':')[1];
        }
        if (hash.indexOf("overlayposition") >= 0) {
            position = pairs[3].split(':')[1];
        }
        if (hash.indexOf("overlaybgstyle") >= 0) {
            bgstyle = pairs[4].split(':')[1];
        }

        scrollPosition = $(window).scrollTop();

        if (iframe == "true") {
            $(".modal-popup .content").html("<iframe></iframe>");
            $(".modal-popup .content iframe").attr("src", href);
        } else {
            $(".modal-popup .content").load(href, function () {
                globalAjaxCallback();
            });
        }

        $(".modal-popup").addClass(size).addClass(position).addClass(bgstyle).show();
        $("#gray-overlay").show();
        $(window).scrollTop(0);
    }
    //end load specific modal on page load

    $(".empty").each(function () {
        $(this).height($(this).width());
    });

    //ie7 specific js
    if ($("body").hasClass("ie-7")) {
        //ie7 position relative/absolute bug fix
        $(function () {
            var zIndexNumber = 1000;
            $('div').each(function () {
                if (!$(this).hasClass("romance-tips") && !$(this).parents(".romance-tips").length) {
                    $(this).css('zIndex', zIndexNumber);
                    zIndexNumber -= 10;
                }
            });
        });

        //ie7 float right hack
        $(".float-right").each(function () {
            $(this).parent().prepend($(this));
        });
    }
    //end ie7 specific js

    //cross-browser input placeholders
    $("[data-placeholder]").each(function () {
        $(this).val($(this).attr("data-placeholder"));
    });

    $("[data-placeholder]").focus(function () {
        $(this).removeClass("placeholder");
        if ($(this).val() == $(this).attr("data-placeholder")) {
            $(this).val("");
        }
    }).blur(function () {
        if ($(this).val() == "" || $(this).val() == $(this).attr("data-placeholder")) {
            $(this).addClass("placeholder");
            $(this).val($(this).attr("data-placeholder"));
        }
    }).keyup(function () {
        if ($("body").hasClass("ios") || $("body").hasClass("android")) {
            if ($(this).val() == "") {
                $(this).siblings(".cleartext").hide();
            } else {
                $(this).siblings(".cleartext").show();
            }
        }
    });

    $("body").on("click", ".cleartext", function () {
        var input = $(this).siblings("[data-placeholder]");
        input.addClass("placeholder");
        input.val(input.attr("data-placeholder"));
        $(this).hide();
    });
    //end cross-browser input placeholders

    //replace reg symbols with superscript in ie7-8
    if ($("body").hasClass("ie-7") || $("body").hasClass("ie-8")) {
        //        $("h1").each(function () {
        //            $(this).html($(this).html().replace("?", "<sup>&reg;</sup>"));
        //        });

        //attempted non breaking space fixes for ie8/xp        
        if ($("#divItemTotalAndButton").length) {
            $("#divItemTotalAndButton .t8").html($("#divItemTotalAndButton .t8").html().replace(/&nbsp;/g, "<small style='font-family:serif'>&nbsp;</small>"));
        }

        if ($(".backlink").length) {
            $(".backlink").each(function (index) {
                $(this).html($(this).html().replace(/&nbsp;/g, "<small style='font-family:serif'>&nbsp;</small>"));
            });
        }

        $(".bag a").each(function () {
            $(this).html($(this).html().replace(/&nbsp;/g, "<small style='font-family:serif'>&nbsp;</small>"));
        });
    }

    $("body").on("click", ".collapse", function (e) {
        if ($(this).parents(".item-extras").hasClass("statement-collapsable")) {
            $(this).siblings(".touchpager").fadeOut(300, function () {
                $(this).siblings(".grid-container").fadeIn(300);
                centerGridText();
            });

        } else {
            $(this).siblings(".grid-container, .tile-container").slideUp(300);
        }

        $(this).html('<img src="/shared/images/icons/bottom-arrow.jpg" />');
        $(this).removeClass("collapse").addClass("expand");

        return false;
    });

    $("body").on("click", ".expand", function (e) {
        if ($(this).parents(".item-extras").hasClass("statement-collapsable")) {
            $(this).siblings(".grid-container").fadeOut(300, function () {
                $(this).siblings(".touchpager").fadeIn(300, function () {
                    resizeTouchPager();
                    centerGridText();
                });
            });
        } else {
            $(this).siblings(".grid-container, .tile-container").slideDown(300);
        }

        $(this).html('<img src="/shared/images/icons/top-arrow.jpg" />');
        $(this).removeClass("expand").addClass("collapse");

        return false;
    });

    $("body").on("click", ".expand-story", function (e) {
        $(this).parents(".item-extras").find(".expand").click();

        return false;
    });

    $("body").on("click", ".item-extras h4 a", function (e) {
        var tab = $(this).attr("rel");
        $("#grid-popup").hide();
        $(".item-extras h4 a").removeClass("selected");
        $(this).parents("h4").siblings("div:not(.formButtons)").hide();
        $(this).addClass("selected");
        $(".expand").html('<img src="/shared/images/icons/top-arrow.jpg" />');
        $(".expand").removeClass("expand").addClass("collapse");
        $("#" + tab).show();
        $(".empty").each(function () {
            $(this).height($(this).width());
        });

        resizeTouchPager();

        return false;
    });

    //engraving
    $("body").on("click", ".open-engraving", function () {
        $.ajax({
            url: '/Shopping/EngravingFrag.aspx',
            cache: false,
            success: function (html) {
                $('body').append(html);
                initEngraving();
            }
        });

        return false;
    });
    //end engraving

    //product care

    $("body").on("click", ".care-links a", function () {
        var option = $(this).attr("rel");
        $(".care-links a").removeClass("selected");
        $(this).addClass("selected");
        $(".care-container > div").hide();
        $(".care-container ." + option).show();

        return false;
    });

    //end product care

    //end modals

    //tile rollover script

    $("body").on("mouseenter", ".text-container.rollover", function () {
        if (!$(this).find(".rollover-overlay").length) {
            $(this).prepend('<div class="rollover-overlay"></div>');
        }
        $(this).find(".rollover-overlay").fadeIn("fast").siblings("div").css("visibility", "visible");
    });

    $("body").on("mouseleave", ".text-container.rollover", function () {
        $(this).find(".rollover-overlay").fadeOut("fast").siblings("div").css("visibility", "hidden");
    });

    //end tile rollover script

    //custom drop down
    $("body").on("click", ".custom-drop div.choice:not(.reset)", function () {
        if (!$(this).parent().hasClass("disabled")) {
            $(".custom-drop div.rollbar").hide();
            $(this).siblings("div.rollbar").show();
        }
    });

    $("body").on("mouseleave", ".custom-drop .rollbar", function (e) {
        if (!$(this).parents(".rollbar").length) {
            $(this).hide();
        }
    });

    $(".custom-drop div.choice:not(.preselected)").each(function () {
        $(this).html($(this).siblings("div.rollbar").find("li:first").addClass("active").html()).css("padding-right", "15px");
    });

    $(".custom-drop div.choice.preselected").each(function () {
        $(this).css("padding-right", "15px");
    });

    $("body").on("click", ".custom-drop ul li", function () {
        if ($(this).hasClass("separator") == false) {
            // IBM BT# 9462 : change done so that default menu "SORT BY" selection does not trigger any action or change in selected menu
            if ($(this).hasClass("non-selectable") == false) {
                var selectid = $(this).parents(".custom-drop").attr("rel");
                var index = $(this).index();
                var value = $(this).attr("rel");
                $("#" + selectid + " select option[value='" + value + "']").prop('selected', true);
                $("#" + selectid + " select").trigger("change");
                $(this).parents("div.custom-drop").find("div.choice").html($(this).html());
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                if (popUpSelectedSku != undefined) {
                    if (this.parentNode.children.length > 1 && $("#grid-popup .info > a").text() != LABEL_ADD_TO_SHOPPING_BAG && popUpSelectedSku != value) {
                        $("#grid-popup .info > a.add").text(LABEL_ADD_TO_SHOPPING_BAG).attr("href", "#").addClass("add-to-bag");
                        $("#grid-popup a.add").attr("href", 'javascript:handleAddToShoppingBag("' + popUpSku + '", "tooltip")');
                        $("#grid-popup a.emailMe").attr("href", 'javascript:handleEmailWhenAvailable("' + popUpSku + '", "tooltip")');
                    }
                    popUpSelectedSku = value;
                }
            }
            $(this).closest("div.rollbar").hide();
        }
    });

    applyCustomDropdown();
    //end custom drop down 

    //engagement ring hovers
    /* Moved to Engagement/browse.js
    $("body").on("mouseenter", "#engagement-grid img", function (e) {
    var src = $(this).attr("src").replace("_over", "").split('.');
    var hoversrc = src[0] + "_over." + src[1];
    $(this).attr("src", hoversrc);
    $(this).siblings("div").css("visibility", "visible");
    });

    $("body").on("mouseleave", "#engagement-grid > div", function (e) {
    var img = $(this).find("img");
    var hoversrc = img.attr("src");
    var src = hoversrc.replace("_over", "");
    img.attr("src", src);
    img.siblings("div").css("visibility", "hidden");
    });
    */
    //end engagement ring hovers

    InlineShoppingBagManager.getInstance().init();
    GlobalMenuManager.getInstance().init();
    SearchManager.getInstance().init();
    setTimeout(function () { OverlayManager.getInstance().init(); }, 10);
    InlineShoppingBagManager.getInstance().updateSavedItemsLabel();
    InlineShoppingBagManager.getInstance().updateShoppingBagLabel();

    if (typeof StoreLocationsModel != "undefined" && typeof LocationsURLFactory != "undefined") {
        HistoryManager.getInstance().initHistory(LocationsURLFactory.convertStateToHash(StoreLocationsModel.getInstance().getStateSnapshot()));
    }
    else {
        HistoryManager.getInstance().initHistory(URLFactory.convertStateToHash(StateModel.getInstance().getStateSnapshot()));
    }

    //end global code

    //holiday banner rollover
    $("body").on("mouseenter", "#ctlHeader_ctlBanner_holiday_banner", function (e) {
        //$("#ctlHeader_ctlBanner_holiday_banner .default").hide();
        if ($.trim($("#ctlHeader_ctlBanner_holiday_banner .rollover").html()) != "") {
            $("#ctlHeader_ctlBanner_holiday_banner .rollover").show();
        }
    });

    $("body").on("mouseleave", "#ctlHeader_ctlBanner_holiday_banner", function (e) {
        //$("#ctlHeader_ctlBanner_holiday_banner .default").show();
        $("#ctlHeader_ctlBanner_holiday_banner .rollover").hide();
    });

    $("body").on("touchstart", "#ctlHeader_ctlBanner_holiday_banner", function (e) {
        if ($.trim($("#ctlHeader_ctlBanner_holiday_banner .rollover").html()) != "") {
            $("#ctlHeader_ctlBanner_holiday_banner .rollover").toggle();
        }
    });

    //sortable grid js
    $(".sortable").sortable({
        handle: "img",
        containment: "parent",
        tolerance: "pointer",
        opacity: "0.6",
        create: function (event, ui) {
            $("body").on("touchmove", ".sortable > li img", function (e) {
                e.preventDefault();
            });
        }
    });

    $("body").on("mousedown", ".sortable > li img", function (e) {
        $(".hide-details").click();

        return false;
    });

    var liHeight = 0;
    $("body").on("click", ".show-details", function () {
        var target = $(this);
        target.html(LABEL_HIDE_DETAILS).siblings(".details").show().parents("li").addClass("expanded");

        setTimeout(function () {
            target.removeClass("show-details").addClass("hide-details")
        }, 500);

        var index = $(this).parents("li").index() + 1;
        var rowend;
        var itemsperrow;

        if ($(".sortable").hasClass("large-margins")) {
            itemsperrow = 2;
        } else {
            itemsperrow = 5;
        }

        if (index > 0) {
            rowend = Math.ceil(index / itemsperrow) * itemsperrow;
        } else if (index < 0) {
            rowend = Math.floor(index / itemsperrow) * itemsperrow;
        } else {
            rowend = 5;
        }

        thisHeight = $(this).parents("li").outerHeight();

        if (thisHeight > liHeight) {
            liHeight = thisHeight;
        }

        $(".sortable > li:nth-child(" + rowend + ")").addClass("row-end-expand").attr("style", "height: " + liHeight + "px !important;");


        return false;
    });

    $("body").on("click", ".hide-details", function () {
        var target = $(this);
        target.html(LABEL_SHOW_DETAILS).siblings(".details").hide().parents("li").removeClass("expanded");

        setTimeout(function () {
            target.removeClass("hide-details").addClass("show-details")
        }, 500);

        if ($(this).parents("li").hasClass("row-end-expand")) {
            var rowend = $(this).parents("li").index();
            var rowendObject = $(this).parents("li");
        } else {
            var rowend = $(this).parents("li").nextAll(".row-end-expand:first").index();
            var rowendObject = $(this).parents("li").nextAll(".row-end-expand:first");
        }

        if (!$(".sortable > li").slice(rowend - 4, rowend - 1).hasClass("expanded")) {
            rowendObject.css("height", "").removeClass("row-end-expand");
        }

        if (!$(".expanded").length) {
            liHeight = 0;
        }

        return false;
    });

    $("body").on("click", ".small-images", function () {
        $(".hide-details").click();
        $(this).addClass("selected").siblings(".large-images").removeClass("selected");

        $(".sortable").removeClass("large-margins");

        return false;
    });

    $("body").on("click", ".large-images", function () {
        $(".hide-details").click();
        $(this).addClass("selected").siblings(".small-images").removeClass("selected");

        $(".sortable").addClass("large-margins");

        return false;
    });

    //end sortable gird js

    $("body").on("mouseenter", ".rollover-img", function () {
        var offsetLeft = $(this).position().left;
        var offsetTop = $(this).position().top;

        $(this).after('<img class="rollover-img-on" src="' + $(this).attr("data-rolloversrc") + '" style="left: ' + offsetLeft + 'px; top: ' + offsetTop + 'px;" />');
        $(".rollover-img-on").fadeIn();
    });

    $("body").on("mouseleave", ".rollover-img-on", function () {
        $(this).fadeOut(function () {
            $(this).remove();
        });
    });

    $("body").on("mouseenter", ".rollover-combo", function () {
        $(this).children("img:nth-child(2)").fadeIn();
        $(this).children("div").fadeIn();
    });

    $("body").on("mouseleave", ".rollover-combo", function () {
        $(this).children("img:nth-child(2)").fadeOut();
        if (!$(this).hasClass("showtext")) {
            $(this).children("div").fadeOut();
        }
    });

    //make whole tile clickable if only 1 link (a tag) is found within
    $("body").on("click", ".text-container, .venue-detail", function () {
        if ($(this).find("a").length == 1 && !$(this).hasClass("no-click")) {
            if ($(this).find("a").hasClass("open-modal") || $(this).find("a").hasClass("expand-story")) {
                $(this).find("a").click();
            } else {
                $(this).find("a").trigger("click");

                if ($(this).find("a").attr("target") == "_blank") {
                    window.open($(this).find("a").attr("href"));
                } else {
                    window.location = $(this).find("a").attr("href");
                }
            }

            return false;
        }
    });

    $("body").on("click", ".text-container a", function (e) {
        e.stopPropagation();
    });


    $(".text-container, .venue-detail").each(function () {
        if ($(this).find("a").length == 1 && !$(this).hasClass("no-click")) {
            $(this).addClass("cursor-pointer");
        }
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27 && $(".image-overlay").is(":visible")) {
            $("#gray-overlay, .image-overlay").fadeOut(300);
        }
    });

    //item page image viewer - fade out interface elements - DOES NOT WORK ON IFRAME
    if ($("body").hasClass("ios") == false && $("body").hasClass("android") == false) {
        $("#gray-overlay, .image-overlay .thumbs, .image-overlay").mousemove(function (e) {
            fadeThumbs();
        });
    }

    if ($("body").hasClass("ios") == true || $("body").hasClass("android") == true) {
        $(document).on('touchmove', function (e) {
            // Prevent parent page from moving when a scrollable overlay is showing.
            if ($(".modal-popup").css("display") != "none" && ($(".modal-popup .rollbar-content").length > 0 || $('#overlayiframe iframe').contents().find(".rollbar-content").length > 0)) {
                e.preventDefault();
            }
        });
    }

    if ($("#areCookiesEnabled").length > 0 && $("#areCookiesEnabled").val().toLowerCase() == "false") {
        showInlineBags = false;
    }

    // new Shoppable Tiles

    $("body").on("mouseenter", ".shop-tile", function () {
        if (!$("body").hasClass("ios")) {
            $(this).find(".shop-section a").fadeIn();
        }
    });

    $("body").on("mouseleave", ".shop-tile", function () {
        if (!$("body").hasClass("ios")) {
            $(this).find(".shop-section a").fadeOut();
        }
    });

    $("body").on("click", ".shop-tile .shop-section a", function (e) {
        $(this).siblings("a").removeClass("selected-item");
        $(this).addClass("selected-item");
        renderShopTileList(this);
        e.preventDefault();
    });

    //tabletop tile scripts
    $("body").on("mouseenter", ".shoppable-tile", function () {
        $(this).children("a").fadeIn();
    });

    $("body").on("mouseleave", ".shoppable-tile", function () {
        $(this).children("a").fadeOut();
    });

    $(".shoppable-tile > a").each(function () {
        var url = $(this).attr("data-url");
        var desc = $(this).attr("data-description");
        var img = $(this).attr("data-imageurl");
        var price = $(this).attr("data-price");

        if (url.toLowerCase().indexOf("null") >= 0) {
            $(this).addClass("null");
        }

        if (img.toLowerCase().indexOf("null") >= 0 || desc.toLowerCase() == "null" || price.toLowerCase() == "null") {
            $(this).addClass("missing-data");
        }
    });

    $("body").on("click", ".shoppable-tile > a", function () {
        $(this).siblings("a").removeClass("selected-item");
        $(this).addClass("selected-item");

        // $(this).siblings("p:visible").fadeOut();

        var link = $(this);
        var overlay = $(this).siblings("div");

        var imageurl = $(this).attr("data-imageurl");
        var description = $(this).attr("data-description");
        var price = $(this).attr("data-price");
        var url = $(this).attr("data-url");

        if (imageurl != overlay.find(".image img").attr("src")) {
            overlay.find(".ajax-loader").show();
            overlay.find(".image img").attr("src", imageurl).hide();
        }


        if (overlay.is(":visible")) {
            overlay.fadeOut('fast', function () {
                if (link.offset().left < link.parent().width() / 2 + 32) {
                    overlay.addClass("right");
                } else {
                    overlay.removeClass("right");
                }

                overlay.find(".description").html(description);
                overlay.find(".price").html(price);
                overlay.find("a:not(.close)").attr("href", url);

                overlay.fadeIn('fast');
            });
        } else {
            if (link.offset().left < link.parent().width() / 2 + 32) {
                overlay.addClass("right");
            } else {
                overlay.removeClass("right");
            }

            overlay.find(".description").html(description);
            overlay.find(".price").html(price);
            overlay.find("a:not(.close)").attr("href", url);

            overlay.fadeIn();
        }

        overlay.find(".image img").load(function () {
            overlay.find(".ajax-loader").hide();
            $(this).fadeIn();
        });

        return false;
    });

    $("body").on("click", ".shoppable-tile a.close", function () {
        var overlay = $(this).parent();

        overlay.siblings("a").removeClass("selected-item");

        overlay.fadeOut('normal', function () {
            overlay.removeClass("right");
        });

        return false;
    });

    $("body").on("change", "#tabletopPagesDDL", function () {
        window.location = $(this).val();
    });

    var iPadClicking = 0;
    $("body").on("click", ".text-container .play-video", function () {
        var tile = $(this).parents(".text-container");
        var video = tile.find("video")[0];

        tile.find(".video-poster").remove();

        video.play();
        tile.find(".pause-video").show();
        tile.find(".play-video").hide();
        tile.find(".video-controls .restart-video").hide();
        iPadClicking = iPadClicking + 1;
        if (iPadClicking > 1)
            tile.find(".video-controls .start-video").remove();

        if (isIPad() && iPadClicking == 1)
            $(".white-controls .video-controls a.start-video").show();
        return false;
    });

    $("body").on("click", ".text-container .pause-video", function () {
        var tile = $(this).parents(".text-container");
        var video = tile.find("video")[0];

        video.pause();
        tile.find(".pause-video").hide();
        tile.find(".play-video").show();

        return false;
    });

    $("body").on("click", ".text-container .restart-video", function () {
        var tile = $(this).parents(".text-container");
        var video = tile.find("video")[0];

        tile.find(".video-poster").remove();

        video.currentTime = 0;
        video.play();
        tile.find(".pause-video").show();
        tile.find(".play-video").hide();
        tile.find(".video-controls .restart-video").hide();

        return false;
    });

    $("body").on("click touchstart", ".text-container video", function () {
        if ($("body").hasClass("ie-7") || $("body").hasClass("ie-8")) {
            return false;
        }

        var tile = $(this).parents(".text-container");
        var video = tile.find("video")[0];

        if (video.currentTime == 0 || video.ended) {
            tile.find(".play-video").click();
        } else {
            if (video.paused) {
                tile.find(".play-video").click();
            } else {
                tile.find(".pause-video").click();
            }
        }

        return false;
    });

    $("body").on("click touchstart", ".text-container.white-controls .video-controls", function () {
        $(this).siblings("video").click();

        return false;
    });

    $("body").on("click", ".text-container .mute-video", function () {
        var tile = $(this).parents(".text-container");
        var video = tile.find("video");

        video.prop('muted', true);
        $(this).addClass("unmute-video").removeClass("mute-video");

        return false;
    });

    $("body").on("click", ".text-container .unmute-video", function () {
        var tile = $(this).parents(".text-container");
        var video = tile.find("video");

        video.prop('muted', false);
        $(this).addClass("mute-video").removeClass("unmute-video");

        return false;
    });

    $(".text-container video").bind("ended", function () {
        var tile = $(this).parents(".text-container");
        var video = tile.find("video")[0];

        var poster = tile.find("video").attr("poster");

        if (!tile.hasClass("timed-animation")) {
            tile.find("video").after("<img style='display: none;' class='video-poster' src='" + poster + "'>");
            tile.find("video").siblings("img").fadeIn('slow', function () {
                video.currentTime = 0;
                video.pause();
                tile.find(".pause-video").hide();
                tile.find(".play-video").hide();
                tile.find(".video-controls .restart-video").show();
            });
        }
    });

    $(".text-container video").each(function () {
        var tile = $(this).parents(".text-container");
        var tileid = tile.attr("id");

        if ($(this).attr("autoplay") && !$("body").hasClass("ios")) {
            tile.find(".pause-video").show();
        } else {
            tile.find(".play-video").show();
        }

        if (tile.hasClass("video-tile")) {
            var cookie = CookieManager.getCookieValue(tileid);
            if (!cookie) {
                tile.find(".play-video").click();
                CookieManager.setCookieValue(tileid, "true", 1);
            }
        }
    });

    $(".timed-animation video").each(function () {
        var video = $(this)[0];
        var tile = $(this).parents(".text-container");
        var animation = tile.find(".animation");
        var time = tile.attr("data-time");

        video.addEventListener('timeupdate', function (event) {
            if (video.currentTime >= time) {
                animation.css("visibility", "visible");
                animation.css("opacity", "1");
            } else if (video.currentTime > 0 && video.currentTime < time) {
                animation.css("visibility", "hidden");
                animation.css("opacity", "0");
            }
        }, false);
    });

    //anchor links in rollbar
    $("body").on("click", ".rollbar a", function () {
        var href = $(this).attr("href");
        if (href.indexOf('#') === 0) {
            var rollbarPosition = Math.abs($(this).parents(".rollbar-content").position().top);
            var anchorOffset = $(this).position().top;
            var rollbarOffset = anchorOffset - rollbarPosition;
            var targetOffset = $(href).position().top;
            var offset = targetOffset + rollbarOffset - anchorOffset;

            $(this).parents(".rollbar").trigger('rollbar', [offset, 0]);

            return false;
        }
    });

    // Track Orientation
    if (isIPad() || isIPhone() || isIPod() || isAndroid() || isBlackBerry() || isKindle() || isWindowsPhone()) {
        // Use this for tracking device orientation. This should be only for mobile devices.
        if (typeof (window.addEventListener) != "undefined") {
            if (typeof (window.onorientationchange) != "undefined") {
                window.addEventListener('orientationchange', function (orientation) {
                    trackOrientation();
                }, false);
            }
            else if (typeof (window.onresize) != "undefined") {
                window.addEventListener('onresize', function (orientation) {
                    trackOrientation();
                }, false);
            }
        }

        // This is to report starting orientation
        trackOrientation();
        trackMobileDeviceInfo();
    }

    $("body").on("click", "#digitalCatalogEmailPage", function (e) {
        linkEmailThisPage('EmailRequest.aspx?dest=' + encodeURIComponent(window.location.pathname + "?" + window.location.search.split("?").join("")) + '&hdrOnOff=On&msgOnOff=On&hdrKey=txtEmailThisPage&source=page');
        TrackItemPageShareType('Digital Catalogue - Email This Page');
        e.preventDefault();
    });

    $("body").on("click", ".dcTile .share-menu a", function (e) {
        var pageURL = window.location.pathname.split("#")[0];
        var imageToPost = window.location.protocol + "//" + window.location.host + $(".dcTile .shareImg").attr("src");
        if ($(this).hasClass("dcFacebook")) {
            TrackItemPageShareType('Digital Catalogue - Facebook');
            postToFaceBook('Digital Catalog', pageURL, 'image', 'SMPF1&amp;utm_campaign=Social_Media_Shared_Link&amp;utm_medium=social_media&amp;utm_source=Facebook_Share&amp;utm_content=&amp;utm_term=');
        } else if ($(this).hasClass("dcTwitter")) {
            TrackItemPageShareType('Digital Catalogue - Twitter');
            postToTwitter('Digital Catalog', pageURL, 'image', 'SMPF2&amp;utm_campaign=Social_Media_Shared_Link&amp;utm_medium=social_media&amp;utm_source=Twitter_Share&amp;utm_content=&amp;utm_term=', dcDesc, dcHashTags);
        } else if ($(this).hasClass("dcPinterest")) {
            TrackItemPageShareType('Digital Catalogue - Pinterest');
            postToPinterest('Digital Catalog', pageURL, 'image', 'SMPF2&amp;utm_campaign=Social_Media_Shared_Link&amp;utm_medium=social_media&amp;utm_source=Pinterest_Share&amp;utm_content=&amp;utm_term=', imageToPost);
        } else if ($(this).hasClass("dcTumblr")) {
            TrackItemPageShareType('Digital Catalogue - Tumblr');
            postToTumblr('Digital Catalog', pageURL, 'image', 'SMPF2&amp;utm_campaign=Social_Media_Shared_Link&amp;utm_medium=social_media&amp;utm_source=Tumbler_Share&amp;utm_content=&amp;utm_term=', dcDesc, imageToPost);
        } else if ($(this).hasClass("dcGoogle")) {
            TrackItemPageShareType('Digital Catalogue - Google');
            postToGoogle(pageURL, 'SMPF2&amp;utm_campaign=Social_Media_Shared_Link&amp;utm_medium=social_media&amp;utm_source=Tumbler_Share&amp;utm_content=&amp;utm_term=');
        }
        e.preventDefault();
    });

    $("body").on("click", ".dcTile > video, .dcTile > img, .dcTile > .navArrows", function (e) {
        initDigCatalogList($(this).closest(".dcTile"));
        sendOmnitureClickEvent("Digital Catalogue Tile Click")
        e.preventDefault();
    });

    // Digital Catalog
    $("body").on("click", ".showDCThumbs", function (e) {
        $(this).hide().parent().find(".hideDCThumbs").show();
        $(this).parent().find(".dc-thumbs").slideDown();
        e.preventDefault();
    });
    $("body").on("click", ".hideDCThumbs", function (e) {
        $(this).hide().parent().find(".showDCThumbs").show();
        $(this).parent().find(".dc-thumbs").slideUp();
        e.preventDefault();
    });
    $("body").on("click", ".dcTile a.shopBtn", function (e) {
        initDigCatalogList($(this).closest(".dcTile"));
        sendOmnitureClickEvent("Digital Catalogue Button Click")
        e.preventDefault();
    });

    $("body").on("click", ".dcTile .navArrows a.left, .dcTile .navArrows a.right", function (e) {
        TrackInlineSavedItemsLinkClick("Digital Catalogue", "Paginate");
        e.stopPropagation();
    });
    $("body").on("click", ".dcTile .dc-thumbs a", function () {
        sendOmnitureClickEvent("Digital Catalogue - Thumbnails click");
    });
    $("body").on("click", "#digital-catalog-overlay a.close", function (e) {
        $("#digital-catalog-overlay").hide();
        resetDigitalCatalog();
        e.preventDefault();
    });
    $("body").on("click", "#digital-catalog-overlay .image a, #digital-catalog-overlay a.details", function (e) {
        showMiniPDP($(this).attr("href"));
        $(".digital-catalog-item .image a").removeClass("active");
        $(this).closest(".digital-catalog-item").find(".image a").addClass("active");
        e.preventDefault();
        e.stopPropagation();
    });

    $("body").on("click", "#shop-tile-overlay a.close", function (e) {
        $("#shop-tile-overlay").hide();
        $("#gray-overlay-shop-tile").hide();
        $(".shop-tile .shop-section a.selected-item").removeClass("selected-item");
        resetDigitalCatalog();
        e.preventDefault();
    });
    $("body").on("click", "#shop-tile-overlay .image a", function (e) {
        showShopTileMiniPDP($(this).attr("href"));
        $(".shop-tile-item .image a").removeClass("active");
        $(this).addClass("active");
        e.preventDefault();
        e.stopPropagation();
    });

    if ($(".shop-tile .shop-section a").length > 0) {
        getShopTileItems();
    }

    // Validation framework initialization
    if ($("form.validateForm").length > 0) {
        validation = $("form.validateForm").validate({
            onsubmit: true,
            onkeyup: false,
            ignore: 'input:hidden',
            focusInvalid: false,
            /* onfocusout: ValidationManager.validateField, */
            errorPlacement: ValidationManager.errorPlacement,
            highlight: ValidationManager.highlightError,
            unhighlight: ValidationManager.unhighlightError,
            invalidHandler: ValidationManager.handleInvalid,
            showErrors: ValidationManager.toggleGlobalError
        });
        ValidationManager.init();
    }

    // unselected vs selected styling
    $(".CAForm select").change(function () {
        if (!$(this).hasClass("mobile-dropdown")) {
            if ($(this).val() == "") {
                $(this).parent().next().removeClass("hasSelection");
            } else {
                $(this).parent().next().addClass("hasSelection");
            }
        }
        $(this).valid();
    });

    $(".CAForm select").each(function () {
        if (!$(this).hasClass("mobile-dropdown")) {
            if ($(this).val() != "") {
                $(this).parent().next().addClass("hasSelection");
            }
        }
    });

    $("#AccountCustomerSpecialDay").hide();

    /* For mobile account menus */
    if (isMobileSite) {
        if (URLFactory.extractQueryStringValue(window.location.search.split("?").join(""), "mode") == "menu") {
            $(".left-subnav").show();
            $(".form-content").hide();
            $(".order-history-content").hide();
            $(".arrow-left-subnav").hide();
            $(".header-myaccount").show();
            $(".header-personalinfo").hide();
            $(".form-contentL").hide();
        }

        $(".arrow-left-subnav").click(function () {
            $(".arrow-left-subnav").toggle();
            $(".form-content").toggle();
            //$(".right-subnav").toggle();
            $(".left-subnav").toggle();
            $(".order-history-content").toggle();
            $(".header-myaccount").show();
            $(".header-personalinfo").hide();
            $(".header-addressbook").hide();
            $(".header-ordersummary").hide();
            $(".header-accountsettings").hide();
            $(".header-communicationpreferences").hide();
            $(".form-contentL").hide();
        });

        var parts = location.hostname.split('.');

        // Check to check if this is an international site, and hide the call icon accordingly        

        var intrl_site = true;
        for (x = 0; x < parts.length; x++) {
            var sitex = ["mx", "br", "cn", "zh", "kr", "ru", "intl"]
            if (sitex.indexOf(parts[x]) != -1)
                intrl_site = false;
            //$(".call-us").hide();
        }
        if (intrl_site)
            $(".call-us").show();

        $(".itemDetail > .itemName, .itemService > div > .engravNote").after($(".itemheader"));

        //Chrome on mobile and iPad on mobile need a header positioning fix. Look into fixing the following commented code. [DC]
        // $(".chrome header").css({
        //    'position' : 'relative'
        // });

        // $(".safari-9537 header").css({
        //     'position' : 'relative'
        // });

        // $(".safari-600 header").css({
        //     'position' : 'relative'
        // });

        // $(".chrome #page").css({
        //     'margin':"15px"
        // });

        // $(".safari-9537 #page").css({
        //      'margin':"15px"
        // });

        // $(".safari-600 #page").css({
        //      'margin':"15px"
        // });

    }

    initCookieDisclaimer();
    $("#cookieDisclaimer .close").click(function (e) {
        $("#cookieDisclaimer").hide();
        e.preventDefault();
    });

    // Hero tile down arrow smooth scroll
    $("body").on("click", ".divArrow .aArrow", function (e) {
        var targetId = $(this).attr("href");
        var targetPosition = $(targetId).offset().top;
        $("html, body").animate({ scrollTop: targetPosition + "px" });
        e.preventDefault();
    });

});

// Show cookie banner on all pages if first time visit
function initCookieDisclaimer() {
    if ($("#cookieDisclaimer").length) {
        if (!CookieManager.getCookieValue("ckp") || CookieManager.getCookieValue("ckp") != "true") {
            $("#cookieDisclaimer").show();
        }
        // resets cookie value for every visit to the homepage to prevent it from exipiring
        CookieManager.setCookieValue("ckp", "true");
    }
}

// Spam prevention implementation starts - Spinner method
function assignToknOnClick(elementId) {
    $("#" + elementId).on("click", function () {
        $("#ctlSpinner_tknmatch").val(sectokn);
    });
}
function assignToknOnClick2() {
    $("#ctlSpinner_tknmatch").val(sectokn);
}
// Spam prevention implementation ends - Spinner menthod

function fadeThumbs() {
    $(".image-overlay .thumbs").fadeIn();
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    timer = setTimeout(function () {
        $(".image-overlay .thumbs").fadeOut();
        clearTimeout(timer);
        timer = null;
    }, 3000);
}

$(window).load(function () {
    //global code
    centerGridText();
    //centerTileText();
    videoHeight();
    centerItemInfo(true);
    flydownHeight();
    resizeTouchPager();
    consultationRollbarHeight();
    $(".shoppable-tile > p").fadeIn();
    //end global code
});

var resizeEnd;
$(window).resize(function () {
    //global code
    //    mediaQuery();
    centerGridText();
    //centerTileText();
    videoHeight();
    centerItemInfo();
    flydownHeight();
    resizeTouchPager();
    consultationRollbarHeight();
    centerMasterCatLinks();
    centerArticleText();

    $(".empty").each(function () {
        $(this).height($(this).width());
    });

    $("#grid-popup").hide();
    //end global code
    $("#cookieDisclaimer").css("width", parseInt($("#wrapper").width()) + 40);
    //Resizes the Cookie Div at the top of page
    $("#cookieDiv").width($("#wrapper").width());
    
});

$(window).scroll(function () {
	triggerCrossFade();
    //category browse specific code

    if ($("#wrapper").length == 0) {
        return;
    }

    var left = $("#wrapper").offset().left;

    if ($("#filters").length && !$("#filters").hasClass("no-fix")) {
        if ($("#filters").length && $(window).scrollTop() >= $("#header").outerHeight() && !$("#filters").hasClass("fixed")) {
            $("#filters").addClass("fixed").css("left", left + 20).css("right", left + 20);
            $("#results").addClass("fixed-filter");
        } else if ($("#filters").length && $(window).scrollTop() < $("#header").outerHeight()) {
            $("#filters").removeClass("fixed");
            $("#results").removeClass("fixed-filter");
        }
    }
    //end category browse specific code

    if ($("#saved").length && $(window).scrollTop() >= $("#header").outerHeight()) {
        var top;
        if ($("#filters").length && !$("#filters").hasClass("no-fix")) {
            top = $("#filters").outerHeight();
        } else {
            top = 0;
        }
        $("#saved").addClass("fixed").css("left", left + 20).css("right", left + 20).css("top", top);
    } else if ($("#saved").length && $(window).scrollTop() < $("#header").outerHeight()) {
        $("#saved").removeClass("fixed").css("left", "0").css("right", "0").css("top", "37px");
    }
});


//global code

function savedHeaderWidth(pages, lastPageSize) {
    if (pages > 1 || lastPageSize == 4) {
        $(".saved-header").attr("class", "saved-header").addClass("col5");
    } else {
        if (lastPageSize == 3) {
            $(".saved-header").attr("class", "saved-header").addClass("threequarters");
        } else if (lastPageSize == 2) {
            $(".saved-header").attr("class", "saved-header").addClass("onehalf");
        } else if (lastPageSize == 1) {
            $(".saved-header").attr("class", "saved-header").addClass("quarter");
        }
    }
}

//touch/handheld detection
function isHandheld() {
    if (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/Android/i) != null) {
        return true;
    } else {
        return false;
    }
}
//end touch detection

//jquery ui touch support
if ('ontouchstart' in document.documentElement) {
    var useMouse = jQuery.ui.mouse.prototype;
    var startMouse = useMouse._mouseInit;
    var handleTouch;

    function fakeTouchEvent(e, type) {
        if (e.originalEvent.touches.length > 1) {
            return false;
        }
        e.preventDefault;
        var touch = e.originalEvent.changedTouches[0];
        var touchEvent = document.createEvent('MouseEvents');
        touchEvent.initMouseEvent(type, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        e.target.dispatchEvent(touchEvent);
    }

    useMouse._touchStart = function (e) {
        var touchEvent = this;
        if (handleTouch || !touchEvent._mouseCapture(e.originalEvent.changedTouches[0])) {
            //return false;
        } else {
            handleTouch = true;
            touchEvent._touchMoved = false;
            fakeTouchEvent(e, 'mouseover');
            fakeTouchEvent(e, 'mousemove');
            fakeTouchEvent(e, 'mousedown');
        }
    };

    useMouse._touchEnd = function (e) {
        if (!handleTouch && !$(e.target).is("a")) {
            //return false;
        } else {
            fakeTouchEvent(e, 'mouseup');
            fakeTouchEvent(e, 'mouseout');
            if (!this._touchMoved) {
                fakeTouchEvent(e, 'click');
            }
            handleTouch = false;
        }
    };

    useMouse._touchMove = function (e) {
        if (!handleTouch) {
            //return false;
        } else {
            this._touchMoved = true;
            fakeTouchEvent(e, 'mousemove');
        }
    };

    useMouse._mouseInit = function () {
        var touchEvent = this;
        if (window.navigator.msPointerEnabled) {
            touchEvent.element.bind('MSPointerDown', jQuery.proxy(touchEvent, '_touchStart')).bind('MSPointerMove', jQuery.proxy(touchEvent, '_touchMove')).bind('MSPointerUp', jQuery.proxy(touchEvent, '_touchEnd'));
        } else {
            touchEvent.element.bind('touchstart', jQuery.proxy(touchEvent, '_touchStart')).bind('touchmove', jQuery.proxy(touchEvent, '_touchMove')).bind('touchend', jQuery.proxy(touchEvent, '_touchEnd'));
        }
        startMouse.call(touchEvent);
    };
}
//end jquery ui touch support

//function mediaQuery() {
//    if (!$("body").hasClass("modal-frame")) {
//        if ($(window).width() < 1280 && $(window).width() >= 1024) {
//            $("body").addClass("viewport-medium");
//            $("body").removeClass("viewport-small");
//        } else if ($(window).width() < 1024) {
//            $("body").addClass("viewport-medium");
//            $("body").addClass("viewport-small");
//        } else {
//            $("body").removeClass("viewport-medium").removeClass("viewport-small");
//        }
//    }
//}

function centerArticleText() {
    //center layout2 article text
    if ($("#article-main").length && $("#article-main").hasClass("layout2")) {
        var height = $(".article-info > div").height();
        var parentHeight = parseFloat($(".article-info").css("padding-bottom")) - parseFloat($(".article-info").css("padding-top"));
        var captionHeight = $(".article-info .caption").height() + 40;

        $(".article-info > div").css("padding-top", ((parentHeight - captionHeight) - height) / 2).css("visibility", "visible");
    }
}

function flydown(target) {
    if ($("#flydown").is(":hidden")) {
        flydownHeight();
    }
    $("#myAccountOverlay").fadeOut(200);
    $("#storesearch").fadeOut(200);
    $("a.my-account, a.searchstores, .bag a").removeClass("selected");
    $("#saved").fadeOut(300);

	$("#filters > div").slideUp(200);
	$("#filters a").removeClass("selected");
	$("#grid-popup").hide();
	
	$("#nav .flydowns a").removeClass("selected");
	target.addClass("selected");
	
	var index = $("#nav .flydowns a.selected").index();
	var childNum = index + 1;
	
	var leftVal = -1 * 100 * index;
	var left = leftVal + "%";
	
	if ($("#flydown").is(":visible")) {
	    if (supportsTransitions()) {
	        $("#flydown #container").stop().css({
	            left: leftVal + "%",
	            WebkitTransition: 'left 300ms linear',
	            MozTransition: 'left 300ms linear',
	            MsTransition: 'left 300ms linear',
	            OTransition: 'left 300ms linear',
	            transition: 'left 300ms linear'
	        });
	    } else {
	        $("#flydown #container").stop().animate({ left: left }, 300);
	    }
	} else {
		$("#flydown #container").css("left", left);
	}

    $("#flydown:hidden").fadeIn(300);
}

//detect css3 transition support
function supportsTransitions() {
    var b = document.body || document.documentElement;
    var s = b.style;
    var p = 'transition';
    if (typeof s[p] == 'string') { return true; }

    v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
    p = p.charAt(0).toUpperCase() + p.substr(1);
    for (var i = 0; i < v.length; i++) {
        if (typeof s[v[i] + p] == 'string') { return true; }
    }
    return false;
}
//end detect css3 transition support

function consultationRollbarHeight() {
    if (!$("body").hasClass("ios") && !$("body").hasClass("android")) {
        $("#schedule-consultation .rollbar").each(function () {
            $(this).show();
            var top = $(this).offset().top;
            var bottom = $("#schedule-consultation").offset().top + $("#schedule-consultation").outerHeight(true);
            //alert (top + " - " + bottom);
            $(this).height(bottom - top - 14).hide();
        });
    }
}

function globalAjaxCallback() {
    initRollbar();
    applyCustomDropdown();
    $(".rollbar").trigger('rollbar', 'reset');
}

function initRollbar() {
    $(".rollbar").each(function () {
        if (!$(this).find(".rollbar-content").length) {
            $(this).rollbar({
                scroll: 'vertical',
                pathPadding: '10px',
                zIndex: 2,
                sliderOpacity: 1,
                touchSpeed: 1
            });
        }
    });
}

function updateRollbar(rollbarElem) {
	var rollbarContent = $(rollbarElem).find('.rollbar-content');
	var rollbarHandle = $(rollbarElem).find('.rollbar-handle');
	var maxTopValue = rollbarContent.prop('scrollHeight')-$(rollbarElem).height();
	var handleTop = ((rollbarContent.position().top)*-100)/maxTopValue;
	var numPixels = Math.floor((handleTop - handleTop*.3)*maxTopValue*.01);
	if (handleTop < 0) {
		handleTop = 0;
	} else if (handleTop > 100) {
		handleTop = 100;
		rollbarContent.animate({top: "-"+maxTopValue+"px"});
	}
	if ($("body").hasClass("ie-7") || $("body").hasClass("ie-8")) {
		rollbarHandle.css("top",numPixels+"px");
	} else {
		rollbarHandle.animate({top:(handleTop - handleTop*.3)+"%"},200);
	}
}

function applyCustomDropdown() {
    if (!$("body").hasClass("ie-7")) {
        $(".apply-custom-drop").each(function () {
            var select = $(this).find("select");
        
            if (select.length == 0) {
        	    $(this).hide().removeClass("apply-custom-drop");
        	    return;        	
            }
        
            var options = select.find("option");

            var list = "";
            var noleftmargin = "";
            var colordrop = false;
            var color = "";
			var disabled = "";
			var additionalClasses = "";

            if ($(this).hasClass("no-left-margin")) {
                noleftmargin = " no-left-margin";
            }

            if ($(this).hasClass("color")) {
                color = " color";
                colordrop = true;
            }
			if ($(this).find("select").prop("disabled") == true) {
				disabled = " disabled";
			}
			if (typeof $(this).attr("data-css") != "undefined") {
				additionalClasses = " " + $(this).attr("data-css");
			}

            list += '<div class="custom-drop l6' + noleftmargin + color + disabled + additionalClasses + '" rel="' + $(this).attr("id") + '"><div class="choice"></div><div class="rollbar"><ul>';

		    options.each(function () {
			    if ($(this).attr("value") == "---") {
				    list += '<li rel="' + $(this).attr("value") + '" class="separator">';
			    } else if ($(this).prop("selected") != "undefined" && $(this).prop("selected") == true) {
				    list += '<li class="active" rel="' + $(this).attr("value") + '">';
			    } else {
				    list += '<li rel="' + $(this).attr("value") + '">';
			    }
			    if (colordrop) {
				    if ($(this).attr("data-swatch") != null && $(this).attr("data-swatch") != "") {
					    list += '<img src="' + $(this).attr("data-swatch") + '" />';
				    }
				    else {
					    list += '<img src="images/item-views/' + $(this).text().replace(/ /g, '').toLowerCase() + '.png" />';
				    }
			    }
			    list += $(this).text();
			    list += '</li>';
            });

            list += '</ul></div></div>';

            $(this).hide().removeClass("apply-custom-drop").after(list);

            $(".custom-drop div.choice:not(.preselected)").each(function () {
        		    var activeElem = $(this).siblings("div.rollbar").find(".active");
        		    if (activeElem.length == 0) {
        			    activeElem = $(this).siblings("div.rollbar").find("li:first");
        			    activeElem.addClass("active");
        		    }
                $(this).html($(activeElem).html()).css("padding-right", "15px");
            });

            initRollbar();
        });
    }
}

function centerGridText() {
    $(".text-container").each(function (index) {
        if (!$(this).parent().hasClass("tile-container")) {
            var height = Math.round(parseFloat($(this).css("padding-bottom")));
            height++;
            if (height == 0) { height = $(this).height(); }
            var divheight = $(this).children("div").height();
            var topmargin = (height / 2) - (divheight / 2);

            if (!$(this).hasClass("no-center")) {
                $(this).children("div").css("padding-top", topmargin).css("visibility", "visible");
            }

            if (!$(this).hasClass("no-image") && !$(this).hasClass("related-stories")) {
                $(this).children("img").css("height", height);
            }

            if ($(this).hasClass("empty")) {
                var height = parseInt($(this).css("height"));
                var divheight = $(this).children("div:visible").height();
                var topmargin = (height / 2) - (divheight / 2);
                $(this).children("div").css("padding-top", topmargin).css("visibility", "visible");
            }
        }
    });
}


function flydownHeight() {
    $("#flydown").css('visibility', 'hidden').css('display', 'block');
    var max = 0;
    $('.flydown-item').each(function () {
        var h = $(this).outerHeight(false);
        if (h > max) {
            max = h;
        }
    });
    $("#flydown").height(max).css('visibility', 'visible').css('display', 'none');
    $(".flydowns a").removeClass("selected");
}

function centerMasterCatLinks() {
    if ($(".catlinks").length) {
        var height = $(".catlinks").height();
        var leftdivheight = $(".catlinks .col2").height();
        var rightdivheight = $(".catlinks .col3").height();

        $(".catlinks .col2").css("padding-top", (height - leftdivheight) / 2).css("visibility", "visible");
        $(".catlinks .col3").css("padding-top", (height - rightdivheight) / 2).css("visibility", "visible");
    }
}

function resizeTouchPager(targetTouchpager) {
    var touchpagers;
    if (targetTouchpager) {
        touchpagers = $(targetTouchpager);
    } else {
        touchpagers = $(".touchpager");
    }

    touchpagers.each(function () {
        var container = $(this).find(".container");
        if ($("body").hasClass("ie") || $("body").hasClass("firefox") || $("body").hasClass("safari")) {            
            var pages = container.children(".grid-container").length;

            var width = Math.ceil(container.width());
            itemWidth = Math.floor(width / pages);

            container.children(".grid-container").css("width", itemWidth + "px");
        }

        var containerHeight = container.outerHeight();
        $(this).find(".wrapper").height(containerHeight);
        $(this).css('visibility', 'visible');
    }); 
    
    centerTileText();
}

function savedHeaderWidth(pages, lastPageSize) {
    if (pages > 1 || lastPageSize == 4) {
        $(".saved-header").attr("class", "saved-header").addClass("col5");
    } else {
        if (lastPageSize == 3) {
            $(".saved-header").attr("class", "saved-header").addClass("threequarters");
        } else if (lastPageSize == 2) {
            $(".saved-header").attr("class", "saved-header").addClass("onehalf");
        } else if (lastPageSize == 1) {
            $(".saved-header").attr("class", "saved-header").addClass("quarter");
        }
    }
}

//modals
var initialScrollPosition;

function openModal(modal) {
    initialScrollPosition = $(window).scrollTop();
    modal.show();
    $("#gray-overlay").show();
    $(window).scrollTop(0);
}

function closeModal() {
    $(".modal-popup").hide();
    $("#gray-overlay").hide();
    $(window).scrollTop(initialScrollPosition);
}

//end global code



//tile layout code 
function centerTileText() {
    $('.tile-container .text-container').each(function () {
        var height = $(this).outerHeight();
        if (height < 1) { height = $(this).outerHeight(); }
        var divheight = $(this).children("div").height();
        var topmargin = (height / 2) - (divheight / 2);

        if (!$(this).hasClass("no-center")) {
            $(this).children("div").css("padding-top", topmargin).css("visibility", "visible");
        }

        if (!$(this).hasClass("no-image") && !$(this).hasClass("related-stories") && !$(this).hasClass("shoppable-tile") && !$(this).hasClass("video-tile")) {
            $(this).children("img").css("height", height + 'px');
        }

        if ($(this).hasClass("empty")) {
            var height = parseInt($(this).css("height"));
            var divheight = $(this).children("div").height();
            var topmargin = (height / 2) - (divheight / 2);
            $(this).children("div").css("padding-top", topmargin).css("visibility", "visible");
        }
    });
}

function gridSize(units,gridUnit,gridGutter) {
    return (units * gridUnit) + (units-1)*gridGutter;
}

function gridPos(units,gridUnit,gridGutter) {
    var p = (gridUnit + gridGutter) * units;
    return p;
}

function calculateGrid() {
    //tile layout measurments for Home, Master Category and Category Browse
    gridUnit = ($('#wrapper').width())*.192;
    gridGutter = ($('#wrapper').width())*.01;
}

function layoutTiles() {

    calculateGrid();

    var maxHeight = 0;
    var follows5x2 = false;
    var num5by2 = 0;
    var topPos = 0; // needed for resize;
    var variH = [];
    var totalVari = 0;


    $.each(layoutData.tiles, function (i) {
        // position tiles
        $('#' + this.Id).show().css('width', gridSize(this.Width, gridUnit, gridGutter) + 'px');
        if ($('#' + this.Id).attr('data-height')) {
            this.Height = $('#' + this.Id).attr('data-height');
            variH.push(this.Height);
        }
        $('#' + this.Id).css('height', gridSize(this.Height, gridUnit, gridGutter) + 'px');
        if (follows5x2) {

            if ($('#' + this.Id).attr('data-height')) {
                totalVari = 0; // reset the total
                for (j = 0; j < (variH.length - 1); j++) {
                    totalVari += parseFloat(variH[j]);
                }
            } else {
                totalVari = 0; // reset the total
                for (j = 0; j < (variH.length); j++) {
                    totalVari += parseFloat(variH[j]);
                }
            }

            topPos = this.Top + (totalVari - (1 + (num5by2 - 1)));

        } else {
            topPos = this.Top;
        }
        $('#' + this.Id).css('top', gridPos(topPos, gridUnit, gridGutter) + 'px');
        $('#' + this.Id).css('left', gridPos(this.Left, gridUnit, gridGutter) + 'px');

        $('#' + this.Id).addClass('col' + this.Width);

        if (parseFloat(topPos) + parseFloat(this.Height) > maxHeight) {
            maxHeight = parseFloat(topPos) + parseFloat(this.Height);
        }
        if ($('#' + this.Id).attr('data-height')) {
            follows5x2 = true; //subsequent tiles follow a 5x2
            num5by2++;
        }
    });

    //set the tile container height
    $('.flexible-height').css('height', (maxHeight * (gridUnit + gridGutter)) + 'px');

    //centerTileText();

	$(".video-tile.looping-video:not(#cachedMarketingTiles .video-tile.looping-video)").each(function(){
		addVideoBrowseTileEnding($(this));
	});
	
	$(".video-tile.looping-video-split:not(#cachedMarketingTiles .video-tile.looping-video-split)").each(function(){
		if (!$("body").hasClass("ios")) {
			addVideoLoop($(this));
		}
	});	
	
	$(".dcTile video.video1:not(#cachedMarketingTiles .dcTile video.video1)").bind("timeupdate", function() {
		if (this.currentTime > 0) {
			addDCFadeTimers($(this).closest(".dcTile"));
			$(".dcTile video.video1").unbind("timeupdate");
		}
	});
	
//    setTimeout(function () {
//        centerTileText();
//    }, 1000); 
}


//end tile layout code

//begin Social Media functions

$("body").on("click", "a.share", function () {
    $(".share-menu:visible").addClass("hidden");
    $(this).siblings(".share-menu").toggleClass("hidden");

    return false;
});

$("body").on("mouseleave", ".share-menu, a.share", function () {
    if (shareTimer) {
        clearTimeout(shareTimer);
        shareTimer = null;
    }
    shareTimer = setTimeout(function () {
        $(".share-menu").addClass("hidden");
        clearTimeout(shareTimer);
        shareTimer = null;
    }, 1000);
});

$("body").on("mouseenter", ".share-menu, a.share", function () {
    if (shareTimer) {
        clearTimeout(shareTimer);
        shareTimer = null;
    }
});


function postToFaceBookByMeta(ShareToken) {
    //Get relative physical path of url----window.location.pathname. eg. /WorldOfTiffany/WMLT/Stories/Default.aspx
    //Get parameters----window.location.pathname. eg. ?omcid=mucid&title=demo&sharetoken=gc_284_1718
    var parameters = window.location.search;
    var exitToken = "";
    parameters = parameters.toLowerCase();
    if (parameters.indexOf("sharetoken=") >= 0) {
        var reg = new RegExp("(^|&)sharetoken=([^&]*)(&|$)");
        var r = parameters.substr(1).match(reg);
        if (r != null) exitToken = unescape(r[2]);
    }
    if (exitToken != "") {
        parameters = parameters.replace("sharetoken=" + exitToken, "");
    }
    var Url = window.location.pathname + parameters;
    if (typeof postURL == 'undefined') { postURL = window.location.protocol + "//" + window.location.host; }

    Url = postURL + Url;

    if (ShareToken != null && ShareToken != "" && ShareToken != "undefined") {
        if (Url.indexOf("?") > 0) {
            if (parameters == "?") {
                Url = Url + "ShareToken=" + ShareToken;
            }
            else {
                Url = Url + "&ShareToken=" + ShareToken;
            }
        }
        else {
            Url = Url + "?ShareToken=" + ShareToken;
        }
    }
    Url = Url + window.location.hash;

    var shareURL = '';
    shareURL = 'http://www.facebook.com/sharer.php?u=' + encodeURIComponent(Url);

    if ($("body").hasClass("ie")) {
        if (shareURL.length > 2083) {
            shareURL = shareURL.substring(0, 2079) + "...";
        }
    }

    window.open(shareURL, 'sharer', 'toolbar=0,status=0,scrollbars=1,width=670,height=436');

    sendOmnitureClickEvent('Post to Facebook');
}

function postToTwitterByMeta(ShareToken) {
    //Get relative physical path of url----window.location.pathname. eg. /WorldOfTiffany/WMLT/Stories/Default.aspx
    //Get parameters----window.location.pathname. eg. ?omcid=mucid&title=demo&sharetoken=gc_284_1718
    var parameters = window.location.search;
    var exitToken = "";
    parameters = parameters.toLowerCase();
    if (parameters.indexOf("sharetoken=") >= 0) {
        var reg = new RegExp("(^|&)sharetoken=([^&]*)(&|$)");
        var r = parameters.substr(1).match(reg);
        if (r != null) exitToken = unescape(r[2]);
    }
    if (exitToken != "") {
        parameters = parameters.replace("sharetoken=" + exitToken, "");
    }
    var Url = window.location.pathname + parameters;
    if (typeof postURL == 'undefined') { postURL = window.location.protocol + "//" + window.location.host; }

    Url = postURL + Url;

    if (ShareToken != null && ShareToken != "" && ShareToken != "undefined") {
        if (Url.indexOf("?") > 0) {
            if (parameters == "?") {
                Url = Url + "ShareToken=" + ShareToken;
            }
            else {
                Url = Url + "&ShareToken=" + ShareToken;
            }
        }
        else {
            Url = Url + "?ShareToken=" + ShareToken;
        }
    }
    Url = Url + window.location.hash;

    var shareURL = '';
    shareURL = 'http://twitter.com/share?url=' + encodeURIComponent(Url);

    if ($("body").hasClass("ie")) {
        if (shareURL.length > 2083) {
            shareURL = shareURL.substring(0, 2079) + "...";
        }
    }

    window.open(shareURL, 'sharer', 'toolbar=0,status=0,scrollbars=1,width=670,height=436');

    sendOmnitureClickEvent('Post to Twitter');
}

function postToGoogleByMeta(ShareToken) {
    //Get relative physical path of url----window.location.pathname. eg. /WorldOfTiffany/WMLT/Stories/Default.aspx
    //Get parameters----window.location.pathname. eg. ?omcid=mucid&title=demo&sharetoken=gc_284_1718
    var parameters = window.location.search;
    var exitToken = "";
    if (parameters.indexOf("ShareToken=") >= 0) {
        var reg = new RegExp("(^|&)ShareToken=([^&]*)(&|$)");
        var r = parameters.substr(1).match(reg);
        if (r != null) exitToken = unescape(r[2]);
    }
    if (exitToken != "") {
        parameters = parameters.replace("ShareToken=" + exitToken, "");
    }
    var Url = window.location.pathname + parameters;
    if (typeof postURL == 'undefined') { postURL = window.location.protocol + "//" + window.location.host; }

    Url = postURL + Url;

    if (ShareToken != null && ShareToken != "" && ShareToken != "undefined") {
        if (Url.indexOf("?") > 0) {
            if (parameters == "?") {
                Url = Url + "ShareToken=" + ShareToken;
            }
            else {
                Url = Url + "&ShareToken=" + ShareToken;
            }
        }
        else {
            Url = Url + "?ShareToken=" + ShareToken;
        }
    }
    Url = Url + window.location.hash;

    var shareURL = '';
    shareURL = 'http://plus.google.com/share?url=' + encodeURIComponent(Url);

    if ($("body").hasClass("ie")) {
        if (shareURL.length > 2083) {
            shareURL = shareURL.substring(0, 2079) + "...";
        }
    }

    window.open(shareURL, 'sharer', 'toolbar=0,status=0,scrollbars=1,width=670,height=436');

    sendOmnitureClickEvent('Post to Twitter');
}
/*postTo functions: Variables:
T = Title of Item/Story
U = URL of Item/Story
L = Has no use except in Tumblr/Facebook, this determines if it is an image/video/other and posts accordingly
OMCID = Omniture url
description = Description/Comments from the item/story
imageToPost = Image of Item/Story
*/
function postToFaceBook(T, U, L, OMCID, description, imageToPost) {
    if (typeof postURL == 'undefined') { postURL = window.location.protocol + "//" + window.location.host; }
    if (U.toLowerCase().indexOf("?") >= 0) {
        if (L != "video") U = postURL + U + "&omcid=" + OMCID;
    } else {
        if (L != "video") U = postURL + U + "?omcid=" + OMCID;
    }

    var shareURL = '';

    /*If the function does not recieve an Image url and a description it will then use the meta tags from the page, but if one of the other (image or descritpion)
    is there then it will use the variables it was passed to it*/
    if (typeof imageToPost == 'undefined' && typeof description == 'undefined') {
        shareURL = 'http://www.facebook.com/sharer.php?u=' + encodeURIComponent(U);
        //window.open('http://www.facebook.com/sharer.php?s=100&p[url]=' + encodeURIComponent(U) + '&p[images][0]=' + imageURL + '&p[title]=' + encodeURIComponent(T) + '&p[summary]=' + description, 'sharer', 'toolbar=0,status=0,scrollbars=1,width=670,height=436');
    }
    else {
        if (typeof description == 'undefined') description = "";
        var imageURL = imageToPost;
        shareURL = 'http://www.facebook.com/sharer.php?s=100&p[url]=' + encodeURIComponent(U) + '&p[images][0]=' + imageURL + '&p[title]=' + encodeURIComponent(T) + '&p[summary]=' + description;
        //window.open('http://www.facebook.com/sharer.php?s=100&p[url]=' + encodeURIComponent(U) + '&p[images][0]=' + imageURL + '&p[title]=' + encodeURIComponent(T) + '&p[summary]=' + description, 'sharer', 'toolbar=0,status=0,scrollbars=1,width=670,height=436');
    }

    if ($("body").hasClass("ie")) {
        if (shareURL.length > 2083) {
            shareURL = shareURL.substring(0, 2079) + "...";
        }
    }

    window.open(shareURL, 'sharer', 'toolbar=0,status=0,scrollbars=1,width=670,height=436');

    sendOmnitureClickEvent('Post to Facebook');
}
function postToTwitter(T, U, L, OMCID, description, hashTags) {
    if (typeof postURL == 'undefined') { postURL = window.location.protocol + "//" + window.location.host; }

    //If the function does not recieve a description, we will make the description a empty string
    if (typeof description == 'undefined') description = "";

    if (U.toLowerCase().indexOf("?") >= 0) {
        U = postURL + U + "&omcid=" + OMCID;
    } else {
        U = postURL + U + "?omcid=" + OMCID;
    }

    var shareURL;
    if (T == 'CSR' && typeof hashTags == 'undefined') {
        shareURL = 'http://twitter.com/share?url=' + encodeURIComponent(U) + '&text=' + encodeURIComponent(description);
    }
    else if (T == 'CSR' && typeof hashTags != 'undefined') {
        shareURL = 'http://twitter.com/share?url=' + encodeURIComponent(U) + '&text=' + encodeURIComponent(description) + '&hashtags=' + encodeURIComponent(hashTags);
    }
    else if (T == 'video') {
        shareURL = 'http://twitter.com/share?url=' + encodeURIComponent(description) + '&text=@TiffanyAndCo ' + encodeURIComponent(L);
    }
    else {
        shareURL = 'http://twitter.com/share?url=' + encodeURIComponent(U) + '&text=@TiffanyAndCo ' + encodeURIComponent(T) + ' ' + encodeURIComponent(description);
    }

    if ($("body").hasClass("ie")) {
        if (shareURL.length > 2083) {
            shareURL = shareURL.substring(0, 2079) + "...";
        }
    }

    window.open(shareURL, 'sharer', 'toolbar=0,status=0,width=650,height=436');
    sendOmnitureClickEvent('Post to Twitter');
}
function postToGoogle(U, OMCID) {
    if (typeof postURL == 'undefined') { postURL = window.location.protocol + "//" + window.location.host; }

    //If the function does not recieve a description, we will make the description a empty string
    if (typeof description == 'undefined') description = "";

    if (U.toLowerCase().indexOf("?") >= 0) {
        U = postURL + U + "&omcid=" + OMCID;
    } else {
        U = postURL + U + "?omcid=" + OMCID;
    }

    var shareURL = 'https://plus.google.com/share?url=' + encodeURIComponent(U);

    if ($("body").hasClass("ie")) {
        if (shareURL.length > 2083) {
            shareURL = shareURL.substring(0, 2079) + "...";
        }
    }

    window.open(shareURL, 'sharer', 'toolbar=0,status=0,width=500,height=500');
    sendOmnitureClickEvent('Post to Google');
}
function postToTumblr(T, U, L, OMCID, description, imageToPost, hashTags) {
    if (typeof postURL == 'undefined') { postURL = window.location.protocol + "//" + window.location.host; }
    //for the links to work the OMCID needs to be off of the url

    if (U.toLowerCase().indexOf("?") >= 0) {
        if (OMCID != '') U = postURL + U + "&omcid=" + OMCID;
    } else {
        if (OMCID != '') U = postURL + U + "?omcid=" + OMCID;
    }

    var shareURL = '';

    var imageURL = imageToPost;
    if (L == 'image') {
        if (imageURL == 'undefined') {
            imageURL = $('link[rel=image_src]').attr('href');
        }

        if (T != '')
            info = T + "<br>" + description;
        else
            info = description;

        shareURL = 'http://www.tumblr.com/share/photo?source=' + encodeURIComponent(imageURL) + '&caption=' + encodeURIComponent(info) + '&click_thru=' + encodeURIComponent(U);
        if (typeof hashTags != 'undefined' && hashTags != '')
            shareURL += "&tags=" + encodeURIComponent(hashTags);
        //window.open('http://www.tumblr.com/share/photo?source=' + encodeURIComponent(imageURL) + '&caption=' + encodeURIComponent(info), 'sharer', 'toolbar=0,status=0,width=650,height=436');
    }
    else if (L == 'video') {
        shareURL = 'http://www.tumblr.com/share?v=3&u=' + encodeURIComponent(U) + '&t=' + encodeURIComponent(T) + '&s=' + encodeURIComponent(description);
        //window.open('http://www.tumblr.com/share?v=3&u=' + encodeURIComponent(U) + '&t=' + encodeURIComponent(T) + '&s=' + encodeURIComponent(description), 'sharer', 'toolbar=0,status=0,width=650,height=436');
    }
    else {
        shareURL = 'http://www.tumblr.com/share/link?url=' + encodeURIComponent(U) + '&name=' + encodeURIComponent(T) + '&description=' + encodeURIComponent(description);
        //window.open('http://www.tumblr.com/share/link?url=' + encodeURIComponent(U) + '&name=' + encodeURIComponent(T) + '&description=' + encodeURIComponent(description), 'sharer', 'toolbar=0,status=0,width=650,height=436')
    }

    if ($("body").hasClass("ie")) {
        if (shareURL.length > 2083) {
            shareURL = shareURL.substring(0, 2079) + "...";
        }
    }

    window.open(shareURL, 'sharer', 'toolbar=0,status=0,width=650,height=436');

    sendOmnitureClickEvent('Post to Tumblr');
}
function postToPinterest(T, U, L, OMCID, imageToPost) {
    //This is to see if this is a Video or not. If it is a video it will have &is_video=true in the title.
    var title = T.split("&");
    if (title[1] == "hd=1") {
        title[1] = title[2];
        T = title[0] + "&" + title[1];
    }
    if (typeof postURL == 'undefined') { postURL = window.location.protocol + "//" + window.location.host; }


    //If the pin is suppose to be a video, it will link to the youtube page and not back to the overlay.
    //This if below adds the urls need for if you are pinning images.
    if (U.toLowerCase().indexOf("?") >= 0) {
        if (typeof title[1] == 'undefined' || title[1] != "is_video=true") { U = postURL + U + "&omcid=" + OMCID; }
    }
    else if (U.indexOf(postURL) === -1) U = postURL + U; 
    else {
        if (typeof title[1] == 'undefined' && title[1] == "is_video=true") { U = U; }
    }


    //Fetch product image via inline LINK tag on page.
    //If no image is being past through the function (ie From Romance Tips page) then grab the image from the meta tags
    var imageURL;
    if (typeof imageToPost == 'undefined')
        imageURL = $('link[rel=image_src]').attr('href');
    else
        imageURL = imageToPost

    //hasSubDomain() - test URLs should not be sent to Pinterest.
    /*if (URLFactory.hasSubDomain(imageURL)) {
    var loc = imageURL.indexOf(".");
    imageURL = 'http://' + imageURL.substring(loc + 1);
    }*/

    if ($("body").hasClass("ie")) {
        if (T != null && T.length > 500) {
            T = T.substring(0, 499);
        }
    }

    var directURL = 'http://pinterest.com/pin/create/button/?';
    directURL += 'url=' + encodeURIComponent(U);
    directURL += '&media=' + encodeURIComponent(imageURL);
    directURL += '&description=' + encodeURIComponent(T);

    //if this is a video add the title parameter so that it shows as a video.
    if (typeof title[1] != 'undefined' && title[1].indexOf('is_video') != -1)
        directURL += '&title=' + T;

    if ($("body").hasClass("ie")) {
        if (directURL.length > 2083) {
            directURL = directURL.substring(0, 2079) + "...";
        }
    }

    //Height needs to be bigger. If user is not logged into Pinterest,
    //the login button is cut off in popup window.
    window.open(directURL, 'sharer', 'toolbar=0,status=0,width=626,height=550,resizable=1', false);
    //omnitureModuleTracking(L + " | Post to Pinterest | " + U)
    sendOmnitureClickEvent('Post to Pinterest');
}

function postToWeibo(T, U, L, OMCID, imageToPost) {
    if (typeof postURL == 'undefined') { postURL = window.location.protocol + "//" + window.location.host; }
    if (U.toLowerCase().indexOf("?") >= 0) {
        U = postURL + U + "&omcid=" + OMCID;
    } else {
        U = postURL + U + "?omcid=" + OMCID;
    }

    //Fetch product image via inline LINK tag on page.
    //If no image is being past through the function (ie From Romance Tips page) then grab the image from the meta tags
    var imageURL;
    if (typeof imageToPost == 'undefined')
        imageURL = $('link[rel=image_src]').attr('href');
    else
        imageURL = imageToPost

    //hasSubDomain() - test URLs should not be sent to Pinterest.
    /*if (URLFactory.hasSubDomain(imageURL)) {
    var loc = imageURL.indexOf(".");
    imageURL = 'http://' + imageURL.substring(loc + 1);
    }*/
    var directURL = 'http://service.weibo.com/share/share.php?';
    directURL += 'url=' + encodeURIComponent(U);
    directURL += '&title=' + encodeURIComponent(T + ' @TiffanyAndCoµÙÜ½Äá ');
    directURL += '&pic=' + encodeURIComponent(imageURL);

    if (locale.toLowerCase() == 'zh-cn') {
        directURL += '&language=zh_cn';
    } else {
        directURL += '&language=zh_tw';
    }

    if ($("body").hasClass("ie")) {
        if (directURL.length > 2083) {
            directURL = directURL.substring(0, 2079) + "...";
        }
    }

    window.open(directURL, 'sharer', 'toolbar=0,status=0,width=626,height=436');
    //omnitureModuleTracking(L + " | Post to Twitter | " + U)
    sendOmnitureClickEvent('Post to Weibo');
}
//end Social Media functions


//ExternalSiteWarning
function externalWarning(url) {
    window.open("/Service/ExternalSiteWarning.aspx?redirect=" + url, "_blank");
}
//End ExternalSiteWarning

// Begin get group data service for product item tooltip component
if (typeof (StateModel.getInstance().custom.tooltipGroupDataHtmlLookup) == "undefined") {
	StateModel.getInstance().custom.tooltipGroupDataHtmlLookup = {};
}
if (typeof (StateModel.getInstance().custom.tooltipGroupDataLookup) == "undefined") {
	StateModel.getInstance().custom.tooltipGroupDataLookup = {};
}
if (typeof (StateModel.getInstance().custom.tooltipCatalogDataLookup) == "undefined") {
	StateModel.getInstance().custom.tooltipCatalogDataLookup = {};
}
function SeoEncode(title) {
    title = title.replace(new RegExp(/"/), "%22")
    .replace(new RegExp(/#/g), "%23")
    .replace(new RegExp(/%/g), "")
    .replace(new RegExp(/&/g), "")
    .replace(new RegExp(/\(/g), "%28")
    .replace(new RegExp(/\)/g), "%29")
    .replace(new RegExp(/\+/g), "")
    .replace(new RegExp(/\./g), "")
    .replace(new RegExp(/\\/g), "")
    .replace(new RegExp(/:/g), "")
    .replace(new RegExp(/;/g), "%3B")
    .replace(new RegExp(/</g), "")
    .replace(new RegExp(/=/g), "%3D")
    .replace(new RegExp(/>/g), "")
    .replace(new RegExp(/\?/g), "")
    .replace(new RegExp(/@/g), "%40")
    .replace(new RegExp(/\\/g), "")
    .replace(new RegExp(/\|/g), "%7C")
    .replace(new RegExp(/\s+/g), "-");
    return title
}

function displayTooltipData($img) {
	$("#grid-popup").stop(true, true).hide();
	$("#grid-popup .info .grouping").remove();
	$("#grid-popup .error").html("");
	$("#grid-popup .out-of-stock").hide();

	var sku = $img.attr("data-sku");
	var productData = StateModel.getInstance().getProduct(sku);
	if (productData == null) {
		// in rare scenarios when a tooltip is triggered just before the browse grid is refreshed, this is null
		return;
	}
	var query = window.location.search.split("?").join("");
	var cols = $img.closest(".grid-container > div").attr("class");
	var offset = $img.offset();
	var width = $img.width();
	var src = $img.attr("src");
	var zoomImg = $img.attr("data-rollover-image");
	var desc = (productData.Name == null) ? "" : productData.Name;
	var price = productData.Price;
	var wholesalePrice = productData.Wholesaleprice;
	var crop = (productData.Crop == null) ? StateModel.DEFAULT_IMAGE_CROP : productData.Crop;
	//var state = productData.ItemQS;
	var state = URLFactory.convertStateToServiceHash(StateModel.getInstance().pBrowseState);
	var isGroup = (productData.IsGroup != null && productData.IsGroup.toLowerCase() == "true") ? true : false;
	var isEngravable = productData.IsServiceable;
	var mcat = URLFactory.extractQueryStringValue(query, "mcat");
	var cid = URLFactory.extractQueryStringValue(query, "cid");
	var isSearch = URLFactory.extractQueryStringValue(query, "search") == 1?1:0;
	var searchKeyword = encodeURIComponent(StateModel.getInstance().getStateSnapshot().searchTerms);
	var queryStringSearchKeyword = URLFactory.extractQueryStringValue(query, "searchkeyword");
	var origin = URLFactory.extractQueryStringValue(query, "search") == 1 ? "search" : "browse";

	if (searchKeyword == "" && queryStringSearchKeyword != null && queryStringSearchKeyword != "") {
		// Needed for search category redirects, which clear out the search keyword from state data
		searchKeyword = queryStringSearchKeyword; 
	}

	var pkbpricemarket = "";
	if (typeof productData.PriceMarketId != "undefined" && productData.PriceMarketId != null && productData.PriceMarketId != "") {
		pkbpricemarket = productData.PriceMarketId;
	} else {
		pkbpricemarket = URLFactory.extractQueryStringValue(query, "pkbpricemarket");
	}
	if (pkbpricemarket != ""){
	    pkbpricemarket = "&pkbpricemarket=" + pkbpricemarket;
        }

	if ($("#engagementItemPage").length>0) {
	    if (enableSEOFriendlyURL)
	        var itemURL = "/engagement-rings/" + SeoEncode(productData.Name) + "/i/?fromGrid=1&groupSKU=" + sku + "&search_params=" + state + "&origin=engagement";
	    else
	        var itemURL = '/Engagement/Item.aspx?fromGrid=1&groupSKU=' + sku + '&search_params=' + state + "&origin=engagement";
	} else if ($("#StatementItemPage").length > 0) {
		var itemURL = '/Shopping/ItemDesign.aspx?sku=' + sku + '&cid=' + cid;
	} else {
		if (window.location.href.toLowerCase().indexOf("categorybrowse.aspx") > -1) {
			// For category browse, use currentPage to remember where in the page the user left off
			state = URLFactory.updateHash(state, "pagePosition", getPagePosition());
		}
		var itemURL = '/Shopping/Item.aspx?fromGrid=1&sku=' + sku + '&mcat=' + mcat + '&cid=' + cid + '&search_params=' + state + "&search=" + isSearch + "&origin=" + origin + "&searchkeyword=" + searchKeyword+pkbpricemarket;
	}
	var contentHTML = "";

	if (typeof(calculateGrid) != "undefined") {
		calculateGrid();
	}
	else {
		//console.log("calculateGrid() not defined");
	}

	margin = gridGutter;

	if (cols.indexOf("col1") > -1 || $(this).parent().hasClass("subrow")) {
	    var popupwidth = width * 2 + margin;
	    var popupheight = width;
		$("#grid-popup").removeClass("double");
	} else if (cols.indexOf("col2") > -1) {
		var popupwidth = width + (width / 2) + (margin / 2);
		var popupheight = width;
		$("#grid-popup").addClass("double");
	}

	if (offset.left > 0) {
	    if (offset.left > ($("body").width() / 2)) {
	        var leftoffset = offset.left - width - (margin * 2) - 2;
	        if (cols.indexOf("col2") > -1 && !$img.parent().hasClass("subrow")) {
	            leftoffset = offset.left - width + ((width - margin) / 2) - margin - 2;
	        }

			// Remove the previous image so that it doesn't show while the next image loads, then add a new one using a grey image placeholder
			$("#grid-popup .image img").replaceWith('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAPr6+gAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="' + desc.replace(/"/g,"&quot;") + '" style="visibility: visible; width: ' + popupwidth + 'px; height: ' + popupheight + 'px; margin-right: 0px; margin-left: ' + margin + 'px;">');

	        $("#grid-popup").addClass("rightimg").removeClass("leftimg").css("width", popupwidth).css("min-height", popupheight).css("padding", margin).css("top", offset.top - margin - 1).css("left", leftoffset);
	        $("#grid-popup .image img").css("width", width).css("height", width).css("margin-left", margin).css("margin-right", 0).attr("src", zoomImg).attr("alt", desc.replace(/"/g,"&quot;"));
	        $("#grid-popup .close").css("left", margin).css("right", "auto");
	        if ($("body").hasClass("ie-7")) {
	            $("#grid-popup").show();
	        } else {
	            $("#grid-popup").fadeIn(300);
	        }
	    } else {

			// Remove the previous image so that it doesn't show while the next image loads, then add a new one using a grey image placeholder
			$("#grid-popup .image img").replaceWith('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAPr6+gAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="' + desc.replace(/"/g,"&quot;") + '" style="visibility: visible; width: ' + popupwidth + 'px; height: ' + popupheight + 'px; margin-right: ' + margin + 'px; margin-left: 0px;">');

	        $("#grid-popup").addClass("leftimg").removeClass("rightimg").css("width", popupwidth).css("min-height", popupheight).css("padding", margin).css("top", offset.top - margin - 1).css("left", offset.left - margin - 1);
	        $("#grid-popup .image img").css("width", width).css("height", width).css("margin-right", margin).css("margin-left", 0).attr("src", zoomImg).attr("alt", desc.replace(/"/g,"&quot;"));
	        $("#grid-popup .close").css("right", margin).css("left", "auto");
	        if ($("body").hasClass("ie-7")) {
	            $("#grid-popup").show();
	        } else {
	            $("#grid-popup").fadeIn(300);
	        }
	    }
	}

	if (isGroup == true) {
		if (typeof productData.SelectedSku != "undefined" && productData.SelectedSku !=null) {
			itemURL += "&selectedsku="+productData.SelectedSku;
		}
		displayGroupTooltipData($img, itemURL);
	}
	else {
		displayIndividualTooltipData($img, itemURL);
	}
}

function displayIndividualTooltipData($img, itemURL) {

	var sku = $img.attr("data-sku");
	var productData = StateModel.getInstance().getProduct(sku);
	var desc = (productData.Name == null) ? "" : productData.Name;
	var price = (productData.Price == null) ? "" : productData.Price.split("&nbsp;").join(" ");
	var wholesalePrice = productData.Wholesaleprice;
	var selectedSku = productData.DefaultSku;
	var isPurchasable = (productData.isPurchasable != null && productData.isPurchasable.toLowerCase() == "true") ? true : false;
	var showEmailWhenAvailable = (productData.ShowEmailWhenAvailable != null) ? productData.ShowEmailWhenAvailable : false;
	var isEngravable = (productData.IsServiceable != null && productData.IsServiceable.toLowerCase() == "true") ? true : false;
	var isSaveForLaterVisible = (productData.ShowAddtoWishList == null || (productData.ShowAddtoWishList != null && productData.ShowAddtoWishList.toLowerCase() == "true")) ? true : false;
	var isSaveForLaterEnabled = (productData.isSaveForLaterEnabled != null && productData.isSaveForLaterEnabled.toLowerCase() == "true") ? true : false;
	var contentHTML = templateStrings.tooltipGroupItemTemplate.split("$description$").join(desc).split("$setsLabel$").join("");
	var isEngagementItem = ($("#engagementItemPage").length > 0) ? true : false;
	var isItemDesignPage = $("#StatementItemPage").length == 1;

	if (locale.toLowerCase() == "en-us-estr" || locale.toLowerCase() == "ja-jp-estr") {
		isSaveForLaterVisible = false;
	}

	if (CookieManager.areCookiesEnabled() == false) {
		isSaveForLaterVisible = false;
		isPurchasable = false;
	}
	
	// track tooltip on category browse page
	if ($("#categoryBrowsePage").length > 0) {
		if (URLFactory.extractQueryStringValue(window.location.search.split("?").join(""), "search") == 1) {
			TrackItemOnRollOver(desc+" - "+sku, "Search - "+encodeURIComponent(StateModel.getInstance().getStateSnapshot().searchTerms));
		} else {
			TrackItemOnRollOver(desc+" - "+sku, "Category - "+$("h1").text().split("(")[0]);
		}
	}	

	//$("#grid-popup .itemname").html(itemname);
	if (isEngagementItem) {
		$("#grid-popup h2").html(desc).show();
	  	$("#grid-popup .info").addClass("engagement-ring");
  		$("#grid-popup .item-links .slash").hide();		
	} else {
		$("#grid-popup .description").html(desc);

		if (locale.toLowerCase().indexOf("trade") > -1) {
			price = '<table class="gtrade-price">';
			if (typeof(productData.Price) != "undefined" && productData.Price != null && productData.Price != "0" && productData.Price != "" && productData.Price != " ") {
				price += '<tr><td>' + LABEL_US_RETAIL + '</td><td>' + productData.Price + '</td></tr>';
			}
			if (typeof(productData.Wholesaleprice) != "undefined" && productData.Wholesaleprice != null && productData.Wholesaleprice != "0" && productData.Wholesaleprice != "" && productData.Wholesaleprice != " ") {
				price += '<tr><td>' + LABEL_WHOLE_SALE + '</td><td>' + productData.Wholesaleprice + '</td></tr></table>';
			}
			price += '</table>';
		}
		if (typeof productData.ShowPrice != "undefined" && productData.ShowPrice != null && productData.ShowPrice.toLowerCase() == "false") {
			contentHTML = contentHTML.split("$price$").join("").split("$id$").join(sku);
		} else {
			contentHTML = contentHTML.split("$price$").join(price).split("$id$").join(sku);
		}
		$("#grid-popup .info").prepend(contentHTML);
	}
	$("#grid-popup .info > a.add").text(LABEL_ADD_TO_SHOPPING_BAG).attr("href", "#").addClass("add-to-bag");
	$("#grid-popup .info a.save").html('<span class="plusicon"></span>' + LABEL_ADD_TO_SAVED_ITEMS).attr("href", "#").addClass("add-to-saved");

	$("#grid-popup .details").attr("href", itemURL);
	$("#grid-popup .image a").attr("href", itemURL);
	$("#grid-popup .save").attr("href", 'javascript:handleSaveForLater("' + sku + '", "tooltip")');
	$("#grid-popup .add").attr("href", 'javascript:handleAddToShoppingBag("' + sku + '", "tooltip")');
	$("#grid-popup a.add").text(LABEL_ADD_TO_SHOPPING_BAG);
	$("#grid-popup a.emailMe").attr("href", 'javascript:handleEmailWhenAvailable("' + sku + '", "tooltip")');

	if (isPurchasable == false) {
		if (showEmailWhenAvailable == true) {
			$("#grid-popup .out-of-stock").show();
			$("#grid-popup .emailMe").show();
		} else {
			$("#grid-popup .emailMe").hide();
		}
		$("#grid-popup .add").hide();
	}
	else {
		$("#grid-popup .out-of-stock").hide();
		$("#grid-popup .emailMe").hide();
		$("#grid-popup .add").show();
	}

	if (isSaveForLaterVisible == false || isEngagementItem == true || isItemDesignPage == true) {
		$("#grid-popup .add-to-saved").hide();
		$("#grid-popup .item-links .slash").hide();
	}
	else {
		$("#grid-popup .add-to-saved").show();
		$("#grid-popup .item-links .slash").show();
	}

	if (isSaveForLaterEnabled == false) {
		// **TODO** Show "add to saved items" label
	}
	else {
		// **TODO** Show "added to saved items" label
	}
}

function displayGroupTooltipData($img, itemURL) {
	var model = StateModel.getInstance();
	var tooltipGroupDataHtmlLookup = model.custom.tooltipGroupDataHtmlLookup;
	var tooltipGroupDataLookup = model.custom.tooltipGroupDataLookup;
	var contentHTML = "";
	var data;

	var sku = $img.attr("data-sku");
	popUpSku = sku;
	var productData = StateModel.getInstance().getProduct(sku);
	var desc = (productData.Name == null) ? "" : productData.Name;
	var price = productData.Price;
	var showPrice = productData.ShowPrice;
	var wholesalePrice = productData.Wholesaleprice;
	var selectedSku = productData.DefaultSku;
	var isPurchasable = (productData.isPurchasable != null && productData.isPurchasable.toLowerCase() == "true") ? true : false;
	var showEmailWhenAvailable = (productData.ShowEmailWhenAvailable != null) ? productData.ShowEmailWhenAvailable : false;
	var isEngravable = (productData.IsServiceable != null && productData.IsServiceable.toLowerCase() == "true") ? true : false;
	var isSaveForLaterVisible = (productData.ShowAddtoWishList == null || (productData.ShowAddtoWishList != null && productData.ShowAddtoWishList.toLowerCase() == "true")) ? true : false;
	var isSaveForLaterEnabled = (productData.isSaveForLaterEnabled != null && productData.isSaveForLaterEnabled.toLowerCase() == "true") ? true : false;
	
	var groupServiceUrl = "/Default.aspx/GetGroupOverlay";
	var groupServiceData = '{"groupSKU":"' + sku + '"}';
	
	if (typeof locale != "undefined" && locale == "en-US-PKB" && ($(".extras-additional-link a").hasClass("selected") || $(".extras-similar-link a").hasClass("selected"))) {
		groupServiceUrl = "/Default.aspx/GetGroupOverlayPMid";
		groupServiceData = '{"groupSKU":"' + sku + '", "priceMarketID":'+PKB_PRICMARKETID+'}';		
	}


	clearTimeout(loadAnimationTimer);

	if (locale.toLowerCase() == "en-us-estr" || locale.toLowerCase() == "ja-jp-estr") {
		isSaveForLaterVisible = false;
	}

	if (CookieManager.areCookiesEnabled() == false) {
		isSaveForLaterVisible = false;
		isPurchasable = false;
	}
	
	// track tooltip on category browse page
	if ($("#categoryBrowsePage").length > 0) {
		if (URLFactory.extractQueryStringValue(window.location.search.split("?").join(""), "search") == 1) {
			TrackItemOnRollOver(desc+" - "+sku, "Search - "+encodeURIComponent(StateModel.getInstance().getStateSnapshot().searchTerms));
		} else {
			TrackItemOnRollOver(desc+" - "+sku, "Category - "+$("h1").text().split("(")[0]);
		}
	}		

	// Act on isPurchasable from the product data right away so the button is not hanging around if it's not to be shown
	if (isPurchasable == false) {
		if (showEmailWhenAvailable == true) {
			$("#grid-popup .out-of-stock").show();
			$("#grid-popup .emailMe").show();
		}  else {
			$("#grid-popup .emailMe").hide();
		}
		$("#grid-popup .add").hide();
	}
	else { 
		$("#grid-popup .out-of-stock").hide();
		$("#grid-popup .emailMe").hide();
		$("#grid-popup .add").show();
	}
	
	if (tooltipXHR != null) { tooltipXHR.abort(); }

	if (typeof (tooltipGroupDataHtmlLookup[sku]) == "undefined") {

		// Hide tooltip contents until group data comes in, and show loading animation if group data takes longer than 750ms to complete
		$("#grid-popup .info").hide();

		clearTimeout(loadAnimationTimer);

		$("#grid-popup .loading-holder").remove();

		loadAnimationTimer = setTimeout(function () { 
			$("#grid-popup .info").before('<div class="loading-holder"><div class="grouping loading" style="height:75px;"><img src="/shared/images/misc/loading.gif" width="28" height="28" /></div></div>');
		}, 750);

		$("#grid-popup .info > a.add").text(LABEL_ADD_TO_SHOPPING_BAG).attr("href", "#").addClass("add-to-bag");
		$("#grid-popup .info a.save").html('<span class="plusicon"></span>' + LABEL_ADD_TO_SAVED_ITEMS).attr("href", "#").addClass("add-to-saved");
            
		$("#grid-popup .details").attr("href", itemURL);
		$("#grid-popup .image a").attr("href", itemURL);

		tooltipXHR = $.ajax({
		    url: groupServiceUrl,
		    type: 'POST',
		    cache: false,
		    data: groupServiceData,
		    dataType: "json",
		    contentType: "application/json; charset=utf-8",
		    success: function (data) {
		        //console.log("getGroupTooltipData succeeded");
		        // Only grab the HTML if we don't already have it cached. This helps keep the number of requests down
		        // if the user is passing the mouse back and forth over the grid.
		        var crop = "";
		        var sharpen = "";

		        clearTimeout(loadAnimationTimer);

		        // Need to have crop and sharpen data available for group data because changing selected
		        // group SKU results in the need to change the thumbnail image.
		        if (typeof (productData.Crop) != "undefined" && productData.Crop != null && productData.Crop != "") {
		            crop = productData.Crop;
		        }
		        else {
		            crop = templateStrings.defaultScene7Crop;
		        }

		        if (typeof (productData.Sharpen) != "undefined" && productData.Sharpen != null && productData.Sharpen != "") {
		            sharpen = productData.Sharpen;
		        }

		        $("#grid-popup .info .grouping").remove();
		        tooltipGroupDataHtmlLookup[sku] = renderGroupTooltipData(data, productData, crop, sharpen);
		        tooltipGroupDataLookup[sku] = data;
		        $("#grid-popup a.save").attr("href", 'javascript:handleSaveForLater("' + sku + '", "tooltip")');
		        $("#grid-popup a.add").attr("href", 'javascript:handleAddToShoppingBag("' + sku + '", "tooltip")');
		        $("#grid-popup a.add").text(LABEL_ADD_TO_SHOPPING_BAG);
                        $("#grid-popup a.emailMe").attr("href", 'javascript:handleEmailWhenAvailable("' + sku + '", "tooltip")');
		        $("#grid-popup a.save").html('<span class="plusicon"></span>' + LABEL_ADD_TO_SAVED_ITEMS);
		        $("#grid-popup .info").prepend(tooltipGroupDataHtmlLookup[sku]);
		        $("#grid-popup .info option[value='" + data.d.DefaultSku + "']").prop('selected', true);
		        popUpSelectedSku = data.d.DefaultSku;

		        if (typeof (data.d.isPurchasable) != "undefined" && data.d.isPurchasable != null) {
		            isPurchasable = (data.d.isPurchasable.toLowerCase() == "true") ? true : false;
		        }
				if (typeof(data.d.ShowEmailWhenAvailable) != "undefined" && data.d.ShowEmailWhenAvailable != null) {
					showEmailWhenAvailable = data.d.ShowEmailWhenAvailable;
				}						
		        if (typeof (data.d.ShowAddtoWishList) != "undefined" && data.d.ShowAddtoWishList != null) {
		            isSaveForLaterVisible = (data.d.ShowAddtoWishList.toLowerCase() == "true") ? true : false;
		        }

		        if (typeof data.d.ShowPrice != "undefined" && data.d.ShowPrice != null) {
		            showPrice = (data.d.ShowPrice.toLowerCase() == "true") ? true : false;
		        }

		        if (CookieManager.areCookiesEnabled() == false) {
		            isSaveForLaterVisible = false;
		            isPurchasable = false;
		        }

		        if (isPurchasable == false) {
					if (showEmailWhenAvailable == true) {
						$("#grid-popup .out-of-stock").show();
						$("#grid-popup .emailMe").show();
					} else {
						$("#grid-popup .emailMe").hide();
					}				
		            $("#grid-popup .add").hide();
		        }
		        else {
					$("#grid-popup .out-of-stock").hide();
					$("#grid-popup .emailMe").hide();
		            $("#grid-popup .add").show();
		        }

		        if (showPrice == false) {
		            $("#grid-popup .grouping .price").hide();
		        }

		        if (isSaveForLaterVisible == false) {
		            $("#grid-popup .add-to-saved").hide();
		            $("#grid-popup .item-links .slash").hide();
		        }
		        else {
		            $("#grid-popup .add-to-saved").show();
		            $("#grid-popup .item-links .slash").show();
		        }
		        $("#grid-popup .loading-holder").remove();
		        $("#grid-popup .info").show();
		        applyCustomDropdown();
		    },
		    error: function (jqXHR, textStatus, errorThrown) {
		        //console.log("getGroupTooltipData failed");
		        clearTimeout(loadAnimationTimer);
		    }
		});
	}
	else {
		data = tooltipGroupDataLookup[sku];

		$("#grid-popup .details").attr("href", itemURL);
		$("#grid-popup .image a").attr("href", itemURL);

		$("#grid-popup a.save").attr("href", 'javascript:handleSaveForLater("' + sku + '", "tooltip")');
		$("#grid-popup a.add").attr("href", 'javascript:handleAddToShoppingBag("' + sku + '", "tooltip")');
		$("#grid-popup a.add").text(LABEL_ADD_TO_SHOPPING_BAG);
		$("#grid-popup a.emailMe").attr("href", 'javascript:handleEmailWhenAvailable("' + sku + '", "tooltip")');
		$("#grid-popup a.save").html('<span class="plusicon"></span>' + LABEL_ADD_TO_SAVED_ITEMS);
		$("#grid-popup .info").prepend(tooltipGroupDataHtmlLookup[sku]);
		$("#grid-popup .info option[value='" + data.d.DefaultSku + "']").prop('selected', true);
		popUpSelectedSku = data.d.DefaultSku;
		if (typeof(data.d.isPurchasable) != "undefined" && data.d.isPurchasable != null) {
			isPurchasable = (data.d.isPurchasable.toLowerCase() == "true") ? true : false;
		}
		if (typeof(data.d.ShowEmailWhenAvailable) != "undefined" && data.d.ShowEmailWhenAvailable != null) {
			showEmailWhenAvailable = data.d.ShowEmailWhenAvailable;
		}		
		if (isPurchasable == false) {
			if (showEmailWhenAvailable == true) {
				$("#grid-popup .out-of-stock").show();
				$("#grid-popup .emailMe").show();
			}  else {
				$("#grid-popup .emailMe").hide();
			}		
			$("#grid-popup .add").hide();
		}
		else {
			$("#grid-popup .out-of-stock").hide();
			$("#grid-popup .emailMe").hide();
			$("#grid-popup .add").show();
		}

        if (typeof data.d.ShowPrice != "undefined" && data.d.ShowPrice != null) {
            showPrice = (data.d.ShowPrice.toLowerCase() == "true") ? true : false;
        }
        if (showPrice == false) {
            $("#grid-popup .grouping .price").hide();
        }
        else {
            $("#grid-popup .grouping .price").show();
        }

		applyCustomDropdown();
		$("#grid-popup select").trigger("change");
	}
}

function renderGroupTooltipData(data, productData, crop, sharpen) {
	var i, n;
	var itemHTML = "";
	var groupHTML = "";
	var selectHTML = "";
	var outputHTML = "";
	var isInformational = false;
	var showPrice = true;
	var showDropdown = (data.d.ShowType1Dropdown != null)?data.d.ShowType1Dropdown:true;
	var price = "";

	if (locale.toLowerCase().indexOf("trade") > -1) {
		if (data.d.GroupTypeID == "7") {
			price = '<table class="gtrade-price">';
			if (typeof(data.d.SKUList[0].Price) != "undefined" && data.d.SKUList[0].Price != null && data.d.SKUList[0].Price != "0" && data.d.SKUList[0].Price != "" && data.d.SKUList[0].Price != " ") {
				price += '<tr><td>' + LABEL_US_RETAIL+ '</td><td>' + data.d.SKUList[0].Price + '</td></tr>';
			}
			if (typeof(data.d.SKUList[0].Wholesaleprice) != "undefined" && data.d.SKUList[0].Wholesaleprice != null && data.d.SKUList[0].Wholesaleprice != "0" && data.d.SKUList[0].Wholesaleprice != "" && data.d.SKUList[0].Wholesaleprice != " ") {
				price += '<tr><td>' + LABEL_WHOLE_SALE + '</td><td>' + data.d.SKUList[0].Wholesaleprice + '</td></tr>';
			}
			price += '</table>';
		}
		else {
			price = '<table class="gtrade-price">';
			if (typeof(data.d.Price) != "undefined" && data.d.Price != null && data.d.Price != "0" && data.d.Price != "" && data.d.Price != " ") {
				price += '<tr><td>' + LABEL_US_RETAIL + '</td><td>' + data.d.Price + '</td></tr>';
			}
			if (typeof(productData.Wholesaleprice) != "undefined" && productData.Wholesaleprice != null && productData.Wholesaleprice != "0" && productData.Wholesaleprice != "" && productData.Wholesaleprice != " ") {
				price += '<tr><td>' + LABEL_WHOLE_SALE + '</td><td>' + productData.Wholesaleprice + '</td></tr>';
			}
			price += '</table>';
		}
	}
	else {
		if (data.d.GroupTypeID == "7") {
			price = data.d.SKUList[0].Price;
		}
		else {
			price = data.d.Price;
		}
	}
	if (price == null) {price = "";}

	switch (locale.toLowerCase()) {
		case "zh-cn":
		case "zh-hant":
		case "intl":
		case "es-mx":
		case "ko-kr":
		case "pt-br":
			isInformational = true;
	}

    if (typeof data.d.ShowPrice != "undefined" && data.d.ShowPrice != null && data.d.ShowPrice.toLowerCase() == "false") {
        showPrice = false;
        price = "";
    }

	if (data.d.GroupTypeID == "1") {
		// Group 1 SKUs have one description and price, plus a drop-down menu.
		if (data.d.SKUList != null) {
		    itemHTML = templateStrings.tooltipGroupItemTemplate.split("$description$").join(data.d.Name).split("$price$").join(price).split("$setsLabel$").join("");
			groupHTML = templateStrings.tooltipGroupTemplate;

			if (data.d.SKUList.length > 0 && data.d.SKUList[0].LinkText != null && showDropdown != false) {
				if (data.d.IsColorSwatch != null && data.d.IsColorSwatch.toLowerCase() == "true") {
					groupHTML = groupHTML.split("$isColorSwatch$").join("apply-custom-drop color");
					selectHTML = '<select class="l1" data-crop="' + crop + '" data-sharpen="' + sharpen + '">';
					for (i = 0, n = data.d.SKUList.length; i < n; i++) {
						// Handle each item
					    //data-showprice attribute is added to handle scenarios for group type 2 with group type 1 
					    selectHTML += '<option value="' + data.d.SKUList[i].Sku + '" data-price="' + data.d.SKUList[i].Price + '" data-showprice="' + data.d.SKUList[i].ShowPrice + '" data-sku="' + data.d.SKUList[i].Sku + '" data-description="' + escape(data.d.SKUList[i].Name) + '" data-image="' + data.d.SKUList[i].ImgURL + '" data-is-purchasable="' + data.d.SKUList[i].isPurchasable + '" data-show-email-when-available="' + data.d.SKUList[i].ShowEmailWhenAvailable + '" data-swatch="' + data.d.SKUList[i].SwatchFile + '" data-save-visible="' + data.d.SKUList[i].ShowAddtoWishList + '" data-save-enabled="" data-wholesale="' + data.d.SKUList[i].Wholesaleprice + '">' + data.d.SKUList[i].LinkText + '</option>';
					}
					selectHTML += '</select>';
				}
				else {
					selectHTML = '<select data-crop="' + crop + '" data-sharpen="' + sharpen + '">';
					for (i = 0, n = data.d.SKUList.length; i < n; i++) {
						// Handle each item
					    //data-showprice attribute is added to handle scenarios for group type 2 with group type 1
					    selectHTML += '<option value="' + data.d.SKUList[i].Sku + '" data-price="' + data.d.SKUList[i].Price + '" data-showprice="' + data.d.SKUList[i].ShowPrice + '" data-sku="' + data.d.SKUList[i].Sku + '" data-description="' + escape(data.d.SKUList[i].Name) + '" data-image="' + data.d.SKUList[i].ImgURL + '" data-is-purchasable="' + data.d.SKUList[i].isPurchasable + '" data-show-email-when-available="' + data.d.SKUList[i].ShowEmailWhenAvailable + '" data-save-visible="' + data.d.SKUList[i].ShowAddtoWishList + '" data-save-enabled="" data-wholesale="' + data.d.SKUList[i].Wholesaleprice + '">' + data.d.SKUList[i].LinkText + '</option>';
					}
					selectHTML += '</select>';
				}
			}
			groupHTML = groupHTML.split("$select$").join(selectHTML);
			if (showDropdown != false) {
				groupHTML = groupHTML.split("$label$").join((data.d.MenuLabel != null) ? data.d.MenuLabel : "");
			}
			else {
				groupHTML = groupHTML.split("$label$").join("");
			}
			outputHTML = itemHTML + groupHTML;
		}
	}
	else if (data.d.GroupTypeID == "2") {
		// Group 2 SKUs have two or more descriptions and prices, plus one drop-down menu
		if (data.d.Group != null) {
			if (data.d.Group.SKUList != null) {

			    if (showPrice)
			        price = data.d.Group.Price;
			    else
			        price = "";

			    groupHTML = templateStrings.tooltipGroupType2Template.split("$description$").join(data.d.Group.Name).split("$price$").join(price).split("$id$").join(data.d.Group.Sku);

				if (data.d.Group.SKUList.length > 0 && data.d.Group.SKUList[0].LinkText != null && showDropdown != false) {
					if (data.d.IsColorSwatch != null && data.d.IsColorSwatch.toLowerCase() == "true") {
						groupHTML = groupHTML.split("$isColorSwatch$").join("apply-custom-drop");
						selectHTML = '<select class="l1" data-crop="' + crop + '" data-sharpen="' + sharpen + '">';
						for (i = 0, n = data.d.Group.SKUList.length; i < n; i++) {
							// Handle each item
						    //data-showprice attribute is added to handle scenarios for group type 2 with group type 1 
						    if (data.d.Group.SKUList[i].Price == null) { data.d.Group.SKUList[i].Price = ""; }
						    selectHTML += '<option value="' + data.d.Group.SKUList[i].Sku + '" data-price="' + data.d.Group.SKUList[i].Price + '" data-showprice="' + data.d.Group.SKUList[i].ShowPrice + '" data-sku="' + data.d.Group.SKUList[i].Sku + '" data-description="' + escape(data.d.Group.SKUList[i].Name) + '" data-image="' + data.d.Group.SKUList[i].ImgURL + '" data-is-purchasable="' + data.d.Group.SKUList[i].isPurchasable + '" data-show-email-when-available="' + data.d.Group.SKUList[i].ShowEmailWhenAvailable + '" data-swatch="' + data.d.Group.SKUList[i].SwatchFile + '" data-save-visible="' + data.d.Group.SKUList[i].ShowAddtoWishList + '" data-save-enabled="" data-wholesale="' + data.d.Group.SKUList[i].Wholesaleprice + '">' + data.d.Group.SKUList[i].LinkText + '</option>';
						}
						selectHTML += '</select>';
					}
					else {
						selectHTML = '<select data-crop="' + crop + '" data-sharpen="' + sharpen + '">';
						for (i = 0, n = data.d.Group.SKUList.length; i < n; i++) {
							// Handle each item
						    //data-showprice attribute is added to handle scenarios for group type 2 with group type 1 
						    if (data.d.Group.SKUList[i].Price == null) { data.d.Group.SKUList[i].Price = ""; }
						    selectHTML += '<option value="' + data.d.Group.SKUList[i].Sku + '" data-price="' + data.d.Group.SKUList[i].Price + '" data-showprice="' + data.d.Group.SKUList[i].ShowPrice + '" data-sku="' + data.d.Group.SKUList[i].Sku + '" data-description="' + escape(data.d.Group.SKUList[i].Name) + '" data-image="' + data.d.Group.SKUList[i].ImgURL + '" data-is-purchasable="' + data.d.Group.SKUList[i].isPurchasable + '" data-show-email-when-available="' + data.d.Group.SKUList[i].ShowEmailWhenAvailable + '" data-save-visible="' + data.d.Group.SKUList[i].ShowAddtoWishList + '" data-save-enabled="" data-wholesale="' + data.d.Group.SKUList[i].Wholesaleprice + '">' + data.d.Group.SKUList[i].LinkText + '</option>';
						}
						selectHTML += '</select>';
					}
				}

				groupHTML = groupHTML.split("$select$").join(selectHTML);
				if (showDropdown != false) {
					groupHTML = groupHTML.split("$label$").join((data.d.Group.MenuLabel != null) ? data.d.Group.MenuLabel : "");
				}
				else {
					groupHTML = groupHTML.split("$label$").join("");
				}
			}
		}
		if (data.d.SKUList != null) {
			for (i = 0, n = data.d.SKUList.length; i < n; i++) {
				// Handle each item
			    if (data.d.SKUList[i].Price == null) { data.d.SKUList[i].Price = ""; }

			    //Add individual item price here. Based on show price, the price would be hidden in parent call
                //The price is required to be added as 
			    price = data.d.SKUList[i].Price;
			    
			    itemHTML += templateStrings.tooltipGroupItemTemplate.split("$description$").join(data.d.SKUList[i].Name).split("$price$").join(price).split("$id$").join(data.d.SKUList[i].Sku).split("$setsLabel$").join("");
			}
		}
		outputHTML = groupHTML + itemHTML;
	}
	else if (data.d.GroupTypeID == "7") {
		if (data.d.SKUList != null) {
			itemHTML = templateStrings.tooltipGroupItemTemplate.split("$description$").join(data.d.Name).split("$price$").join(price);
			groupHTML = templateStrings.tooltipGroupTemplate;
			if (data.d.SKUList.length > 0 && data.d.SKUList[0].LinkText != null && showDropdown != false) {
				if (data.d.IsColorSwatch != null && data.d.IsColorSwatch.toLowerCase() == "true") {
					groupHTML = groupHTML.split("$isColorSwatch$").join("apply-custom-drop color");
					selectHTML = '<select class="l1" data-crop="' + crop + '" data-sharpen="' + sharpen + '">';
					for (i = 0, n = data.d.SKUList.length; i < n; i++) {
						// Handle each item
					    //data-showprice attribute is added to handle scenarios for group type 2 with group type 1 
					    selectHTML += '<option value="' + data.d.SKUList[i].Sku + '" data-price="' + data.d.SKUList[i].Price + '" data-showprice="' + data.d.SKUList[i].ShowPrice + '" data-sku="' + data.d.SKUList[i].Sku + '" data-description="' + escape(data.d.SKUList[i].Name) + '" data-image="' + data.d.SKUList[i].ImgURL + '" data-is-purchasable="' + data.d.SKUList[i].isPurchasable + '" data-show-email-when-available="' + data.d.SKUList[i].ShowEmailWhenAvailable + '" data-swatch="' + data.d.SKUList[i].SwatchFile + '" data-save-visible="' + data.d.SKUList[i].ShowAddtoWishList + '" data-save-enabled="" data-wholesale="' + data.d.SKUList[i].Wholesaleprice + '">' + data.d.SKUList[i].LinkText + '</option>';
					}
					selectHTML += '</select>';
				}
				else {
					selectHTML = '<select data-crop="' + crop + '" data-sharpen="' + sharpen + '">';
					for (i = 0, n = data.d.SKUList.length; i < n; i++) {
						// Handle each item
					    //data-showprice attribute is added to handle scenarios for group type 2 with group type 1 
					    selectHTML += '<option value="' + data.d.SKUList[i].Sku + '" data-price="' + data.d.SKUList[i].Price + '" data-showprice="' + data.d.SKUList[i].ShowPrice + '" data-sku="' + data.d.SKUList[i].Sku + '" data-description="' + escape(data.d.SKUList[i].Name) + '" data-image="' + data.d.SKUList[i].ImgURL + '" data-is-purchasable="' + data.d.SKUList[i].isPurchasable + '" data-show-email-when-available="' + data.d.SKUList[i].ShowEmailWhenAvailable + '" data-save-visible="' + data.d.SKUList[i].ShowAddtoWishList + '" data-save-enabled="" data-wholesale="' + data.d.SKUList[i].Wholesaleprice + '">' + data.d.SKUList[i].LinkText + '</option>';
					}
					selectHTML += '</select>';
				}
			}

			if (data.d.GroupSkuMultiple != null && data.d.isPurchasable == true) {
				itemHTML = itemHTML.split("$setsLabel$").join(templateStrings.soldInSetsLabel.split("$n$").join(data.d.GroupSkuMultiple));
			}
			else {
				itemHTML = itemHTML.split("$setsLabel$").join("");
			}

			groupHTML = groupHTML.split("$select$").join(selectHTML);
			if (showDropdown != false) {
				groupHTML = groupHTML.split("$label$").join((data.d.MenuLabel != null) ? data.d.MenuLabel : "");
			}
			else {
				groupHTML = groupHTML.split("$label$").join("");
			}
			outputHTML = itemHTML + groupHTML;
		}
	}
	return outputHTML;
}

function handleAddToShoppingBag(sku, source) {
	var productData = null;
	var groupData = null;
	var model = StateModel.getInstance();
	var primarySku = sku;
	var skuArray = [];
	var description = "";
	var price = "";
	var quantity = "";
	var selectedSku = "";
	var i, n;

	if (source == "tooltip") {
		productData = StateModel.getInstance().getProduct(sku);
		groupData = model.custom.tooltipGroupDataLookup[sku];

		if (groupData != null && typeof (groupData) != "undefined") {
			// Group SKU
			selectedSku = $("#grid-popup select").val();
			if (groupData.d.GroupTypeID == "1" || groupData.d.GroupTypeID == "7") {
				for (i = 0, n = groupData.d.SKUList.length; i < n; i++) {
					if (groupData.d.SKUList[i].Sku == selectedSku) {
						price = groupData.d.SKUList[i].Price;
						description = groupData.d.SKUList[i].Name;
					}
				}
				skuArray.push({ sku: sku, qty: 1 });
			}
			else if (groupData.d.GroupTypeID == "2") {
				if (typeof(groupData.d.Group) != "undefined" && groupData.d.Group != null) {				
					for (i = 0, n = groupData.d.Group.SKUList.length; i < n; i++) {
						if (groupData.d.Group.SKUList[i].Sku == selectedSku) {
							price = groupData.d.Group.SKUList[i].Price;
							description = groupData.d.Group.SKUList[i].Name;
						}
					}
					skuArray.push({ sku: groupData.d.Group.Sku, qty: 1 });
				}
				for (i = 0, n = groupData.d.SKUList.length; i < n; i++) {
					skuArray.push({ sku: groupData.d.SKUList[i].Sku, qty: 1 });
				}
			}
		}
		else {
			// individual SKU
			price = productData.Price;
			selectedSku = sku;
			description = (productData.Name == null) ? "" : productData.Name;
			skuArray.push({ sku: sku, qty: 1 });
		}
	} else if (source == "digitalCatalogList") {
		productData = model.custom.tooltipCatalogDataLookup[sku];

		if (productData.IsGroup == null || productData.IsGroup.toLowerCase() == "true") {
			// Group SKU
			selectedSku = $(".digital-catalog-item[data-sku="+sku+"] select").val();
			if (productData.GroupTypeID == "1" || productData.GroupTypeID == "7") {
				for (i = 0, n = productData.SKUList.length; i < n; i++) {
					if (productData.SKUList[i].Sku == selectedSku) {
						price = productData.SKUList[i].Price;
						description = productData.SKUList[i].Name;
					}
				}
				skuArray.push({ sku: sku, qty: 1 });
			}
			else if (productData.GroupTypeID == "2") {
				if (typeof(productData.Group) != "undefined" && productData.Group != null) {				
					for (i = 0, n = productData.Group.SKUList.length; i < n; i++) {
						if (productData.Group.SKUList[i].Sku == selectedSku) {
							price = productData.Group.SKUList[i].Price;
							description = productData.Group.SKUList[i].Name;
						}
					}
					skuArray.push({ sku: productData.Group.Sku, qty: 1 });
				}
				for (i = 0, n = productData.SKUList.length; i < n; i++) {
					skuArray.push({ sku: productData.SKUList[i].Sku, qty: 1 });
				}
			}
		}
		else {
			// individual SKU
			price = productData.Price;
			selectedSku = sku;
			description = (productData.Name == null) ? "" : productData.Name;
			skuArray.push({ sku: sku, qty: 1 });
		}	
	}
	if (source != "digitalCatalogList") {
		$("#grid-popup a.add").attr("data-old-label", $("#grid-popup a.add").text()).attr("data-old-url", $("#grid-popup a.add").attr("href"));
		//IBM BT # 9861 Error message is shown while adding an item to the Shopping Bag.
		$("#grid-popup a.add").removeClass("add-to-bag")
		$("#grid-popup a.add").css('opacity',0.5);
		$("#grid-popup a.add").removeAttr('href');
	} else {
		$(".digital-catalog-item[data-sku="+sku+"] a.add").attr("data-old-label", $(".digital-catalog-item[data-sku="+sku+"] a.add").text()).attr("data-old-url", $(".digital-catalog-item[data-sku="+sku+"] a.add").attr("href"));
	}
	links = '<a href="#" class="l6 add">' + inlineAddToBag + '</a> / <a href="#" class="l6 remove">' + LABEL_REMOVE + '</a>';
	InlineShoppingBagManager.getInstance().addToShoppingBag(primarySku, skuArray, description, price, selectedSku, source);
	
}

function handleEmailWhenAvailable(sku, source) {
	var productData = null;
	var groupData = null;
	var model = StateModel.getInstance();
	var query = window.location.search.split("?").join("");
	var cid = URLFactory.extractQueryStringValue(query, "cid");
	var selectedSku = "";
	var pageSource = "";
	if ($("#categoryBrowsePage").length > 0) {
		if (URLFactory.extractQueryStringValue(window.location.search.split("?").join(""), "search") == 1) {
			pageSource = "Search";
		} else {
			pageSource = "BrowseGrid";
		}
	} else if ($("#itemPage").length > 0) {
		pageSource = "ItemPage";
	}
	if (source == "tooltip") {
		productData = StateModel.getInstance().getProduct(sku);
		groupData = model.custom.tooltipGroupDataLookup[sku];

		if (groupData != null && typeof (groupData) != "undefined") {
			// Group SKU
			selectedSku = $("#grid-popup select").val();
		}
	} else if (source == "digitalCatalogList") {
		productData = model.custom.tooltipCatalogDataLookup[sku];

		if (productData.IsGroup == null || productData.IsGroup.toLowerCase() == "true") {
			// Group SKU
			selectedSku = $(".digital-catalog-item[data-sku="+sku+"] select").val();
		}
	}
    OverlayManager.getInstance().open("linkEmailWhenAvailable", {
        url: "/Customer/Request/EmailWhenItemAvailable.aspx?source="+pageSource+"&selectedsku="+selectedSku+"&sku="+sku+"&cid="+cid,
        size: "skinny",
        iframe: true,
        position: "",
        bgstyle: ""
    });	
}

function handleSaveForLater(sku, source) {
	var productData = null;
	var groupData = null;
	var model = StateModel.getInstance();
	var primarySku = sku;
	var skuArray = [];
	var description = "";
	var price = "";
	var quantity = "";
	var selectedSku = "";
	var i, n;

	if (source == "tooltip") {
		productData = StateModel.getInstance().getProduct(sku);
		groupData = model.custom.tooltipGroupDataLookup[sku];

		if (groupData != null && typeof (groupData) != "undefined") {
			// Group SKU
			selectedSku = $("#grid-popup select").val();
			if (typeof (selectedSku) == "undefined" || selectedSku == null || selectedSku == "") {
				selectedSku = groupData.d.DefaultSku;
			}
			if (groupData.d.GroupTypeID == "1" || groupData.d.GroupTypeID == "7") {
				for (i = 0, n = groupData.d.SKUList.length; i < n; i++) {
					if (groupData.d.SKUList[i].Sku == selectedSku) {
						price = groupData.d.SKUList[i].Price;
						description = groupData.d.SKUList[i].Name;
					}
				}
				skuArray.push({ sku: selectedSku, qty: 1 });
			}
			else if (groupData.d.GroupTypeID == "2") {
				if (typeof(groupData.d.Group) != "undefined" && groupData.d.Group != null) {				
					for (i = 0, n = groupData.d.Group.SKUList.length; i < n; i++) {
						if (groupData.d.Group.SKUList[i].Sku == selectedSku) {
							price = groupData.d.Group.SKUList[i].Price;
							description = groupData.d.Group.SKUList[i].Name;
						}
					}
					skuArray.push({ sku: groupData.d.Group.Sku, qty: 1 });
				}
				for (i = 0, n = groupData.d.SKUList.length; i < n; i++) {
					skuArray.push({ sku: groupData.d.SKUList[i].Sku, qty: 1 });
				}
			}
		}
		else {
			// individual SKU
			price = productData.Price;
			description = (productData.Name == null) ? "" : productData.Name;
			skuArray.push({ sku: sku, qty: 1 });
		}
	} else if (source == "digitalCatalogList") {
		productData = model.custom.tooltipCatalogDataLookup[sku];

		if (productData.IsGroup == null || productData.IsGroup.toLowerCase() == "true") {
			// Group SKU
			selectedSku = $(".digital-catalog-item[data-sku="+sku+"] select").val();
			if (typeof (selectedSku) == "undefined" || selectedSku == null || selectedSku == "") {
				selectedSku = productData.DefaultSku;
			}
			if (productData.GroupTypeID == "1" || productData.GroupTypeID == "7") {
				for (i = 0, n = productData.SKUList.length; i < n; i++) {
					if (productData.SKUList[i].Sku == selectedSku) {
						price = productData.SKUList[i].Price;
						description = productData.SKUList[i].Name;
					}
				}
				skuArray.push({ sku: selectedSku, qty: 1 });
			}
			else if (productData.GroupTypeID == "2") {
				if (typeof(productData.Group) != "undefined" && productData.Group != null) {				
					for (i = 0, n = productData.Group.SKUList.length; i < n; i++) {
						if (productData.Group.SKUList[i].Sku == selectedSku) {
							price = productData.Group.SKUList[i].Price;
							description = productData.Group.SKUList[i].Name;
						}
					}
					skuArray.push({ sku: productData.Group.Sku, qty: 1 });
				}
				for (i = 0, n = productData.SKUList.length; i < n; i++) {
					skuArray.push({ sku: productData.SKUList[i].Sku, qty: 1 });
				}
			}
		}
		else {
			// individual SKU
			price = productData.Price;
			description = (productData.Name == null) ? "" : productData.Name;
			skuArray.push({ sku: sku, qty: 1 });
		}	
	}

	$("#grid-popup a.save").attr("data-old-label", $("#grid-popup a.save").text()).attr("data-old-url", $("#grid-popup a.save").attr("href"));
	//$("#grid-popup a.save").html('<span class="plus">+</span> ' + LABEL_ADDED_TO_SAVED_ITEMS).attr("href", "javascript:void(0)").removeClass("add-to-saved");

	InlineShoppingBagManager.getInstance().addToSavedItems(primarySku, skuArray, description, price, selectedSku);
}

$("body").on("change","#grid-popup select", function () {
	// Respond to a change in the group dropdown
	var $selectedOption = $('option:selected', this);
	var i, n;
	var imgURL = $selectedOption.attr("data-image");
	var selectedSku = $selectedOption.attr("data-sku");
	var description = unescape($selectedOption.attr("data-description"));
	var price = $selectedOption.attr("data-price");
	var showPrice = $selectedOption.attr("data-showprice"); //data-showprice attribute is added to handle scenarios for group type 2 with group type 1
	var wholesale = $selectedOption.attr("data-wholesale");
	var isPurchasable = $selectedOption.attr("data-is-purchasable");
	var showEmailWhenAvailable = $selectedOption.attr("data-show-email-when-available");
	var isSaveForLaterVisible = $selectedOption.attr("data-save-visible");
	var sharpen = $(this).attr("data-sharpen");
	var crop = $(this).attr("data-crop");
	var preset = ($("#grid-popup").hasClass("double") == true) ? "$EcomBrowseL$" : "$EcomBrowseM$";
	var currentGrouping = $(this).closest("div.grouping");

	if (locale.toLowerCase() == "en-us-estr" || locale.toLowerCase() == "ja-jp-estr") {
		isSaveForLaterVisible = "false";
	}

	if (CookieManager.areCookiesEnabled() == false) {
		isSaveForLaterVisible = false;
		isPurchasable = false;
	}

	if (imgURL != null && imgURL != "") {
		imgURL = URLFactory.scene7ImageURL(imgURL, preset, sharpen, crop)
	}

	if (isPurchasable.toLowerCase() == "false") {
		if (showEmailWhenAvailable.toLowerCase() == "true") {
			$("#grid-popup .out-of-stock").show();
			$("#grid-popup .emailMe").show();
		} else {
			$("#grid-popup .emailMe").hide();
		}
		$("#grid-popup .add").hide();
	}
	else {
		$("#grid-popup .out-of-stock").hide();
		$("#grid-popup .emailMe").hide();
		$("#grid-popup .add").show();
	}

	if (isSaveForLaterVisible.toLowerCase() == "false") {
		$("#grid-popup .add-to-saved").hide();
		$("#grid-popup .item-links .slash").hide();
	}
	else {
		$("#grid-popup .add-to-saved").show();
		$("#grid-popup .item-links .slash").show();
	}

	if (imgURL != null) {
		$("#grid-popup .image img").attr("src", imgURL).attr("alt", description.replace(/"/g,"&quot;"));
	}
	$("#grid-popup .image a").attr("href", URLFactory.updateQuery($("#grid-popup .image a").attr("href"), "selectedsku", selectedSku));
	$("#grid-popup .item-links .details").attr("href", URLFactory.updateQuery($("#grid-popup .image a").attr("href"), "selectedsku", selectedSku));

	//For group type 2 with group type 1, price of all items should be hidden/shown entirely 
	//For group type 1, price is shown as it was.
	if (showPrice.toLowerCase() == "false") {
	    $("#grid-popup .grouping .price").hide();
	}
	else {
	    if (currentGrouping.find(".price").length > 0) {
	        currentGrouping.find(".price").html(price);
	    } else {
	        currentGrouping.prev().find(".price").html(price);
	    }
	    $("#grid-popup .grouping .price").show();
	}
	
	if (currentGrouping.find(".description").length > 0) {
		currentGrouping.find(".description").html(description);
	} else {
		currentGrouping.prev().find(".description").html(description);
	}

	if (locale.toLowerCase().indexOf("trade") > -1) {
		price = '<tr><td>' + LABEL_US_RETAIL + '</td><td>' + price + '</td></tr>';
		price += '<tr><td>' + LABEL_WHOLE_SALE + '</td><td>' + wholesale + '</td></tr>';
		$(".gtrade-price").html(price);
	}
});
// End get group data service for product item tooltip component

$("body").on("change",".digital-catalog-item select", function () {
	// Respond to a change in the group dropdown
	var $selectedOption = $('option:selected', this);
	var i, n;
	var imgURL = $selectedOption.attr("data-image");
	var selectedSku = $selectedOption.attr("data-sku");
	var description = unescape($selectedOption.attr("data-description"));
	var price = $selectedOption.attr("data-price");
	var showPrice = $selectedOption.attr("data-showprice"); //data-showprice attribute is added to handle scenarios for group type 2 with group type 1
	var wholesale = $selectedOption.attr("data-wholesale");
	var isPurchasable = $selectedOption.attr("data-is-purchasable");
	var showEmailWhenAvailable = $selectedOption.attr("data-show-email-when-available");
	var isSaveForLaterVisible = $selectedOption.attr("data-save-visible");
	var sharpen = $(this).attr("data-sharpen");
	var crop = $(this).attr("data-crop");
	var preset = "$EcomBrowseM$";
	var currentGrouping = $(this).closest("div.grouping");
	var catalogItem = $(this).closest(".digital-catalog-item");
	var addBtn = $(this).closest(".info").find("a.add");

	if (locale.toLowerCase() == "en-us-estr" || locale.toLowerCase() == "ja-jp-estr") {
		isSaveForLaterVisible = "false";
	}

	if (CookieManager.areCookiesEnabled() == false) {
		isSaveForLaterVisible = false;
		isPurchasable = false;
	}

	if (imgURL != null && imgURL != "") {
		imgURL = URLFactory.scene7ImageURL(imgURL, preset, sharpen, crop)
	}

	if (isPurchasable.toLowerCase() == "false") {
		if (showEmailWhenAvailable.toLowerCase() == "true") {
			catalogItem.find(".out-of-stock").show();
			catalogItem.find(".emailMe").show();
		}  else {
			catalogItem.find(".emailMe").hide();
		}
		catalogItem.find(".add").hide();
	}
	else {
		catalogItem.find(".add").show();
		catalogItem.find(".out-of-stock").hide();
		catalogItem.find(".emailMe").hide();		
	}

	if (isSaveForLaterVisible.toLowerCase() == "false") {
		catalogItem.find(".add-to-saved").hide();
	}
	else {
		catalogItem.find(".add-to-saved").show();
	}

	if (imgURL != null) {
		catalogItem.find(".image img").attr("src", imgURL).attr("alt", description.replace(/"/g,"&quot;"));
	}
	catalogItem.find(".image a").attr("href", URLFactory.updateQuery(catalogItem.find(".image a").attr("href"), "selectedsku", selectedSku));
	catalogItem.find(".item-links .details").attr("href", URLFactory.updateQuery(catalogItem.find(".image a").attr("href"), "selectedsku", selectedSku));

	//For group type 2 with group type 1, price of all items should be hidden/shown entirely 
	//For group type 1, price is shown as it was.
	if (showPrice.toLowerCase() == "false") {
	    catalogItem.find(".grouping .price").hide();
	}
	else {
	    if (currentGrouping.find(".price").length > 0) {
	        currentGrouping.find(".price").html(price);
	    } else {
	        currentGrouping.prev().find(".price").html(price);
	    }
	    catalogItem.find(".grouping .price").show();
	}
	
	if (currentGrouping.find(".description").length > 0) {
		currentGrouping.find(".description").html(description);
	} else {
		currentGrouping.prev().find(".description").html(description);
	}
	
	if (typeof addBtn.attr("data-old-label") != "undefined") {
		addBtn.text(addBtn.attr("data-old-label"));
	}
	if (typeof addBtn.attr("data-old-url") != "undefined") {
		addBtn.attr("href", addBtn.attr("data-old-url"));
	}	

});
function resizeIframe(newHeight) {
	OverlayManager.getInstance().resize(newHeight);
}

function openReportWindow(url, width, height) {
    if (typeof (width) == "undefined") {width = 600;}
    if (typeof (height) == "undefined") {height = 780;}
    attrib = "width=" + width + ",height=" + height + ",menubar=no,personalbar=no,titlebar=no,toolbar=no,location=no,resizable=yes,scrollbars=yes";
    win = window.open(url, 'name', attrib);
}

function linkPrivacyPolicy() {
    if (isSmallMobile()) {
        initialScrollPosition = $(window).scrollTop();
        $("#frmMain").hide();
        doMobOverlay(300, 1300, "/Customer/Checkout/PrivacyPolicy.aspx?redesign=false");
    } else {
        OverlayManager.getInstance().open("linkPrivacyPolicy",{
            url: "/Customer/Checkout/PrivacyPolicy.aspx?redesign=true",
            size: "skinny",
            iframe: false,
            position: "",
            bgstyle: ""
        });
    }
}

function linkTermsOfUse() {
    if (isSmallMobile()) {
        initialScrollPosition = $(window).scrollTop();
        $("#frmMain").hide();
        doMobOverlay(300, 1300, "/Customer/Checkout/AboutTermsOfUse.aspx?redesign=false");
    } else {
        OverlayManager.getInstance().open("linkTermsOfUse", {
            url: "/Customer/Checkout/AboutTermsOfUse.aspx?redesign=true",
            size: "skinny",
            iframe: false,
            position: "",
            bgstyle: ""
        });
    }
}

function linkTermsOfSale() {
    if (isSmallMobile()) {
        initialScrollPosition = $(window).scrollTop();
        $("#frmMain").hide();
        doMobOverlay(300, 1300, "/Customer/Checkout/AboutTermsOfSale.aspx?redesign=false");
    } else {
        OverlayManager.getInstance().open("linkTermsOfSale", {
            url: "/Customer/Checkout/AboutTermsOfSale.aspx?redesign=true",
            size: "skinny",
            iframe: false,
            position: "",
            bgstyle: ""
        });
    }
}

function linkShoppingFAQs() {
    if (isSmallMobile()) {
        initialScrollPosition = $(window).scrollTop();
        $("#frmMain").hide();
        doMobOverlay(300, 1300, "/Customer/Checkout/ShoppingFaq.aspx");
    } else {
        OverlayManager.getInstance().open("linkShoppingFAQs", {
            url: "/Customer/Checkout/ShoppingFaq.aspx",
            size: "skinny",
            iframe: true,
            position: "",
            bgstyle: ""
        });
    }
}
function linkShippingRatesTimes() {
    if (isSmallMobile()) {
        initialScrollPosition = $(window).scrollTop();
        $("#frmMain").hide();
        doMobOverlay(300, 1300, "/Service/FaqOverlay.aspx?faqCode=linkshippingratestimes&showBnr=true&redesign=false");
    } else {
        OverlayManager.getInstance().open("linkShippingRatesTimes", {
            url: "/Service/FaqOverlay.aspx?faqCode=linkshippingratestimes&showBnr=true&redesign=true",
            size: "skinny",
            iframe: false,
            position: "",
            bgstyle: ""
        });
    }
}
function linkAboutEngraving() {
    if (isSmallMobile()) {
        initialScrollPosition = $(window).scrollTop();
        $("#frmMain").hide();
        doMobOverlay(300, 1300, "/Service/FaqOverlay.aspx?faqCode=linkaboutengraving&redesign=false");
    } else {
        OverlayManager.getInstance().open("linkAboutEngraving", {
            url: "/Service/FaqOverlay.aspx?faqCode=linkaboutengraving&redesign=true",
            size: "skinny",
            iframe: false,
            position: "",
            bgstyle: ""
        });
    }
}

function linkGemstoneCareEnhancement() {
    if (isSmallMobile()) {
        initialScrollPosition = $(window).scrollTop();
        $("#frmMain").hide();
        doMobOverlay(780, 1300, "/Customer/Checkout/GemstoneCare.aspx?redesign=false");
    } else {
        OverlayManager.getInstance().open("linkGemstoneCareEnhancement", {
            url: "/Customer/Checkout/GemstoneCare.aspx?redesign=true",
            size: "full",
            iframe: false,
            position: "",
            bgstyle: ""
        });
    }
}

function linkProp65() {
    if (isSmallMobile()) {
        initialScrollPosition = $(window).scrollTop();
        $("#frmMain").hide();
        doMobOverlay(300, 1300, "/Service/FaqOverlay.aspx?faqCode=linkprop65&redesign=false");
    } else {
        OverlayManager.getInstance().open("linkProp65", {
            url: "/Service/FaqOverlay.aspx?faqCode=linkprop65&redesign=true",
            size: "skinny",
            iframe: false,
            position: "",
            bgstyle: ""
        });
    }
}

function linkEmailThisPage(emailURL) {
    OverlayManager.getInstance().open("linkEmailThisPage", {
        url: "/Customer/Request/"+emailURL,
        size: "skinny",
        iframe: true,
        position: "",
        bgstyle: ""
    });
}

//get request parameters by name
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//implement String.format function into js
String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
}

function linkLoveStory(storyId) {
//    var url = "/WorldOfTiffany/WMLT/Stories/Text.aspx?ContentLinkID=" + storyId;
//    var state = getParameterByName("state");
//    if (state != null && state != '') {
//        url += "&state=" + state;
//    }

    OverlayManager.getInstance().open("linkLoveStory", {
        url: "/WorldOfTiffany/WMLT/Stories/Text.aspx?ContentLinkID="+storyId,
        //url: url,
        size: "full",
        iframe: false,
        position: "top",
        bgstyle: ""
    });
}

//added TextOverlay Email change, reset the emial link href
function TextOverlayEmail(objEmail, emailOverlayParams) {
    //alert(parent.location.pathname + parent.location.search + parent.location.hash);
    objEmail.href = "/Customer/Request/EmailRequest.aspx?" + emailOverlayParams + "&dest=" + encodeURIComponent(parent.location.pathname + parent.location.search + parent.location.hash);
}

function linkLoveStoryVideo(videoId) {
    OverlayManager.getInstance().open("linkLoveStoryVideo", {
        url: "/Video/VideoOverlay.aspx?config=/WorldOfTiffany/WMLT/Stories/StoryData.aspx?contentLinkID="+videoId,
        size: "full",
        iframe: true,
        position: "top",
        bgstyle: ""
    });
}

function doMobOverlay(oWidth, oHeight, destURL) {
    var theIframe = '<iframe id="iframeContent" name="iframeContent" src="' + destURL + '" style="border:0; width:' + oWidth + 'px; height:' + oHeight + 'px" frameborder="0" scrolling="no"></iframe>';
    var theHolder = '<div id="divPopUp" class="divPopUp" style="border: none; position: static; left: 0px; margin: 10px !important; width: 300px;">'+theIframe+'</div>';
    $("body").append(theHolder);
    $(window).scrollTop(0);
}

function closePopUp() {
    $("#divPopUp").remove();
    $("#frmMain").show();
    $(window).scrollTop(initialScrollPosition);
}

function c() {
    OverlayManager.getInstance().open("linkDiamondCertificate", {
        url: "/Service/FaqOverlay.aspx?faqCode=linkdiamondcertificate&redesign=true",
        size: "wide",
        iframe: false,
        position: "",
        bgstyle: ""
    });
}

function linkShipToPOBox() {
    OverlayManager.getInstance().open("linkShipToPOBox", {
        url: "/Service/FaqOverlay.aspx?faqCode=linkshippingratestimes&redesign=true",
        size: "skinny",
        iframe: false,
        position: "",
        bgstyle: ""
    });
}

function linkItradeItemDemandPage(linkSrc) {

    OverlayManager.getInstance().open("linkItradeItemDemandPage", {
        url: "/shopping/" + linkSrc,
        size: "skinny",
        iframe: true,
        position: "",
        bgstyle: ""
    });

}

function LinkOutToSubscribe() {
    OverlayManager.getInstance().open("LinkOutToSubscribe", {
        url: "/Customer/Request/EmailSignUpOverlay.aspx",
        size: "skinny",
        iframe: true,
        position: "",
        bgstyle: ""
    });
}

function updateCustomDrop(styledSelectId) {
    var options = $("#" + styledSelectId).find("option");
    var selectedOption = $("#" + styledSelectId).find("select").val();
    var list = "";
    var selectedLabel = "";
    options.each(function () {
    	if ($(this).attr("value") == "---") {
    		list += '<li rel="' + $(this).attr("value") + '" class="separator">';
    	} else {
    		list += '<li rel="' + $(this).attr("value") + '">';
    	}
    	list += $(this).text();
    	list += '</li>';
    	if ($(this).val() == selectedOption) {
    		selectedLabel = $(this).text();
    	}
    });
    $("div[rel=" + styledSelectId + "] ul").html(list);
    if ($("div[rel=" + styledSelectId + "] ul").find('li[rel="' + selectedOption + '"]').length > 0) {
        $("div[rel=" + styledSelectId + "] ul").find('li[rel="' + selectedOption + '"]').addClass("active");
    }
    if (selectedLabel != "") {
		// Update selected item
    	$("#" + styledSelectId).parent().find(".choice").text(selectedLabel);
	}

    $("#" + styledSelectId + " .rollbar").trigger('rollbar', 'reset');
}


var StoryNav = (function () {

    // NEED CROSS-BROWSER TRANSITION END

    var maxNum = 6,
        bClass = $('body').attr('class');

    if (bClass) {
        if (bClass.indexOf('tts-design') >= 0) {
            // We're in the Design section
            maxNum = 7;
        }
    }
    

    
    var $page = $('.tts-nav-list').find("."+$("body").attr("id")),
        currScreen = 0,
        numScreens = 0,
        touchStart = '',
        touchMove = '',
        touchEnd = '',
        startX,
        startY,
        dx,
        dy,
        threshold = 10,
        wasSwiped = false;

    // private methods
    function displayNav($item) {
        var $subList = $item.parent(),
            $theWindow = $subList.parent('span');
            totalNum = $subList.children().length,
            pos = $item.index();
            //numScreens = 0;

        // Display sub-nav window
        $theWindow.css("display","block"); 

        // Number of sub-nav "screens"
        numScreens = Math.round(totalNum/maxNum)

        // Determine current screen
        for (i=0;i<numScreens;i++) { // iterate through the screens
            $subList.children().each (function(j) { // go through each sub-nav item
                if (((j+1) > (i * maxNum)) && ((j+1) <= (maxNum + (i * maxNum)))) {;
                    if (pos == j) {
                        currScreen = i;
                    }
                }
            })
        }

        // Adjust the window and offset
        adjustNavDisplay(currScreen,numScreens,maxNum,$theWindow)
        $(window).resize(function () {
            adjustNavDisplay(currScreen,numScreens,maxNum,$theWindow)
        });

        // Add the scrolling controls
        if (totalNum > maxNum) { // If the scrolling controls are needed
            if (!($('.tts-nav-arrow').length)) { // and they aren't already on the page
                $('.tts-nav-list span').append('<a class="tts-nav-arrow tts-nav-up"><img src="/shared/images/wot/up_arrow.png" /></a>');
                $('.tts-nav-list span').append('<a class="tts-nav-arrow tts-nav-down"><img src="/shared/images/wot/down_arrow.png" /></a>');
                if (currScreen == 0) {
                    $('.tts-nav-up').addClass('disabled');
                    $('.tts-nav-down').removeClass('disabled');
                } else if (currScreen == (numScreens-1)) {
                    $('.tts-nav-down').addClass('disabled');
                    $('.tts-nav-up').removeClass('disabled');
                }
            }

            $('.tts-nav-arrow').click(function() {

                $(this).siblings('ul').addClass('tts-nav-scroll'); //for transition animation

                if ($(this).hasClass('tts-nav-up')) {

                    if (currScreen != 0) {
                        // Slide slide screen up
                        adjustNavDisplay(currScreen,numScreens,maxNum,$theWindow,'up');
                    }

                } else {

                    if (currScreen != (numScreens-1)) {
                        // Slide slide screen down
                        adjustNavDisplay(currScreen,numScreens,maxNum,$theWindow,'down')

                    }
                }

            });
        }


    }

    function adjustNavDisplay(theCurrScreen,numScreens,maxNum,theWindow,direction) {

        var windowHeight = 0,
            windowData = [],
            offset = 0,
            offsetAdj = 0;

        // Calculate the needed height
        for (i=0;i<numScreens;i++) { // iterate through the screens
            theWindow.find('.sub').children().each( function(j) {
                var height = $(this).outerHeight(); // calculate the height of each
                if (((j+1) > (i * maxNum)) && ((j+1) <= (maxNum + (i * maxNum)))) {
                    windowHeight += height;
                }
            })
            windowData[i] = windowHeight;
            windowHeight = 0;
        }

        // set the window height
        theWindow.height(windowData[currScreen]);

        // Offset the sub-nav based on the current screen
        for (i=0;i<theCurrScreen;i++) {
            offset += windowData[i];
            theWindow.find('.sub').css('top','-'+offset+'px');
        }

        // if sliding
        if (direction == 'up') {
            var currOffset = parseInt(theWindow.find('.sub').css('top'));
            offsetAdj = windowData[currScreen-1];
            theWindow.find('.sub').css('top',(currOffset+offsetAdj)+'px');
            currScreen = theCurrScreen-1;

            //$('.tts-nav-scroll').bind(eventName, function() {
            $('.tts-nav-scroll').bind("webkitTransitionEnd", function() {
                adjustNavDisplay(currScreen,numScreens,maxNum,theWindow);
               $('.tts-nav-scroll').unbind("webkitTransitionEnd");
            });
            $('.tts-nav-scroll').bind("transitionend", function() { // Mozilla & IE
                adjustNavDisplay(currScreen,numScreens,maxNum,theWindow);
               $('.tts-nav-scroll').unbind("webkitTransitionEnd");
            });
        } else if (direction == 'down') {
            if (currScreen<(numScreens-1)) {
                if (theWindow.find('.sub').css('top') == 'auto') {
                    var currOffset = 0;
                } else {
                    var currOffset = parseInt(theWindow.find('.sub').css('top'));
                }
                offsetAdj = windowData[currScreen+1];
                theWindow.find('.sub').css('top',(currOffset-offsetAdj)+'px');
                currScreen = theCurrScreen+1;

                $('.tts-nav-scroll').bind("webkitTransitionEnd", function() {
                    adjustNavDisplay(currScreen,numScreens,maxNum,theWindow);
                    $('.tts-nav-scroll').unbind("webkitTransitionEnd");
                });
                $('.tts-nav-scroll').bind("transitionend", function() { // Mozilla & IE
                    adjustNavDisplay(currScreen,numScreens,maxNum,theWindow);
                    $('.tts-nav-scroll').unbind("webkitTransitionEnd");
                });
            }
        }

        if (currScreen == 0) {
            $('.tts-nav-up').addClass('disabled');
            $('.tts-nav-down').removeClass('disabled');
        } else if (currScreen == (numScreens-1)) {
            $('.tts-nav-down').addClass('disabled');
            $('.tts-nav-up').removeClass('disabled');
        }

    }

    function touchNav(e) {
        startX = e.originalEvent.pageX || e.originalEvent.targetTouches[0].pageX; 
        startY = e.originalEvent.pageY || e.originalEvent.targetTouches[0].pageY; 

        $('body').on(( window.navigator.msPointerEnabled ? "MSPointerMove" : "touchmove" ),'.nav-window', function (event) {
            if ($(this).find('li').length > maxNum) {
                swipeNav(event,$(this));
            }
            //return true;
        });
    }

    function swipeNav(e,theWindow) {
        e.preventDefault();

        var $theWindow = theWindow;

        $theWindow.find('.sub').addClass('tts-nav-scroll');

        dx = (e.originalEvent.pageX || e.originalEvent.targetTouches[0].pageX) - startX;
        dy = (e.originalEvent.pageY || e.originalEvent.targetTouches[0].pageY) - startY;

        if (Math.abs(dy) > threshold) {
          if (dy < 0) { // Up
            adjustNavDisplay(currScreen,numScreens,maxNum,$theWindow,'down');
            dy = 0;
            wasSwiped = true;
            cancelTouchNav();
          } else if (dy > 0) { // Down
            adjustNavDisplay(currScreen,numScreens,maxNum,$theWindow,'up');
            dy = 0;
            wasSwiped = true;
            cancelTouchNav();
          } else if ( Math.abs(dx) > 15) {
            cancelTouchNav();
          }
        }
      
    }

    function cancelTouchNav() {
        $('body').off(( window.navigator.msPointerEnabled ? "MSPointerMove" : "touchmove" ),'.nav-window');
        startX = null;
        startY = null;
        dx = null;
        dy = null;
    }


        

    return { // public methods

        initNav: function () {

            $('.tts-nav-list span').addClass('nav-window');

            $('.tts-nav-list span').css('display','none'); // Hide all sub-nav initially
            $('.tts-nav-list span').css('visibility','visible'); // Make sure the sub-nav is visible (hidden initial to calculate the item height)

            if ($page.parent().hasClass("sub")) { // if the page is in the sub-nav
                subNavItem = $page;
            } else {
                subNavItem = $page.find('ul li:first-child'); // else, it's a landing page, so use the first item
            }
            displayNav(subNavItem);
            $page.children('a').addClass('selected'); // Highlight current oage
            $('.tts-nav-list').css('visibility','visible'); // Make the navigation visible


            if ($('.tts-nav-list').length) {
                $('body').on(( window.navigator.msPointerEnabled ? 'MSPointerDown' : 'touchstart' ), '.nav-window', function (event) {
                    wasSwiped = false;
                    touchNav(event);
                });
                $('body').on(( window.navigator.msPointerEnabled ? 'MSPointerUp' : 'touchend' ), '.nav-window', function (event) {
                    if (wasSwiped) {
                        return false; // Swiping, so don't follow links
                    } else {
                        return true; // True so we can still click links 
                    }
                });
            }


        }

    }

})();


// function initTTS() {
//     var subNavItem = '';

//     // Initial Display
//     $('.tts-nav-list span').css('display','none'); // Hide all sub-nav initially
//     $('.tts-nav-list span').css('visibility','visible'); // Make sure the sub-nav is visible (hidden initial to calculate the item height)

//     // Display the nav based on the page we're on
//     var pageID = $("body").attr("id");
//     var $page = $('.tts-nav-list').find("."+pageID);

//     if ($page.parent().hasClass("sub")) { // if the page is in the sub-nav
//         subNavItem = $page;
//     } else {
//         subNavItem = $page.find('ul li:first-child'); // else, it's a landing page, so use the first item
//     }
//     openSubNav(subNavItem);

//     $page.children('a').addClass('selected'); // Highlight current oage
//     $('.tts-nav-list').css('visibility','visible'); // Make the navigation visible

// }

// function openSubNav($item) {
//     var $subList = $item.parent(),
//         $theWindow = $subList.parent('span');
//         totalNum = $subList.children().length,
//         pos = $item.index(),
//         maxNum = 6,
//         numScreens = 0,
//         currScreen = 0;

//     // Display sub-nav window
//     $theWindow.css("display","block"); 

//     // Number of sub-nav "screens"
//     numScreens = Math.round(totalNum/maxNum)

//     // Determine current screen
//     for (i=0;i<numScreens;i++) { // iterate through the screens
//         $subList.children().each (function(j) { // go through each sub-nav item
//             if (((j+1) > (i * maxNum)) && ((j+1) <= (maxNum + (i * maxNum)))) {;
//                 if (pos == j) {
//                     currScreen = i;
//                 }
//             }
//         })
//     }

//     // Adjust the window and offset
//     adjustNavWindow(currScreen,numScreens,maxNum,$theWindow)
//     $(window).resize(function () {
//         adjustNavWindow(currScreen,numScreens,maxNum,$theWindow)
//     });

//     // Add the scrolling controls
//     if (totalNum > maxNum) { // If the scrolling controls are needed
//         if (!($('.tts-nav-arrow').length)) { // and they aren't already on the page
//             $('.tts-nav-list span').append('<a class="tts-nav-arrow tts-nav-up"><img src="/shared/images/wot/up_arrow.png" /></a>');
//             $('.tts-nav-list span').append('<a class="tts-nav-arrow tts-nav-down"><img src="/shared/images/wot/down_arrow.png" /></a>');
//         }

//         $('.tts-nav-arrow').click(function() {
//             $(this).siblings('ul').addClass('tts-nav-scroll'); //for transition animation


//             if ($(this).hasClass('tts-nav-up')) {
//                 // Slide slide screen up
//                 adjustNavWindow(currScreen,numScreens,maxNum,$theWindow,'up');
//             } else {
//                 // Slide slide screen down
//                 adjustNavWindow(currScreen,numScreens,maxNum,$theWindow,'down')
//             }

//         });
//     }

// }

// function adjustNavWindow(currScreen,numScreens,maxNum,theWindow,direction) { // WORK IN PROGRESS - MAY NEEDS MORE VARS PASSED INTO IT - WILL BE CALLED ON RESIZE

//     var windowHeight = 0,
//         windowData = [],
//         offset = 0,
//         offsetAdj = 0;

//     // Calculate the needed height
//     for (i=0;i<numScreens;i++) { // iterate through the screens
//         theWindow.find('.sub').children().each( function(j) {
//             var height = $(this).outerHeight(); // calculate the height of each
//             if (((j+1) > (i * maxNum)) && ((j+1) <= (maxNum + (i * maxNum)))) {
//                 windowHeight += height;
//             }
//         })
//         windowData[i] = windowHeight;
//         windowHeight = 0;
//     }

//     // set the window height
//     theWindow.height(windowData[currScreen]);

//     // Offset the sub-nav based on the current screen
//     for (i=0;i<currScreen;i++) {
//         offset += windowData[i];
//         theWindow.find('.sub').css('top','-'+offset+'px');
//     }

//     // if sliding
//     if (direction == 'up') {
//         var currOffset = parseInt(theWindow.find('.sub').css('top'));
//         offsetAdj = windowData[currScreen-1];
//         theWindow.find('.sub').css('top',(currOffset+offsetAdj)+'px');
//         currScreen = currScreen-1;

//         //$('.tts-nav-scroll').bind(eventName, function() {
//         //$('.tts-nav-scroll').bind("webkitTransitionEnd", function() {
//            // adjustNavWindow(currScreen,numScreens,maxNum,theWindow);
//         //});
//     } else if (direction == 'down') {
//         var currOffset = parseInt(theWindow.find('.sub').css('top'));
//         offsetAdj = windowData[currScreen+1];
//         theWindow.find('.sub').css('top',(currOffset-offsetAdj)+'px');
//         currScreen = currScreen+1;

//         // $('.tts-nav-scroll').bind("webkitTransitionEnd", function() {
//         //     adjustNavWindow(currScreen,numScreens,maxNum,theWindow);
//         //     $('.tts-nav-scroll').unbind("webkitTransitionEnd");
//         // });
//     }

// }

// function initTTS() {
//     var ttsNavItemHeight = '';
//     var ttsNavMaxNum = 6;
//     // Calculate the sub-nav item height
//     ttsNavItemHeight = $('.tts-nav-list ul li').outerHeight();

//     // Initial Display
//     $('.tts-nav-list span').css('display','none'); // Hide all sub-nav initially
//     $('.tts-nav-list span').css('visibility','visible'); // Make sure the sub-nav is visible (hidden initial to calculate the item height)

//     // Add the scrolling controls
//     $('.tts-nav-list span').each(function() {
//         if ($(this).find('li').length > ttsNavMaxNum) {
//             $(this).append('<a class="tts-nav-arrow tts-nav-up"><img src="/shared/images/wot/up_arrow.png" /></a>');
//             $(this).append('<a class="tts-nav-arrow tts-nav-down"><img src="/shared/images/wot/down_arrow.png" /></a>');
//         }
//     })
    
//     // Display the nav based on the page we're on
//     var page = $("body").attr("id");
//     var $navItem = $('.tts-nav-list').find("."+page);

//     if ($navItem.parent().hasClass("sub")) {
//         openSubNav($navItem,ttsNavMaxNum,ttsNavItemHeight);
//     } else {
//         openSubNav($navItem.find('ul li:first-child'),ttsNavMaxNum,ttsNavItemHeight); // open to the first item
//     }

//     $navItem.children('a').addClass('selected');
//     $('.tts-nav-list').css('visibility','visible'); // Make the navigation visible
// }

// function openSubNav($item, maxNum, itemHeight) {
//     var $parent = $item.parent();
//     var num = $parent.children().length;
//     var pos = $item.index();
//     var currOffset = 0;

//     if (pos > (maxNum - 1)) {
//         var diff = (pos - (maxNum - 1));
//         currOffset = -(diff*itemHeight);
//         $parent.css("top",currOffset+"px");
//     }

//     $parent.parent("span").css("display","block");

//     //set the height of the span container
//     if (num > maxNum) {
//         $parent.parent("span").height(maxNum*itemHeight);
//     } else {
//         $parent.parent("span").height(num*itemHeight);
//     }

//     //nav controls
//     $('.tts-nav-arrow').click(function() {
//         $(this).siblings('ul').addClass('tts-nav-scroll'); //for transition animation
//         var maxOffset = (maxNum-num)*itemHeight;
//         if ($(this).hasClass('tts-nav-up')) {
//             if (currOffset != 0) {
//                 currOffset = currOffset + itemHeight;
//                 $(this).siblings('ul').css("top",currOffset+"px");
//             }
//         } else {
//             if (currOffset != maxOffset) {
//                 currOffset = currOffset - itemHeight;
//                 $(this).siblings('ul').css("top",currOffset+"px");
//             }
//         }
//         if (currOffset == 0) {
//             $('.tts-nav-up').addClass('disabled');
//             $('.tts-nav-down').removeClass('disabled');
//         } else if (currOffset == maxOffset) {
//             $('.tts-nav-down').addClass('disabled');
//             $('.tts-nav-up').removeClass('disabled');
//         } else {
//             $('.tts-nav-up').removeClass('disabled');
//             $('.tts-nav-down').removeClass('disabled');
//         }
//     });

// }

function centerItemInfo(isonload) {
    if ($(".iteminfo").length) {
        var containerheight = $(".item-container").height();
        var divheight = $(".iteminfo").height();
        var topmargin = (containerheight / 2) - (divheight / 2);
        $(".iteminfo").css("padding-top", topmargin);
        if (isonload) {
            $(".iteminfo").css("visibility", "visible");
        }
    }
}

//For Header Footer Service - Cross Domain Messaging for popups
function sendParentMessage(message) {
	if(window.parent.postMessage) {
		window.parent.postMessage(message, "*");
	}
	else {
		window.parent.location = parent.location.replace( /#.*$/, "" ) + message;
	}	
}

function isParentCrossDomain() {
    var html = null;
    try {
        // deal with older browsers
        var doc = iframe.contentDocument || iframe.contentWindow.document;
        html = doc.body.innerHTML;
    } catch (err) {
        // do nothing
    }

    return (html == null);
}
// Track Mobile Device Orientation
function trackOrientation() {
    if (typeof (window.orientation) != "undefined") {
        if (window.orientation == 0 || window.orientation == 180) {
            TrackDeviceInfo("Browser", "Orientation - Portrait");
        }
        else {
            TrackDeviceInfo("Browser", "Orientation - Landscape");
        }
    }
    else {
        if ($(window).width() <= $(window).height()) {
            TrackDeviceInfo("Browser", "Orientation - Portrait");
        }
        else {
            TrackDeviceInfo("Browser", "Orientation - Landscape");
        }
    }
}

function trackMobileDeviceInfo() {
    var agent = navigator.userAgent.toLowerCase();
    var name = "Unknown";
    var version = "";
    var start;
    var end;

    if (agent.indexOf("ipod") > -1) {
        name = "iPod";
        start = agent.indexOf("iphone os ") + 10;
        if (start > -1) {
            end = agent.indexOf(" ", start);
            version = agent.substring(start, end).split("_").join(".");
        }
    }
    else if (agent.indexOf("iphone") > -1) {
        name = "iPhone";
        start = agent.indexOf("iphone os ") + 10;
        if (start > -1) {
            end = agent.indexOf(" ", start);
            version = agent.substring(start, end).split("_").join(".");
        }
    }
    else if (agent.indexOf("ipad") > -1) {
        name = "iPad";
        start = agent.indexOf("cpu os ") + 7;
        if (start > -1) {
            end = agent.indexOf(" ", start);
            version = agent.substring(start, end).split("_").join(".");
        }
    }
    else if (agent.indexOf("kindle fire") > -1) {
        name = "Kindle Fire (Android)";
        start = agent.indexOf("android ") + 8;
        if (start > -1) {
            end = agent.indexOf(" ", start);
            version = agent.substring(start, end);
        }
    }
    else if (agent.indexOf("silk-accelerated") > -1) {
        name = "Kindle Fire (Silk Accelerated)";
        start = agent.indexOf("silk/") + 5;
        if (start > -1) {
            end = agent.indexOf(")", start);
            version = agent.substring(start, end);
        }
    }
    else if (agent.indexOf("kindle") > -1) {
        name = "Kindle Monochrome";
        start = agent.indexOf("kindle/") + 7;
        if (start > -1) {
            end = agent.indexOf(" ", start);
            version = agent.substring(start, end);
        }
    }
    else if (agent.indexOf("android") > -1) {
        name = "Android";
        start = agent.indexOf("android ") + 8;
        if (start > -1) {
            end = agent.indexOf(";", start);
            version = agent.substring(start, end);
        }
    }
    else if (agent.indexOf("blackberry") > -1) {
        name = "Blackberry";
        start = agent.indexOf("version/") + 8;
        if (start > -1) {
            end = agent.indexOf(" ", start);
            version = agent.substring(start, end);
        }
    }
    else if (agent.indexOf("windows phone") > -1) {
        name = "Windows Phone";
        start = agent.indexOf("phone os ") + 9;
        if (start > -1) {
            end = agent.indexOf(" ", start);
            version = agent.substring(start, end);
        }
    }
    TrackDeviceInfo("Platform", name + " " + version);
}

function videoHeight() {
    if ($("body").hasClass("ios") || $("body").hasClass("android")) {
        $(".text-container video").each(function () {
            $(this).css("height", $(this).parent().outerHeight());
        });
    }
}


//WOT GridC JS

//=====Begin WOT ====

//GridC Display All Images
function DisplayAllImages(divID) {
    var tmpId = divID.replace("divRow", "");
    $("div[name='divRow']").each(function () {
        if ($(this).attr("id").indexOf(tmpId)) {
            $(this).css("display", "block");
            $(this).children().each(function (data) {
                $(data).css("display", "block");
            });
        }
    });

    var divViewAll = document.getElementById(divID.replace("divRow", "divViewAll"));
    divViewAll.style.display = 'none';

    centerGridText();
}

//GridC TextOverlay display the selected image
function SelectThumbImage(flag) {
    $(".thumbs img").removeClass("active");

    $("#imgFullSizeDefault").hide();
    $("#imgFullSizeAlt1").hide();
    $("#imgFullSizeAlt2").hide();

    if (flag == 1) {
        $("#imgDefaultThumb").addClass("active");
        $("#imgFullSizeDefault").show();
    } else if (flag == 2) {
        $("#imgAltThumb1").addClass("active");
        $("#imgFullSizeAlt1").show();
    } else if (flag == 3) {
        $("#imgAltThumb2").addClass("active");
        $("#imgFullSizeAlt2").show();
    }
}

//=====end WOT ====

//April14 Tiffany Style
$("body").on("click", ".TSBBClose, body#TiffanyStyleLandingPage .paging-circle", function () {
    $(this).parent().parent().find(".itemOverlay").fadeOut();
    return false;
});

$("body").on("click", ".TSBBClose", function () {
    $(this).parent().fadeOut();
    return false;
});

$("body").on("click", ".BBOverlay", function () {
    var link = $(this);
    var overlay = $(this).parent().parent().parent().parent().siblings(".itemOverlay");

    var imageurl = $(this).attr("data-imageurl");
    var description = $(this).attr("data-description");
    var url = $(this).attr("data-url");

    if (imageurl != overlay.find(".image img").attr("src")) {
        overlay.find(".ajax-loader").show();
        overlay.find(".image img").attr("src", imageurl).hide();
    }


    if (overlay.is(":visible")) {
        overlay.fadeOut('fast');
        overlay.find(".image").hide();
        overlay.find(".description").html(description);
        overlay.find("a:not(.close)").attr("href", url);

        overlay.find(".image").show();
        overlay.fadeIn('fast');

    } else {
        overlay.find(".description").html(description);
        overlay.find("a:not(.close)").attr("href", url);

        overlay.fadeIn();
    }

    overlay.find(".image img").load(function () {
        overlay.find(".ajax-loader").hide();
        $(this).fadeIn();
    });

    return false;
});
//----


$("body").on("change", ".mainLocationGrid select, #header #storesearch select", function () {
    //alert($(this).val());
    window.location = "/locations/CountryStoreLocationList.aspx?country=" + $(this).val() + "&source=StoresLanding";

    return false;
});
function addVideoBrowseTileEnding(tile){
    tile.children("video").unbind("ended");
	tile.children("video").bind("ended", function(){
		var newStart = tile.attr("data-looptime");
		var loopTime = parseInt(newStart.split(":")[1]) + parseInt(newStart.split(":")[0] * 60);
		tile.children("video")[0].currentTime = loopTime;
		tile.children("video")[0].play();
	});
	
	/*
    tile.children("video").unbind("timeupdate");
	tile.children("video").bind("timeupdate", function(){
		var newStart = tile.attr("data-looptime");
		var duration = this.duration;
		var currentTime = this.currentTime;
		console.log(duration + " " + currentTime);
		if (currentTime == 0) {
			var loopTime = parseFloat(newStart.split(":")[1]) + parseFloat(newStart.split(":")[0] * 60) + parseFloat(newStart.split(";")[1] / 30);
			tile.children("video")[0].currentTime = loopTime;
			tile.children("video")[0].play();
		}
	});	
	*/
};

function addVideoLoop(tile) {
	//tile.children("video.video2").hide();
	//tile.children("video.video2")[0].pause();
	//tile.children("video.video2")[0].currentTime=0;
	tile.children("video.video1").unbind("ended").show();
	tile.children("video.video1").bind("ended", function(){
		tile.children("video.video1").hide();
		tile.children("video.video2").show();
		tile.children("video.video2")[0].play();
	});	
}

function addDCFadeTimers(tile) {
	var fadeInTime = tile.attr("data-text-fadein");
	var fadeOutTime = tile.attr("data-text-fadeout");
	
	fadeInTime = (parseInt(fadeInTime.split(":")[1]) + parseInt(fadeInTime.split(":")[0] * 60)) * 1000;
	// Tiffany asked for a 5 second fadout across the board.  The original code will need to be uncommented for the next release
	//fadeOutTime = (parseInt(fadeOutTime.split(":")[1]) + parseInt(fadeOutTime.split(":")[0] * 60)) * 1000;
	fadeOutTime = fadeInTime + 5000;
	setTimeout(function() {
		$(".dcTile .dcTextBlock").fadeIn(1000);
	}, fadeInTime);
	setTimeout(function() {
		$(".dcTile .dcTextBlock").fadeOut(1000);
	}, fadeOutTime);	
}

//Watches LP animation
function triggerCrossFade() {
    var viewportScrollTop = $(window).scrollTop();
    var viewportScrollBottom = viewportScrollTop + $(window).height();

    $(".cross-fade").each(function () {
        var tile = $(this);
        var img = tile.children("img + img");

        var threshold = .5;
        var tileHeight = tile.outerHeight();
        var tileTop = tile.offset().top;
        var tileBottom = tileTop + tileHeight;

        if (tileBottom < viewportScrollTop || tileTop > viewportScrollBottom) {
            img.removeClass("animate");
        } else {
            img.addClass("animate");

            if ((tileTop + (tileHeight * threshold)) < viewportScrollTop) {
                img.removeClass("running");
            } else {
                if ((tileBottom - tileHeight * threshold) < viewportScrollBottom) {
                    img.addClass("running");
                } else {
                    img.removeClass("running");
                }
            }
        }
    });
}


//Privacy Policy 
$(document).ready(function (e) {

    $("#ddlSourceCountry").on("change", function () {
        var selected_cntry = parseInt($(this).val());
        switch (selected_cntry) {
            case 14: //Hong Kong
                $(".checkboxHK").show();
                $(".checkboxTW").hide();
                $(".checkboxMC").hide();
                break;
            case 12: //Tiwan
                $(".checkboxHK").hide();
                $(".checkboxMC").hide();
                $(".checkboxTW").show();
                break;
            case 25: //Macau
                $(".checkboxHK").hide();
                $(".checkboxTW").hide();
                $(".checkboxMC").show();
                break;
            case 27:
                $(".checkboxMY, .checkboxSG, .checkboxAE, .checkboxCH,.checkboxCL,.checkboxTH").hide();
                $(".checkboxCZ").show();
                break;
            case 18:
                $(".checkboxCZ, .checkboxMY, .checkboxSG, .checkboxAE, .checkboxCL,.checkboxTH").hide();
                $(".checkboxCH").show();
                break;
            case 15:
                $(".checkboxCZ, .checkboxSG, .checkboxAE, .checkboxCH,.checkboxCL,.checkboxTH").hide();
                $(".checkboxMY").show();
                break;
            case 17:
                $(".checkboxCZ, .checkboxMY, .checkboxAE, .checkboxCH,.checkboxCL,.checkboxTH").hide();
                $(".checkboxSG").show();
                break;
            case 26:
                $(".checkboxCZ,.checkboxMY, .checkboxSG, .checkboxCH,.checkboxCL,.checkboxTH").hide();
                $(".checkboxAE").show();
                break;
            case 29:////TCO BT#20230-by Sandipan
                $(".checkboxCZ, .checkboxMY, .checkboxAE, .checkboxSG, .checkboxCH,.checkboxTH").hide();
                $(".checkboxCL").show();
                break;
            case 30:
                $(".checkboxCZ, .checkboxMY, .checkboxAE, .checkboxSG, .checkboxCH,.checkboxCL").hide();
                $(".checkboxTH").show();
                break;
            default:
                $(".checkboxHK, .checkboxTW, .checkboxMC, .checkboxCZ, .checkboxMY, .checkboxSG, .checkboxAE, .checkboxCH,.checkboxCL,.checkboxTH").hide();
        }
    });

    $("#ddlSourceCountry").trigger("change");

    /*$("#CustomerPrivacyPolicy_ctl00_chkGppAccepted").on("change", function () {
        if (this.checked) {
            $(this).closest("div").next().show();
            $(this).closest("div").next().next().show();
        } else {
            $(this).closest("div").next().hide();
            $(this).closest("div").next().next().hide();
        }
    });
    $("#CustomerPrivacyPolicy_ctl00_chkGppAccepted").trigger("change");*/
});

// Based on marital status - display special dates section
$(document).ready(function (e) {
    $("#selectRelationship").on("change", function () {
        if (this.value == "2") {
            $("#AccountCustomerSpecialDay").show();
            $("#txtPersonalInfoBigDayRow").show();
            $("#txtWhenWasBigDayRow").hide();
            $("#engagedYearContainer").show();
            $("#marriedYearContainer").hide();

            $("#CustomerSpecialDay_ctl00_hdnRelationshipStatus").val("ENGAGED");
            $("#CustomerSpecialDay_ctl00_hdnSpecialYearMarried").val("");
        }
        else if (this.value == "3") {
            $("#AccountCustomerSpecialDay").show();
            $("#txtPersonalInfoBigDayRow").hide();
            $("#txtWhenWasBigDayRow").show();
            $("#engagedYearContainer").hide();
            $("#marriedYearContainer").show();

            $("#CustomerSpecialDay_ctl00_hdnRelationshipStatus").val("MARRIED");
            $("#CustomerSpecialDay_ctl00_hdnSpecialYearEngaged").val("");
        }
        else {
            $("#AccountCustomerSpecialDay").hide();
        }
    });
    $("#selectRelationship").trigger("change");
});

function MarriedSpecialYearChanged(ddl) {
    $("#CustomerSpecialDay_ctl00_hdnSpecialYearMarried").val(ddl.value);
}

function EngagedSpecialYearChanged(ddl) {
    $("#CustomerSpecialDay_ctl00_hdnSpecialYearEngaged").val(ddl.value);
}