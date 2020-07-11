"use strict";

const quizGame = document.getElementById("quizGame");
const questionScreen = document.getElementById("questionScreen");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const target = document.getElementById("target");
const answer1 = document.getElementById("answer1");
const answer1_p = document.getElementById("answer1_p");
const answer2 = document.getElementById("answer2");
const answer2_p = document.getElementById("answer2_p");
const answer3 = document.getElementById("answer3");
const answer3_p = document.getElementById("answer3_p");

//グローバル変数宣言
let question = [
  "現在の内閣総理大臣は？",
  "日本で一番高いタワーは？",
  "日本で一番高い山は？",
  "日本で一番早く梅雨入りするのは？",
];

let president = ["安倍晋三", "橋本龍太郎", "麻生太郎"];
let tower = ["スカイツリー", "東京タワー", "通天閣"];
let mountain = ["富士山", "北岳", "奥穂高岳"];
let state = ["沖縄", "北海道", "鹿児島"];

let random = "";
let randoms = [];
let min = 0;
let max = 3;
let questionArray = [];
let getValue = "";
let firstRadioBtn = "";
let count = -1;
let molecule = "";
let denominator = "";

//関数宣言
//Fisher-Yates アルゴリズム
Array.prototype.shuffle = function () {
  let i;
  let j;
  let t;
  i = this.length;
  while (i) {
    j = Math.floor(Math.random() * 3);
    t = this[--i];
    this[i] = this[j];
    this[j] = t;
  }
  return this;
};

function screenWrite(num) {
  //古いブラウザでgetElementIdが使えるかの確認
  if (document.getElementById) {
  }
  switch (num) {
    case 0:
      questionArray = president.shuffle();

      break;

    case 1:
      questionArray = tower.shuffle();

      break;

    case 2:
      questionArray = mountain.shuffle();

      break;

    case 3:
      questionArray = state.shuffle();

      break;

    default:
      if (count > max) {
        break;
      } else {
        alert("エラーが発生しました。");
        break;
      }
  }
  answer1_p.textContent = questionArray[0];
  answer1.value = questionArray[0];
  answer2_p.textContent = questionArray[1];
  answer2.value = questionArray[1];
  answer3_p.textContent = questionArray[2];
  answer3.value = questionArray[2];
}

//ランダム数字を重複させないようにする
function randomNotInclude() {
  for (let k = min; k <= max; k++) {
    while (true) {
      let tmp = intRandom(min, max);
      if (!randoms.includes(tmp)) {
        randoms.push(tmp);
        break;
      }
    }

    console.log(randoms);
  }
}

//min以上max以下の整数値の乱数を返す
function intRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function result() {
  quizGame.textContent = `クイズの結果発表！！${molecule}/${denominator}`;
  // questionScreen.textContent = `クイズの結果発表！！${molecule}/${denominator}`;
}

function textDeleat() {
  nextBtn.remove();
  target.remove();
  result();
}

function counter() {
  if (count > max) {
    textDeleat();
  }
}

function quizStart() {
  console.log("正解" + molecule);
  console.log("問題の数" + denominator);
  count++;
  random = randoms[count];

  questionScreen.textContent = question[random];

  screenWrite(random);

  counter();
}

//アクション
answer1.addEventListener("change", () => {
  getValue = document.target_name.answer.value;
});
answer2.addEventListener("change", () => {
  getValue = document.target_name.answer.value;
});
answer3.addEventListener("change", () => {
  getValue = document.target_name.answer.value;
});

nextBtn.addEventListener("click", () => {
  firstRadioBtn = document.target_name.answer;

  if (
    firstRadioBtn[0].checked === false &&
    firstRadioBtn[1].checked === false &&
    firstRadioBtn[2].checked === false
  ) {
    alert("選択して下さい");
  } else if (
    getValue === "安倍晋三" ||
    getValue === "スカイツリー" ||
    getValue === "富士山" ||
    getValue === "沖縄"
  ) {
    console.log("good");
    getValue = "";
    //nextBtnを押した時に、ラジオボタンの選択を外す。
    firstRadioBtn[0].checked = false;
    firstRadioBtn[1].checked = false;
    firstRadioBtn[2].checked = false;
    molecule++;
    denominator++;
    quizStart();
    // } else if (getValue === "") {
    //   getValue = "";
    //   console.log("hoge");
  } else {
    console.log("miss");
    getValue = "";
    //nextBtnを押した時に、ラジオボタンの選択を外す。
    firstRadioBtn[0].checked = false;
    firstRadioBtn[1].checked = false;
    firstRadioBtn[2].checked = false;
    denominator++;
    quizStart();
  }
});

//クイズスタートを押すと、問題が表示され、クイズが始まる。
startBtn.addEventListener("click", () => {
  target.style.display = "block";
  nextBtn.style.display = "block";
  startBtn.remove();
  randomNotInclude();

  quizStart();
});
