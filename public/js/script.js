async function joinViaCode() {
    const code = document.getElementById('join-code').value;
    try {
        window.location.href = `/questions/${code}`;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function generateCode() {
    const description = document.getElementById('description').value;

    try {
        const response = await fetch(`${pollquestQuestionServiceURL()}/generateCode`, {
            method: 'POST',
            body: JSON.stringify({ description: description })
        });

        if (response.ok) {
            const code = await response.text();
            console.log(code);
            window.location.href = `/questions/${code}`;
        } else {
            console.error('Failed to generate code:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function pollquestQuestionServiceURL() {
    return 'http://pollquest-question-service.default.svc.cluster.local:8080/pollquest-question-service';
}
