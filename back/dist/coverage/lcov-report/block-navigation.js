var jumpToCode = (function init() {
    var missingCoverageClasses = ['.cbranch-no', '.cstat-no', '.fstat-no'];
    var fileListingElements = ['td.pct.low'];
    var notSelector = ':not(' + missingCoverageClasses.join('):not(') + ') > ';
    var selector = fileListingElements.join(', ') +
        ', ' +
        notSelector +
        missingCoverageClasses.join(', ' + notSelector);
    var missingCoverageElements = document.querySelectorAll(selector);
    var currentIndex;
    function toggleClass(index) {
        missingCoverageElements
            .item(currentIndex)
            .classList.remove('highlighted');
        missingCoverageElements.item(index).classList.add('highlighted');
    }
    function makeCurrent(index) {
        toggleClass(index);
        currentIndex = index;
        missingCoverageElements.item(index).scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });
    }
    function goToPrevious() {
        var nextIndex = 0;
        if (typeof currentIndex !== 'number' || currentIndex === 0) {
            nextIndex = missingCoverageElements.length - 1;
        }
        else if (missingCoverageElements.length > 1) {
            nextIndex = currentIndex - 1;
        }
        makeCurrent(nextIndex);
    }
    function goToNext() {
        var nextIndex = 0;
        if (typeof currentIndex === 'number' &&
            currentIndex < missingCoverageElements.length - 1) {
            nextIndex = currentIndex + 1;
        }
        makeCurrent(nextIndex);
    }
    return function jump(event) {
        switch (event.which) {
            case 78:
            case 74:
                goToNext();
                break;
            case 66:
            case 75:
            case 80:
                goToPrevious();
                break;
        }
    };
})();
window.addEventListener('keydown', jumpToCode);
//# sourceMappingURL=block-navigation.js.map