// DONE - score [1] - zobraz počet výhier jednotlivých hráčov (mohla by sa hodiť funkcia innerText)

// DONE - timelimit [1] - hra je alternatívne ukončená a vyhodnotená po časovom limite (mohla by sa hodiť funkcia setTimeout alebo setInterval)

// DONE - zväčšovanie/zmenšovanie [2] - ako sa avatar blíži k okraju obrazovky, mohol by sa zväčšovať resp. zmenšovať (mohla by sa hodiť funkcia zoom v CSS)

// DONE - odpočet na začiatku [2] - hra začína odpočtom, až po ktorom hra reaguje na stlačenie kláves (setTimeout, setInterval, innerText)

// - vyšperkovaný vzhľad [2] - ukáž nám svoju tvorivosť a čo dokážeš s CSS

let timeLimit = 3; // seconds
const originalPosition = 50;

let position = null;

let minutes = Math.floor(timeLimit / 60);
let seconds = timeLimit % 60;
let score = { wolf: 0, fox: 0 };
let play = false;
let winner = false;
let startCount = 3;

const timeLimitText = document.getElementById("time-limit");
const scoreText = document.getElementById("score");
const startButtonContainerText = document.getElementById(
  "start-button-container"
);
const startCounterText = document.getElementById("start-counter");
const resultText = document.getElementById("result");

const startCounter = () => {
  startButtonContainerText.classList.add("hide");
  startCounterText.classList.remove("hide");

  startCount--;

  if (startCount >= 0) {
    setTimeout(startCounter, 1000);
    startCounterText.innerHTML = startCount + 1;
  } else {
    (startCounterText.innerHTML = "START"),
      setTimeout(() => startCounterText.classList.add("hide"), 400);

    startCount = 3;
    startGame();
  }
};

const startGame = () => {
  let foxScale = 2;
  let wolfScale = 2;

  position = originalPosition;
  play = true;

  counter();

  onkeydown = (event) => {
    const pressedKey = event.key;

    if (pressedKey === "a" && play) {
      position -= 10;
      foxScale += 0.3;
      wolfScale -= 0.3;
      fox.style.scale = foxScale;
      wolf.style.scale = wolfScale;
    }

    if (pressedKey === "l" && play) {
      position += 10;
      foxScale -= 0.3;
      wolfScale += 0.3;
      fox.style.scale = foxScale;
      wolf.style.scale = wolfScale;
    }

    if (position <= 10) {
      resultText.innerText = "Fox win";
      resultText.classList.remove("hide");
      winner = true;
      setNewGame();
      score.fox++;
    }

    if (position >= 90) {
      resultText.innerText = "Wolf win";
      resultText.classList.remove("hide");
      winner = true;
      setNewGame();
      score.wolf++;
    }

    scoreText.innerHTML =
      "<span>🦊</span> " + score.fox + " : " + score.wolf + " <span>🐺</span>";

    setIconPosition(position);
  };
};

const counter = () => {
  const count = setInterval(() => {
    if (seconds == 00) {
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if ((minutes == 0 && seconds == 0) || !play) {
      if (!winner) {
        if (position < 50) {
          resultText.innerText = "Fox win";
          score.fox++;

        } else if (position > 50) {
          resultText.innerText = "Wolf win";
          score.wolf++;
        } else {
          resultText.innerText = "It's a draw";
        }
        resultText.classList.remove("hide");
      }
      winner = false;

      setTimeout(() => {
        setIconPosition(originalPosition);
        setNewGame();
      }, 1000);

      clearInterval(count);
    }

    timeLimitText.innerHTML = " " + minutes + ":" + seconds;
  }, 1000);
};

const setNewGame = () => {
  play = false;
  position = originalPosition;
  startButtonContainerText.classList.remove("hide");

  foxScale = 2;
  wolfScale = 2;
  fox.style.scale = foxScale;
  wolf.style.scale = wolfScale;

  minutes = Math.floor(timeLimit / 60);
  seconds = timeLimit % 60;

  setInitInfo();
};

const setIconPosition = (position) => {
  fox.style.top = position + "%";
  wolf.style.top = 100 - position + "%";
};

const setInitInfo = () => {
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  timeLimitText.innerHTML = " " + minutes + ":" + seconds;
  scoreText.innerHTML =
    "<span>🦊</span> " + score.fox + " : " + score.wolf + " <span>🐺</span>";
};

setInitInfo();
