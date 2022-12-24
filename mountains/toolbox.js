$(document).ready(function () {
    $('#toolboxRemoveBlur').on('click', function () {
        if ($('.mountainBlur').length == 0) {
            AddBlur();
        } else {
            $('.mountainBlur').remove();
        }
    });

    $('#toolboxRemoveFronMountain').on('click', function () {
        $('.lensflare').toggle();
    });

    $('#toolboxPeakDetail').on("keyup", function(){
        RandomiseMountains();
    });

    $('#toolboxSliderDetail').on("input", function(){
        $('#toolboxPeakDetail').val($(this).val());
        RandomiseMountains();
    })
    
    $('#toolboxSliderMountainPositions').on("input", function(){
        PositionMountains();
        PositionLensFlare();
    })

    $('#toolboxLensFlareX, #toolboxLensFlareY').on("input", function(){
        PositionLensFlare();
    })
});