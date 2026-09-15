// State Management
const assignmentState = {
  title: "",
  dueDate: "",
  totalPoints: 100,
  questions: [],
  options: [],
  correctAnswers: [], // Stores index of correct option per question
  points: [], // Stores points per question
};

const API_BASE_URL = "https://maqwal-backend-ljrn.onrender.com";

function getLoggedInTeacher() {
  const ls = localStorage.getItem("lcds?t=t");
  if (!ls) return null;

  const lsData = JSON.parse(ls)?.data || {};
  return {
    name: lsData.name || "Teacher",
    grade: lsData.class?.grade || "",
    section: lsData.class?.section || "",
    subject: lsData.subject || "",
  };
}

// DOM Elements
const containerEl = document.getElementById("container");
const emptyStateEl = document.getElementById("empty-state");
const addQuestionBtn = document.getElementById("add-question");
const previewBtn = document.getElementById("prepobtn");

// Auto-expand textarea height
function autoExpandTextarea(element) {
  element.style.height = "auto";
  element.style.height = `${element.scrollHeight}px`;
}

// Update placeholders and radio values after removing an optionl
function reindexOptionPlaceholders(questionDiv) {
  const qIndex = parseInt(questionDiv.dataset.index, 10);
  const optionWrappers = questionDiv.querySelectorAll(".option-wrapper");

  optionWrappers.forEach((wrapper, optIndex) => {
    const input = wrapper.querySelector(".option-input");
    const radio = wrapper.querySelector("input[type='radio']");

    input.placeholder = `Option ${optIndex + 1}`;
    radio.value = optIndex;

    if (assignmentState.correctAnswers[qIndex] === optIndex) {
      radio.checked = true;
    }
  });
}

// Update placeholders and radio values after removing an optionl
function reindexQuestions() {
  const questionBlocks = containerEl.querySelectorAll(".question");
  const deployBtn = document.getElementById("deploy-btn");

  emptyStateEl.style.display = questionBlocks.length === 0 ? "block" : "none";

  if (deployBtn) {
    deployBtn.style.display =
      questionBlocks.length > 0 ? "inline-flex" : "none";
  }

  assignmentState.questions = [];
  assignmentState.options = [];
  assignmentState.correctAnswers = [];
  assignmentState.points = [];

  questionBlocks.forEach((questionDiv, newIndex) => {
    questionDiv.dataset.index = newIndex;

    const label = questionDiv.querySelector(".ql");
    const input = questionDiv.querySelector(".question-input");
    const pointsInput = questionDiv.querySelector(".points-input");

    label.setAttribute("for", `qi${newIndex}`);
    label.textContent = `Question ${newIndex + 1}`;
    input.id = `qi${newIndex}`;

    assignmentState.questions.push(input.value);
    assignmentState.points.push(parseInt(pointsInput.value, 10) || 1);

    const optionValues = [];
    let selectedCorrect = null;

    questionDiv
      .querySelectorAll(".option-wrapper")
      .forEach((wrapper, optIdx) => {
        const optInput = wrapper.querySelector(".option-input");
        const radio = wrapper.querySelector("input[type='radio']");

        radio.name = `correct-opt-${newIndex}`;
        radio.value = optIdx;

        if (radio.checked) {
          selectedCorrect = optIdx;
        }

        optionValues.push(optInput.value);
      });

    assignmentState.options.push(optionValues);
    assignmentState.correctAnswers.push(selectedCorrect);
  });
}

