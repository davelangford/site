/* Lens flare CSS + JS originally from https://codepen.io/erikputz/pen/VzMbga  */

$(document).ready(function () {
    PositionLensFlare();
});


function PositionLensFlare(){
    var pointX = $('#toolboxLensFlareX').val();
    var pointY = parseInt($('#toolboxLensFlareY').val()) + parseInt($('#toolboxSliderMountainPositions').val() / 150);

    console.log(`pointX: ${pointX}, pointY ${pointY}`);
    $('.sky').css('background', 'radial-gradient(at ' + pointX + 'vw ' + pointY + 'vh ' + ', rgba(226,241,230,1) 0%, rgba(238,211,156,1) 14%, rgba(232,148,78,1) 28%, rgba(195,112,76,1) 45%, rgba(166,60,42,1) 63%, rgba(109,51,41,1) 79%');
    $('.ground').css('top', (pointY - 25) + 'vh');
    $('.source').css('left', pointX + 'vw').css('top', pointY + 'vh');
    $('.source-beam').css('left', pointX + 'vw').css('top', pointY + 'vh');
    $('.c1').css('left', pointX + 'vw').css('top', pointY + 'vh');
    $('.c2').css('left', pointX - ((50 - pointX) / 4) + 'vw').css('top', pointY - (50 - pointY) / 4 + 'vh');
    $('.c3, .c5').css('left', 50 - ((50 - pointX) / 9) + 'vw').css('top', 50 - (50 - pointY) / 9 + 'vh');
    $('.c4').css('left', 50 - ((50 - pointX) / 4) + 'vw').css('top', 50 - (50 - pointY) / 4 + 'vh');
    $('.c6').css('left', 50 + ((50 - pointX) / 4) + 'vw').css('top', 50 + (50 - pointY) / 4 + 'vh');
    $('.c7').css('left', 50 + ((50 - pointX) / 3) + 'vw').css('top', 50 + (50 - pointY) / 3 + 'vh');
    $('.c8').css('left', 50 + ((50 - pointX) / 1.8) + 'vw').css('top', 50 + (50 - pointY) / 1.8 + 'vh');
    $('.c9').css('left', 50 + ((50 - pointX) / 1.9) + 'vw').css('top', 50 + (50 - pointY) / 1.9 + 'vh');
    $('.c10').css('left', 50 + ((50 - pointX) / 1.7) + 'vw').css('top', 50 + (50 - pointY) / 1.7 + 'vh');
    $('.c11').css('left', 50 + ((50 - pointX) / 1.5) + 'vw').css('top', 50 + (50 - pointY) / 1.5 + 'vh');
    $('.c12').css('left', 50 + ((50 - pointX) / 1.2) + 'vw').css('top', 50 + (50 - pointY) / 1.2 + 'vh');
    $('.c13').css('left', 50 + ((50 - pointX) / 0.9) + 'vw').css('top', 50 + (50 - pointY) / 0.9 + 'vh');
    $('.c14').css('left', 100 - pointX + 'vw').css('top', 100 - pointY + 'vh');
};
