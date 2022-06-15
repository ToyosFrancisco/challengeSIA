
// crea conexión con el socket
const socket = io();

// functions
function _handlerAction () {
    var value = $('#input-1').val();

    socket.emit('testing', value);
};

function _playAction() {
    socket.emit('play');
}

function _stopAction() {
    var video = $('#video')[0];
    socket.emit('stop', video.currentTime);
}

function _goToAction() {
    var ts = $('#timestamp').val() || 0;

    socket.emit('goTo', ts);
    $('#timestamp').val('');
}

function _handlerState(state) {
    var video = $('#video')[0];

    if (state.isPlaying) {
        video.play();
    } else {
        video.pause();
    }

    video.currentTime = state.ts; // secs

    $('#state').html(JSON.stringify(state, null, 2));
}

function _handleConnect() {
  $('#socket-id').text(socket.id);
}

// events
$('#btn-1').on('click', _handlerAction);
$('#play-button').on('click', _playAction);
$('#stop-button').on('click', _stopAction);
$('#go-to-button').on('click', _goToAction);

// listeners
socket.on('state', _handlerState);
socket.on('connect', _handleConnect);
