var colorCount = 9;
var gameCountLifetime = 0;
const removeValues = ['gist_ncar', 'nipy_spectral', 'cubehelix', 'prism', 'twilight', 'twilight_shifted', 'hsv', 'gist_rainbow', 'gist_stern', 'flag', 'Pastel1', 'Pastel2', 'Paired', 'Accent', 'Dark2', 'Set1', 'Set2', 'Set3', 'tab10', 'tab20', 'tab20b', 'tab20c', 'Greys', 'binary', 'gist_gray', 'gist_yarg', 'gray'];
var ranges = [];
var rangeName;
var startColor, endColor;
var startHue = 0, endHue = 355;
var startLuminance;
var usingRangeName;
var colors = [];
var rndWeight;


$(document).ready(function () {
    AddClickEvents();
    for (var key in data) {
        ranges.push(key);
    }
    ranges = ranges.filter(range => !removeValues.includes(range));
    NewGame(true);

});

function AddClickEvents() {
    $('.colorCountUp').on('click', function () {
        colorCount = colorCount + 2;
        localStorage.setItem("colorCount", colorCount);
        $('.colorCount').text(colorCount);
        NewGame(false);
        //ShowConfirm();
    });

    $('.colorCountDown').on('click', function () {
        if (colorCount <= 7) {
            return;
        }
        colorCount = colorCount - 2;
        localStorage.setItem("colorCount", colorCount);
        $('.colorCount').text(colorCount);
        NewGame(false);
        //ShowConfirm();
    });

    $('#completeTick').on('click', function () {
        EndGame();
        //ClickTick();
    });

    $('.newGame').on('click', function () {
        //NewGame(true);
        EndGame();

    });

    $('.hint').on('click', function () {
        ShowHint();
    });
}

function LockBars() {
    localStorage.setItem("lock", "true");
    $('.lock').text("Unlock");
    $('#colorDiv').prepend($("ul").find("[data-id='1'")[0]);
    $('#colorDiv').append($("ul").find("[data-id='" + colorCount + "'")[0]);

    $('.colorBar').first().append('<img src="images/lock.png" />');//.addClass("colorBarLocked");
    $('.colorBar').last().append('<img src="images/lock.png" />');//.addClass("colorBarLocked");
}

function RemoveClickEvents() {
    $('.colorCountUp').off('click');
    $('.colorCountDown').off('click');
    $('.newGame').off('click');
    $('.lock').off('click');
    $('.hint').off('click');
}

function ShowHint() {
    var idList = [];
    for (var i = 1; i <= colorCount; i++) {
        if ($($('.colorBar')[i]).attr("data-id") != i + 1) {
            idList.push(i);
        }
    }

    for (var i = 0; i < idList.length; i++) {

        $($('.colorBar')[idList[i]]).css('position', 'relative').animate({
            width: '80vw',
            left: '10vw',
        }, GetRandomInt(200, 500));
    }
    setTimeout(function () {
        $('.colorBar').animate({
            width: '100vw',
            left: '0vw'
        }, GetRandomInt(500, 1000));
    });
}

function NewGame(shouldLoadNewColorsAndSlideIn) {
    try {
        LoadColors(shouldLoadNewColorsAndSlideIn);
        if (CheckResult()) {
            EndGame();
        }
    }
    catch (err) {
        alert(err);
        location.reload();
    }
}

function EndGameSuccess() {
    UpdateGameCount();
    DisplayGameCount();

    $('.colorBar').each(function () {
        $(this).css('position', 'relative').animate({
            width: '60vw',
            left: '20vw',
        }, mapRange($(this).attr('data-id'), 1, $('.colorBar').length, 100, 700));
    });
    setTimeout(function () {
        $('.colorBar').animate({
            width: '100vw',
            left: '0vw'
        }, 200);
    });


    $('#completeTick').show("slide", { direction: "down" }, 200);
}

function SlideElementsLeft() {
    var p1 = $('#gameCountLifetime').hide("slide", { direction: "left" }, 500).promise();
    var p2 = $('.colorBar').each(function () { $(this).hide("slide", { direction: "left" }, Math.random() * (1400 - 300) + 300).promise() });
    var p3 = $('#colorDiv').hide("slide", { direction: "left" }, 1500).promise();
    var p4 = $('#colorRange').hide("slide", { direction: "left" }, 200).promise();
    var p5 = $('#completeTick').hide("slide", { direction: "left" }, 700).promise();
    
    return $.when(p1, p2, p3, p4, p5).then(function () { });
}

