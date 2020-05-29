/**
 * jquery-rpmPagination - v2.0
 * A jQuery plugin for simple dynamic frontend pagination with Bootstrap CSS
 * https://github.com/sabbir-rupom/pagination-jquery
 *  
 * Copyright 2019, Sabbir Hossain Rupom
 */

/* jshint esversion: 6 */
(function ($) {
    "use strict";
    /**
     * Plugin root function rpmPagination()
     * 
     * @param object options Option parameter for intializing pagination plugin
     * *-----* {property} limit         Pagination item limit, [ optional ] default is 10 
     * *-----* {property} total         Pagination item count in total [ optional ]
     * *-----* {property} currentPage   Current/Active page number of pagination  
     * *-----* {property} domElement    Html element [tag/class] which will be count as Pagination item 
     * *-------------------------------[ must be provided for dynamic pagination without page refresh, optional otherwise ]
     * *-----* {property} refresh       Page refresh flag, if enabled- page will be refreshed with query/get/post parameters [ optional ]
     * *-----* {property} link          Page refresh link [ must be provided if refresh flag is enabled, optional otherwise ]
     * *-----* {property} formElement   Pagination item filter form identity element [ optional ]
     * *-------------------------------[ If page has custom item search filter form, the pagination function will use the form to refresh the page with limit/offset parameters ]
     * 
     * @returns boolean true
     */
    
    var bsVersion = 3;
    if(typeof $.fn.tooltip !== 'undefined') {
        bsVersion = $.fn.tooltip.Constructor.VERSION.split('.')[0];
    } 
    var rpmListClass = 'page-num',
            rpmAnchorClass = '', rpmHideClass = 'hide';

    $.fn.rpmPagination = function (options) {
        var settings = $.extend({
            limit: 10,
            total: 0,
            currentPage: 1,
            domElement: '.p-item',
            refresh: false,
            link: null,
            formElement: null
        }, options);

        let $this = $(this),
                pages = 1,
                rpmPageNext = settings.limit,
                rpmPageTotal = settings.total,
                tBool = false,
                rpmPageDomElem = settings.domElement, rpmCustomDomElem = 'p-' + Math.random().toString(36).substr(2, 6),
                version = bsVersion[0];

        if (version == 4) {
            rpmListClass = 'page-item ' + rpmListClass;
            rpmHideClass = 'd-none', rpmAnchorClass = 'page-link';
        }

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

        if (rpmPageTotal > settings.limit) {
            pages = parseInt(rpmPageTotal / settings.limit);
            if(rpmPageTotal % settings.limit > 0) {
                pages += 1;
            }
        }

        preparePageMenus(settings.currentPage, pages, $this);

        [settings.currentPage, rpmPageNext] = preparePageItems(settings.currentPage, rpmPageNext, settings.limit, rpmCustomDomElem, 'page-num');

        if (settings.refresh && $('.' + rpmCustomDomElem).length > 0) {
            $('.' + rpmCustomDomElem).removeClass(rpmHideClass)
        }

        /**
         * Process html pagination on pagination-menu click
         */
        $(document).on('click', '.page-num > a', function (e) {
            e.preventDefault();

            if ($(this).parent().hasClass('disabled') || $(this).parent($this).length === 0) {
                return false;
            } else {
                if (settings.refresh === true) {
                    refreshPageforItems($(this), settings.currentPage, settings.limit, settings.link, settings.formElement);
                } else {
                    if ($(this).parent().hasClass('prev')) {
                        [settings.currentPage, rpmPageNext] = preparePageItems(settings.currentPage, rpmPageNext, settings.limit, rpmCustomDomElem, 'prev');
                    } else if ($(this).parent().hasClass('next')) {
                        [settings.currentPage, rpmPageNext] = preparePageItems(settings.currentPage, rpmPageNext, settings.limit, rpmCustomDomElem, 'next');
                    } else {
                        let cl = $(this).data('page_no');
                        settings.currentPage = parseInt(cl);
                        [settings.currentPage, rpmPageNext] = preparePageItems(settings.currentPage, rpmPageNext, settings.limit, rpmCustomDomElem, 'page-num');
                    }
                }

                preparePageMenus(settings.currentPage, pages, $this);
            }

        });

        return true;
    };

    /**
     * 
     * @param {obj} obj Pagination item anchor object
     * @param {int} current Current page number
     * @param {int} limit Pagination item limit
     * @param {string} url Custom source url for passing query parameters
     * @param {string} form Query-Element-String to determined existing form 
     * @returns {} nothing
     */
    function refreshPageforItems(obj, current, limit, url, form) {
        let offset = 0;

        if (obj.parent().hasClass('prev')) {
            offset = limit * (current - 2);
        } else if (obj.parent().hasClass('next')) {
            offset = limit * current;

        } else {
            let cl = obj.data('page_no');
            current = parseInt(cl);
            offset = limit * (current - 1);
        }

        let ap;
        if (form === null || form === '' || $(form).length <= 0) {
            ap = '?';
            if (url.includes('?')) {
                ap = '&';
            }

            window.location.href = url + ap + 'limit=' + limit + '&offset=' + offset;
        } else {
            form = $(form);
        }

        form.append($("<input />").attr("type", "hidden").attr("name", "limit").attr("value", limit));
        form.append($("<input />").attr("type", "hidden").attr("name", "offset").attr("value", offset)).submit();

        return;
    }

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

        $('.' + element).addClass(rpmHideClass)

        var current = 0;

        if (type === 'prev') {
            next = next - limit;
            current = next - limit + 1;
            for (let i = current; i <= next; i++) {
                $('.' + element + '-' + i).removeClass(rpmHideClass);
            }
            current_page--;

        } else if (type === 'next') {
            current = next + 1;
            next = next + limit;
            for (let i = current; i <= next; i++) {
                $('.' + element + '-' + i).removeClass(rpmHideClass);
            }
            current_page++;
        } else if (type === 'page-num') {
            current = (limit * (current_page - 1)) + 1;
            next = (limit * (current_page - 1)) + limit;
            for (let i = current; i <= next; i++) {
                $('.' + element + '-' + i).removeClass(rpmHideClass);
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
        let pageArray = [], fp = 1, lp = pages;
        let menuHtml = '';
        
        if (lp <= 6) {
            for (let i = 1; i <= lp; i++) {
                pageArray.push(i);
            }
        } else if (Math.abs(current_page - fp) < 3) {
            pageArray = [1, 2, 3, 4, '...', lp];
        } else if (Math.abs(current_page - lp) < 3) {
            pageArray = [1, '...', lp - 3, lp - 2, lp - 1, lp];
        } else {
            pageArray = [1, '...', current_page - 1, current_page, current_page + 1, '...', lp];
        }

        menuHtml = '<li class="' + rpmListClass + ' prev ' + (current_page === fp ? 'disabled' : '') + '"><a class="' + rpmAnchorClass + '" href="#">prev</a></li>';
        for (let i = 0; i < pageArray.length; i++) {
            if (lp <= i) {
                break;
            } else {

                if (pageArray[i] === '...') {
                    menuHtml += '<li class="' + rpmListClass + ' page-inf disabled"><a class="' + rpmAnchorClass + '" data-page_no="..." href="#">...</a></li>';
                } else {
                    menuHtml += '<li class="' + rpmListClass + ' page-' + pageArray[i] + ' ' + (pageArray[i] === current_page ? 'disabled' : '') + '"><a class="' + rpmAnchorClass + '" data-page_no="' + pageArray[i] + '" href="#">' + pageArray[i] + '</a></li>';
                }
            }
        }
        menuHtml += '<li class="' + rpmListClass + ' next ' + (current_page === lp ? 'disabled' : '') + '"><a class="' + rpmAnchorClass + '" href="#">next</a></li>';
        $(element).append(menuHtml);

        return true;
    };

})(jQuery);
