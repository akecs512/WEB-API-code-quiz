var clearHighScoresButton = document.getElementById("clear")
if (clearHighScoresButton)
  clearHighScoresButton.addEventListener("click", clearHighScores)

function clearHighScores(event) {
  event.preventDefault();
  localStorage.removeItem("playerScores");
  window.location.href = "/"
}

showHighScores()
function showHighScores() {
  const playerScores = JSON.parse(localStorage.getItem("playerScores"))
  console.log(playerScores)
  if (!playerScores) return;

  let highScoresList = document.getElementById('high-scores-list');
  for (index = 0; index < playerScores.length; index++) {
    let score = document.createElement("li");
    score.innerHTML = `${index + 1}. ${playerScores[index].initials} &mdash; ${playerScores[index].score}`
    highScoresList.appendChild(score);
  }
}