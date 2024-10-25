const audioPlayer = document.getElementById('audioPlayer');
const volumeBtn = document.querySelector('.volume-btn img');
const volumeSlider = document.querySelector('.volume-slider');
const playButton = document.querySelector('.play-btn img');
const nextButton = document.querySelector('.next-btn img');
const prevButton = document.querySelector('.prev-btn img');
const songCards = document.querySelectorAll('.song-card');
const featuredCards = document.querySelectorAll('.featured-card');

let isPlaying = false;
let isSongLoaded = false;

const footerSongImg = document.querySelector('.now-playing-song img');
const footerSongName = document.querySelector('.song-info h4');
const progressBar = document.querySelector('.music-slider');
const currentTimeElement = document.querySelector('.current-time');
const totalDurationElement = document.querySelector('.total-time');

const volumeUpImg = './assets/volume-up.png';
const volumeMutedImg = './assets/mute.png'; 
const playImg = './assets/play-button.png';
const pauseImg = './assets/pause.png';

const defaultSong = {
    src: './songs/O Sanam - Sunoh 128 Kbps.mp3',
    name: 'O Sanam',
    img: './assets/sanam.jpg'
};

window.addEventListener('load', () => {
    loadSong(defaultSong.src, defaultSong.name, defaultSong.img);
    audioPlayer.pause();
});

playButton.addEventListener('click', () => {
    if (!isSongLoaded) {
        loadSong(defaultSong.src, defaultSong.name, defaultSong.img);
    }

    // Toggle play/pause
    if (isPlaying) {
        audioPlayer.pause();
        playButton.src = playImg; 
        isPlaying = false;
    } else {
        audioPlayer.play();
        playButton.src = pauseImg;
        isPlaying = true;
    }
});

// Toggle Mute
volumeBtn.addEventListener('click', () => {
    if (volumeBtn.src.includes('volume-up')) {
        volumeBtn.src = volumeMutedImg;
    } else {
        volumeBtn.src = volumeUpImg;
    }
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Mute Slider
function updateVolumeIcon() {
    if (volumeSlider.value === '0') {
        volumeBtn.src = volumeMutedImg;
    } else {
        volumeBtn.src = volumeUpImg;
    }
}

volumeSlider.addEventListener('input', updateVolumeIcon);

updateVolumeIcon();


// Play Songs

audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = Math.floor(audioPlayer.currentTime);
    progressBar.value = currentTime;
    currentTimeElement.textContent = formatTime(currentTime);
});

function loadSong(songSrc, songName, songImg) {
    audioPlayer.src = songSrc;
    audioPlayer.load(); 

    footerSongName.textContent = songName;
    footerSongImg.src = songImg;

    progressBar.value = 0;
    currentTimeElement.textContent = '0:00';
    totalDurationElement.textContent = '0:00';

    audioPlayer.addEventListener('loadedmetadata', () => {
        totalDurationElement.textContent = formatTime(audioPlayer.duration);
        progressBar.max = Math.floor(audioPlayer.duration);
    });

    isSongLoaded = true;
}

progressBar.addEventListener('input', () => {
    audioPlayer.currentTime = progressBar.value;
    currentTimeElement.textContent = formatTime(progressBar.value);
});

songCards.forEach(function(card) {
    card.addEventListener('click', function() {
        const songSrc = card.getAttribute('data-src');
        const songName = card.getAttribute('data-name');
        const songImg = card.getAttribute('data-img');
        loadSong(songSrc, songName, songImg);
        audioPlayer.play();
        playButton.src = pauseImg;
        isPlaying = true; 
    });
});

featuredCards.forEach(function(card) {
    card.addEventListener('click', function() {
        const songSrc = card.getAttribute('data-src'); 
        const songName = card.getAttribute('data-name'); 
        const songImg = card.getAttribute('data-img'); 
        loadSong(songSrc, songName, songImg); 
        audioPlayer.play(); 
        playButton.src = pauseImg; 
        isPlaying = true; 
    });
});

volumeSlider.addEventListener('input', function() {
    audioPlayer.volume = volumeSlider.value / 100; 
    if (audioPlayer.volume === 0) {
        volumeBtn.src = './assets/mute.png'; 
    } else {
        volumeBtn.src = './assets/volume-up.png'; 
    }
});

volumeBtn.addEventListener('click', function() {
    if (audioPlayer.muted) {
        audioPlayer.muted = false;
        volumeBtn.src = './assets/volume-up.png'; 
    } else {
        audioPlayer.muted = true;
        volumeBtn.src = './assets/mute.png';
    }
});

window.onload = (event) => {
    console.log("page is fully loaded");
  };


