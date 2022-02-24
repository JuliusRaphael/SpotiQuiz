//const fetch = require('node-fetch');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const enterButton = document.getElementById('enter-btn')
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const textfield = document.getElementById('frm1').pid; 
const secondControls = document.getElementById('second-controls'); 
var playlistId;
var tag = "";
var questionsTemplate = [];
var questions = [];
var audio;

enterButton.addEventListener('click', getPlaylist);
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    audio.pause();
  currentQuestionIndex++
  setNextQuestion()
});

async function getPlaylist(){
    secondControls.classList.remove('hide');
    nextButton.classList.add('hide');
    enterButton.classList.add('hide');
    textfield.classList.add('hide');
    playlistId = textfield.value.slice(textfield.value.lastIndexOf('/')+1);
    console.log(playlistId);
    questionContainerElement.classList.add('hide');
    questions = await setQuestions(playlistId);
}

async function startGame() {
  startButton.classList.add('hide');
  nextButton.classList.remove('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
    if (currentQuestionIndex == shuffledQuestions.length-1) {
        nextButton.classList.add('hide');
        console.log(answersToString(shuffledQuestions));
        questionElement.innerText = answersToString(shuffledQuestions);
        audio.pause();
        showAnswers();
    } else {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  audio = new Audio(question.preview);
  audio.play();
}

function showAnswers(){
    
}

function resetQuestions() {

   return [{question : "Name the song, artist, album and release year!", isUsed: false, points: 4},
            {question : "Name the song, artist and release year!", isUsed: false, points: 3},
            {question : "Name the song, artist and album!", isUsed: false, points: 3},
            {question : "Name the artist, album and release year!", isUsed: false, points: 3},
            {question : "Name the artist and album!", isUsed: false, points: 2},
            {question : "Name the album and release year!", isUsed: false, points: 2},
            {question : "Name the album!", isUsed: false, points: 1},
            {question : "Name the artist and song!", isUsed: false, points: 2},
            {question : "Name the song and release year!", isUsed: false, points: 2},
            {question : "Name the artist and release year!", isUsed: false, points: 2},
            {question : "Name the release year!", isUsed: false, points: 1},
            {question : "Name the song!", isUsed: false, points: 1},
            {question : "Name the artist!", isUsed: false, points: 1}]
}


function answersToString(questions){
    let returnString = '';
    
    for (let i = 0; i < questions.length; i++) {
        let temp = i+1 + '. ';
        console.log(questions[i].question);
        if(questions[i].question.includes('song')){
            temp = temp + ' Song: ' + questions[i].song + '.'
        }
        if(questions[i].question.includes('artist')){
            temp = temp + ' Artist: ' + questions[i].artists + '.'
        }
        if(questions[i].question.includes('album')){
            temp = temp + ' Album: ' + questions[i].album + '.'
        }
        if(questions[i].question.includes('release year')){
            temp = temp + ' Release Year: ' + questions[i].releaseYear + '.'
        }
        returnString = returnString + temp + '\n';

    }
    return returnString;
}
/**
 * Gets the access token from the url
 * @returns {string} with access token in it
 

async function getTag(){

  async function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

  var params = await getHashParams();

  var access_token = params.access_token;
  return access_token;
}*/


/**
 * @param {string} endpoint fetches data at endpoint
 * @returns {string} result as parsed json
 */
async function fetchData(endpoint){
    const url = endpoint;
    const options = {
      headers: {
        Authorization: "Bearer ".concat(tag)
      }
    };

    const result = fetch(url,options)
      .then(result => result.json())
      return result;
}

function getRandomPlayableTracks(tracks){
    let usedNumbers = new Set();
    let choosenTracks = [];
    while( choosenTracks <= 12 || usedNumbers.size != tracks.length){
        let index = Math.floor(Math.random() * tracks.length);
        if(!usedNumbers.has(index)){
            usedNumbers.add(index);
            if(tracks[index].track.preview_url != null){
                choosenTracks.push(index);
                console.log(index);
            }
        }
    }
    return choosenTracks;
}

const main = async () => {
    //get tag from URL
    tag = "BQBGoFSl6nH43Z9dCD34cv5giFDy32-04shQSpyVqczAv0tdCL5gmIxrMpbAy0Ebdm3I5BCKBYK7AHDOV3O-X15z9H0iRt1C20Icy7pEqQGubzSS3WfAPDtmmo4CdmI9zjCzEzmgeymERjHkF6GO-1CwByIK_orTzUo";
    console.log("hej");
    let temp = await fetchData("https://api.spotify.com/v1/playlists/1Oqi6XaJYdzEqvOZamwJqW");
    let tracks = temp.tracks.items;
    console.log(tracks);
    let choosenTracks = getRandomPlayableTracks(tracks);
    questionsTemplate = resetQuestions();
    console.log(questionsTemplate);
    console.log(questionsTemplate[0].question);
    let question;
    for (let i = 0; i < 10; i++) {
            let questionNr = choosenTracks[i];
            tracks[questionNr];
            let artists = [];
            tracks[questionNr].track.artists.map(function(x) {
                artists.push(x['name'])
            });
            question = {song: tracks[questionNr].track.name, 
                artists: artists, 
                album: tracks[questionNr].track.album.name, 
                releaseYear: tracks[questionNr].track.album.release_date.slice(0,4), 
                preview: tracks[questionNr].track.preview_url,
                question: questionsTemplate[i].question
            };
            console.log("Song: "  + question.song);
            console.log("Artists: "  + question.artists);
            console.log("Album: " + question.album);
            console.log("Preview: " + question.preview);
            console.log("Preview: " + question.releaseYear);
    }
    questions.push(question);
};

const setQuestions = async () => {
    //get tag from URL
    console.log("hej");
    tag = "BQBDQ99G6Q6EQROHDXObm2qLXZrH6wGB64W4JpqBwT-zMcarFrGzLk49kGTrqrVn97S2PLiSQSbbjcaIVt8jrWvLMxsb2oEHDWFkDGbp3_2Lifoy8gBqllk_7HUCp3YPPiwuoByZC2Z83cCV2wtiPzG6F09LlwLWPGE"
    console.log(playlistId);
    let temp = await fetchData("https://api.spotify.com/v1/playlists/" + playlistId);
    let tracks = temp.tracks.items;
    console.log(tracks);
    let choosenTracks = getRandomPlayableTracks(tracks);
    questionsTemplate = resetQuestions();
    console.log(questionsTemplate);
    console.log(questionsTemplate[0].question);
    let question;
    for (let i = 0; i < 10; i++) {
            let questionNr = choosenTracks[i];
            tracks[questionNr];
            let artists = [];
            tracks[questionNr].track.artists.map(function(x) {
                artists.push(x['name'])
            });
            question = {song: tracks[questionNr].track.name, 
                artists: artists, 
                album: tracks[questionNr].track.album.name, 
                releaseYear: tracks[questionNr].track.album.release_date.slice(0,4), 
                preview: tracks[questionNr].track.preview_url,
                question: questionsTemplate[i].question
            };
            console.log("Song: "  + question.song);
            console.log("Artists: "  + question.artists);
            console.log("Album: " + question.album);
            console.log("Preview: " + question.preview);
            console.log("Preview: " + question.releaseYear);

            questions.push(question);
    }
    return questions;
};

//main();