async function goToAuth(){
  // Your client id
  var client_id = "client_id=5c2f2c19f550467c93c2de192d56a980";
  var redirect_uri = "&redirect_uri=https://juliusraphael.github.io/SpotiQuiz/redirected.html&scope=user-read-private%20user-read-email&response_type=token&state=123&show_dialog=true"; // Your redirect uri
  var scope = 'playlist-read-private';
  var url = "https://accounts.spotify.com/authorize?"
  url = url + client_id + redirect_uri;
  window.location = url;

}

goToAuth();
