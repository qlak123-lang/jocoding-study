class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    text-align: center;
                }
                h1 {
                    color: var(--primary-color, #4CAF50);
                    margin-bottom: 2rem;
                }
                .ball-container {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                    flex-wrap: wrap;
                }
                .ball {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: var(--ball-color, #ffeb3b);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    font-weight: bold;
                    box-shadow: var(--ball-shadow, 0 4px 8px rgba(0, 0, 0, 0.2));
                    color: var(--text-color, #333);
                }
                button {
                    background-color: var(--primary-color, #4CAF50);
                    color: var(--white, #fff);
                    border: none;
                    padding: 1rem 2rem;
                    font-size: 1.2rem;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }
                button:hover {
                    background-color: #45a049;
                }
            </style>
            <h1>로또 번호 추첨기</h1>
            <div class="ball-container"></div>
            <button>번호 생성</button>
        `;

        this.ballContainer = this.shadowRoot.querySelector('.ball-container');
        this.generateButton = this.shadowRoot.querySelector('button');

        this.generateButton.addEventListener('click', () => this.generateNumbers());
    }

    generateNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        this.displayNumbers(Array.from(numbers).sort((a, b) => a - b));
    }

    displayNumbers(numbers) {
        this.ballContainer.innerHTML = '';
        for (const number of numbers) {
            const ball = document.createElement('div');
            ball.classList.add('ball');
            ball.textContent = number;
            this.ballContainer.appendChild(ball);
        }
    }
}

customElements.define('lotto-generator', LottoGenerator);
