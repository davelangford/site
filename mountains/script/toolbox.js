var zoomPreview = false;

$(document).ready(function () {
    $('#toolboxRemoveBlur').on('click', function () {
        if ($('.mountainBlur').length == 0) {
            AddBlur();
        } else {
            $('.mountainBlur').remove();
        }
    });

    $('#toolboxToggleLensFlare').on('click', function () {
        $('.lensflare').toggle();
    });

    $('#toolboxPeakDetail').on("keyup", function () {
        RandomiseMountains();
    });

    $('#toolboxSliderDetail').on("input", function () {
        $('#toolboxPeakDetail').val($(this).val());
        RandomiseMountains();
    })

    $('#toolboxSliderMountainPositions').on("input", function () {
        PositionMountains();
        PositionLensFlare();
    })

    $('#toolboxLensFlareX, #toolboxLensFlareY').on("input", function () {
        PositionLensFlare();
    })

    $('.mountainPreview').on('click', function () {
        if (zoomPreview) {
            $(this).css('width', '31vw').css('height', '23vh');
        } else {
            $(this).css('width', '100vw').css('height', '80vh');
        }
        zoomPreview = !zoomPreview;
    });
});