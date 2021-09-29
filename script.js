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



/* variabile globale per far partire la traccia */
let track = document.querySelector('#track')

let playing = false

let currentTrack = 0

/* ASSOCIAZIONE DOM */
/* funzionalità */
let playBtn = document.querySelector('#play-btn')
let pauseBtn = document.querySelector('#pause-btn')
let prevBtn = document.querySelector('#prev-btn')
let nextBtn = document.querySelector('#next-btn')
/* dettagli canzone */
let trackArtist = document.querySelector('#track-artist')
let trackTitle = document.querySelector('#track-title')
let trackCover = document.querySelector('#track-cover')





/* FUNZIONI */
/* audio */
function play() {
    if (!playing) {
        playBtn.classList.add('d-none')
        pauseBtn.classList.remove('d-none')
        track.play()
        playing = true        
    }else{
        playBtn.classList.remove('d-none')
        pauseBtn.classList.add('d-none')
        track.pause()
        playing = false
    }
}

function prev() {
    currentTrack--
    
    if (currentTrack < 0) {
        currentTrack = tracks.length -1
    }
    
    track.src = tracks[currentTrack].url
    trackArtist.innerHTML = tracks[currentTrack].artist
    trackTitle.innerHTML = tracks[currentTrack].title
    trackCover.src = tracks[currentTrack].cover

    
    //controllo se la traccia è in esecuzione
    //se la traccia è in esecuzione e cambio traccia la musica si blocca
    //quindi devo reimpostare playing a false e farla ripartire
    if (playing) {
        playing = false
        play()        
    } 
    
}

function next() {
    currentTrack++
    
    if (currentTrack > tracks.length -1) {
        currentTrack = 0
    }
    
    track.src = tracks[currentTrack].url
    trackArtist.innerHTML = tracks[currentTrack].artist
    trackTitle.innerHTML = tracks[currentTrack].title
    trackCover.src = tracks[currentTrack].cover

    
    //controllo se la traccia è in esecuzione
    //se la traccia è in esecuzione e cambio traccia la musica si blocca
    //quindi devo reimpostare playing a false e farla ripartire
    if (playing) {
        playing = false
        play()        
    } 
    
}



/* EVENTI */
playBtn.addEventListener('click', play)
pauseBtn.addEventListener('click', play)
nextBtn.addEventListener('click', next)
prevBtn.addEventListener('click', prev)



/* impostazione dati prima traccia */
track.src = tracks[currentTrack].url
trackArtist.innerHTML = tracks[currentTrack].artist
trackTitle.innerHTML = tracks[currentTrack].title
trackCover.src = tracks[currentTrack].cover

    