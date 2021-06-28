/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://fancybox.net
 * 
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 * That said, it is hardly a one-person project. Many people have submitted bugs, code, and offered their advice freely. Their support is greatly appreciated.
 * 
 * Version: 1.3.4 (11/11/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

; (function (b) {
    var m, t, u, f, D, j, E, n, z, A, q = 0, e = {}, o = [], p = 0, d = {}, 
    l = [], G = null, v = new Image, J = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i, W = /[^\.]\.(swf)\s*$/i, 
    K, L = 1, y = 0, s = "", r, i, h = false, B = b.extend(b("<div/>")[0], { prop: 0 }), 
    M = b.browser.msie && b.browser.version < 7 && !window.XMLHttpRequest, 
    //задание переменных, которые будут использоваться ниже
    N = function () { 
        t.hide(); 
        v.onerror = v.onload = null; 
        G && G.abort(); 
        m.empty() 
    }, 
    I = function () {
        var a = o[q], c, g, k, C, P, w; 
        N(); 
        e = b.extend({}, b.fn.fancybox.defaults, 
            typeof b(a).data("fancybox") == "undefined" ? e : b(a).data("fancybox")); 
        w = e.onStart(o, q, e); 
        if (w === false) h = false; 
        else { if (typeof w == "object") e = b.extend(e, w); 
                 
                  if (a.nodeName && !e.orig) e.orig = b(a).children("img:first").length ? b(a).children("img:first") : b(a); 
                  c = e.href || (a.nodeName ? b(a).attr("href") : a.href) || null; 
                  if (e.content) g = "html"; 
                  else if (c) g = c.match(J) ? "image" : c.match(W) ? "swf" : b(a).hasClass("iframe") ? "iframe" : c.indexOf("#") === 0 ? "inline" : "ajax"; 
                  if (g) {e.type = g; 
                    e.href = c; 
                    e.title = k; 
                    e.padding = parseInt(e.padding, 10); 
                    e.margin = parseInt(e.margin, 10); 
                    m.css("padding", e.padding + e.margin); 
                    b(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change", 
                        function () { b(this).replaceWith(j.children()) }); 
                    switch (g) { 
                        case "image": h = false; 
                        b.fancybox.showActivity(); 
                        v = new Image; 
                        v.onerror = function () { O() }; 
                        v.onload = function () { 
                            h = true; v.onerror = v.onload = null; e.width = v.width; 
                            e.height = v.height; 
                            b("<img />").attr({ id: "fancybox-img", src: v.src, alt: e.title }).appendTo(m); 
                            Q() }; 
                            v.src = c; break; 
                    }
                } else O()
        } // функции I и N отвечают за базовую работу с фотогалереей, отключение перехода по 
        //ссылке на картинку, а вместо этого приближение на нее. Функции были сокращены, 
        // т.к. в нашем задании требуется только работа с картинками. 
    }, Q = function () {
            var a, c; 
            t.hide();
            h = true; 
            b(j.add(u)).unbind(); 
            b(window).unbind("resize.fb scroll.fb"); 
            b(document).unbind("keydown.fb"); 
            f.is(":visible") && d.titlePosition !== "outside" && f.css("height", f.height()); 
            l = o; p = q; d = e; 
            if (d.overlayShow) {
                u.css({
                    "background-color": d.overlayColor,
                    opacity: d.overlayOpacity, cursor: d.hideOnOverlayClick ? "pointer" : "auto", height: b(document).height()
                }); 
            if (!u.is(":visible")) { M && b("select:not(#fancybox-tmp select)").filter(function () { 
                return this.style.visibility !== "hidden" }).css({ visibility: "hidden" }).one("fancybox-cleanup", function () { this.style.visibility = "inherit" }); 
                u.show() }
            } else u.hide(); 
            //функция, отвечающая за тень при приближении картинки

            i = X(); 
            s = d.title || ""; y = 0; 
            n.empty().removeAttr("style").removeClass(); 
            n.hide(); 
            if (f.is(":visible")) {
                b(E.add(z).add(A)).hide(); 
                a = f.position(); 
                r = { top: a.top, left: a.left, width: f.width(), height: f.height() }; 
                c = r.width == i.width && r.height ==i.height; 
                j.fadeTo(d.changeFade, 0.3, function () { 
                    var g = function () { j.html(m.contents()).fadeTo(d.changeFade, 1, S) }; 
                    b.event.trigger("fancybox-change"); 
                    if (c) g(); 
                     else { B.prop = 0; 
                    b(B).animate({ prop: 1 }, 
                        { duration: d.changeSpeed, easing: d.easingChange, step: T, complete: g }) } })
                //если мы сейчас на экране находится приближенная картинка,
                //то задается переключение между картинками, анимация переключения
            } else {
                f.removeAttr("style"); 
                j.css("border-width", d.padding); 
                if (d.transitionIn == "elastic") {
                    r = V(); 
                    j.html(m.contents());
                    f.show(); 
                    if (d.opacity) i.opacity = 0; 
                    B.prop = 0; 
                    b(B).animate({ prop: 1 }, { duration: d.speedIn, easing: d.easingIn, step: T, complete: S })
                } else { d.titlePosition == "inside" && y > 0 && n.show(); 
                j.css({ width: i.width - d.padding * 2, height: e.autoDimensions ? "auto" : i.height - y - d.padding * 2 }).html(m.contents()); 
                f.css(i).fadeIn(d.transitionIn == "none" ? 0 : d.speedIn, S) }
                //если мы сейчас на экране с галереей картинок, то задается анимация приближения
                //картинки к центру экрана, плавность и скорость перемещения, 
            }
    
    }, Y = function () {
        if (d.enableEscapeButton || d.enableKeyboardNav) b(document).bind("keydown.fb", function (a) {
            if (a.keyCode == 27 && d.enableEscapeButton) 
                { a.preventDefault(); b.fancybox.close() } 
            else if ((a.keyCode ==37 || a.keyCode == 39) && d.enableKeyboardNav && a.target.tagName !== "INPUT" 
                && a.target.tagName !== "TEXTAREA" && a.target.tagName !== "SELECT") 
                { a.preventDefault(); b.fancybox[a.keyCode == 37 ? "prev" : "next"]() }
        }); 
        //включает стрелки на клавиатуре для навигации между изображениями, 
        //без этой функции переключение возможно только с помощью мышки и стрелок 
        //по бокам от картинок
        if (d.showNavArrows) 
            { if (d.cyclic && l.length > 1 || p !== 0) z.show(); 
                if (d.cyclic && l.length > 1 || p != l.length - 1) A.show() } 
                    else { z.hide(); A.hide() }
        //включает стрелки по бокам от картинки для навигации между изображениями, 
        //без этой функции переключение возможно только с помощью клавиатуры

    }, S = function () {
        e.autoDimensions && j.css("height", "auto"); 
        f.css("height", "auto");
        s && s.length && n.show(); 
        d.showCloseButton && E.show(); 
        Y(); 
        d.centerOnScroll && b(window).bind("scroll.fb", b.fancybox.center); 
        f.show(); 
        h = false; 
        b.fancybox.center(); 
        d.onComplete(l, p, d); 
       //эта функция задаёт размеры картинки, после приближение, а они 
       //будут равны настоящему размеру картинки. Также устанавливает окно по центру экрана,
       //по середине

    }, T = function (a) {
        var c = { width: parseInt(r.width + (i.width - r.width) * a, 10), 
            height: parseInt(r.height + (i.height - r.height) * a, 10), 
            top: parseInt(r.top + (i.top - r.top) * a, 10), 
            left: parseInt(r.left + (i.left - r.left) * a, 10) }; 
            if (typeof i.opacity !== "undefined") c.opacity = a < 0.5 ? 0.5 : a; 
            f.css(c);
            j.css({ width: c.width - d.padding * 2, height: c.height - y * a - d.padding * 2 })
    }, //задание перемнной c значением ширины, высоты, нахождения на экране картинки

    U = function () { 
        return [b(window).width() - d.margin * 2, b(window).height() - d.margin * 2, 
        b(document).scrollLeft() + d.margin, b(document).scrollTop() + d.margin] }, 
        X = function () {
        var a = U(), c = {}, g = d.autoScale, k = d.padding * 2; 
        c.width = d.width.toString().indexOf("%") > -1 ? parseInt(a[0] * parseFloat(d.width) / 100, 10) : d.width + k; 
        c.height = d.height.toString().indexOf("%") > -1 ? parseInt(a[1] * parseFloat(d.height) / 100, 10) : d.height + k; 
        
        if (g && (c.width > a[0] || c.height > a[1])) 
            if (e.type =="image" || e.type == "swf") { g = d.width / d.height; 
                if (c.width > a[0]) { c.width = a[0]; 
            c.height = parseInt((c.width - k) / g + k, 10) } 
            if (c.height > a[1]) { c.height = a[1]; 
                c.width = parseInt((c.height - k) * g + k, 10) } } 
                else { c.width = Math.min(c.width, a[0]); 
                    c.height = Math.min(c.height, a[1]) } 
                    c.top = parseInt(Math.max(a[3] - 20, a[3] + (a[1] - c.height - 40) * 0.5), 10); 
                    c.left = parseInt(Math.max(a[2] - 20, a[2] + (a[0] - c.width - 40) * 0.5), 10); 
            return c
            //функция, позволяющая при переключении картинок оставаться им на одном месте, в  
            //центре экрана, даже если был изменен размер изображения

    }, V = function () {
        var a = e.orig ? b(e.orig) : false, c = {}; 
        if (a && a.length) {
            c = a.offset(); 
            c.width = a.width(); c.height = a.height(); 
            c = { width: c.width + d.padding * 2, height: c.height + d.padding * 2, 
                top: c.top - d.padding - 20, left: c.left - d.padding - 20 }
        } 
        return c
        //также позволяет получить переменную с с 

    }, Z = function () {};

    b.fn.fancybox = function (a) { if (!b(this).length) return this; 
        b(this).data("fancybox", b.extend({}, a, 
          b.metadata ? b(this).metadata() : {})).unbind("click.fb").bind("click.fb", 
        function (c) { c.preventDefault(); 
        if (!h) { h = true; 
            b(this).blur(); o = []; 
            q = 0; c = b(this).attr("rel") || ""; 
            if (!c || c == "" || c === "nofollow") o.push(this); 
                else { o = b("a[rel=" + c + "], area[rel=" + c + "]"); 
                q = o.index(this) } I() } }); 
          return this }; 
    //функция не даёт перейти по адресу картинки по клику мышки с помощью функции preventDefault(),
    //позволяет при нажатии перейти в режим просмотра одной картинки по середине

    b.fancybox = function (a, c) { }; 

    b.fancybox.showActivity = function () { clearInterval(K); t.show(); K = setInterval(Z, 66) }; 
    b.fancybox.next = function () { return b.fancybox.pos(p +1)}; 
    //позволяет перейти на следующую картинку
    b.fancybox.prev = function () { return b.fancybox.pos(p - 1) }; 
    //позволяет перейти на предыдущую картинку
    b.fancybox.pos = function (a) { 
        if (!h) { a = parseInt(a); o = l; 
            if (a > -1 && a < l.length) { q = a; I() } 
            else if (d.cyclic && l.length > 1) { q = a >= l.length ? 0 : l.length - 1; 
                I() } } }; 
    //позволяет получить номер нужной картинки, в зависимости от функции,
    //её вызвавшей
    b.fancybox.cancel = function () { }; 

    b.fancybox.close = function () {
        function a() { u.fadeOut("fast"); 
        n.empty().hide(); f.hide(); 
        b.event.trigger("fancybox-cleanup"); 
        j.empty(); d.onClosed(l, p, d); 
        l = e = []; p = q = 0; d = e = {}; 
        h = false } 
        if (!(h || f.is(":hidden"))) {
            h = true; 
            if (d && false === d.onCleanup(l, p, d)) h = false; 
            else { N(); b(E.add(z).add(A)).hide(); 
                f.stop(); if (d.transitionOut == "elastic") 
                {
                    r = V(); 
                    var c = f.position(); 
                    i = { top: c.top, left: c.left, width: f.width(), height: f.height() }; 
                    if (d.opacity) i.opacity = 1; n.empty().hide(); B.prop = 1;
                    b(B).animate({ prop: 0 }, { duration: d.speedOut, easing: d.easingOut, step: T, complete: a })
                } else f.fadeOut(d.transitionOut == "none" ? 0 : d.speedOut, a)
            }
        }
    }; 
    //функция, также позволяющая закрыть режим просмотра одной картинки, анимация возвращения
    //картинки на свое место в галерее
    
    b.fancybox.center = function (a) {
        var c, g; if (!h) {
            g = a === true ? 1 : 0; 
            c = U(); !g && (f.width() > c[0] || f.height() > c[1]) || f.stop().animate({
                top: parseInt(Math.max(c[3] - 20, c[3] + (c[1] - j.height() - 40) * 0.5 - 
                    d.padding)), left: parseInt(Math.max(c[2] - 20, c[2] + (c[0] - j.width() - 40) * 0.5 -d.padding))
            }, typeof a == "number" ? a : 200)
        }
    }; // функция, позволяющая переместить картинку в центр экрана

    b.fancybox.init = function () {
        if (!b("#fancybox-wrap").length) {
            b("body").append(m = b('<div id="fancybox-tmp"></div>'), 
                t = b('<div id="fancybox-loading"><div></div></div>'), 
                u = b('<div id="fancybox-overlay"></div>'), 
                f = b('<div id="fancybox-wrap"></div>')); 
            D = b('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(f);
            D.append(j = b('<div id="fancybox-content"></div>'), 
                E = b('<a id="fancybox-close"></a>'), 
                n = b('<div id="fancybox-title"></div>'), 
                z = b('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'), 
                A = b('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>')); 
            E.click(b.fancybox.close); 
            t.click(b.fancybox.cancel); 
            z.click(function (a) { a.preventDefault(); 
                b.fancybox.prev() }); 
            A.click(function (a) { a.preventDefault(); 
                b.fancybox.next() });
            b.support.opacity || f.addClass("fancybox-ie"); 
        }
    };// задание структуры fancybox, начальных настроек, задание начальных стилей
    b.fn.fancybox.defaults = {
        padding: 10, margin: 40, opacity: false, modal: false, cyclic: false, 
        scrolling: "auto", width: 560, height: 340, autoScale: true, 
        autoDimensions: true, centerOnScroll: false,  
        hideOnOverlayClick: true,
        hideOnContentClick: false, overlayShow: true, overlayOpacity: 0.7, 
        overlayColor: "#777", titleShow: true, titlePosition: "float", 
        titleFormat: null, titleFromAlt: false, transitionIn: "fade",
        transitionOut: "fade", speedIn: 300, speedOut: 300, changeSpeed: 300, 
        changeFade: "fast", easingIn: "swing",
        easingOut: "swing", showCloseButton: true, 
        showNavArrows: true, enableEscapeButton: true, enableKeyboardNav: true, 
        onStart: function () { }, onCancel: function () { }, 
        onComplete: function () { }, onCleanup: function () { }, 
        onClosed: function () { }, onError: function () { }
    }; //задание default натсроек окна fancybox,  отступы, положние на экране, скорость 
    // перемещения, разверешие использования стрелками навигации, кнопкой закрытия и клавиатурой
    b(document).ready(function () { b.fancybox.init() })
})(jQuery);