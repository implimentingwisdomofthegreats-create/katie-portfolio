/* ═══════════════════════════════════════════════════════
   COACH KATIE — Clean chibi bio student mascot
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
        "You're doing amazing. Keep going!",
        "Science says handwriting notes beats typing for retention!",
    ];

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
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .coach-katie:hover {
            transform: scale(1.08);
        }

        .coach-katie:hover .coach-katie-figure {
            filter: drop-shadow(0 3px 10px rgba(0,0,0,0.18));
        }

        .coach-katie:hover .katie-wave {
            animation: katieWave 0.6s ease-in-out 2;
            transform-origin: 14px 58px;
        }

        .coach-katie.pop {
            transform: scale(1.35);
        }

        .coach-katie.pop .coach-katie-figure {
            filter: drop-shadow(0 6px 20px rgba(201,169,110,0.35));
        }

        .coach-katie-figure {
            width: 56px;
            height: 72px;
            filter: drop-shadow(0 2px 5px rgba(0,0,0,0.12));
            transition: filter 0.3s ease;
        }

        .coach-katie-label {
            font-family: 'DM Sans', 'Inter', sans-serif;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-align: center;
            margin-top: 2px;
            opacity: 0.6;
            transition: opacity 0.2s ease;
        }

        .coach-katie:hover .coach-katie-label {
            opacity: 1;
        }

        @keyframes katieWave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-12deg); }
            75% { transform: rotate(8deg); }
        }

        .coach-bubble {
            position: fixed;
            top: 100px;
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
            right: 24px;
            width: 12px;
            height: 12px;
            background: #1a1a1a;
            transform: rotate(45deg);
            border-radius: 2px;
        }

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
                width: 44px;
                height: 56px;
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

    // Detect page background
    const bg = getComputedStyle(document.body).backgroundColor;
    const isLight =
        bg === "rgb(255, 255, 255)" ||
        bg === "rgba(0, 0, 0, 0)" ||
        document.body.style.background === "#ffffff" ||
        document.body.style.background === "white";
    if (isLight) document.body.classList.add("page-light");

    const wrapper = document.createElement("div");
    wrapper.className = "coach-katie";
    wrapper.setAttribute("role", "button");
    wrapper.setAttribute("aria-label", "Coach Katie — click for a study tip");
    wrapper.innerHTML = `
        <svg class="coach-katie-figure" viewBox="0 0 56 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- BIG HEAD -->
            <!-- Hair back -->
            <ellipse cx="28" cy="17" rx="17" ry="17" fill="#1a1a1a"/>

            <!-- Face (big round chibi head) -->
            <ellipse cx="28" cy="19" rx="14" ry="15" fill="#f5deb3"/>

            <!-- Hair front — thick straight bangs -->
            <path d="M14 14 L14 11 Q18 4 28 3 Q38 4 42 11 L42 14 Q38 10 28 9 Q18 10 14 14Z" fill="#1a1a1a"/>
            <!-- Side hair -->
            <path d="M14 14 Q13 20 14 28" stroke="#1a1a1a" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M42 14 Q43 20 42 28" stroke="#1a1a1a" stroke-width="4" fill="none" stroke-linecap="round"/>

            <!-- BIG GLASSES -->
            <circle cx="22" cy="20" r="7" fill="none" stroke="#444" stroke-width="1.2"/>
            <circle cx="34" cy="20" r="7" fill="none" stroke="#444" stroke-width="1.2"/>
            <!-- Bridge -->
            <line x1="29" y1="19" x2="27" y2="19" stroke="#444" stroke-width="1.2"/>
            <!-- Arms of glasses -->
            <line x1="15" y1="18.5" x2="12" y2="17" stroke="#444" stroke-width="1" stroke-linecap="round"/>
            <line x1="41" y1="18.5" x2="44" y2="17" stroke="#444" stroke-width="1" stroke-linecap="round"/>
            <!-- Lens shine -->
            <path d="M17 16 Q18 15 19 16" stroke="#fff" stroke-width="0.6" fill="none" opacity="0.5" stroke-linecap="round"/>
            <path d="M29 16 Q30 15 31 16" stroke="#fff" stroke-width="0.6" fill="none" opacity="0.5" stroke-linecap="round"/>

            <!-- Eyes (simple dots behind glasses) -->
            <circle cx="22" cy="20.5" r="2" fill="#1a1a1a"/>
            <circle cx="34" cy="20.5" r="2" fill="#1a1a1a"/>
            <!-- Eye highlights -->
            <circle cx="22.8" cy="19.8" r="0.7" fill="#fff"/>
            <circle cx="34.8" cy="19.8" r="0.7" fill="#fff"/>

            <!-- Subtle blush -->
            <ellipse cx="17" cy="24" rx="2.5" ry="1.2" fill="#f0a0a0" opacity="0.25"/>
            <ellipse cx="39" cy="24" rx="2.5" ry="1.2" fill="#f0a0a0" opacity="0.25"/>

            <!-- Small smile -->
            <path d="M25 26 Q28 28.5 31 26" stroke="#c48a6a" stroke-width="0.8" fill="none" stroke-linecap="round"/>

            <!-- Neck -->
            <rect x="25.5" y="33" width="5" height="3" rx="1" fill="#f5deb3"/>

            <!-- SMALL BODY — lab coat -->
            <path d="M17 36 L14 62 L42 62 L39 36 Q34 35 28 35 Q22 35 17 36Z" fill="#f0f0f0" stroke="#e0e0e0" stroke-width="0.5"/>
            <!-- Collar -->
            <path d="M23 36 L28 40 L33 36" fill="none" stroke="#ddd" stroke-width="0.8"/>
            <!-- Buttons -->
            <circle cx="28" cy="44" r="0.8" fill="#ccc"/>
            <circle cx="28" cy="48" r="0.8" fill="#ccc"/>
            <!-- Pocket -->
            <rect x="31" y="43" width="5" height="6" rx="1" fill="none" stroke="#ddd" stroke-width="0.5"/>
            <!-- Pen -->
            <line x1="33.5" y1="41" x2="33.5" y2="45" stroke="#c9a96e" stroke-width="0.8" stroke-linecap="round"/>

            <!-- Right arm (static) -->
            <path d="M39 37 L46 50 L43 52 L38 42" fill="#f0f0f0" stroke="#e0e0e0" stroke-width="0.5"/>
            <ellipse cx="44.5" cy="51.5" rx="2.5" ry="2" fill="#f5deb3"/>

            <!-- Left arm (waves on hover) -->
            <g class="katie-wave">
                <path d="M17 37 L10 50 L13 52 L18 42" fill="#f0f0f0" stroke="#e0e0e0" stroke-width="0.5"/>
                <ellipse cx="11.5" cy="51.5" rx="2.5" ry="2" fill="#f5deb3"/>
                <!-- Book -->
                <rect x="5" y="49" width="8" height="5.5" rx="1" fill="#c9a96e" opacity="0.75"/>
                <line x1="9" y1="49" x2="9" y2="54.5" stroke="#b08a3e" stroke-width="0.4"/>
            </g>

            <!-- Feet -->
            <ellipse cx="22" cy="63" rx="4" ry="1.5" fill="#444"/>
            <ellipse cx="34" cy="63" rx="4" ry="1.5" fill="#444"/>
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

    // Click: pop scale + show/hide tip
    wrapper.addEventListener("click", function (e) {
        e.stopPropagation();

        // Pop animation
        wrapper.classList.add("pop");
        setTimeout(function () {
            wrapper.classList.remove("pop");
        }, 400);

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
