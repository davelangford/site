var audio_jr_kill;
var audio_point;
var audio_sj_move;
var audio_np_move;

const AudioType = {
    jrMove: 0,
    jrKill: 1,
    point: 2,
    sjMove: 3,
    npMove: 4
}


$(document).ready(function () {

    

    audio_jr_kill = new Audio();
    audio_jr_kill.src = "audio/jr_kill.mp3";
    audio_jr_kill.loop = false;

    audio_point = new Audio();
    audio_point.src = "audio/point.mp3";
    audio_point.loop = false;

    audio_sj_move = new Audio();
    audio_sj_move.src = "audio/sj_move.mp3";
    audio_sj_move.loop = false;

    audio_np_move = new Audio();
    audio_np_move.src = "audio/sj_move.mp3";
    audio_np_move.loop = false;


});


function AudioPlay(audioFile) {
    switch (audioFile) {
        case AudioType.jrMove:
            var audio_jr_move = new Audio();
            audio_jr_move.src = "audio/jr_move.mp3";
            audio_jr_move.loop = false;
            audio_jr_move.play();
            break;
        case AudioType.jrKill:
            audio_jr_kill.play();
            break;
        case AudioType.point:
            audio_point.play();
            break;
        case AudioType.sjMove:
            audio_sj_move.play();
            break;
        case AudioType.npMove:
            audio_np_move.play();
            break;

    }

}