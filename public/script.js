let loggedIn = false;

function login() {
    // Mock login process
    loggedIn = true;
    showCreatePollPage();
}

function showCreatePollPage() {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("createPollPage").style.display = "block";
}

function createPoll() {
    const pollQuestionInput = document.getElementById("pollQuestionInput");
    const pollQuestion = pollQuestionInput.value.trim();

    if (pollQuestion !== "") {
        // Generate a random poll code (in reality, use a unique code generator)
        const pollCode = generateRandomCode();
        document.getElementById("pollCode").textContent = pollCode;
        document.getElementById("pollCodeDisplay").style.display = "block";
    } else {
        alert("Please enter a poll question.");
    }
}

function askQuestion() {
    const questionInput = document.getElementById("questionInput");
    const questionText = questionInput.value.trim();

    if (questionText !== "") {
        document.getElementById("questionText").textContent = questionText;
        document.getElementById("questionDisplay").style.display = "block";
    } else {
        alert("Please enter a question.");
    }
}

function generateRandomCode() {
    // Generate a random alphanumeric code (for demonstration purposes)
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}
