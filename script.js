/**
 * RAVENDRA PATEL — PORTFOLIO INTERACTIONS & ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 2. Interactive Canvas Particle Mesh Background
    initCanvasParticles();

    // 3. Navbar scroll spy & sticky shadow
    initNavbarScroll();

    // 4. Mobile Menu Toggle
    initMobileMenu();

    // 5. Toast Notifications & Copy Email Actions
    initCopyEmailActions();

    // 6. Project Category Filtering
    initProjectFilters();

    // 7. Interactive Developer Terminal
    initTerminal();
});

/* ==========================================================================
   Canvas Particle Mesh Background
   ========================================================================== */
function initCanvasParticles() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 18000), 55);

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 1.5 + 0.5;
            this.alpha = Math.random() * 0.4 + 0.1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(56, 189, 248, ${0.08 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        // Draw & update particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   Navbar Scroll Spy & Sticky Styling
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   Mobile Menu Toggle
   ========================================================================== */
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        const isHidden = menu.classList.contains('hidden');
        if (isHidden) {
            menu.classList.remove('hidden');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        } else {
            menu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    });

    const mobileLinks = menu.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });
}

/* ==========================================================================
   Toast Notification & Copy Email
   ========================================================================== */
function showToast(message = 'Copied to clipboard!') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function initCopyEmailActions() {
    const email = 'patelsamerth9@gmail.com';
    const copyBtns = [
        document.getElementById('copy-email-hero'),
        document.getElementById('copy-email-contact'),
        document.getElementById('copy-email-mobile')
    ];

    copyBtns.forEach(btn => {
        if (!btn) return;
        btn.addEventListener('click', () => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email)
                    .then(() => showToast(`Copied ${email} to clipboard!`))
                    .catch(() => fallbackCopy(email));
            } else {
                fallbackCopy(email);
            }
        });
    });

    function fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showToast(`Copied ${text} to clipboard!`);
        } catch (err) {
            showToast(`Email: ${text}`);
        }
        document.body.removeChild(textArea);
    }
}

