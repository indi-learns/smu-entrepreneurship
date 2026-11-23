/* Ask Spears — site chatbot, loaded on every page.
   It answers from the knowledge base below, so it works on GitHub Pages with no API key.

   TO USE YOUR LAB 3 BOT INSTEAD: paste its embed/share URL between the quotes on the next line.
   The chat window will then show your bot. (The bot must allow being embedded in an iframe.) */
var LAB3_BOT_URL = "";

(function () {
  var APPLY = '<a href="https://spears.startuptree.co/discover/applications" target="_blank" rel="noopener">open applications</a>';
  var EVENTS = '<a href="https://spears.startuptree.co/discover/events" target="_blank" rel="noopener">upcoming events</a>';
  var SIGNUP = '<a href="https://spears.startuptree.co" target="_blank" rel="noopener">sign up for updates</a>';
  var page = function (hash, label) { return '<a href="programs.html#' + hash + '">' + label + '</a>'; };

  var KB = [
    { k: ["what is spears", "spears institute", "about", "who are you", "what do you do", "mission", "institute"],
      a: "The Spears Institute for Entrepreneurial Leadership is the part of the SMU Cox School of Business that helps people start companies. It runs events, mentorship, internships, funding and accelerators, organized into four stages: Learn, Engage, Launch and Scale. " + page("learn", "See all programs") + "." },
    { k: ["stage", "stages", "four stages", "where do i start", "where to start", "get started", "begin", "new to", "which program", "right for me", "next step", "what should i do"],
      a: function () {
        var s = window.SpearsStage && window.SpearsStage.get();
        var names = { learn: "Learn", engage: "Engage", launch: "Launch", scale: "Scale", involved: "Get involved" };
        if (s && names[s]) return "Your pathfinder result was <b>" + names[s] + "</b>. Start with " + page(s, "the " + names[s] + " programs") + ".";
        return "Programs are grouped into four stages. <b>Learn</b>: exploring. <b>Engage</b>: testing an idea. <b>Launch</b>: building the company. <b>Scale</b>: growing it. Not sure which fits? Take the three-question <a href=\"index.html#finder\">Find your stage</a> pathfinder.";
      } },
    { k: ["launch accelerator", "accelerator", "12 week", "twelve week", "summer program", "summer"],
      a: "The Spears LAUNCH Accelerator is a 12-week summer program for SMU student startups. Teams get mentorship, tools and resources to turn an idea into a market-ready venture, and pitch at Demo Day at the end. " + page("launch", "More on Launch programs") + "." },
    { k: ["startup launch", "workspace", "pre accelerator", "not ready", "prepare for accelerator"],
      a: "Spears Startup LAUNCH is for student ventures getting ready for an accelerator or funding. It offers dedicated mentors, hands-on workshops and a shared workspace. " + page("launch", "More on Launch programs") + "." },
    { k: ["demo day", "demo"],
      a: "Demo Day closes the Spears LAUNCH Accelerator each August. Student founders pitch their ventures to the Dallas startup community. Mentors, alumni and investors are welcome." },
    { k: ["funding", "fund", "money", "grant", "grants", "capital", "pre-seed", "preseed", "investment", "non-dilutive", "equity"],
      a: "SMU student founders can get non-dilutive grants and pre-seed funding through the institute, and pitch competitions award funding too. The FinTech Accelerator is free and takes no equity. Check " + APPLY + "." },
    { k: ["pitch", "competition", "competitions", "pitch competition"],
      a: "Pitch competitions let SMU students present an idea to judges, get feedback and compete for funding. See " + APPLY + " for what's open now." },
    { k: ["internship", "internships", "intern", "job", "work at a startup", "experience"],
      a: "The Spears internship program places SMU students in paid part-time and full-time roles at North Texas startups. " + page("engage", "More on Engage programs") + "." },
    { k: ["mentor", "mentors", "mentorship", "advisor", "coach", "volunteer", "get involved", "alumni", "alum", "investor"],
      a: "Student founders can be matched with alumni, founders and investors as mentors. If you'd like to mentor, come to Demo Day or host an intern, see " + page("involved", "Get involved") + " or " + SIGNUP + "." },
    { k: ["fellowship", "fellowships", "scholarship", "scholarships", "scholar", "fellow"],
      a: "Spears fellowships and scholarships are launching in 2026. " + SIGNUP.charAt(0).toUpperCase() + SIGNUP.slice(1) + " to hear when applications open." },
    { k: ["fintech", "masschallenge", "mass challenge", "coalition", "y'all street", "yall street", "financial"],
      a: "The SMU Cox FinTech Accelerator, run with MassChallenge, is a 16-week program for up to 15 fintech startups a year. It is free, takes no equity and is open to applicants worldwide. Applications for the first cohort close November 19, 2026. " + page("scale", "More on Scale programs") + "." },
    { k: ["event", "events", "speaker", "speakers", "fireside", "workshop", "workshops", "panel", "trek", "treks", "seminar", "calendar", "networking"],
      a: "The institute hosts fireside chats, panels, workshops, seminars, networking sessions and startup treks through the year. See " + EVENTS + "." },
    { k: ["eligible", "eligibility", "who can", "not a student", "non student", "outside smu", "community", "do i have to be", "major", "undergrad", "undergraduate", "graduate", "mba", "freshman"],
      a: "Most Learn, Engage and Launch programs are for current SMU undergraduate and graduate students, in any major. Many events are open to the community, and Scale programs such as the FinTech Accelerator are open to outside founders." },
    { k: ["apply", "application", "applications", "sign up", "signup", "register", "join", "deadline", "how do i"],
      a: "Applications and event sign-ups run through the Spears platform. See " + APPLY + " or " + SIGNUP + ". One date to know: FinTech Accelerator applications close November 19, 2026." },
    { k: ["contact", "email", "phone", "where are you", "location", "address", "office", "find you", "instagram", "social"],
      a: "The institute is part of the SMU Cox School of Business, 6214 Bishop Blvd., Dallas, TX 75275. The fastest way to reach the team is to " + SIGNUP + ", or follow <a href=\"https://www.instagram.com/smuspears\" target=\"_blank\" rel=\"noopener\">@smuspears</a> on Instagram." },
    { k: ["caruth", "hart", "curriculum", "class", "classes", "course", "courses", "degree", "certificate"],
      a: "Spears works alongside the Caruth Institute for Entrepreneurship, which leads the entrepreneurship curriculum at Cox, and the Hart Institute for Technology, Innovation and Entrepreneurship. Spears focuses on what happens outside the classroom: events, mentorship, funding and accelerators." },
    { k: ["william spears", "bill spears", "founder of", "founded", "history", "gift", "named"],
      a: "The institute was established in 2022 with a gift from William S. Spears, founder of Cenergistic. It was the largest gift from a non-alumnus in SMU history." },
    { k: ["southwest venture forum", "swvf", "dallas 100", "venture forum"],
      a: "The Southwest Venture Forum connects emerging companies with investors, and the Dallas 100 recognizes the fastest-growing private companies in the Dallas area. Both are part of the " + page("scale", "Scale stage") + "." }
  ];
  var CHIPS = ["Where do I start?", "What is the LAUNCH Accelerator?", "Is there funding?", "Can non-students join?"];

  function norm(s) { return " " + s.toLowerCase().replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim() + " "; }

  function answer(text) {
    var q = norm(text);
    if (/ (hi|hello|hey|howdy) /.test(q) && q.trim().split(" ").length < 4) return "Hi. Ask me about programs, funding, eligibility or how to apply.";
    if (/ (thanks|thank you|thx) /.test(q)) return "Glad to help. Anything else you want to know?";
    var best = null, bestScore = 0;
    KB.forEach(function (item) {
      var score = 0;
      item.k.forEach(function (kw) { if (q.indexOf(" " + kw + " ") > -1) score += kw.split(" ").length; });
      if (score > bestScore) { bestScore = score; best = item; }
    });
    if (!best) return "I don't have an answer for that yet. I can tell you about the four stages, the LAUNCH Accelerator, funding, internships, the FinTech Accelerator, events and who is eligible. For anything else, " + SIGNUP + " and the team will be in touch.";
    return typeof best.a === "function" ? best.a() : best.a;
  }

  /* Build the widget */
  var launch = document.createElement("button");
  launch.className = "chat-launch"; launch.type = "button";
  launch.textContent = "Ask a question";
  launch.setAttribute("aria-expanded", "false");
  launch.setAttribute("aria-controls", "chatPanel");

  var panel = document.createElement("section");
  panel.className = "chat-panel"; panel.id = "chatPanel";
  panel.setAttribute("aria-label", "Ask Spears chatbot");
  panel.innerHTML =
    '<div class="chat-head"><div><b>Ask Spears</b><span>Program guide for founders</span></div>' +
    '<button class="chat-close" type="button" aria-label="Close chat">&times;</button></div>';

  var log, input;
  if (LAB3_BOT_URL) {
    var frame = document.createElement("iframe");
    frame.src = LAB3_BOT_URL; frame.title = "Chatbot";
    panel.appendChild(frame);
  } else {
    log = document.createElement("div");
    log.className = "chat-log"; log.setAttribute("role", "log"); log.setAttribute("aria-live", "polite");
    var chips = document.createElement("div"); chips.className = "chat-chips";
    CHIPS.forEach(function (c) {
      var b = document.createElement("button"); b.type = "button"; b.textContent = c;
      b.addEventListener("click", function () { send(c); });
      chips.appendChild(b);
    });
    var form = document.createElement("form"); form.className = "chat-form";
    input = document.createElement("input");
    input.type = "text"; input.placeholder = "Type your question"; input.setAttribute("aria-label", "Your question"); input.autocomplete = "off";
    var go = document.createElement("button"); go.type = "submit"; go.textContent = "Send";
    form.appendChild(input); form.appendChild(go);
    form.addEventListener("submit", function (e) { e.preventDefault(); send(input.value); });
    panel.appendChild(log); panel.appendChild(chips); panel.appendChild(form);
  }
  document.body.appendChild(panel); document.body.appendChild(launch);

  function add(kind, content, isHtml) {
    var m = document.createElement("div"); m.className = "msg " + kind;
    if (isHtml) m.innerHTML = content; else m.textContent = content;
    log.appendChild(m); log.scrollTop = log.scrollHeight;
    try { sessionStorage.setItem("spearsChat", log.innerHTML); } catch (e) {}
  }
  function send(text) {
    text = (text || "").trim(); if (!text) return;
    add("user", text, false); input.value = "";
    setTimeout(function () { add("bot", answer(text), true); }, 250);
  }
  function open(state) {
    panel.classList.toggle("open", state);
    launch.setAttribute("aria-expanded", String(state));
    launch.textContent = state ? "Close chat" : "Ask a question";
    if (state && input) input.focus();
  }
  launch.addEventListener("click", function () { open(!panel.classList.contains("open")); });
  panel.querySelector(".chat-close").addEventListener("click", function () { open(false); launch.focus(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && panel.classList.contains("open")) { open(false); launch.focus(); } });

  /* Keep the conversation when moving between the two pages */
  if (log) {
    var saved = null; try { saved = sessionStorage.getItem("spearsChat"); } catch (e) {}
    if (saved) log.innerHTML = saved;
    else add("bot", "Hi, I'm the Spears program guide. Ask me about programs, funding, eligibility or how to apply.", false);
  }
})();
