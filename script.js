let tracks = [
    {   url : './audio/Ghostrifter Official - Midnight Stroll.mp3' , 
    cover : './cover/cover-3.jpg', artist : 'Ghostrifter' , title : 'Midnight Stroll'},
    {   url : './audio/Ghostrifter Official - Hot Coffee.mp3' , 
    cover : './cover/cover-1.jpg', artist : 'Ghostrifter' , title : 'Hot Coffee'},
    {   url : './audio/Ghostrifter Official - Merry Bay.mp3' , 
    cover : './cover/cover-2.jpg', artist : 'Ghostrifter' , title : 'Merry Bay'},
    {   url : './audio/Ghostrifter Official - Morning Routine.mp3' , 
    cover : './cover/cover-4.jpg', artist : 'Ghostrifter' , title : 'Morning Routine'},
    {   url : './audio/Ghostrifter Official - Still Awake.mp3' , 
    cover : './cover/cover-5.jpeg', artist : 'Ghostrifter' , title : 'Still Awake'},
    {   url : './audio/Ghostrifter Official - Afternoon Nap.mp3' , 
    cover : './cover/cover-6.jpg', artist : 'Ghostrifter' , title : 'Afternoon Nap'},
    {   url : './audio/Ghostrifter Official - Demised To Shield.mp3' , 
    cover : './cover/cover-7.jpg', artist : 'Ghostrifter' , title : 'Demised To Shield'},
    {   url : './audio/Ghostrifter Official - Departure.mp3' , 
    cover : './cover/cover-8.jpg', artist : 'Ghostrifter' , title : 'Departure'},
    {   url : './audio/Ghostrifter Official - Mellow Out.mp3' , 
    cover : './cover/cover-9.jpg', artist : 'Ghostrifter' , title : 'Mellow Out'},
    {   url : './audio/Ghostrifter Official - On My Way.mp3' , 
    cover : './cover/cover-10.jpg', artist : 'Ghostrifter' , title : 'On My Way'},
    {   url : './audio/Ghostrifter Official - Simplicit Nights.wav' , 
    cover : './cover/cover-1.jpg', artist : 'Ghostrifter' , title : 'Simplicit Nights'},
    {   url : './audio/Ghostrifter Official - Soaring.mp3' , 
    cover : './cover/cover-2.jpg', artist : 'Ghostrifter' , title : 'Soaring'},
    {   url : './audio/Ghostrifter Official - Subtle Break.mp3' , 
    cover : './cover/cover-3.jpg', artist : 'Ghostrifter' , title : 'Subtle Break'},
    {   url : './audio/Ghostrifter Official - Transient.mp3' , 
    cover : './cover/cover-4.jpg', artist : 'Ghostrifter' , title : 'Transient'},
]

/* ASSOCIAZIONE DOM */
/* funzionalità */
let playBtn = document.querySelector('#play-btn')
let pauseBtn = document.querySelector('#pause-btn')
let prevBtn = document.querySelector('#prev-btn')
let nextBtn = document.querySelector('#next-btn')
let sidebarToggler = document.querySelector('#sidebar-toggle')
/* dettagli canzone */
let trackArtist = document.querySelector('#track-artist')
let trackTitle = document.querySelector('#track-title')
let trackCover = document.querySelector('#track-cover')
let currentTime = document.querySelector('#current-time')
let totalTime = document.querySelector('#total-time')
let track = document.querySelector('#track')

//query prese da Davide
let volumeBtn = document.querySelector('#volume-btn')// Pannello volume
let volumeBar = document.querySelector('.volume-bar')// Wrapper per lo slider del volume
let volumeIcon = document.querySelector('#volume-icon')// Icona volume (pulsante "mute")
let volumeSlider = document.querySelector('#volume-slider')// Slider volume (totale, height 100%)
let volumeCursor = document.querySelector('#volume-cursor')// Slider volume (attuale, 0% < height < 100%)
let volumeCursorHandle = document.querySelector('#volume-cursor') // Dot su slider volume (per Volume on Drag)

