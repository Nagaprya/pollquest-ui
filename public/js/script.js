// Function to handle joining via code
async function joinViaCode() {
    const code = document.getElementById('join-code').value;

    try {
        const response = await fetch('backend-service/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code })
        });

        if (response.ok) {
            window.location.href = '/questions.html'; // Redirect to questions.html
        } else {
            console.error('Failed to join:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to generate a code
async function generateCode() {
    const description = document.getElementById('description').value;

    try {
        const response = await fetch('backend-service/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description })
        });

        if (response.ok) {
            window.location.href = '/questions.html'; // Redirect to questions.html
        } else {
            console.error('Failed to generate code:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to load questions and answers from the backend
async function loadQuestionsAndAnswers() {
    try {
        const response = await fetch('backend-service/questions');
        if (response.ok) {
            const data = await response.json();
            const qaSection = document.getElementById('qa-section');
            qaSection.innerHTML = ''; // Clear previous content
            data.forEach(qa => {
                const questionDiv = document.createElement('div');
                questionDiv.classList.add('question');
                questionDiv.innerHTML = `
                    <h3>${qa.question}</h3>
                    <p><strong>Answer:</strong> ${qa.answer}</p>
                `;
                qaSection.appendChild(questionDiv);
            });
        } else {
            console.error('Failed to load questions:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to post a new question
async function postQuestion() {
    const question = document.getElementById('question').value;
    try {
        const response = await fetch('backend-service/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        });
        if (response.ok) {
            // Reload questions and answers after posting
            loadQuestionsAndAnswers();
            // Clear the input field
            document.getElementById('question').value = '';
        } else {
            console.error('Failed to post question:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Load questions and answers when the page loads
window.addEventListener('load', loadQuestionsAndAnswers);