// Action: Add Question
function addQuestion() {
  const qIndex = assignmentState.questions.length;
  assignmentState.questions.push("");
  assignmentState.options.push([]);
  assignmentState.correctAnswers.push(null);
  assignmentState.points.push(1);

  emptyStateEl.style.display = "none";

  const questionDiv = document.createElement("div");
  questionDiv.className = "question";
  questionDiv.dataset.index = qIndex;

  questionDiv.innerHTML = `
    <div class="question-header-row">
      <label for="qi${qIndex}" class="ql">Question ${qIndex + 1}</label>
      <div class="question-meta-right">
        <label style="font-size: 0.75rem; color: var(--secondary-text-clr);">Points:</label>
        <input type="number" class="points-input" value="1" min="1">
      </div>
    </div>
    <input type="text" id="qi${qIndex}" class="question-input" placeholder="Enter the question text...">
    <div class="options"></div>
    <div class="question-actions">
      <button class="add-option btn btn-accent">+ Add Option</button>
    </div>
    <button class="delete-question btn btn-danger" title="Delete Question">✕</button>
  `;

  containerEl.appendChild(questionDiv);

  questionDiv
    .querySelector(".question-input")
    .addEventListener("input", (e) => {
      const index = parseInt(questionDiv.dataset.index, 10);
      assignmentState.questions[index] = e.target.value;
    });

  questionDiv.querySelector(".points-input").addEventListener("change", (e) => {
    const index = parseInt(questionDiv.dataset.index, 10);
    assignmentState.points[index] = parseInt(e.target.value, 10) || 1;
  });

  addOption(questionDiv);
  addOption(questionDiv);

  reindexQuestions();
  questionDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Action: Add Option
function addOption(questionDiv) {
  const qIndex = parseInt(questionDiv.dataset.index, 10);

  if (assignmentState.options[qIndex].length >= 6) {
    alert("Maximum of 6 options allowed per question.");
    return;
  }

  const optIndex = assignmentState.options[qIndex].length;
  assignmentState.options[qIndex].push("");

  const wrapper = document.createElement("div");
  wrapper.className = "option-wrapper";

  const isFirstOption = optIndex === 0;
  if (isFirstOption && assignmentState.correctAnswers[qIndex] === null) {
    assignmentState.correctAnswers[qIndex] = 0;
  }

  wrapper.innerHTML = `
    <label class="radio-container" title="Mark as correct answer">
      <input type="radio" name="correct-opt-${qIndex}" value="${optIndex}" ${isFirstOption ? "checked" : ""}>
      <span>Correct</span>
    </label>
    <textarea rows="1" class="option-input" placeholder="Option ${optIndex + 1}"></textarea>
    <button class="delete-option" title="Delete Option">✕</button>
  `;

  questionDiv.querySelector(".options").appendChild(wrapper);

  const textarea = wrapper.querySelector(".option-input");
  const radio = wrapper.querySelector("input[type='radio']");

  textarea.addEventListener("input", (e) => {
    const currentQIndex = parseInt(questionDiv.dataset.index, 10);
    const currentOptIndex = Array.from(
      questionDiv.querySelectorAll(".option-wrapper"),
    ).indexOf(wrapper);

    assignmentState.options[currentQIndex][currentOptIndex] = e.target.value;
    autoExpandTextarea(e.target);
  });

  radio.addEventListener("change", () => {
    const currentQIndex = parseInt(questionDiv.dataset.index, 10);
    const currentOptIndex = Array.from(
      questionDiv.querySelectorAll(".option-wrapper"),
    ).indexOf(wrapper);

    assignmentState.correctAnswers[currentQIndex] = currentOptIndex;
  });
}

// Action: Delete Option
function deleteOption(targetBtn) {
  const wrapper = targetBtn.closest(".option-wrapper");
  const questionDiv = targetBtn.closest(".question");
  const qIndex = parseInt(questionDiv.dataset.index, 10);

  const optionWrappers = Array.from(
    questionDiv.querySelectorAll(".option-wrapper"),
  );
  const optIndex = optionWrappers.indexOf(wrapper);

  assignmentState.options[qIndex].splice(optIndex, 1);

  if (assignmentState.correctAnswers[qIndex] === optIndex) {
    assignmentState.correctAnswers[qIndex] = 0;
  } else if (assignmentState.correctAnswers[qIndex] > optIndex) {
    assignmentState.correctAnswers[qIndex]--;
  }

  wrapper.remove();
  reindexOptionPlaceholders(questionDiv);
}

// Action: Delete Question
function deleteQuestion(targetBtn) {
  const questionDiv = targetBtn.closest(".question");
  const qIndex = parseInt(questionDiv.dataset.index, 10);

  if (confirm(`Are you sure you want to delete Question ${qIndex + 1}?`)) {
    questionDiv.remove();
    reindexQuestions();
  }
}

// Action: Display Assignment Preview Modal
function renderPreviewModal() {
  const existingModal = document.getElementById("prepo");
  const existingOverlay = document.querySelector(".modal-overlay");
  if (existingModal) existingModal.remove();
  if (existingOverlay) existingOverlay.remove();

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  const modal = document.createElement("div");
  modal.id = "prepo";

  const header = document.createElement("div");
  header.className = "modal-header";
  header.innerHTML = `
    <h2>Assignment Preview</h2>
    <button id="close-modal-x" class="btn btn-gray" style="padding: 0.25rem 0.5rem;">✕</button>
  `;

  const body = document.createElement("div");
  body.className = "modal-body";

  const titleVal =
    document.getElementById("assignment-title").value.trim() ||
    "Untitled Assignment";
  const dateVal =
    document.getElementById("assignment-due").value || "No Due Date";
  const pointsVal = document.getElementById("assignment-points").value || "100";

  const summary = document.createElement("div");
  summary.className = "preview-meta-summary";
  summary.innerHTML = `
    <div><strong>Title:</strong> ${titleVal}</div>
    <div><strong>Due Date:</strong> ${dateVal}</div>
    <div><strong>Max Score:</strong> ${pointsVal} pts</div>
  `;
  body.appendChild(summary);

  if (assignmentState.questions.length === 0) {
    const emptyPreview = document.createElement("p");
    emptyPreview.style.textAlign = "center";
    emptyPreview.innerHTML = `<span id="nothingtoshow">No questions have been created yet.</span>`;
    body.appendChild(emptyPreview);
  } else {
    assignmentState.questions.forEach((questionText, index) => {
      const item = document.createElement("div");
      item.className = "preview-item";

      const points = assignmentState.points[index] || 1;
      const titleDiv = document.createElement("div");
      titleDiv.className = "preview-item-title";

      const titleLeft = document.createElement("span");
      titleLeft.innerHTML = `<strong>Q${index + 1}:</strong> `;

      if (!questionText || questionText.trim() === "") {
        const emptyQ = document.createElement("span");
        emptyQ.id = "nothingtoshow";
        emptyQ.textContent = "Empty question text";
        titleLeft.appendChild(emptyQ);
      } else {
        const formattedQText = document.createElement("span");
        formattedQText.textContent = questionText;
        titleLeft.appendChild(formattedQText);
      }

      const titleRight = document.createElement("span");
      titleRight.className = "preview-item-points";
      titleRight.textContent = `${points} pt${points > 1 ? "s" : ""}`;

      titleDiv.appendChild(titleLeft);
      titleDiv.appendChild(titleRight);
      item.appendChild(titleDiv);

      const optionsList = document.createElement("div");
      optionsList.className = "preview-options";

      const correctOptIdx = assignmentState.correctAnswers[index];

      if (
        !assignmentState.options[index] ||
        assignmentState.options[index].length === 0
      ) {
        optionsList.innerHTML = `<div class="preview-option"><span id="nothingtoshow">No options added.</span></div>`;
      } else {
        assignmentState.options[index].forEach((optionText, optIdx) => {
          const isCorrect = optIdx === correctOptIdx;
          const optionEl = document.createElement("div");
          optionEl.className = `preview-option ${isCorrect ? "correct" : ""}`;

          const optTextSpan = document.createElement("span");
          if (!optionText || optionText.trim() === "") {
            optTextSpan.innerHTML = `${String.fromCharCode(65 + optIdx)}. <span id="nothingtoshow">Empty option</span>`;
          } else {
            optTextSpan.textContent = `${String.fromCharCode(65 + optIdx)}. ${optionText}`;
          }

          optionEl.appendChild(optTextSpan);

          if (isCorrect) {
            const badge = document.createElement("span");
            badge.className = "correct-badge";
            badge.textContent = "✓ Correct Answer";
            optionEl.appendChild(badge);
          }

          optionsList.appendChild(optionEl);
        });
      }

      item.appendChild(optionsList);
      body.appendChild(item);
    });
  }

  const destroyBtn = document.createElement("button");
  destroyBtn.textContent = "Close Preview";
  destroyBtn.className = "btn btn-danger full-width";

  const closeModal = () => {
    modal.remove();
    overlay.remove();
  };

  destroyBtn.addEventListener("click", closeModal);
  header.querySelector("#close-modal-x").addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  modal.appendChild(header);
  modal.appendChild(body);
  modal.appendChild(destroyBtn);

  document.body.appendChild(overlay);
  document.body.appendChild(modal);
}

// Event Delegation
document.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("add-option")) {
    addOption(target.closest(".question"));
  } else if (target.classList.contains("delete-option")) {
    deleteOption(target);
  } else if (target.classList.contains("delete-question")) {
    deleteQuestion(target);
  }
});

