document.addEventListener('DOMContentLoaded', () => {
    const keypad = document.getElementById('keypad');
    const displaySpans = document.querySelectorAll('#password-display span');
    const lockIcon = document.getElementById('lock-icon');
    const deleteBtn = document.getElementById('delete-btn');

    const correctPassword = '170824';
    let currentInput = '';
    const PASSWORD_LENGTH = 6;

    // Function to update the visual display of the password
    const updateDisplay = () => {
        for (let i = 0; i < PASSWORD_LENGTH; i++) {
            if (i < currentInput.length) {
                displaySpans[i].textContent = '●'; // Use a solid circle for entered digits
            } else {
                displaySpans[i].textContent = '*'; // Use asterisk for remaining
            }
        }
    };

    // Function to handle password check
    const checkPassword = () => {
        if (currentInput === correctPassword) {
            // Success
            lockIcon.classList.remove('fail');
            lockIcon.classList.add('unlocked');
            document.body.style.pointerEvents = 'none'; // Disable further clicks

            setTimeout(() => {
                window.location.href = 'note.html';
            }, 1000); // Wait 1 second before redirecting

        } else {
            // Failure
            lockIcon.classList.add('fail');
            
            // Shake animation for the password display
            const passwordDisplay = document.getElementById('password-display');
            passwordDisplay.classList.add('shake');

            setTimeout(() => {
                // Reset after showing failure
                lockIcon.classList.remove('fail');
                passwordDisplay.classList.remove('shake');
                currentInput = '';
                updateDisplay();
            }, 800); // Reset after 0.8 seconds
        }
    };

    // Event listener for keypad buttons
    keypad.addEventListener('click', (event) => {
        const target = event.target.closest('.keypad-btn');
        if (!target) return;

        const value = target.dataset.value;
        if (value && currentInput.length < PASSWORD_LENGTH) {
            currentInput += value;
            updateDisplay();

            if (currentInput.length === PASSWORD_LENGTH) {
                checkPassword();
            }
        }
    });

    // Event listener for delete button
    deleteBtn.addEventListener('click', () => {
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        }
    });

    // Add a simple shake animation CSS rule dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
            transform: translate3d(0, 0, 0);
        }
        @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
        }
    `;
    document.head.appendChild(style);
});