class Questions extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.$ = shadowRoot.querySelector.bind(this.shadowRoot);
    shadowRoot.innerHTML = `
    <style>
    :host {
      display: block;
      margin: 20px;
      width: 550px;
      font-family: Arial, sans-serif;
    }

    h2 {
      margin-top: 0;
    }
    h3 {
      margin-bottom: 2px;
    }
    .top-panel{
      width: 750px;
      text-align:center;
    }

    .question-section {
      margin-bottom: 20px;
    }

    .question-list {
      list-style: none;
      padding: 0;
    }

    .question {
      width: calc(100% + 150px);
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      padding: 10px;
      margin-bottom: 10px;
    }

    textarea {
        width: calc(100% + 150px);
        padding: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    button {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }
  </style>
  
      <div class="top-panel">
        <h2>#<span id="questionId"></span></h2>
        <p id="description"></p>
      </div>

      <div class="question-section">
        <h3>Post a Question</h3>
        <textarea id="questionInput" placeholder="Enter your question"></textarea>
        <button id="postQuestion">Post</button>
      </div>

      <div class="question-section">
        <h3>Questions</h3>
        <ul id="questionList" class="question-list"></ul>
      </div>
    `;
  }

  async connectedCallback() {
    const fetchQuestions = async (question_id) => {
      let url = `http://localhost:8081/pollquest-question-service/${question_id}`;
      const stream = await fetch(url).then(response => response.body);

      parseStream(stream)
        .then(data => {
          var jsonBody = JSON.parse(data)
          this.shadowRoot.getElementById('questionId').innerText = question_id;
          this.shadowRoot.getElementById('description').innerText = jsonBody.description;
          this.renderQuestions(jsonBody.question.quest);
        })
        .catch(error => {
          console.error('Error parsing stream:', error);
        });
    };

    await fetchQuestions(this.getAttribute('question_id'));

    function parseStream(stream) {
      const reader = stream.getReader();
      const decoder = new TextDecoder('utf-8');
      let result = '';

      const readChunk = () => {
        return reader.read().then(({ done, value }) => {
          if (done) {
            return result;
          }

          const chunk = decoder.decode(value, { stream: true });
          result += chunk;
          return readChunk();
        });
      };

      return readChunk();
    }


  }

  renderQuestions(questions) {

    const questionList = this.shadowRoot.getElementById('questionList');

    questions.forEach(questionInput => {
      if (questionInput.trim() !== '') {
        const listItem = document.createElement('li');
        listItem.className = 'question';
        listItem.textContent = questionInput;
        questionList.appendChild(listItem);
      }
    });

    this.shadowRoot.getElementById('questionInput').value = '';
  }

}

customElements.define('render-questions', Questions);
