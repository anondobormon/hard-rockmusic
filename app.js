

document.getElementById('input-btn').addEventListener('click', function(){
    const getInput = document.getElementById('get-input').value;
    const url = `https://api.lyrics.ovh/suggest/${getInput}`;
    fetch(url)
    .then(res => res.json())
    .then(data => getDetails(data.data))
    // console.log(url);
    .catch(error => 'Something went Wrong')
})


const getDetails = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = "";


    songs.map(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 id="song-name" class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/ogg">
                <source src="horse.mp3" type="audio/mpeg">
            
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `
        songContainer.appendChild(songDiv);
        

    })
    
    
}

const getLyric = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
    .then(res => res.json())
    .then(data => lyricDetails(data.lyrics))
    
}

const lyricDetails = (lyric) =>{
    const showLyric = document.getElementById('show-lyric');
    showLyric.innerText = lyric;

}