const ClickTick = () => {

    $('#completeTick').hide("slide", { direction: "left" }, 700);
        SlideElementsLeft().then(function () {
            LoadColors(true);
        });
}

function EndGame() {
    RemoveClickEvents();
    SlideElementsLeft().then(function () {
        LoadColors(true);
        AddClickEvents();
    });
}

function CheckResult() {
    for (var i = 1; i <= colorCount; i++) {
        if ($("[data-id=" + i + "]")[0] != $('.colorBar')[i - 1]) {
            return false;
        }
    }
    return true;
}

function DisplayGameCount() {
    $('#gameCountLifetime').text(localStorage.getItem("gameCountLifetime") ? Number(localStorage.getItem("gameCountLifetime")) : 0);
    $('#gameCountLifetime').css('color', getFontColorBasedOnBackground(rgbToHex($($('.colorBar')[0]).css("background-color"))));
    $('#gameCountLifetime').show("slide", { direction: "left" }, 200);

}

function rgbToHex(rgb) {
    let parts = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete (parts[0]);
    for (let i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    return '#' + parts.join('');
}

function getFontColorBasedOnBackground(hexcolor) {
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#FFFFFF';
}

function UpdateGameCount() {
    let gameCount = localStorage.getItem("gameCountLifetime");
    if (gameCount === null) {
        localStorage.setItem("gameCountLifetime", 1);
    } else {
        localStorage.setItem("gameCountLifetime", parseInt(gameCount) + 1);
    }
}
function LoadColors(shouldLoadNewColorsAndSlideIn) {
    try {
        $('.colorBar').remove();

        colorCount = localStorage.getItem("colorCount") ? Number(localStorage.getItem("colorCount")) : colorCount;

        if (shouldLoadNewColorsAndSlideIn) {
            rndWeight = GetRandomInt(0, 100);
        }
        switch (true) {
            case (rndWeight <= 20):
                colors = LoadColorsWithRandomStartAndEnd(shouldLoadNewColorsAndSlideIn);
                break;
            case (rndWeight <= 70):
                colors = LoadColorsWithRandomStartAndComplimentaryEnd(shouldLoadNewColorsAndSlideIn);
                break;
            case (rndWeight <= 100):
                colors = LoadColorsAchromaticWithRandomStartHueAndRandomEndHue(shouldLoadNewColorsAndSlideIn);
                break;
            default:
                break;
        }

        for (var i = 0; i <= colorCount - 1; i++) {
            var elem = document.createElement('li');
            $(elem).addClass("ui-state-default colorBar");
            $(elem).attr('data-id', (i + 1));
            $(elem).css('background', colors[i])
                .css('height', (80 / (colorCount)) + 'vh')
                .css("display", "none")
                .css("border-radius", (1 / colorCount * 20) + 'vh');

            $('#sortable').append(elem);
        }

        DisplayGameCount();

        $('#sortable').shuffleChildren();
        $('#sortable').shuffleChildren();

        LockBars()

        $('#colorDiv').show();
        if (shouldLoadNewColorsAndSlideIn) {
            $('.colorBar').each(function () { $(this).show("slide", { direction: "right" }, GetRandomInt(500, 1200)) });
            $('.colorBar').show();
        } else {
            $('.colorBar').show();
        }

        localStorage.setItem("colorCount", colorCount);
        $('.colorCount').text(colorCount);
        $('#colorRange').show("slide", { direction: "left" }, 200);
        setTimeout(function () {
            $("#sortable").sortable({
                onComplete: function (ul) {
                    if (CheckResult()) {
                        EndGameSuccess();
                    }
                }
            });
        }, (shouldLoadNewColorsAndSlideIn ? 1300 : 0));

    } catch (err) {
        alert('LoadColors(): ' + err);
    }
}

function LoadColorsAchromaticWithRandomStartHueAndRandomEndHue(shouldLoadNewColorsAndSlideIn) {
    var newColors = [];

    if (shouldLoadNewColorsAndSlideIn) {
            startHue = GetRandomInt(0, 359);
            endHue = startHue + GetRandomInt(90, 250);
    }

    $('#colorRange').text(`a_sh${startHue}.eh${endHue}`);

    for (var i = 1; i <= colorCount; i++) {
        newColors.push(`hsl(${mapRange(i, 1, colorCount,startHue, endHue)},100%,50%)`);
    }

    return newColors;
}

function LoadColorsWithRandomStartAndComplimentaryEnd(shouldLoadNewColorsAndSlideIn) {
    var newColors = [];

    if (shouldLoadNewColorsAndSlideIn) {
        startHue = GetRandomInt(0, 359);
        startLuminance = GetRandomInt(5, 70);
    }

    $('#colorRange').text(`c_h${startHue}.l${startLuminance}`);

    for (var i = 1; i <= colorCount; i++) {
        newColors.push(getComplimentaryHSLColorAtPointInGradient(startHue, i / colorCount, startLuminance));
    }

    return newColors;
}

function LoadColorsWithRandomStartAndEnd(shouldLoadNewColorsAndSlideIn) {
    var newColors = [];
    if (shouldLoadNewColorsAndSlideIn) {
        startColor = GetRandomColor();
        endColor = GetRandomColor();
    }

    $('#colorRange').text('random1');

    newColors[0] = '#' + startColor;
    for (var i = 1; i < colorCount - 1; i++) {
        var r = parseCSSColor(startColor)[0] + (parseCSSColor(endColor)[0] - parseCSSColor(startColor)[0]) / colorCount * i;
        var g = parseCSSColor(startColor)[1] + (parseCSSColor(endColor)[1] - parseCSSColor(startColor)[1]) / colorCount * i;
        var b = parseCSSColor(startColor)[2] + (parseCSSColor(endColor)[2] - parseCSSColor(startColor)[2]) / colorCount * i;
        newColors[i] = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
    newColors[colorCount - 1] = '#' + endColor;

    return newColors;
}

function LoadColorsFromRange(shouldLoadNewColorsAndSlideIn) {
    try {

        var newColors = [];
        if (shouldLoadNewColorsAndSlideIn) {
            rangeName = ranges[GetRandomInt(0, ranges.length)];
        }
        $('#colorRange').text(rangeName);
        for (var i = 0; i < colorCount; i++) {
            var color = partial(rangeName)(mapRange(i, 0, colorCount - 1, 0, 1));
            newColors.push(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        }
        return newColors;
    } catch (err) {
        alert('LoadColorsFromRange(): ' + err);

    }
}
function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}


function GetRandomBoolean() {
    return Math.random() < 0.25;
}

function GetRandomDecimal(min, max) {
    return Math.random() * (max - min) + min;
}

function GetRandomInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

function GetRandomHex(min, max) {
    var random = Math.floor(Math.random() * (max - min) + min);
    random = random.toString(16);
    random = ("0" + random).substring(random.length - 1);
    return random;
}

function GetRandomColor() {
    var r, g, b;

    r = GetRandomHex(0, 254);
    g = GetRandomHex(0, 254);
    b = GetRandomHex(0, 254);

    return [r, g, b].join('');// Math.floor(Math.random() * 16777215).toString(16);
}

$.fn.shuffleChildren = function () {
    $.each(this.get(), function (index, el) {
        var $el = $(el);
        var $find = $el.children();

        $find.sort(function () {
            return 0.5 - Math.random();
        });

        $el.empty();
        $find.appendTo($el);
    });
};

function getComplimentaryHue(hue) {
    return (hue + 180) % 360;
}

function getComplimentaryHSLColorAtPointInGradient(hue, point, startingLuminance = 50) {
    var complimentaryHue = getComplimentaryHue(hue);
    var color;
    //var newHue = mapRange(point, 0, 1, hue, complimentaryHue);
    //return "hsl(" + newHue + ",100%,50%)";

    if (point <= 0.5) {
        color = "hsl(" + hue + ",100%," + mapRange(point, 0, 0.5, startingLuminance, 100) + "%)";
    }
    else if (point > 0.5) {
        color = "hsl(" + complimentaryHue + ",100%," + mapRange(0.5, point, 0, 100, startingLuminance) + "%)";
    }
    return color;
}