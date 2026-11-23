/* Shared page behavior: header, hero video, Find your stage pathfinder, programs-page highlight. */
(function () {
  var KEY = "spearsStage";
  function getStage() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setStage(v) { try { v ? localStorage.setItem(KEY, v) : localStorage.removeItem(KEY); } catch (e) {} }
  window.SpearsStage = { get: getStage };

  /* Header turns solid once you scroll past the dark top area */
  var header = document.getElementById("header");
  function onScroll() {
    var solid = window.scrollY > 60;
    header.classList.toggle("solid", solid);
    header.classList.toggle("on-dark", !solid);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Hero video: autoplay on loop, with a pause control and a fallback if the file is missing */
  var hero = document.getElementById("hero");
  var video = document.getElementById("heroVideo");
  if (video) {
    var fail = function () { hero.classList.add("no-video"); };
    video.addEventListener("error", fail);
    var src = video.querySelector("source");
    if (src) src.addEventListener("error", fail);
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
    var toggle = document.getElementById("videoToggle");
    toggle.addEventListener("click", function () {
      if (video.paused) { video.play(); toggle.textContent = "Pause video"; }
      else { video.pause(); toggle.textContent = "Play video"; }
    });
  }

  /* Find your stage */
  var STAGES = {
    learn:  { name: "Learn",  why: "Start by seeing how founders think and work. No idea required.", picks: ["Events and speakers", "Workshops and treks", "Entrepreneurship coursework"] },
    engage: { name: "Engage", why: "Test your idea in front of people and get real startup experience.", picks: ["Pitch competitions", "Mentorship", "Startup internships"] },
    launch: { name: "Launch", why: "You're building. Get structure, mentors, workspace and early funding.", picks: ["Spears Startup LAUNCH", "Spears LAUNCH Accelerator (12 weeks, summer)", "Student startup funding"] },
    scale:  { name: "Scale",  why: "Connect with enterprise customers, investors and the Dallas business community.", picks: ["SMU Cox FinTech Accelerator", "Southwest Venture Forum", "Dallas 100"] },
    involved: { name: "Get involved", why: "Founders here need people like you.", picks: ["Mentor a founder", "Come to Demo Day", "Host an intern"] }
  };
  var QUESTIONS = [
    { q: "Where is your idea right now?", a: [
      ["I'm curious, but I don't have an idea yet", "learn"],
      ["I have an idea I want to test", "engage"],
      ["I'm building a product or have first customers", "launch"],
      ["I run a startup with traction", "scale"] ] },
    { q: "Which describes you?", a: [
      ["SMU undergraduate", "student"],
      ["SMU graduate student", "student"],
      ["Alum or founder outside SMU", "outside"],
      ["Mentor or investor", "backer"] ] },
    { q: "What would help most right now?", a: [
      ["Skills and exposure to founders", "learn"],
      ["Feedback, mentors and hands-on experience", "engage"],
      ["Structure, workspace and early funding", "launch"],
      ["Enterprise customers and investors", "scale"] ] }
  ];
  var ORDER = ["learn", "engage", "launch", "scale"];

  var panel = document.getElementById("finderPanel");
  if (panel) {
    var answers = [];
    var el = function (tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };

    var ask = function (i) {
      panel.innerHTML = "";
      panel.appendChild(el("p", "finder-progress", "Question " + (i + 1) + " of " + QUESTIONS.length));
      panel.appendChild(el("h3", "", QUESTIONS[i].q));
      var box = el("div", "choices");
      QUESTIONS[i].a.forEach(function (opt) {
        var b = el("button", "choice", opt[0]);
        b.type = "button";
        b.addEventListener("click", function () {
          answers[i] = opt[1];
          if (i + 1 < QUESTIONS.length) ask(i + 1); else finish();
        });
        box.appendChild(b);
      });
      panel.appendChild(box);
    };

    var finish = function () {
      var stage;
      if (answers[1] === "backer") stage = "involved";
      else {
        /* Where the idea is counts double; what you need most breaks ties upward or downward by one step */
        var a = ORDER.indexOf(answers[0]), c = ORDER.indexOf(answers[2]);
        stage = ORDER[Math.round((a * 2 + c) / 3)];
      }
      setStage(stage);
      show(stage, answers[1] === "outside");
    };

    var show = function (stage, outside) {
      var s = STAGES[stage];
      panel.innerHTML = "";
      var r = el("div", "result");
      r.appendChild(el("p", "finder-progress", stage === "involved" ? "Your match" : "Your stage"));
      r.appendChild(el("div", "result-stage", s.name));
      r.appendChild(el("p", "", s.why));
      if (outside && stage !== "scale") r.appendChild(el("p", "", "Most Learn, Engage and Launch programs are for current SMU students. Many events are open to the community, and the Scale programs are open to outside founders."));
      var ul = el("ul");
      s.picks.forEach(function (p) { ul.appendChild(el("li", "", p)); });
      r.appendChild(ul);
      var act = el("div", "actions");
      var go = el("a", "btn btn-red", "See " + s.name + " programs");
      go.href = "programs.html#" + stage;
      var again = el("button", "linkbtn", "Start over");
      again.type = "button";
      again.addEventListener("click", function () { setStage(null); answers = []; ask(0); });
      act.appendChild(go); act.appendChild(again);
      r.appendChild(act);
      panel.appendChild(r);
    };

    var saved = getStage();
    if (saved && STAGES[saved]) show(saved, false); else ask(0);
  }

  /* Programs page: mark the visitor's stage */
  var mine = getStage();
  if (mine) {
    document.querySelectorAll('[data-stage="' + mine + '"]').forEach(function (n) { n.classList.add("mine"); });
  }
})();
