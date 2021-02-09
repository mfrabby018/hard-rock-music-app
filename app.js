
// click handler for search and button input 
document.getElementById('searchSongs').addEventListener('click', () => {
    const searchText = document.getElementById("search_field").value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    // console.log(url);
    // load data
    fetch(url)
    .then(response => response.json())
    .then(data => displaySongs(data.data))
    .catch(error => displayError(alert("Something went wrong!! Please try again!")));
})
  
// display songs in user interface 

const displaySongs = (songs) => {
  // console.log(songs);
  const songContainer = document.getElementById("song_container");
  songContainer.innerHTML = '';
  songs.forEach((song) => {
    console.log(song);
    const songDiv = document.createElement("div");
    songDiv.className = "single-result row align-items-center my-3 p-3";
    songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div> 
        `;
    songContainer.appendChild(songDiv);

  });
};
// get artist name and song title 
const getLyric = async (artist, title) =>{  /*alternate way is direct fetch and then method*/
    // console.log(artist, title);
    const url = (`https://api.lyrics.ovh/v1/${artist}/${title}`)
    try{
        const res = await fetch(url)
        const data = await res.json(); /*this try and catch method used for specif error if found which is user frndly*/
        displayLyrics(data.lyrics);
    }
    catch(error){
        displayError('Sorry faild to load lyrics!, please try again!');
    }
}
// display lyrics in user interface 
const displayLyrics = lyrics => {
    document.documentElement.scrollTop = 0;
    const lyricsDiv = document.getElementById('song_lyrics');
    lyricsDiv.innerText = lyrics;
}
// for showing error massage if anything wrong 
const displayError = error =>{
    const errorText = document.getElementById('error_massage');
    errorText.innerText = error;
}