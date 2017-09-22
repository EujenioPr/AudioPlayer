class audioPlayer {
    constructor() {
        this.uAgent = navigator.userAgent.toLowerCase();
        this.dir = 'audio/';
        this.ext = this.uAgent.includes('firefox') ? this.ext = '.ogg' : this.ext = '.mp3';
        this.audio = new Audio;
        this.playlist = ['Cirice', 'Carry On My Wayward Son', 'Hail To The King'];
        this.it = 0;
        this.audio.src = this.dir + this.playlist[this.it] + this.ext;
        this.duration = 0;
        this.isSeeking = false;

        this.mainButton = document.getElementById('mainButton');
        this.leftButton = document.getElementById('leftButton');
        this.rightButton = document.getElementById('rightButton');
        this.playBody = document.getElementById('playlist');
        this.range = document.getElementById('ranger');
        this.volume = document.getElementById('volume');
        this.mute = document.getElementById('muteVolume');
        this.tracker = document.getElementById('Tracked');

        this.currSong = document.getElementById('currSong');
        this.currPt = document.getElementById('currPlayTime');
        this.durPt = document.getElementById('durPlayTime');

        
        this.fetchPlayBody();
        return this;
    }
    fetchPlayBody() {
        for(let i = 0; i < this.playlist.length; i++) {
            this.playBody.innerHTML += '<li><button id="'+ i +'" class="play-button music-pb"></button>'+ this.playlist[i] +'</li>';
        }
    }
    playPause() {
        console.log('play');
        if (this.audio.paused) {
            this.audio.play();
        } else {
            this.audio.pause();
        } 
    }
    playNew(id) {
        this.it = id;
        console.log(this.it);
        this.audio.src = this.dir + this.playlist[this.it] + this.ext;
        this.audio.play();
    }
    nextCom() {
        if(this.it == this.playlist.length - 1) {
            this.it = 0;
        } else {
            this.it++;
        }
        this.audio.src = this.dir + this.playlist[this.it] + this.ext;
        this.playNew(this.it);
    }
    previousCom() {
        console.log(this.it);
        if(this.it == 0) {
            this.it = 0;
        } else {
            this.it--;
        }
        this.audio.src = this.dir + this.playlist[this.it] + this.ext;
        this.playNew(this.it);
    }
    seekRange() {
        this.audio.currentTime = this.range.value * (this.audio.duration / 100);
        console.log(this.range.value);
    }
    timeUpdate() {
        if (this.isSeeking)
            return
        let time = this.audio.currentTime * (100 / this.audio.duration);
        this.range.value = Math.floor(time) | 0;
        if (this.range.value == 100)
            this.nextCom();
        this.tracker.style.width = ''+ this.range.value + '%';
        this.musicTime();
    }
    volumeManage(mute) {
        if (mute && this.audio.muted) {
            this.audio.muted = false;
            this.volume.value = 100;
            this.mute.lastChild.style.backgroundImage = 'url(assets/images/icons/icon-3.svg)';
            this.volumeManage();
            return;
        } 
        if (mute && this.audio.muted === false) {
            this.audio.muted = true;
            this.volume.value = 0;
            this.mute.lastChild.style.backgroundImage = 'url(assets/images/icons/icon-7.svg)';
            return;
        }
        this.audio.volume = this.volume.value / 100;
    }
    events() {
        mainButton.addEventListener('click', () => this.playPause());
        leftButton.addEventListener('click', () => this.previousCom());
        rightButton.addEventListener('click', () => this.nextCom());
        
        for (let i = 0; i < this.playlist.length; i++) {
            document.getElementById(i).addEventListener('click', () => this.playNew(i));
        }
        
        this.range.addEventListener('mousedown', () => { this.isSeeking = true; this.seekRange(); });
        this.range.addEventListener('mouseup', () => { this.isSeeking = false; this.seekRange(); });
        this.audio.addEventListener('timeupdate', () => this.timeUpdate());
        this.audio.addEventListener('timeupdate', () => this.iconManager());
        this.volume.addEventListener('mousemove', () => this.volumeManage());
        this.volume.addEventListener('click', () => this.volumeManage());
        this.mute.addEventListener('click', () => this.volumeManage(true));
    }
    musicTime() {
        let currMin = Math.floor(this.audio.currentTime / 60);
        let currSec = Math.floor(this.audio.currentTime - currMin * 60);
        let durMin = Math.floor(this.audio.duration / 60);
        let durSec = Math.floor(this.audio.duration - durMin * 60);
        (currMin < 10) ? currMin = '0' + currMin : console.log();
        (currSec < 10) ? currSec = '0' + currSec : console.log();
        (durMin < 10) ? durMin = '0' + durMin : console.log();
        (durSec < 10) ? durSec = '0' + durSec : console.log();

        (durMin.isNaN) ? durMin = '00:00' : console.log();
        (durSec.isNaN) ? durSec = '00:00' : console.log();

        this.currPt.innerHTML = currMin + ':' + currSec;
        this.durPt.innerHTML = durMin + ':' + durSec;
    }
    iconManager() {
        for(let i = 0; i < this.playlist.length; i++)
            document.getElementById(i).style.backgroundImage = 'url(assets/images/icons/icon-1.svg)';
        if(this.audio.paused) {
            document.getElementById(this.it).style.backgroundImage = 'url(assets/images/icons/icon-1.svg)';
            mainButton.lastChild.style.backgroundImage = 'url(assets/images/icons/icon-1.svg)';
        } else {
            document.getElementById(this.it).style.backgroundImage = 'url(assets/images/icons/icon-2.svg)';
            mainButton.lastChild.style.backgroundImage = 'url(assets/images/icons/icon-2.svg)';
        }
        this.currSong.innerHTML = this.playlist[this.it];        
    }
}

let player = new audioPlayer;
player.events();
