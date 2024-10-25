
const songs = [
    {
        title: 'O Sanam',
        src: './songs/O Sanam - Sunoh 128 Kbps.mp3',
        cover: './assets/sanam.jpg'
    },
    {
        title: 'Dilbar Mere',
        src: './songs/Dilbar Mere - Satte Pe Satta 128 Kbps.mp3',
        cover: './assets/dilbar.jpg'
    },
    {
        title: 'Janu Meri Jaan',
        src: './songs/Janu Meri Jaan - Shaan 128 Kbps.mp3',
        cover: './assets/janu.jpg'
    },
    {
        title: 'Hothon Se Chu Lo',
        src: './songs/Hothon Se Chhu Lo Tum (From Prem Geet) - Prem Geet 128 Kbps.mp3',
        cover: './assets/hothon.jpg'
    },
    {
        title: 'Chand Sifarish',
        src: './songs/Chand Sifarish - Fanaa 128 Kbps.mp3',
        cover: './assets/chand.jpg'
    },
    {
        title: 'Chaiyya Chaiyya',
        src: './songs/Chaiyya Chaiyya - Dil Se 128 Kbps.mp3',
        cover: './assets/chaiyya.jpg'
    },
    {
        title: 'Ek Din Aap',
        src: './songs/Ek Din Aap - Yes Boss 128 Kbps.mp3',
        cover: './assets/ek.jpg'
    },
    {
        title: 'Tera Hone Laga Hoon',
        src: './songs/Tera Hone Laga Hoon - Ajab Prem Ki Ghazab Kahani 128 Kbps.mp3',
        cover: './assets/tera.jpg'
    },
    {
        title: 'Kabhi Kabhi',
        src: './songs/Kabhi Kabhi Aditi Zindagi - Jaane Tu.. Ya Jaane Na 128 Kbps.mp3',
        cover: './assets/kabhi.jpg'
    }
];


const audioPlayer = document.getElementById('audioPlayer');
const volumeBtn = document.querySelector('.volume-btn img');
const volumeSlider = document.querySelector('.volume-slider');
const playButton = document.querySelector('.play-btn img');
const nextButton = document.querySelector('.next-btn img');
const prevButton = document.querySelector('.prev-btn img');
const songCards = document.querySelectorAll('.song-card');
const featuredCards = document.querySelectorAll('.featured-card');

let currentSongIndex = 0;
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

nextButton.addEventListener('click', function() {
    currentSongIndex++; 
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    loadSong(songs[currentSongIndex].src, songs[currentSongIndex].title, songs[currentSongIndex].cover);
    playButton.src = pauseImg;
    audioPlayer.play()
    isPlaying = true;
});

prevButton.addEventListener('click', function() {
    currentSongIndex--; 
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1; 
    }
    loadSong(songs[currentSongIndex].src, songs[currentSongIndex].title, songs[currentSongIndex].cover); 
    playButton.src = pauseImg;
    audioPlayer.play()
    isPlaying = true;
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
    audioPlayer.volume = volumeSlider.value / 100; // Set volume (0 to 1)
    if (audioPlayer.volume === 0) {
        volumeBtn.src = './assets/mute.png'; // Show mute icon
    } else {
        volumeBtn.src = './assets/volume-up.png'; // Show volume icon
    }
});

volumeBtn.addEventListener('click', function() {
    if (audioPlayer.muted) {
        audioPlayer.muted = false;
        volumeBtn.src = './assets/volume-up.png'; // Switch to volume up icon
    } else {
        audioPlayer.muted = true;
        volumeBtn.src = './assets/mute.png'; // Switch to muted icon
    }
});

window.onload = (event) => {
    console.log("page is fully loaded");
  };


