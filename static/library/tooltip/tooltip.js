(function() {
    "use strict";

    let tooltip, elm_edges, elm_top;

    var Tooltip = {
        create: function(tooltip, elm) {
            elm_edges = elm.getBoundingClientRect();
            elm_top = elm_edges.top + elm_edges.height;
            tooltip.innerHTML = elm.getAttribute('data-tooltip');

            if (elm_edges.left > window.innerWidth - 100) {
                tooltip.className = 'tooltip-container tooltip-left';
            } else if ((elm_edges.left + (elm_edges.width / 2)) < 10) {
                tooltip.className = 'tooltip-container tooltip-right';
            } else {
                tooltip.className = 'tooltip-container tooltip-center';
            }
        },
        position: function(tooltip, elm) {
            const viewport_edges = window.innerWidth - 100;
            const centered = (elm_edges.left + (elm_edges.width / 2)) - (tooltip.offsetWidth / 2);
            if (elm_edges.left > viewport_edges && elm_edges.width < 50) {
                tooltip.style.left = (elm_edges.left - (tooltip.offsetWidth + elm_edges.width)) + 'px';
                tooltip.style.top = elm.offsetTop + 'px';
            } else if (elm_edges.left > viewport_edges && elm_edges.width > 50) {
                tooltip.style.left = (elm_edges.left - tooltip.offsetWidth - 20) + 'px';
                tooltip.style.top = elm.offsetTop + 'px';
            } else if ((elm_edges.left + (elm_edges.width / 2)) < 10) {
                tooltip.className = 'tooltip-container tooltip-right';
                tooltip.style.left = (elm_edges.left + elm_edges.width + 20) + 'px';
                tooltip.style.top = elm.offsetTop + 'px';
            } else if ((elm_top - tooltip.offsetHeight - 30 + window.scrollY) < 10) {
                tooltip.className = 'tooltip-container tooltip-center';
                tooltip.style.left = centered + 'px';
                tooltip.style.top = elm_top + 10 + window.scrollY + 'px';
            } else {
                tooltip.className = 'tooltip-container tooltip-center-bottom';
                tooltip.style.left = centered + 'px';
                tooltip.style.top = elm_top - tooltip.offsetHeight - 30 + window.scrollY + 'px';
            }
        },
        elements: [],
        update: () => {
            Tooltip.elements.forEach(elem => {
                elem.replaceWith(elem.cloneNode(true));
            });
            Tooltip.elements = [];
            onReady();
        }
    };

    function showTooltipHover(evt) {
        const item = Object.create(Tooltip);
        const elm = evt.currentTarget;

        tooltip.setAttribute('aria-hidden', false);
        item.create(tooltip, elm);
        item.position(tooltip, elm);
    }

    function showTooltipKeyUp(evt) {
        const item = Object.create(Tooltip);
        const elm = evt.currentTarget;

        tooltip.setAttribute('aria-hidden', false);

        if (evt.keyCode == '9' ) {
            if (tooltip.firstChild) {
                tooltip.removeChild(tooltip.firstChild);
                tooltip.removeAttribute('style');
            }
            item.create(tooltip, elm);
            item.position(tooltip, elm);
        }
    }

    function hideTooltipHover() {
        hideTooltip();
    }

    function hideTooltipKeyUp(evt) {
        // 27 = 'ESC'-key
        if (evt.keyCode == '27')
            hideTooltip();
    }

    function hideTooltipClick(evt) {
        if (!evt.target.hasAttribute('data-tooltip'))
            hideTooltip();
    }

    function hideTooltip() {
        tooltip.setAttribute('aria-hidden', true);
        tooltip.className = 'tooltip-container no-display';
        tooltip.textContent = '';
        tooltip.removeAttribute('style');
    }

    function onReady() {
        tooltip = document.documentElement.querySelector('.tooltip-container');
        const tooltip_elms = document.documentElement.querySelectorAll('[data-tooltip]');
        Tooltip.elements = tooltip_elms;

        Array.prototype.forEach.call(tooltip_elms, function(elm) {
            elm.addEventListener('mouseover', showTooltipHover);
            elm.addEventListener('mouseout', hideTooltipHover);
            elm.addEventListener('keyup', showTooltipKeyUp);
            elm.addEventListener('keyup', hideTooltipKeyUp);
        });

        if (tooltip) {
            document.addEventListener('keyup', hideTooltipKeyUp);
            document.addEventListener('click', hideTooltipClick);
        }
    }

    document.addEventListener('DOMContentLoaded', onReady, false);
    window['tooltip'] = Tooltip;
})();
