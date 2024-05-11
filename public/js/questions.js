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
    this.$ = selector => shadowRoot.querySelector(selector);
    this.$$ = selector => shadowRoot.querySelectorAll(selector);
    this.$('#postQuestion').addEventListener('click', () => this.postQuestion());
  }

  async connectedCallback() {
    await this.fetchQuestions(this.getAttribute('question_id'));
  }

  async fetchQuestions(question_id) {
    try {
      const response = await fetch(`${this.pollquestQuestionServiceURL()}/${question_id}`);
      var jsonBody = await response.json();
      this.shadowRoot.getElementById('questionId').innerText = question_id;
      this.shadowRoot.getElementById('description').innerText = jsonBody.description;
      this.renderQuestions(jsonBody.question.quest);

    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }

  pollquestQuestionServiceURL() {
    return 'http://localhost:8081/pollquest-question-service';
  }

  renderQuestions(questions) {

    const questionList = this.shadowRoot.getElementById('questionList');
    questionList.innerHTML = '';

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


  async postQuestion() {
    const questionInput = this.shadowRoot.getElementById('questionInput').value.trim();
    if (questionInput !== '') {
      const question_id = this.getAttribute('question_id');
      const requestBody = { questionId: question_id, question: questionInput };

      try {
        const response = await fetch(`${this.pollquestQuestionServiceURL()}/addQuestion`, {
          method: 'POST',
          body: JSON.stringify(requestBody)
        });
        if (!response.ok) {
          throw new Error('Failed to post question');
        } else {
          const data = await response.json();
          console.log(data);
          this.renderQuestions(data.question.quest);
        }

        this.$.questionInput.value = '';
      } catch (error) {
        console.error('Error posting question:', error);
      }
    } else {
      alert('Please enter a question.');
    }
  }

}

customElements.define('render-questions', Questions);
