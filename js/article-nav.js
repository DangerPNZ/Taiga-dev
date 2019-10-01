'use strict';

(function () {
var navDots = document.querySelectorAll('.articles__dot');
var articles = document.querySelectorAll('.article-item');
var nextArticleLinks = document.querySelectorAll('.article-item__link');
var nextActiveElementIndex = null;
var index = null;

var deactiveElements = function () {
    for (var j = 0; j < navDots.length; j++) {
        navDots[j].classList.remove('articles__dot--active');
        articles[j].classList.remove('article-item--active');
    }
};
var getActiveElementIndex = function () {
    for (var a = 0; a < navDots.length; a++) {
        if (navDots[a].classList.contains('articles__dot--active')) {
            index = a;
        } 
    }
    return index;
};

for (var i = 0; i < navDots.length; i++) {
    navDots[i].addEventListener('click', function (event) {
        deactiveElements();
        event.currentTarget.classList.add('articles__dot--active');
        articles[getActiveElementIndex()].classList.add('article-item--active');
        setHeaderWidth();
    });
}
for (var l = 0; l < nextArticleLinks.length; l++) {
    nextArticleLinks[l].addEventListener('click', function (event) {
        event.preventDefault();
        window.scrollTo(0, 0);
        nextActiveElementIndex = getActiveElementIndex() + 1;
        deactiveElements();
        navDots[nextActiveElementIndex].classList.add('articles__dot--active');
        articles[nextActiveElementIndex].classList.add('article-item--active');
        setHeaderWidth();
    });
}
})();