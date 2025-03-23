let gameSeq = [];
let userSeq = [];
let btns = ["green", "red", "yellow", "blue"];
let h2 = document.querySelector('h2');
let started = false;
let level = 0;

document.addEventListener("keypress", () => {
    if (!started) {
        console.log("Game has started");
        started = true;
        levelUp();
    }
});

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`#${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
}

function gameFlash(btn) {
    btn.classList.add("gameflash");
    setTimeout(() => {
        btn.classList.remove("gameflash");
    }, 500);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 300);
}

function checkAns(idx) {
    console.log("Current level:", level);
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score is <b>${level}</b>. Press any key to restart the game.`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "#f0f0f0";
        }, 150);
        reset();
    }
}

function btnPress() {
    console.log(this);
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll('.btn');
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
