$(document).ready(function () {
    for (var i = 0; i < 10; i++) {
        $('body').append('<div class="mountain" style="top: ' + (i * (10 - 1)) + 'vh;" data-index="' + (10 - i) + '"></div>').css("height", "5vh");
    }
    $('.mountain').each(function () {
        BuildMountain($(this));
    });
    AddBlur();
    RandomiseMountains();
    BuildLastMountain();
    PositionMountains();
    
});

function PositionMountains() {
    $('.mountain').each(function () {
        var mountain = $(this);
        var sliderVal = $('#toolboxSliderMountainPositions').val();
        switch (mountain.attr('data-index')) {
            case '7':
                mountain.css('top', 32 + (sliderVal * 0) + 'vh');
                break;
            case '6':
                mountain.css('top', 32 + (sliderVal * 0.001) + 'vh')
                break;
            case '5':
                mountain.css('top', 32 + (sliderVal * 0.005) + 'vh');
                break;
            case '4':
                mountain.css('top', 32 + (sliderVal * .01) + 'vh');
                break;
            case '3':
                mountain.css('top', 32 + (sliderVal * .015) + 'vh');
                break;
            case '2':
                mountain.css('top', 32 + (sliderVal * .02) + 'vh');
                break;
            case '1':
                mountain.css('top', 32 + (sliderVal * .025) + 'vh');
                break;
            default:
                break;
        }

    });

    CreateReflections();
}

function AddBlur() {
    $('.mountain').each(function () {
        if ($(this).attr('data-index') >= 8) {
            $(this).remove();
            return;
        }
        $('body').append('<div class="mountainBlur" style="width: 100vw; height: ' + $(this).css('height') + '; top: ' + $(this).css('top') + '; display: block; position: absolute; backdrop-filter: blur(' + $(this).attr('data-index') * 2 / 10 + 'px); z-index: ' + ((10 - $(this).attr('data-index')) * 10 + 1) + ';"></div>');
    });
}

function RandomiseMountains() {
    $('.mountain').each(function () {
        var mountain = $(this);
        var currentPointHeight = 100;
        var polygonText = 'polygon(';
        var totalPoints = mountain.attr('data-index') / 10 * $('#toolboxPeakDetail').val();
        var currentPointPercentLocation = 0;
        var finishPoint = Math.random() * 100;

        for (var i = 0; i <= totalPoints; i++) {
            currentPointPercentLocation = i / totalPoints * 100;
            if (currentPointPercentLocation < 50 && currentPointHeight > 25) {
                currentPointHeight += Math.random() > 0.5 ? 0 : -(1 + Math.random());
            } else {
            currentPointHeight += Math.random() > 0.5 ? 1 + Math.random() : -(1 + Math.random());
            }

            //if (currentPointPercentLocation < finishPoint) {
            //    currentPointHeight = 100;
            //} else {
                if (currentPointHeight >= 99) {
                    currentPointHeight -= 1;
                }
                if (currentPointHeight <= 0) {
                    currentPointHeight = 1;
                }
            //}
            polygonText += currentPointPercentLocation + "% " + currentPointHeight + "%,";
        }
        mountain.css('clip-path', polygonText + ' 100% ' + GetRandom(0, 100) + '%, 100% 100%, 0% 100%, 0 ' + GetRandom(0, 100) + '%');
        mountain.css('left', finishPoint + 'vw');
    });
    $('.mountain7').css('left', '0vw');
    CreateReflections();
}

function CreateReflections() {
    $('.mountainReflection').remove();

    $('.mountain').each(function () {
        var mountain = $(this);
        var newReflection = mountain.clone();

        newReflection.removeClass();
        newReflection.addClass('mountainReflection');
        newReflection.css('top', (mountain.position().top + mountain.height()) + 'px')
        newReflection.css('height', (mountain.height() * 0.4) + 'px');
        newReflection.appendTo($('body'));
    });
}

function BuildMountain(mountain) {

    if (mountain.attr('data-index') >= 8) {
        mountain.remove();
        return;
    }
    mountain.addClass('mountain' + mountain.attr('data-index'));
    mountain.css('height', 3 * (10 - mountain.attr('data-index')) + 'vh');
    mountain.css('z-index', (10 - mountain.attr('data-index')) * 10);
}

function BuildLastMountain() {
    var mountain = $('.mountain').last();

    mountain.css('top', '65vh');
    mountain.css('height', '35vh');
    mountain.css('width', '100vw');

}
function GetRandom(min, max) {
    return Math.random() * max;
}


