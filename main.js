class PartnershipForm extends HTMLElement {
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
                    text-align: center;
                }
                h2 {
                    color: var(--primary-color);
                    margin-bottom: 1.5rem;
                    font-size: 1.8rem;
                    font-weight: 700;
                }
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.2rem;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    text-align: left;
                }
                label {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: var(--text-color);
                    opacity: 0.8;
                }
                input, textarea {
                    padding: 0.8rem 1rem;
                    border-radius: 12px;
                    border: 1px solid rgba(0,0,0,0.1);
                    background: var(--background-color);
                    color: var(--text-color);
                    font-family: inherit;
                    font-size: 1rem;
                    transition: border-color 0.3s;
                }
                input:focus, textarea:focus {
                    outline: none;
                    border-color: var(--primary-color);
                }
                textarea {
                    resize: vertical;
                    min-height: 100px;
                }
                button {
                    background-color: var(--primary-color);
                    color: white;
                    border: none;
                    padding: 1rem;
                    font-size: 1.1rem;
                    font-weight: 600;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s;
                    margin-top: 0.5rem;
                }
                button:hover {
                    filter: brightness(1.1);
                    transform: translateY(-1px);
                }
                #status {
                    margin-top: 1rem;
                    font-size: 0.9rem;
                    padding: 0.8rem;
                    border-radius: 8px;
                    display: none;
                }
                #status.success {
                    display: block;
                    background: rgba(76, 175, 80, 0.1);
                    color: #4CAF50;
                }
                #status.error {
                    display: block;
                    background: rgba(244, 67, 54, 0.1);
                    color: #f44336;
                }
            </style>
            <h2>제휴 문의 🤝</h2>
            <form id="contact-form" action="https://formspree.io/f/mlgzpgbd" method="POST">
                <div class="form-group">
                    <label>성함 / 기업명</label>
                    <input type="text" name="name" required placeholder="홍길동 / (주)조코딩">
                </div>
                <div class="form-group">
                    <label>이메일 주소</label>
                    <input type="email" name="email" required placeholder="example@email.com">
                </div>
                <div class="form-group">
                    <label>문의 내용</label>
                    <textarea name="message" required placeholder="제휴 제안 내용을 입력해주세요."></textarea>
                </div>
                <button type="submit">문의하기</button>
            </form>
            <div id="status"></div>
        `;

        this.form = this.shadowRoot.getElementById('contact-form');
        this.status = this.shadowRoot.getElementById('status');
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const button = this.form.querySelector('button');
        button.disabled = true;
        button.textContent = '보내는 중...';

        try {
            const response = await fetch(this.form.action, {
                method: this.form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                this.status.textContent = "문의가 성공적으로 전송되었습니다! 곧 연락드리겠습니다.";
                this.status.className = "success";
                this.form.reset();
            } else {
                const result = await response.json();
                this.status.textContent = result.errors ? result.errors.map(error => error.message).join(", ") : "오류가 발생했습니다.";
                this.status.className = "error";
            }
        } catch (error) {
            this.status.textContent = "전송 중 오류가 발생했습니다. 다시 시도해주세요.";
            this.status.className = "error";
        } finally {
            button.disabled = false;
            button.textContent = '문의하기';
        }
    }
}

customElements.define('partnership-form', PartnershipForm);

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
                <span class="icon">${theme === 'dark' ? '☀️' : '🌙'}</span>
                <span>${theme === 'dark' ? '라이트 모드' : '다크 모드'}</span>
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
                    text-align: center;
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
