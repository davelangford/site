var colorCount = 9;

$(document).ready(function () {
    AddClickEvents();
    NewGame();

});

function AddClickEvents() {
    $('.colorCountUp').on('click', function () {
        colorCount = colorCount + 2;
        localStorage.setItem("colorCount", colorCount);
        $('.colorCount').text(colorCount);
        ShowConfirm();

    });

    $('#completeTick').on('click', function () {
        ClickTick();
    });
    
    $('.colorCountDown').on('click', function () {
        if (colorCount <= 7) {
            return;
        }
        colorCount = colorCount - 2;
        localStorage.setItem("colorCount", colorCount);
        $('.colorCount').text(colorCount);
        ShowConfirm();

    });
    $('.newGame').on('click', function () {
        ShowConfirm();
        //EndGame();
    });
    $('.lock').on('click', function () {
        // if (localStorage.getItem("lock") == 'false') {
        //     localStorage.setItem("lock", "true")
        //     $('.lock').text('Lock');
        // } else {
        //     localStorage.setItem("lock", "false")
        //     $('.lock').text('Unlock');
        // }
        // EndGame();
        if (localStorage.getItem("lock") == 'false') {
            LockBars();
        } else {
            UnlockBars();
        }
        //ShowConfirm();
    });
    $('.hint').on('click', function () {
        ShowHint();
    });

    $('.confirmNo').on('click', function () {
        $('#menuConfirm').hide("slide", { direction: "right" }, 500);
    });

    $('.confirmYes').on('click', function () {
        EndGame();
    });

    $('#imageMode').on('click', function () {
        if (localStorage.getItem("imageMode") == 'false') {
            localStorage.setItem("imageMode", "true");
        } else {
            localStorage.setItem("imageMode", "false");
        }
        EndGame();
    });

    //     if($("#isAgeSelected").is(':checked'))
    //     $("#txtAge").show();  // checked
    // else
    //     $("#txtAge").hide();  // unchecked


}

function LockBars() {
    localStorage.setItem("lock", "true");
    $('.lock').text("Unlock");
    $('#colorDiv').prepend($("ul").find("[data-id='1'")[0]);
    $('#colorDiv').append($("ul").find("[data-id='" + colorCount + "'")[0]);

    $('.colorBar').first().append('<img src="images/lock.png" />');//.addClass("colorBarLocked");
    $('.colorBar').last().append('<img src="images/lock.png" />');//.addClass("colorBarLocked");
}

function UnlockBars() {
    localStorage.setItem("lock", "false")
    $('.lock').text("Lock");
    $('.colorBar').first().removeClass("colorBarLocked");
    $('.colorBar').last().removeClass("colorBarLocked");
}

function ShowConfirm() {
    RemoveClickEvents();
    $('#menuConfirm').show("slide", { direction: "right" }, 500, function () {
        AddClickEvents();
    });
}


function RemoveClickEvents() {
    $('.colorCountUp').off('click');
    $('.colorCountDown').off('click');
    $('.newGame').off('click');
    $('.lock').off('click');
    $('.hint').off('click');
    $('#imageMode').off('click');
}


function ShowHint() {
    var idList = [];
    for (var i = 1; i <= colorCount; i++) {
        if ($($('.colorBar')[i]).attr("data-id") != i+1) {
            idList.push(i);
        }
    }

    for (var i = 0; i < idList.length; i++) {
        $($('.colorBar')[idList[i]]).css('position', 'relative').animate({
            width: '80vw',
            left: '10vw'
        });
    }
    setTimeout(function () {
        $('.colorBar').animate({
            width: '100vw',
            left: '0vw'
        });
    }, 1000);
}

function NewGame() {
    try {
        LoadColors();
        if (CheckResult()) {
            EndGame();
        }
    }
    catch (err) {
        location.reload();
    }
}

function EndGameSuccess() {
    $('#menuConfirm').hide("slide", { direction: "left" }, 500);
    $('#completeOverlay').fadeIn(50, function () {
        $('#completeTick').show("slide", { direction: "right" }, 500);
        $('#completeOverlay').fadeTo(1000, 0.001, function () {
            $('#completeOverlay').fadeOut(1000, function () {
                
            });
        });
    });
}

const ClickTick = () => {
    $('.colorBar').each(function () { $(this).hide("slide", { direction: "left" }, Math.random() * (1400 - 300) + 300) });
    $('#colorDiv').hide("slide", { direction: "left" }, 1500);
    $('#completeTick').hide("slide", { direction: "left" }, 700, function () {
        setTimeout(function () {
            try {
                LoadColors();
                if (CheckResult()) {
                    EndGame();
                }
            }
            catch (err) {
                location.reload();
            }

        }, 800)
    });
}

function EndGame() {
    $('#menuConfirm').hide("slide", { direction: "left" }, 500);

    RemoveClickEvents();
    $('.colorBar').each(function () { $(this).hide("slide", { direction: "left" }, Math.random() * (1400 - 300) + 300) });
    $('#colorDiv').hide("slide", { direction: "left" }, 1500, function () {
        setTimeout(function () {
            // try {
            //     LoadColors();
            //     if (CheckResult()) {
            //         EndGame();
            //     }
            // }
            // catch (err) {
            //     location.reload();
            // }
            location.reload();
        }, 800);

        // setTimeout(function () {
        //     AddClickEvents();

        // }, 2000);
    });

}