// Action: Handle Deployment, Render Proceed Preview & Save to MongoDB
async function handleDeploy() {
  reindexQuestions();

  const titleInput = document.getElementById("assignment-title");
  const titleVal = titleInput ? titleInput.value.trim() : "";

  if (!titleVal) {
    alert("⚠️ Assignment Title is required before deploying!");
    titleInput.focus();
    return;
  }

  if (assignmentState.questions.length === 0) {
    alert("Cannot deploy: You need to add at least one question.");
    return;
  }

  for (let i = 0; i < assignmentState.questions.length; i++) {
    const qText = assignmentState.questions[i].trim();
    const qOpts = assignmentState.options[i] || [];
    const validOptionsCount = qOpts.filter((opt) => opt.trim() !== "").length;

    if (!qText || validOptionsCount < 2) {
      alert(
        `⚠️ Validation Warning for Question ${i + 1}:\n` +
          `- Each question must have question text filled in.\n` +
          `- Each question must have AT LEAST 2 non-empty options.\n\n` +
          `Please fix Question ${i + 1} before deploying.`,
      );
      return;
    }
  }

  const dateInput = document.getElementById("assignment-due").value;
  const dateVal = dateInput.trim() ? dateInput.trim() : "No Due Date";

  // Build structure strictly matching the MongoDB image
  const questionsPayload = assignmentState.questions.map((qText, index) => ({
    question: qText,
    options: assignmentState.options[index],
    answer: assignmentState.correctAnswers[index],
    answers: [""],
  }));

  const teacher = getLoggedInTeacher();

  const assignmentPayload = {
    name: titleVal,
    assigner: teacher?.name || "Teacher",
    grade: String(teacher?.grade || ""),
    section: String(teacher?.section || ""),
    subject: teacher?.subject || "",
    dueDate: dateVal,
    questions: questionsPayload,
  };

  // Hide Editor UI
  document.getElementById("questions-wrapper").style.display = "none";
  document.querySelector(".add-btn-container").style.display = "none";
  document.querySelector(".deploy-container").style.display = "none";

  // Render Proceed Page Preview
  const proceedPage = document.getElementById("proceed-page");
  const summaryText = document.getElementById("deploy-summary-text");

  let questionsPreviewHTML = assignmentPayload.questions
    .map(
      (q, idx) => `
    <div style="margin-top: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 6px; text-align: left; background: #11121a;">
      <strong>Q${idx + 1}: ${q.question}</strong><br>
      <ul style="margin: 5px 0; padding-left: 20px;">
        ${q.options
          .map(
            (opt, oIdx) => `
          <li style="${oIdx === q.answer ? "color: green; font-weight: bold;" : ""}">${opt} ${oIdx === q.answer ? "✓" : ""}</li>
        `,
          )
          .join("")}
      </ul>
    </div>
  `,
    )
    .join("");

  summaryText.innerHTML = `
    <h3>Assignment Summary & Final Review</h3>
    <strong>Title:</strong> ${assignmentPayload.name}<br>
    <strong>Assigner:</strong> ${assignmentPayload.assigner}<br>
    <strong>Class:</strong> Grade ${assignmentPayload.grade}-${assignmentPayload.section} (${assignmentPayload.subject})<br>
    <strong>Due Date:</strong> ${assignmentPayload.dueDate}<br>
    <hr>
    <strong>Questions (${assignmentPayload.questions.length}):</strong>
    ${questionsPreviewHTML}
    <br>
    <button id="confirm-submit-btn" class="btn btn-accent full-width" style="margin-top: 15px;">Confirm & Send to MongoDB</button>
  `;
  proceedPage.style.display = "block";

  // Direct Submission to Backend API
  document.getElementById("confirm-submit-btn").onclick = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assignmentPayload),
      });

      const data = await response.json();
      if (data.status === "Success" || data.id) {
        alert(
          "Assignment deployed successfully to MongoDB! ID: " +
            (data.id || "Saved"),
        );
      } else {
        alert("Error saving assignment: " + (data.body || "Unknown error"));
      }
    } catch (err) {
      alert("Failed to connect to Render backend: " + err.message);
    }
  };
}

// Action: Return to Editor from Proceed Page
function backToEdit() {
  document.getElementById("questions-wrapper").style.display = "block";
  document.querySelector(".add-btn-container").style.display = "flex";
  document.querySelector(".deploy-container").style.display = "flex";
  document.getElementById("proceed-page").style.display = "none";
}

// Event Listeners
addQuestionBtn.addEventListener("click", addQuestion);
previewBtn.addEventListener("click", renderPreviewModal);
document.getElementById("deploy-btn").addEventListener("click", handleDeploy);
document.getElementById("back-to-edit").addEventListener("click", backToEdit);
