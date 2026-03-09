/* ═══════════════════════════════════════════════════════
   COACH KATIE — Interactive dancing biologist mascot
   Drop this script into any page to add Coach Katie.
   ═══════════════════════════════════════════════════════ */
(function () {
    const tips = [
        "Try active recall — close your notes and quiz yourself!",
        "Spaced repetition beats cramming every time.",
        "Teach what you learned to someone else — it's the best test!",
        "Take a 5-min break every 25 minutes (Pomodoro Technique).",
        "Sleep is when your brain consolidates memories. Don't skip it!",
        "Interleave your subjects — mixing topics boosts retention.",
        "Write questions in the margins, then answer them later.",
        "Elaborative interrogation: always ask yourself WHY.",
        "Dual coding — pair words with visuals for deeper learning.",
        "Retrieval practice > re-reading. Test yourself often!",
        "You're doing amazing. Keep going! 🧬",
        "Science says handwriting notes beats typing for retention!",
    ];

    // Inject styles
    const style = document.createElement("style");
    style.textContent = `
        .coach-katie {
            position: fixed;
            top: 16px;
            right: 16px;
            z-index: 9998;
            cursor: pointer;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
        }

        .coach-katie-figure {
            width: 72px;
            height: 96px;
            animation: coachBounce 1.6s ease-in-out infinite;
            transform-origin: bottom center;
            filter: drop-shadow(0 2px 8px rgba(201,169,110,0.15));
            transition: filter 0.2s ease;
        }

        .coach-katie:hover .coach-katie-figure {
            filter: drop-shadow(0 4px 16px rgba(201,169,110,0.35));
            animation-duration: 0.8s;
        }

        .kawaii-sparkle {
            animation: sparkle 1.8s ease-in-out infinite;
        }

        .kawaii-sparkle:nth-child(2) { animation-delay: 0.6s; }
        .kawaii-sparkle:nth-child(3) { animation-delay: 1.2s; }

        @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; transform: scale(1.1); }
        }

        .kawaii-eye-shine {
            animation: eyeShine 3s ease-in-out infinite;
        }

        @keyframes eyeShine {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
        }

        .coach-katie-label {
            font-family: 'DM Sans', 'Inter', sans-serif;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-align: center;
            margin-top: 4px;
            opacity: 0.7;
        }

        /* Adapt label color to page background */
        body[style*="background: #000"] .coach-katie-label,
        body[style*="background:#000"] .coach-katie-label {
            color: #ccc;
        }

        @keyframes coachBounce {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25%  { transform: translateY(-6px) rotate(2deg); }
            50%  { transform: translateY(0) rotate(0deg); }
            75%  { transform: translateY(-4px) rotate(-2deg); }
        }

        .coach-bubble {
            position: fixed;
            top: 124px;
            right: 16px;
            z-index: 9997;
            background: #1a1a1a;
            color: #f5f5f7;
            font-family: 'DM Sans', 'Inter', sans-serif;
            font-size: 13px;
            line-height: 1.5;
            padding: 12px 16px;
            border-radius: 12px;
            max-width: 240px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.25);
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
            pointer-events: none;
            transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .coach-bubble.visible {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: auto;
        }

        .coach-bubble::before {
            content: '';
            position: absolute;
            top: -6px;
            right: 28px;
            width: 12px;
            height: 12px;
            background: #1a1a1a;
            transform: rotate(45deg);
            border-radius: 2px;
        }

        /* Light page variant */
        .page-light .coach-bubble {
            background: #ffffff;
            color: #111111;
            border: 1px solid #e0e0e0;
        }

        .page-light .coach-bubble::before {
            background: #ffffff;
            border-top: 1px solid #e0e0e0;
            border-left: 1px solid #e0e0e0;
        }

        .page-light .coach-katie-label {
            color: #666;
        }

        @media (max-width: 480px) {
            .coach-katie-figure {
                width: 54px;
                height: 72px;
            }
            .coach-bubble {
                top: 100px;
                right: 12px;
                max-width: 200px;
                font-size: 12px;
            }
            .coach-katie {
                top: 12px;
                right: 12px;
            }
            .coach-katie-label {
                font-size: 9px;
            }
        }
    `;
    document.head.appendChild(style);

    // Detect light vs dark page
    const bg = getComputedStyle(document.body).backgroundColor;
    const isLight =
        bg === "rgb(255, 255, 255)" ||
        bg === "rgba(0, 0, 0, 0)" ||
        document.body.style.background === "#ffffff" ||
        document.body.style.background === "white" ||
        document.querySelector('meta[name="theme-color"][content="#ffffff"]');

    if (isLight) document.body.classList.add("page-light");

    // Build character
    const wrapper = document.createElement("div");
    wrapper.className = "coach-katie";
    wrapper.setAttribute("role", "button");
    wrapper.setAttribute("aria-label", "Coach Katie — click for a study tip");
    wrapper.innerHTML = `
        <svg class="coach-katie-figure" viewBox="0 0 72 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Sparkles -->
            <g class="kawaii-sparkle" transform="translate(6, 8)">
                <path d="M0 3 L3 0 L6 3 L3 6Z" fill="#c9a96e" opacity="0.7"/>
            </g>
            <g class="kawaii-sparkle" transform="translate(60, 14)">
                <path d="M0 2.5 L2.5 0 L5 2.5 L2.5 5Z" fill="#c9a96e" opacity="0.6"/>
            </g>
            <g class="kawaii-sparkle" transform="translate(10, 32)">
                <path d="M0 2 L2 0 L4 2 L2 4Z" fill="#c9a96e" opacity="0.5"/>
            </g>

            <!-- Hair (back — long flowing) -->
            <ellipse cx="36" cy="22" rx="19" ry="19" fill="#1a1a1a"/>
            <!-- Long hair flowing down behind body -->
            <path d="M17 22 Q14 40 16 62 Q18 70 22 72 L22 42 Q20 30 17 22Z" fill="#1a1a1a"/>
            <path d="M55 22 Q58 40 56 62 Q54 70 50 72 L50 42 Q52 30 55 22Z" fill="#1a1a1a"/>
            <!-- Hair sheen -->
            <path d="M22 12 Q28 8 34 12" stroke="#333" stroke-width="0.8" fill="none" opacity="0.4"/>
            <path d="M38 10 Q44 7 50 12" stroke="#333" stroke-width="0.8" fill="none" opacity="0.4"/>

            <!-- Bun (cute messy top bun) -->
            <circle cx="46" cy="7" r="8" fill="#1a1a1a"/>
            <circle cx="46" cy="7" r="6" fill="#222"/>
            <!-- Cute flower hair clip -->
            <g transform="translate(39, 0)">
                <circle cx="4" cy="4" r="2" fill="#ffb6c1"/>
                <circle cx="4" cy="0.5" r="1.8" fill="#ffc0cb"/>
                <circle cx="7" cy="2.5" r="1.8" fill="#ffc0cb"/>
                <circle cx="6.5" cy="5.8" r="1.8" fill="#ffc0cb"/>
                <circle cx="1.5" cy="5.8" r="1.8" fill="#ffc0cb"/>
                <circle cx="1" cy="2.5" r="1.8" fill="#ffc0cb"/>
                <circle cx="4" cy="4" r="1.3" fill="#c9a96e"/>
            </g>

            <!-- Face (rounder, softer kawaii shape) -->
            <ellipse cx="36" cy="24" rx="14" ry="15" fill="#fce4c8"/>
            <!-- Chin highlight -->
            <ellipse cx="36" cy="33" rx="5" ry="2" fill="#fdebd3" opacity="0.5"/>

            <!-- Blush (bigger, more kawaii) -->
            <ellipse cx="24" cy="29" rx="4" ry="2.2" fill="#ffaaaa" opacity="0.35"/>
            <ellipse cx="48" cy="29" rx="4" ry="2.2" fill="#ffaaaa" opacity="0.35"/>

            <!-- Kawaii eyes — big and sparkly -->
            <!-- Left eye -->
            <ellipse cx="29" cy="24" rx="4" ry="5" fill="#2c1810"/>
            <ellipse cx="29" cy="24.5" rx="3.5" ry="4.2" fill="#1a1a1a"/>
            <circle cx="30.5" cy="22.5" r="1.8" fill="#fff" class="kawaii-eye-shine"/>
            <circle cx="27.5" cy="25" r="1" fill="#fff" opacity="0.7"/>
            <ellipse cx="29" cy="22" rx="1.2" ry="0.5" fill="#fff" opacity="0.3"/>
            <!-- Left eye lashes -->
            <path d="M25 20 Q24 18 23 17.5" stroke="#1a1a1a" stroke-width="0.8" stroke-linecap="round" fill="none"/>
            <path d="M26 19.5 Q25.5 17.5 25 16.5" stroke="#1a1a1a" stroke-width="0.8" stroke-linecap="round" fill="none"/>
            <path d="M28 19 Q28 17 28.5 16" stroke="#1a1a1a" stroke-width="0.7" stroke-linecap="round" fill="none"/>

            <!-- Right eye -->
            <ellipse cx="43" cy="24" rx="4" ry="5" fill="#2c1810"/>
            <ellipse cx="43" cy="24.5" rx="3.5" ry="4.2" fill="#1a1a1a"/>
            <circle cx="44.5" cy="22.5" r="1.8" fill="#fff" class="kawaii-eye-shine"/>
            <circle cx="41.5" cy="25" r="1" fill="#fff" opacity="0.7"/>
            <ellipse cx="43" cy="22" rx="1.2" ry="0.5" fill="#fff" opacity="0.3"/>
            <!-- Right eye lashes -->
            <path d="M47 20 Q48 18 49 17.5" stroke="#1a1a1a" stroke-width="0.8" stroke-linecap="round" fill="none"/>
            <path d="M46 19.5 Q46.5 17.5 47 16.5" stroke="#1a1a1a" stroke-width="0.8" stroke-linecap="round" fill="none"/>
            <path d="M44 19 Q44 17 43.5 16" stroke="#1a1a1a" stroke-width="0.7" stroke-linecap="round" fill="none"/>

            <!-- Cute round glasses -->
            <circle cx="29" cy="24" r="6" fill="none" stroke="#c9a96e" stroke-width="0.8" opacity="0.7"/>
            <circle cx="43" cy="24" r="6" fill="none" stroke="#c9a96e" stroke-width="0.8" opacity="0.7"/>
            <line x1="35" y1="24" x2="37" y2="24" stroke="#c9a96e" stroke-width="0.8" opacity="0.7"/>
            <line x1="23" y1="23" x2="20" y2="22" stroke="#c9a96e" stroke-width="0.6" opacity="0.5"/>
            <line x1="49" y1="23" x2="52" y2="22" stroke="#c9a96e" stroke-width="0.6" opacity="0.5"/>

            <!-- Cute little nose -->
            <path d="M35 27.5 Q36 28.5 37 27.5" stroke="#ddb896" stroke-width="0.6" fill="none" stroke-linecap="round"/>

            <!-- Kawaii cat-smile -->
            <path d="M31 31.5 Q33 30 36 32 Q39 30 41 31.5" stroke="#d4837a" stroke-width="0.9" fill="none" stroke-linecap="round"/>

            <!-- Cute front bangs (wispy, face-framing) -->
            <path d="M22 18 Q26 6 36 9 Q30 14 22 18Z" fill="#1a1a1a"/>
            <path d="M36 9 Q46 6 50 18 Q44 14 36 9Z" fill="#1a1a1a"/>
            <!-- Side wisps -->
            <path d="M21 20 Q19 24 20 30" stroke="#1a1a1a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <path d="M51 20 Q53 24 52 30" stroke="#1a1a1a" stroke-width="2.5" fill="none" stroke-linecap="round"/>

            <!-- Neck -->
            <rect x="33" y="38" width="6" height="4" rx="2" fill="#fce4c8"/>

            <!-- Lab coat (cuter, slightly A-line) -->
            <path d="M22 42 L17 82 L55 82 L50 42 Q42 40 36 40 Q30 40 22 42Z" fill="#f5f5f5" stroke="#e8e8e8" stroke-width="0.5"/>
            <!-- Coat collar -->
            <path d="M28 42 L32 46 L36 42 L40 46 L44 42" fill="none" stroke="#e0e0e0" stroke-width="0.8"/>
            <!-- Cute bow at collar -->
            <path d="M33 44 Q36 42 36 44 Q36 42 39 44" fill="#ffb6c1" stroke="#f4a0ab" stroke-width="0.4"/>
            <circle cx="36" cy="43.5" r="1" fill="#ffb6c1"/>
            <!-- Coat buttons (heart-shaped) -->
            <path d="M35 54 Q36 52.5 37 54 Q36 55.5 35 54Z" fill="#ffb6c1" opacity="0.6"/>
            <path d="M35 60 Q36 58.5 37 60 Q36 61.5 35 60Z" fill="#ffb6c1" opacity="0.6"/>
            <!-- Pocket with little flower -->
            <rect x="40" y="54" width="7" height="8" rx="2" fill="none" stroke="#ddd" stroke-width="0.5"/>
            <circle cx="43.5" cy="53" r="1.5" fill="#ffb6c1" opacity="0.5"/>

            <!-- Arms -->
            <path d="M22 44 L13 62 L17 64 L24 50" fill="#f5f5f5" stroke="#e8e8e8" stroke-width="0.5"/>
            <path d="M50 44 L59 62 L55 64 L48 50" fill="#f5f5f5" stroke="#e8e8e8" stroke-width="0.5"/>
            <!-- Hands -->
            <ellipse cx="15" cy="63.5" rx="3.8" ry="3.2" fill="#fce4c8"/>
            <ellipse cx="57" cy="63.5" rx="3.8" ry="3.2" fill="#fce4c8"/>

            <!-- Book in left hand (cuter, pastel) -->
            <rect x="8" y="60" width="11" height="7" rx="1.5" fill="#c9a96e" opacity="0.8"/>
            <line x1="13.5" y1="60" x2="13.5" y2="67" stroke="#b5941f" stroke-width="0.5"/>
            <path d="M9 62 L12 62" stroke="#fff" stroke-width="0.4" opacity="0.5"/>
            <path d="M9 63.5 L11 63.5" stroke="#fff" stroke-width="0.4" opacity="0.5"/>

            <!-- Test tube in right hand -->
            <g transform="translate(54, 55) rotate(15)">
                <rect x="0" y="0" width="4" height="12" rx="2" fill="none" stroke="#4ecdc4" stroke-width="0.8" opacity="0.7"/>
                <rect x="0.5" y="6" width="3" height="5.5" rx="1.5" fill="#4ecdc4" opacity="0.3"/>
                <rect x="-0.5" y="-1" width="5" height="2" rx="0.5" fill="#ddd" opacity="0.6"/>
                <!-- Bubbles -->
                <circle cx="2" cy="7.5" r="0.6" fill="#fff" opacity="0.5"/>
                <circle cx="1.2" cy="9" r="0.4" fill="#fff" opacity="0.4"/>
            </g>

            <!-- Tiny floating hearts -->
            <g opacity="0.4">
                <path d="M8 50 Q9 48.5 10 50 Q9 51.5 8 50Z" fill="#ffb6c1">
                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.5s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="translate" values="0,0;-1,-3;0,0" dur="2.5s" repeatCount="indefinite"/>
                </path>
                <path d="M60 48 Q61 46.5 62 48 Q61 49.5 60 48Z" fill="#ffb6c1">
                    <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" begin="0.8s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="translate" values="0,0;1,-4;0,0" dur="3s" begin="0.8s" repeatCount="indefinite"/>
                </path>
            </g>
        </svg>
        <div class="coach-katie-label">Coach Katie</div>
    `;

    document.body.appendChild(wrapper);

    // Speech bubble
    const bubble = document.createElement("div");
    bubble.className = "coach-bubble";
    document.body.appendChild(bubble);

    let isOpen = false;
    let tipIndex = Math.floor(Math.random() * tips.length);

    function showTip() {
        bubble.textContent = tips[tipIndex];
        tipIndex = (tipIndex + 1) % tips.length;
        bubble.classList.add("visible");
        isOpen = true;
    }

    function hideTip() {
        bubble.classList.remove("visible");
        isOpen = false;
    }

    wrapper.addEventListener("click", function (e) {
        e.stopPropagation();
        if (isOpen) {
            hideTip();
        } else {
            showTip();
        }
    });

    document.addEventListener("click", function () {
        if (isOpen) hideTip();
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && isOpen) hideTip();
    });
})();