function CheckResult() {
    var forwardCorrect = true;
    var backwardCorrect = true;

    if (localStorage.getItem("lock") == "true") {
        for (var i = 1; i <= colorCount; i++) {
            if ($("[data-id=" + i + "]")[0] != $('.colorBar')[i - 1]) {
                forwardCorrect = false;
                break;
            }
        }

        backwardCorrect = false;
        // for (var i = 1; i < colorCount; i++) {
        //     if ($("[data-id=" + i + "]")[0] != $('.colorBar')[colorCount - i]) {
        //         backwardCorrect = false;
        //         break;
        //     }
        // }

    } else {
        for (var i = 2; i <= colorCount - 2; i++) {
            if ($("[data-id=" + i + "]")[0] != $('.colorBar')[i - 1]) {
                forwardCorrect = false;
                break;
            }
        }
        for (var i = 2; i < colorCount; i++) {
            if ($("[data-id=" + i + "]")[0] != $('.colorBar')[colorCount - i]) {
                backwardCorrect = false;
                break;
            }
        }
    }

    if (forwardCorrect || backwardCorrect) {
        return true;
    } else {
        return false;
    }
}
function setup() {
    createCanvas(400, 400);
}


function LoadColors() {
    if (localStorage.getItem("imageMode") == null) {
        localStorage.setItem("imageMode", "false");
    }

    if (localStorage.getItem("lock") == null) {
        localStorage.setItem("lock", "true");
    }

    $('.colorBar').remove();
    $('#completeOverlay').css("opacity", "");

    var ranges = [];
    var rangeName;
    for (var key in data) {
        ranges.push(key);
    }
    const removeValues = ['Pastel1', 'Pastel2', 'Paired', 'Accent', 'Dark2', 'Set1', 'Set2', 'Set3', 'tab10', 'tab20', 'tab20b', 'tab20c', 'Greys', 'binary', 'gist_gray', 'gist_yarg', 'gray' ];
    ranges = ranges.filter(range => !removeValues.includes(range));

    rangeName = ranges[GetRandomInt(0, ranges.length)];
    var colors = [];
    var colorsDarker = [];

    colorCount = localStorage.getItem("colorCount") ? Number(localStorage.getItem("colorCount")) : colorCount;

    if (GetRandomInt(0, 100) < 80) {
        $('#colorRange').text(rangeName);
        for (var i = 0; i < colorCount; i++) {
            var color = partial(rangeName)(mapRange(i, 0, colorCount - 1, 0, 1));
            colors.push(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
            colorsDarker.push(`rgb(${Math.floor(color[0] * 0.1)}, ${Math.floor(color[1] * 0.1)}, ${Math.floor(color[2] * 0.1) })`);
        }
    } else {
        $('#colorRange').text('');
        var startColor = GetRandomColor();
        var endColor = GetRandomColor();

        colors[0] = '#' + startColor;
        for (var i = 1; i < colorCount - 1; i++) {
            var r = parseCSSColor(startColor)[0] + (parseCSSColor(endColor)[0] - parseCSSColor(startColor)[0]) / colorCount * i;
            var g = parseCSSColor(startColor)[1] + (parseCSSColor(endColor)[1] - parseCSSColor(startColor)[1]) / colorCount * i;
            var b = parseCSSColor(startColor)[2] + (parseCSSColor(endColor)[2] - parseCSSColor(startColor)[2]) / colorCount * i;
            colors[i] = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        }
        colors[colorCount - 1] = '#' + endColor;
    }

    for (var i = 0; i <= colorCount - 1; i++) {
        var elem = document.createElement('li');
        $(elem).addClass("ui-state-default colorBar");
        $(elem).attr('data-id', (i + 1));
        $(elem).css('background', colors[i])
            .css('background', `linear-gradient(90deg, ${colorsDarker[i]} 0%, ${colors[i]} 2%, ${colors[i]} 98%, ${colorsDarker[i]} 100%)`)
            .css('height', (80 / (colorCount)) + 'vh')
            .css("display", "none")
            .css("border-radius", (1 / colorCount * 20) + 'vh');

        $('#sortable').append(elem);
    }

    $('#sortable').shuffleChildren();
    $('#sortable').shuffleChildren();

    if (localStorage.getItem("lock") == "true") {
        LockBars()
    } else {
        UnlockBars();
    }

    $('#colorDiv').show();
    $('.colorBar').each(function () { $(this).show("slide", { direction: "right" }, Math.random() * (1200 - 200) + 200) });
    $('.colorBar').show();

    localStorage.setItem("colorCount", colorCount);
    $('.colorCount').text(colorCount);
    setTimeout(function () {
        $("#sortable").sortable({
            onComplete: function (ul) {
                if (CheckResult()) {
                    EndGameSuccess();
                }
            }
        });
    }, 1500);


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