let progressWrap = document.querySelector('#progress-bar')//Barra di avanzamento (duration)
let progressBar = document.querySelector('#progress-counter')//Barra del progresso (currentTime)
let seekPreview = document.querySelector('#seek-preview')// Pannello volume

let progress = document.getElementById('progress');
let progressContainer = document.getElementById('progress-container');
let randomBtn = document.querySelector('#random-btn')
let backgroundImage = document.querySelector('#background-image')
let trackCard = document.querySelectorAll('.track-card')

/* variabile globale per far partire la traccia */
let currentTrack = 0
let playing = false
let random = false
let volume = track.volume





function populateTrackList() {
    let wrapper = document.querySelector('#tracklist-wrapper')
    
    
    tracks.forEach((track, index )=>{
        let card = document.createElement('div')

        card.classList.add('col-12')
        card.innerHTML = 
        `
        <div class="d-flex justify-content-between align-items-center px-4 py-3 border-b track-card">
            <img class="thumbnail" src="${track.cover}" alt="copertina">
            <div>
                <h5 class=" tc-linear">${track.artist}</h5>
                <h6 class=" tc-white">${track.title}</h6>
            </div>                
            <i data-track="${index}" class="fab fa-napster fs-2 tc-linear playlist-play"></i>
            
        </div>
        `
        wrapper.appendChild(card)
    })

    let playBtns = document.querySelectorAll('.playlist-play')
    
    playBtns.forEach(btn =>{
        btn.addEventListener('click', ()=>{
            let selectedTrack = btn.getAttribute('data-track')

            currentTrack = selectedTrack 

            changeTrackDetails()
            changePlaylistActive()

            if (playing) {
                playing = false
                play()
            }    
            
        })
    })
}


function openSidebar() {
    let sidebar = document.querySelector('#sidebar')
    sidebar.classList.toggle('open')
}

function closeSidebar(){
    sidebar.classList.remove('open')
    play()
}


/* FUNZIONI */
/* audio */
function play() {
    if (!playing) {
        playBtn.classList.add('d-none')
        pauseBtn.classList.remove('d-none')
        trackCover.classList.add('active')
        track.play()
        playing = true        
    }else{
        playBtn.classList.remove('d-none')
        pauseBtn.classList.add('d-none')
        trackCover.classList.remove('active')
        track.pause()
        playing = false
    }
}

function prev() {
    if (random === false) {
        currentTrack--        
    }else{
        currentTrack = [Math.floor(Math.random() * tracks.length)]

    }  
    
    if (currentTrack < 0) {
        currentTrack = tracks.length -1
    }
    
    changeTrackDetails()
    changePlaylistActive()

    
    //controllo se la traccia è in esecuzione
    //se la traccia è in esecuzione e cambio traccia la musica si blocca
    //quindi devo reimpostare playing a false e farla ripartire
    if (playing) {
        playing = false
        play()        
    } 
    
}

function next() {

    if (random === false) {
        currentTrack++        
    }else{
        currentTrack = [Math.floor(Math.random() * tracks.length)]

    }  
    
    
    if (currentTrack > tracks.length -1) {
        currentTrack = 0
    }
    
    changeTrackDetails()
    changePlaylistActive()

    
    //controllo se la traccia è in esecuzione
    //se la traccia è in esecuzione e cambio traccia la musica si blocca
    //quindi devo reimpostare playing a false e farla ripartire
    if (playing) {
        playing = false
        play()        
    } 
    
}





// ~~~~ PANNELLO VOLUME ~~~~~~~~~~~~~~~~~~ //
//Aggiorna volume al caricamento della pagina
updateVolumeCursor()
//Pulsante VOLUME (MUTE)

