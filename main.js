// 歡迎動畫
document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.querySelector('.welcome-screen');
    const mainContent = document.querySelector('.main-content');
    const enterBtn = document.querySelector('.enter-btn');

    enterBtn.addEventListener('click', () => {
        welcomeScreen.style.opacity = '0';
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
        }, 1000);
    });
});

// 平滑滾動
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 測驗功能
const quizData = [
    {
        question: "當狗狗把尾巴高高翹起並快速搖擺時，通常代表什麼？",
        options: ["害怕或緊張", "興奮或開心", "準備攻擊", "感到無聊"],
        correct: 1
    },
    {
        question: "狗狗舔你的臉或手，最可能的原因是？",
        options: ["想要討食物", "表達親密和信任", "感到焦慮", "單純因為你味道很鹹"],
        correct: 1
    },
    {
        question: "狗狗把肚皮露出來給你摸，代表什麼？",
        options: ["牠想挑戰你的地位", "表示服從和信任", "肚子癢", "準備攻擊前的姿勢"],
        correct: 1
    },
    {
        question: "當狗狗耳朵向後貼平、身體壓低時，可能表示？",
        options: ["牠非常放鬆", "感到害怕或緊張", "準備玩耍", "完全無意義的動作"],
        correct: 1
    },
    {
        question: "狗狗突然開始追自己的尾巴，可能的原因是？",
        options: ["單純好玩或無聊", "皮膚病或寄生蟲導致不適", "強迫症行為", "以上皆有可能"],
        correct: 3
    },
    {
        question: "狗狗對你「打哈欠」，可能代表什麼？",
        options: ["牠很累想睡覺", "緩解壓力或安撫你", "模仿你的行為", "只是無意識的動作"],
        correct: 1
    },
    {
        question: "當狗狗「露出牙齒但不低吼」時，可能是在？",
        options: ["準備咬人", "玩鬧時的「笑臉」表情", "感到極度恐懼", "牙齒癢"],
        correct: 1
    },
    {
        question: "狗狗在你回家時「叼玩具給你」，代表什麼？",
        options: ["牠想跟你玩", "表達歡迎和分享", "希望你丟給牠撿", "以上都是"],
        correct: 3
    },
    {
        question: "狗狗突然「靜止不動、緊盯某處」，可能的原因是？",
        options: ["發現獵物或有趣的事物", "感到威脅準備反應", "單純發呆", "A和B都有可能"],
        correct: 3
    },
    {
        question: "狗狗「輕輕咬你的手（不痛）」，通常是？",
        options: ["表達愛意或玩耍", "測試你的地位", "小時候沒學好咬合力控制", "以上都有可能"],
        correct: 3
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 300;
let timer;

const startQuizBtn = document.getElementById('start-quiz');
const questionContainer = document.getElementById('question-container');
const resultsContainer = document.getElementById('results');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const restartQuizBtn = document.getElementById('restart-quiz');

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 300;
    startQuizBtn.style.display = 'none';
    questionContainer.innerHTML = '';
    resultsContainer.classList.add('hidden');
    showQuestion();
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function showQuestion() {
    const question = quizData[currentQuestion];
    questionContainer.innerHTML = `
        <h3>問題 ${currentQuestion + 1}/10</h3>
        <p>${question.question}</p>
        ${question.options.map((option, index) => `
            <button class="option" onclick="checkAnswer(${index})">${option}</button>
        `).join('')}
    `;
}

function checkAnswer(selectedOption) {
    const question = quizData[currentQuestion];
    if (selectedOption === question.correct) {
        score += 10;
    }
    
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    questionContainer.innerHTML = '';
    resultsContainer.classList.remove('hidden');
    scoreElement.textContent = score;
}

startQuizBtn.addEventListener('click', startQuiz);
restartQuizBtn.addEventListener('click', startQuiz);

// 表單處理
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // 這裡可以添加表單提交的邏輯
    alert('感謝您的訊息！我們會盡快回覆。');
    contactForm.reset();
});

// 導航欄滾動效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.style.transform = 'translateY(-100%)';
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
}); 