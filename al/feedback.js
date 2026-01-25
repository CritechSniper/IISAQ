(function() {
    async function initFeedbackWidget() {
        // 1. Load and Inject CSS from the /al/ folder
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/al/feedback.css'; // Absolute path to /al/
        document.head.appendChild(link);

        // 2. Load and Inject HTML from the /al/ folder
        try {
            const response = await fetch('/al/feedback.html'); // Absolute path to /al/
            if (!response.ok) throw new Error('File not found');
            
            const html = await response.text();
            const container = document.createElement('div');
            container.id = "feedback-wrapper";
            container.innerHTML = html;
            document.body.appendChild(container);

            setupWidgetLogic(container);
        } catch (err) {
            console.error("IISAQ Feedback Error:", err);
        }
    }

    function setupWidgetLogic(container) {
        const trigger = container.querySelector('.feedback-trigger');
        const formCard = container.querySelector('.feedback-form-card');
        const closeBtn = container.querySelector('#close-feedback');
        const feedbackForm = container.querySelector('#iisaqFeedbackForm');
        
        if (!trigger || !formCard) return;

        trigger.addEventListener('click', () => {
            formCard.classList.add('active');
            trigger.style.display = 'none';
        });

        closeBtn.addEventListener('click', () => {
            formCard.classList.remove('active');
            trigger.style.display = 'flex';
        });

        feedbackForm.addEventListener('submit', function(e) {
            const email = container.querySelector('#userEmail').value.trim();
            const errorMsg = container.querySelector('#error-msg');
            
            const studentRegex = /^[0-9]{4,5}@iischoolabudhabi\.com$/;
            const teacherRegex = /^[a-zA-Z]+@iischoolabudhabi\.com$/;

            if (!studentRegex.test(email) && !teacherRegex.test(email)) {
                e.preventDefault();
                errorMsg.innerText = "Invalid School Email.";
                errorMsg.style.display = 'block';
            }
        });

        const tx = container.querySelector('#feedbackMsg');
        tx.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }

    // Run after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFeedbackWidget);
    } else {
        initFeedbackWidget();
    }
})();