volumeIcon.addEventListener('click', ()=>{
    if (track.volume) {
        track.volume = 0;
        // volumeIcon.classList.remove('fa-volume-up')
        // volumeIcon.classList.add('fa-volume-mute')
        updateVolumeCursor()
    } else {
        track.volume = volume
        track.volume =  volume
        // volumeIcon.classList.add('fa-volume-up')
        // volumeIcon.classList.remove('fa-volume-mute')
        updateVolumeCursor()
    }
})
//Slider VOLUME (on wheel)
volumeBtn.addEventListener('wheel', (event)=>{
    if (((track.volume + event.wheelDeltaY*0.0001)<=1)&&((track.volume + event.wheelDeltaY*0.0001)>=0)){
        track.volume += event.wheelDeltaY*0.0001
        if (track.volume<0.05){
            track.volume = 0
        }
        volume = track.volume
        updateVolumeCursor()
    }
})
//Slider VOLUME (drag/drop)
let grabbedVol = false
function grabVolHandle(e) {
    grabbedVol = true
    let x = e.offsetY;
    if (x > 90) track.volume = 0
    if (x-6 <= 85 && x-6 >= 0) {
        if (x-6>=84){
            track.volume = 0
        }
        if (x-6 <= 1){
            track.volume = 1
        }
        let position = ((-1 * (x-6)) / volumeSlider.offsetHeight) + 1
        console.log(position)
        track.volume = position
        updateVolumeCursor()
    }
}
function releaseVolHandle(e){
    grabbedVol = false
}
function dragVolHandle(e){
    if(grabbedVol){

        let x = e.offsetY
        let position = ((-1 * (x)) / volumeBar.offsetHeight) + 1
        
        if (position<0.05){
            track.volume = 0
        } else if (position >0.95){
            track.volume = 1
        } else{
            track.volume = position;
        }
        updateVolumeCursor()
       
    }

}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */




function changeTrackDetails() {
    
    track.src = tracks[currentTrack].url
    trackArtist.innerHTML = tracks[currentTrack].artist
    trackTitle.innerHTML = tracks[currentTrack].title
    trackCover.src = tracks[currentTrack].cover
    backgroundImage.src = tracks[currentTrack].cover
}


function changePlaylistActive() {
    let tracklistCards = document.querySelectorAll('.track-card')
    //prima tolgo da tutte le card la classe active, poi la aggiungo a quella che ho cliccato
    tracklistCards.forEach((card, index) =>{
        if (index == currentTrack) {
            card.classList.add('active')
            
        }else{
            card.classList.remove('active')
        }
    })
    
}




function activeRandom(){
    
    randomBtn.classList.toggle('active')
    if(random){
        random = false
        /* play() */
    } else {
        random = true
        /* play() */
    }
    
   
}
randomBtn.addEventListener('click', activeRandom)




// Aggiorna altezza del cursorse Volume
function updateVolumeCursor(){
    volumeCursor.style.height = (100 - track.volume * 100) + '%'
    if(track.volume >= 0.50) {volumeIcon.className = "fas fa-volume-up"} else
    if(track.volume > 0.00) {volumeIcon.className = "fas fa-volume-down"} else
    if(track.volume == 0.00) {volumeIcon.className = "fas fa-volume-mute"}

}

/* EVENTI */
playBtn.addEventListener('click', play)
pauseBtn.addEventListener('click', play)
nextBtn.addEventListener('click', next)
prevBtn.addEventListener('click', prev)
track.addEventListener('ended', next)


sidebarToggler.addEventListener('click', openSidebar)




function formatTime(sec){
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec - minutes * 60);
    if(seconds <10){
        seconds = `0${seconds}`;
    }
    return `${minutes}.${seconds}`;
}

let barProgress = document.querySelector('#progress')



function updateProgress(e) {
    let { duration, currentTime } = e.srcElement;
    let progressPercent = (currentTime / duration) * 100;
    barProgress.style.width = `${progressPercent}%`;
    
}

progressContainer.addEventListener('click', setProgress);

function setProgress(e) {
    let width = this.clientWidth;
    let clickX = e.offsetX;
    let duration = track.duration;
    
    track.currentTime = (clickX / width) * duration;
}

setInterval(function(){
    currentTime. innerHTML = formatTime(track.currentTime)
    totalTime. innerHTML = formatTime(track.duration)
    let barProgress = document.querySelector('#progress')
    let progressPercent = (track.currentTime / track.duration) * 100;
    barProgress.style.width = `${progressPercent}%`;
    
       
},900)
  
/* impostazione dati prima traccia */

populateTrackList()
changeTrackDetails()
changePlaylistActive()