/* ==========================================================================
   Project Category Filter
   ========================================================================== */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    card.classList.add('animate-fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   Interactive Developer Terminal
   ========================================================================== */
function initTerminal() {
    const terminalBody = document.getElementById('terminal-body');
    const terminalInput = document.getElementById('terminal-input');
    const clearBtn = document.getElementById('terminal-clear-btn');
    const chips = document.querySelectorAll('.term-chip');

    if (!terminalBody || !terminalInput) return;

    const commandHistory = [];
    let historyIndex = -1;

    const commands = {
        help: `
<span class="text-cyan-400 font-bold">Available Commands:</span>
  <span class="text-emerald-400">about / bio</span>       - Overview of Ravendra Patel
  <span class="text-emerald-400">skills</span>            - Technical stack & competencies
  <span class="text-emerald-400">projects</span>          - Key open-source & engineering projects
  <span class="text-emerald-400">contact / email</span>   - Get in touch or copy contact info
  <span class="text-emerald-400">github</span>             - Open or inspect GitHub profile
  <span class="text-emerald-400">linkedin</span>           - Open LinkedIn profile
  <span class="text-emerald-400">resume / cat resume.txt</span> - View technical summary
  <span class="text-emerald-400">clear</span>             - Clear terminal screen
`,
        bio: `
<span class="text-white font-bold">Ravendra Patel</span> — Software Developer & AI Systems Engineer
• Based in MP, India.
• Focused on scalable backend systems, IoT architectures, and high-performance algorithms in C++ & Python.
• Strong foundation in DBMS, MySQL, REST API design, and Data Structures.
`,
        about: `
<span class="text-white font-bold">Ravendra Patel</span> — Software Developer & AI Systems Engineer
• Based in MP, India.
• Focused on scalable backend systems, IoT architectures, and high-performance algorithms in C++ & Python.
• Strong foundation in DBMS, MySQL, REST API design, and Data Structures.
`,
        skills: `
<span class="text-cyan-400 font-bold">Languages:</span> Python, C++, C, JavaScript, SQL
<span class="text-emerald-400 font-bold">Backend & DB:</span> MySQL, Relational DBMS, REST APIs, IoT Sensor Pipelines
<span class="text-indigo-400 font-bold">Core & Tools:</span> Data Structures & Algorithms, Linux/Shell, Git & GitHub, VS Code
`,
        projects: `
<span class="text-cyan-400 font-bold">1. Smart Bhopal Backend (Python)</span>
   Smart city IoT infrastructure, real-time traffic monitoring & utilities.
   Repo: <a href="https://github.com/RavendraPatel09/smart_bhopal_backend" target="_blank" class="text-cyan-300 underline">github.com/RavendraPatel09/smart_bhopal_backend</a>

<span class="text-cyan-400 font-bold">2. Complete DSA Using C++</span>
   Exhaustive algorithm & data structure implementations in C++.
   Repo: <a href="https://github.com/RavendraPatel09/Complete-DSA-Using-Cpp" target="_blank" class="text-cyan-300 underline">github.com/RavendraPatel09/Complete-DSA-Using-Cpp</a>

<span class="text-cyan-400 font-bold">3. Complete DSA Using Python</span>
   Algorithmic patterns, LeetCode solutions, recursion & optimization in Python.
   Repo: <a href="https://github.com/RavendraPatel09/Complete-DSA-using-python" target="_blank" class="text-cyan-300 underline">github.com/RavendraPatel09/Complete-DSA-using-python</a>

<span class="text-cyan-400 font-bold">4. FindMyStuff</span>
   Community lost & found platform with categorization and verification.
   Repo: <a href="https://github.com/RavendraPatel09/findmystuff" target="_blank" class="text-cyan-300 underline">github.com/RavendraPatel09/findmystuff</a>
`,
        contact: `
<span class="text-slate-300">Email:</span> <a href="mailto:patelsamerth9@gmail.com" class="text-cyan-400 underline">patelsamerth9@gmail.com</a>
<span class="text-slate-300">GitHub:</span> <a href="https://github.com/RavendraPatel09" target="_blank" class="text-cyan-400 underline">github.com/RavendraPatel09</a>
<span class="text-slate-300">LinkedIn:</span> <a href="https://linkedin.com/in/ravendra-patel-3bb375338" target="_blank" class="text-cyan-400 underline">linkedin.com/in/ravendra-patel-3bb375338</a>
<span class="text-slate-300">Location:</span> MP, India
`,
        email: `
<span class="text-emerald-400">Email address:</span> <strong class="text-white">patelsamerth9@gmail.com</strong>
(Run or click 'contact' for all direct links)
`,
        github: `
Opening GitHub profile: <a href="https://github.com/RavendraPatel09" target="_blank" class="text-cyan-400 underline">https://github.com/RavendraPatel09</a>...
`,
        linkedin: `
Opening LinkedIn profile: <a href="https://linkedin.com/in/ravendra-patel-3bb375338" target="_blank" class="text-cyan-400 underline">https://linkedin.com/in/ravendra-patel-3bb375338</a>...
`,
        resume: `
<span class="text-white font-bold">=== RESUME SNAPSHOT: RAVENDRA PATEL ===</span>
• Role: Software Developer &amp; AI Systems Engineer
• Core Competencies: Python, C++, MySQL, DSA, IoT, System Architecture
• Key Projects: Smart Bhopal Backend, Complete DSA Repositories, FindMyStuff
• Contact: patelsamerth9@gmail.com | MP, India
`,
        "cat resume.txt": `
<span class="text-white font-bold">=== RESUME SNAPSHOT: RAVENDRA PATEL ===</span>
• Role: Software Developer &amp; AI Systems Engineer
• Core Competencies: Python, C++, MySQL, DSA, IoT, System Architecture
• Key Projects: Smart Bhopal Backend, Complete DSA Repositories, FindMyStuff
• Contact: patelsamerth9@gmail.com | MP, India
`,
        sudo: `<span class="text-rose-400">Permission denied: You are not in the sudoers file. This incident will be reported to Ravendra. 😉</span>`,
        date: () => `<span class="text-slate-300">${new Date().toUTCString()}</span>`,
        whoami: `<span class="text-slate-300">guest@ravendra.dev (visitor)</span>`
    };

    function executeCommand(rawCmd) {
        const cmd = rawCmd.trim().toLowerCase();
        if (!cmd) return;

        commandHistory.push(rawCmd);
        historyIndex = commandHistory.length;

        // Output the prompt line
        const inputEcho = document.createElement('div');
        inputEcho.className = 'flex items-center gap-2 text-slate-400';
        inputEcho.innerHTML = `<span class="text-emerald-400 font-bold">ravendra@dev:~$</span> <span>${escapeHtml(rawCmd)}</span>`;
        terminalBody.appendChild(inputEcho);

        if (cmd === 'clear') {
            terminalBody.innerHTML = '';
            return;
        }

        const outputRow = document.createElement('div');
        outputRow.className = 'text-slate-300 my-1 leading-relaxed';

        if (commands[cmd]) {
            const content = typeof commands[cmd] === 'function' ? commands[cmd]() : commands[cmd];
            outputRow.innerHTML = content;
            if (cmd === 'github') {
                window.open('https://github.com/RavendraPatel09', '_blank');
            } else if (cmd === 'linkedin') {
                window.open('https://linkedin.com/in/ravendra-patel-3bb375338', '_blank');
            }
        } else {
            outputRow.innerHTML = `<span class="text-rose-400">zsh: command not found: ${escapeHtml(cmd)}</span>. Type <span class="text-cyan-400 font-bold">help</span> to view available commands.`;
        }

        terminalBody.appendChild(outputRow);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function escapeHtml(str) {
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag));
    }

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = terminalInput.value;
            terminalInput.value = '';
            executeCommand(val);
        } else if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex] || '';
            }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex] || '';
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
            e.preventDefault();
        }
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            terminalBody.innerHTML = '';
        });
    }

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-cmd');
            if (cmd) {
                executeCommand(cmd);
            }
        });
    });
}
