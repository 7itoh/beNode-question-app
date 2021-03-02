const dispResultQz: HTMLElement = document.getElementById('display_result_quiz_message')!;
const dispNumQz: HTMLElement = document.getElementById('display_quiz_number')!;
const dispTitleQz: HTMLElement = document.getElementById('display_quiz_title')!;
const displevelQz: HTMLElement = document.getElementById('display_quiz_level')!;
const dispQuestionQz: HTMLElement = document.getElementById('display_quiz_question')!;

const dispAnswersQz: HTMLElement = document.getElementById('display_quiz_answers')!;

const startBtnQz: HTMLElement = document.getElementById('start_quiz_button')!;
const restartBtnQz: HTMLElement = document.getElementById('restart_quiz_button')!;
const dispStartBtnQz = startBtnQz.style.display;
const dispRestartBtnQz = restartBtnQz.style.display;

interface Quiz { 
    questions: [],
    answerBox: [],
    onesection: [],
    trueAnswer: string,
    correct: number,
    incorrect: number,
    questionId: number,
}

class Quiz { 
    constructor() {
        this.questions = [];
        this.answerBox = [];
        this.onesection = [];
        this.trueAnswer = '';
        this.correct = 0;
        this.incorrect = 0;
        this.questionId = 0;
    }
    startQz() {
        dispResultQz.innerHTML = '取得中';
        fetch('/quiz/api')
            .then(response => response.json())
            .then(quiz => {
                this.questions = quiz.questions;
                this.answerBox = quiz.answersBox;
                dispResultQz.innerHTML = '取得完了';
                this.dispQz();
            }).catch(e => console.log(e));
    }
    dispQz() {
        let id = this.questionId;
        let num = id + 1

        let qzTrue = this.questions[id].correct_answer;
        this.trueAnswer = qzTrue;

        this.onesection = this.answerBox[id];

        const qzCategory = this.questions[id].category;
        const qzDifficult = this.questions[id].difficulty;
        const qzQuestion = this.questions[id].question;

        dispNumQz.innerHTML = `問題 : No. ${num}`;
        dispTitleQz.innerHTML = `出題 : ${qzCategory}`;
        displevelQz.innerHTML = `難易度 : ${qzDifficult}`;
        dispQuestionQz.innerHTML = qzQuestion
        
        this.onesection.forEach(quiz => {
            const trQz = document.createElement('tr');
            const tdQz = document.createElement('td');
            const btnQz = document.createElement('button');
            btnQz.innerHTML = quiz;

            tdQz.appendChild(btnQz);
            trQz.appendChild(tdQz);
            dispAnswersQz.appendChild(trQz);

            this.checkQz(btnQz);
        })
    }
    checkQz(btnQz) {
        btnQz.addEventListener('click', () => {
            btnQz.innerHTML === this.trueAnswer ? dispResultQz.innerHTML = `正解! 正解数: ${this.correct += 1}` : dispResultQz.innerHTML = `不正解!! 不正解数: ${this.incorrect += 1}`;
            this.questionId++;
            dispAnswersQz.innerHTML = '';
            this.questionId === 10 ? this.endQz(): this.dispQz();
        })
    }
    endQz() {
        dispResultQz.innerHTML = `あなたの正答数は、10問中、正解: ${this.correct} 不正解: ${this.incorrect}`;
        dispNumQz.innerHTML = '';
        dispTitleQz.innerHTML = '';
        displevelQz.innerHTML = '';
        dispQuestionQz.innerHTML = '';
        restartBtnQz.style.display = '';
    }
    restart() {     
        dispResultQz.innerHTML = '';
        this.questions = [];
        this.onesection = [];
        this.trueAnswer = '';
        this.correct = 0;
        this.incorrect = 0;
        this.questionId = 0;
    }
}

const quiz = new Quiz();

startBtnQz.addEventListener('click', () => { 
    startBtnQz.style.display = 'none';
    quiz.startQz();
})

restartBtnQz.addEventListener('click', () => {
    startBtnQz.style.display = dispStartBtnQz;
    restartBtnQz.style.display = dispRestartBtnQz;
    quiz.restart();
})