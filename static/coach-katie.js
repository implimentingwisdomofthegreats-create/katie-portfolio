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
            width: 64px;
            height: 80px;
            animation: coachBounce 1.6s ease-in-out infinite;
            transform-origin: bottom center;
            filter: drop-shadow(0 2px 6px rgba(0,0,0,0.18));
            transition: filter 0.2s ease;
        }

        .coach-katie:hover .coach-katie-figure {
            filter: drop-shadow(0 4px 12px rgba(201,169,110,0.3));
            animation-duration: 0.8s;
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
            top: 104px;
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
                width: 48px;
                height: 60px;
            }
            .coach-bubble {
                top: 84px;
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
        <svg class="coach-katie-figure" viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Hair (back) -->
            <ellipse cx="32" cy="18" rx="15" ry="16" fill="#1a1a1a"/>
            <!-- Hair bun -->
            <circle cx="44" cy="8" r="7" fill="#1a1a1a"/>
            <circle cx="44" cy="8" r="5.5" fill="#222"/>
            <!-- Hair stick -->
            <line x1="40" y1="2" x2="48" y2="6" stroke="#c9a96e" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="39.5" cy="1.5" r="1.5" fill="#c9a96e"/>
            <!-- Face -->
            <ellipse cx="32" cy="20" rx="12" ry="13" fill="#f5deb3"/>
            <!-- Blush -->
            <ellipse cx="23.5" cy="23" rx="3" ry="1.8" fill="#f4b4b4" opacity="0.45"/>
            <ellipse cx="40.5" cy="23" rx="3" ry="1.8" fill="#f4b4b4" opacity="0.45"/>
            <!-- Eyes -->
            <ellipse cx="27" cy="20" rx="2.2" ry="2.5" fill="#1a1a1a"/>
            <ellipse cx="37" cy="20" rx="2.2" ry="2.5" fill="#1a1a1a"/>
            <circle cx="27.8" cy="19.2" r="0.8" fill="#fff"/>
            <circle cx="37.8" cy="19.2" r="0.8" fill="#fff"/>
            <!-- Glasses -->
            <rect x="23" y="17" width="9" height="7" rx="3" fill="none" stroke="#555" stroke-width="1"/>
            <rect x="33" y="17" width="9" height="7" rx="3" fill="none" stroke="#555" stroke-width="1"/>
            <line x1="32" y1="20" x2="33" y2="20" stroke="#555" stroke-width="1"/>
            <line x1="23" y1="20" x2="20" y2="19" stroke="#555" stroke-width="0.8"/>
            <line x1="42" y1="20" x2="45" y2="19" stroke="#555" stroke-width="0.8"/>
            <!-- Smile -->
            <path d="M29 26 Q32 29 35 26" stroke="#b5651d" stroke-width="1" fill="none" stroke-linecap="round"/>
            <!-- Hair (front bangs) -->
            <path d="M20 16 Q24 8 32 10 Q28 14 20 16Z" fill="#1a1a1a"/>
            <path d="M32 10 Q40 8 44 16 Q38 14 32 10Z" fill="#1a1a1a"/>
            <!-- Neck -->
            <rect x="29" y="32" width="6" height="4" rx="1" fill="#f5deb3"/>
            <!-- Lab coat -->
            <path d="M18 36 L14 70 L50 70 L46 36 Q38 34 32 34 Q26 34 18 36Z" fill="#f0f0f0" stroke="#ddd" stroke-width="0.5"/>
            <!-- Coat lapels -->
            <path d="M28 36 L32 48 L36 36" fill="none" stroke="#ddd" stroke-width="0.8"/>
            <!-- Coat buttons -->
            <circle cx="32" cy="50" r="1.2" fill="#ccc"/>
            <circle cx="32" cy="56" r="1.2" fill="#ccc"/>
            <!-- Shirt underneath -->
            <path d="M28 36 L32 42 L36 36" fill="#c9a96e" opacity="0.6"/>
            <!-- Pocket -->
            <rect x="36" y="46" width="7" height="9" rx="1.5" fill="none" stroke="#ccc" stroke-width="0.6"/>
            <!-- Pen in pocket -->
            <line x1="39" y1="43" x2="39" y2="49" stroke="#c9a96e" stroke-width="1" stroke-linecap="round"/>
            <!-- Arms -->
            <path d="M18 38 L10 54 L14 56 L20 44" fill="#f0f0f0" stroke="#ddd" stroke-width="0.5"/>
            <path d="M46 38 L54 54 L50 56 L44 44" fill="#f0f0f0" stroke="#ddd" stroke-width="0.5"/>
            <!-- Hands -->
            <ellipse cx="12" cy="55.5" rx="3.5" ry="3" fill="#f5deb3"/>
            <ellipse cx="52" cy="55.5" rx="3.5" ry="3" fill="#f5deb3"/>
            <!-- Book in left hand -->
            <rect x="5" y="52" width="10" height="7" rx="1" fill="#c9a96e" opacity="0.8"/>
            <line x1="10" y1="52" x2="10" y2="59" stroke="#b5941f" stroke-width="0.5"/>
            <!-- DNA icon floating near right hand -->
            <g opacity="0.6" transform="translate(49, 48) scale(0.5)">
                <path d="M2 0 Q8 5 2 10 Q8 15 2 20" stroke="#4ecdc4" stroke-width="2" fill="none"/>
                <path d="M10 0 Q4 5 10 10 Q4 15 10 20" stroke="#ff6b6b" stroke-width="2" fill="none"/>
                <line x1="3" y1="5" x2="9" y2="5" stroke="#c9a96e" stroke-width="1"/>
                <line x1="3" y1="10" x2="9" y2="10" stroke="#c9a96e" stroke-width="1"/>
                <line x1="3" y1="15" x2="9" y2="15" stroke="#c9a96e" stroke-width="1"/>
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
