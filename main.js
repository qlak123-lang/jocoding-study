class ThemeToggle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        this.render(savedTheme);
    }

    render(theme) {
        this.shadowRoot.innerHTML = `
            <style>
                button {
                    background: var(--surface-color);
                    border: 1px solid var(--text-color);
                    color: var(--text-color);
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
                button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
                .icon {
                    font-size: 1.2rem;
                }
            </style>
            <button>
                <span class="icon">\${theme === 'dark' ? '☀️' : '🌙'}</span>
                <span>\${theme === 'dark' ? '라이트 모드' : '다크 모드'}</span>
            </button>
        `;

        this.shadowRoot.querySelector('button').addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.render(newTheme);
    }
}

customElements.define('theme-toggle', ThemeToggle);

class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 2rem;
                    background: var(--surface-color);
                    border-radius: 24px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                    transition: all 0.3s ease;
                }
                h1 {
                    color: var(--primary-color);
                    margin-bottom: 2rem;
                    font-size: 2.5rem;
                    font-weight: 800;
                    letter-spacing: -1px;
                }
                .ball-container {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 2.5rem;
                    min-height: 60px;
                    flex-wrap: wrap;
                }
                .ball {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background-color: var(--ball-color);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    font-weight: bold;
                    box-shadow: var(--ball-shadow);
                    color: #1a1a1a;
                    animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }
                @keyframes popIn {
                    from { transform: scale(0); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                button {
                    background-color: var(--primary-color);
                    color: white;
                    border: none;
                    padding: 1.2rem 3rem;
                    font-size: 1.25rem;
                    font-weight: 600;
                    border-radius: 16px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 14px 0 rgba(76, 175, 80, 0.39);
                }
                button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(76, 175, 80, 0.23);
                    filter: brightness(1.1);
                }
                button:active {
                    transform: translateY(0);
                }
            </style>
            <h1>로또 번호 추첨기</h1>
            <div class="ball-container"></div>
            <button>Lucky Numbers ✨</button>
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
        numbers.forEach((number, index) => {
            setTimeout(() => {
                const ball = document.createElement('div');
                ball.classList.add('ball');
                ball.textContent = number;
                this.ballContainer.appendChild(ball);
            }, index * 100);
        });
    }
}

customElements.define('lotto-generator', LottoGenerator);
