/**
 * jquery-rpmPagination - v1.0
 * A jQuery plugin for simple dynamic frontend pagination with Bootstrap CSS
 * https://github.com/
 *  
 * Copyright 2019, Sabbir Hossain Rupom
 */

/*jshint esversion: 6 */
(function ($) {
    "use strict";
    /**
     * Plugin root function rpmPagination()
     * 
     * @param object options Option parameter for intializing pagination plugin
     * *-----* {property} limit Pagination item limit, [ optional ] default is 10 
     * *-----* {property} total Pagination item count in total [ optional ]
     * *-----* {property} domElement Html element [tag/class] which will be count as Pagination item [ must be provided ]
     * @returns boolean true
     */
    $.fn.rpmPagination = function (options) {
        var settings = $.extend({
            limit: 10,
            total: 0,
            domElement: '.p-item'
        }, options);

        let $this = $(this),
                pages = 1,
                rpmCurrentPage = 1,
                rpmPageNext = settings.limit,
                rpmPageLimit = settings.limit,
                rpmPageTotal = settings.total,
                tBool = false,
                rpmPageDomElem = settings.domElement, rpmCustomDomElem = 'p-' + Math.random().toString(36).substr(2, 6);

        if (rpmPageTotal <= 0) {
            tBool = true;
        }

        $(rpmPageDomElem).each(function (i, obj) {
            if (tBool) {
                rpmPageTotal = i + 1;
            }
            $(obj).addClass(rpmCustomDomElem);
            $(obj).addClass(rpmCustomDomElem + '-' + parseInt(i + 1));
        });

        if (rpmPageTotal > rpmPageLimit) {
            pages = parseInt((rpmPageTotal / rpmPageLimit) + 1);
        }

        preparePageMenus(rpmCurrentPage, pages, $this);

        [rpmCurrentPage, rpmPageNext] = preparePageItems(rpmCurrentPage, rpmPageNext, rpmPageLimit, rpmCustomDomElem, 'page-num');

        /**
         * Process html pagination on pagination-menu click
         */
        $(document).on('click', '.page-num > a', function (e) {
            e.preventDefault();

            if ($(this).parent().hasClass('disabled') || $(this).parent($this).length === 0) {
                return false;
            } else {
                if ($(this).parent().hasClass('prev')) {
                    [rpmCurrentPage, rpmPageNext] = preparePageItems(rpmCurrentPage, rpmPageNext, rpmPageLimit, rpmCustomDomElem, 'prev');
                } else if ($(this).parent().hasClass('next')) {
                    [rpmCurrentPage, rpmPageNext] = preparePageItems(rpmCurrentPage, rpmPageNext, rpmPageLimit, rpmCustomDomElem, 'next');
                } else {
                    let cl = $(this).data('page_no');
                    rpmCurrentPage = parseInt(cl);
                    [rpmCurrentPage, rpmPageNext] = preparePageItems(rpmCurrentPage, rpmPageNext, rpmPageLimit, rpmCustomDomElem, 'page-num');
                }

                preparePageMenus(rpmCurrentPage, pages, $this);
            }

        });

        return true;
    };

    /**
     * Show / Hide pagination items based on current page-menu
     * 
     * @param {num} current_page Current page number
     * @param {num} next Number of next pagination item
     * @param {num} limit Pagination item limit to show in frontend
     * @param {string} element Pagination item element
     * @param {string} type Type of pagination menu
     * @returns {Array} [ Current page number and Number of next pagination item  ]
     */
    var preparePageItems = function (current_page, next, limit, element, type) {

        $('.' + element).addClass('hide');

        var current = 0;

        if (type === 'prev') {
            next = next - limit;
            current = next - limit + 1;
            for (let i = current; i <= next; i++) {
                $('.' + element + '-' + i).removeClass('hide');
            }
            current_page--;

        } else if (type === 'next') {
            current = next + 1;
            next = next + limit;
            for (let i = current; i <= next; i++) {
                $('.' + element + '-' + i).removeClass('hide');
            }
            current_page++;
        } else if (type === 'page-num') {
            current = (limit * (current_page - 1)) + 1;
            next = (limit * (current_page - 1)) + limit;
            for (let i = current; i <= next; i++) {
                $('.' + element + '-' + i).removeClass('hide');
            }
        }

        return [current_page, next];
    };

    /**
     * Rearrage pagination menu after each pagination item list transition
     * 
     * @param {num} current_page
     * @param {num} pages
     * @param {string} element
     * @returns {boolean} true
     */
    var preparePageMenus = function (current_page, pages, element) {
        $(element).html('');
        let pageArray = [], fp = 1, lp = (pages - 1);
        let menuHtml = '';

        if (Math.abs(current_page - fp) < 3) {
            pageArray = [1, 2, 3, 4, '...', lp];
        } else if (Math.abs(current_page - lp) < 3) {
            pageArray = [1, '...', lp - 3, lp - 2, lp - 1, lp];
        } else if (lp <= 6) {
            for (let i = 1; i <= lp; i++) {
                pageArray.push(i);
            }
        } else {
            pageArray = [1, '...', current_page - 1, current_page, current_page + 1, '...', lp];
        }

        menuHtml = '<li class="page-num prev ' + (current_page === fp ? 'disabled' : '') + '"><a href="#">prev</a></li>';
        for (let i = 0; i < pageArray.length; i++) {
            if (pageArray[i] === '...') {
                menuHtml += '<li class="page-num page-inf disabled"><a data-page_no="..." href="#">...</a></li>';
            } else {
                menuHtml += '<li class="page-num page-' + pageArray[i] + ' ' + (pageArray[i] === current_page ? 'disabled' : '') + '"><a data-page_no="' + pageArray[i] + '" href="#">' + pageArray[i] + '</a></li>';
            }
        }
        menuHtml += '<li class="page-num next ' + (current_page === lp ? 'disabled' : '') + '"><a href="#">next</a></li>';
        $(element).append(menuHtml);

        return true;
    };

})(jQuery);



