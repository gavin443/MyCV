class terminal {
  #timer;
  #tabs = document.querySelectorAll(".tab");
  #panels = document.querySelectorAll(".panel");
  #reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  #termBody = document.getElementById("termBody");
  #counter = 0;
  #lines = [
    {text: '<span class="prompt">$</span> npm create resume', cls: "ln" },
    {text: '<span class="muted">resolving dependencies...</span>', cls: "ln" },
    {text: '<span class="ok">✓</span> name: <strong style="color:#fff">Gavin Trowles</strong>',cls: "ln"},
    {text: '<span class="ok">✓</span> role: <span style="color:#8B5CF6">Frontend Engineer</span>',cls: "ln"},
    {text: '<span class="ok">✓</span> build complete <span class="muted">in 0.42s</span>',cls: "ln"}
  ];

  constructor(setTimer) {
    this.#timer=setTimer;
    this.#tabs.forEach((tab) => {

      tab.addEventListener("click", (e) => {

        this.#tabs.forEach(function (t) {
          t.setAttribute("aria-selected", "false");
        });

        this.#panels.forEach((p) => {
          p.classList.remove("active");
        });

        tab.setAttribute("aria-selected", "true");
        document
          .getElementById("panel-" + tab.dataset.tab)
          .classList.add("active");
      });

    });

    if (this.#reduceMotion) {
        this.#renderStatic();
        return;
      }
      this.#typeLine();
  }

  #renderStatic() {
    let nameDiv = document.createElement("div");
    let roleDiv = document.createElement("div");
    this.#termBody.innerHTML = this.#lines.map(function (l) {
        return '<span class="' + l.cls + '">' + l.text + "</span>";
      })
      .join("");

    nameDiv.className = "hero-name";
    nameDiv.textContent = "Gavin Trowles";
    roleDiv.className = "hero-role";
    roleDiv.innerHTML = 'Frontend Engineer <span class="cursor"></span>';
    this.#termBody.appendChild(nameDiv);
    this.#termBody.appendChild(roleDiv);
  }

  #typeLine() {

    if (this.#counter >= this.#lines.length) {

      let nameDiv = document.createElement("div");
      let roleDiv = document.createElement("div");

      nameDiv.className = "hero-name";
      nameDiv.style.opacity = 0
      nameDiv.textContent = "Gavin Trowles";
      roleDiv.className = "hero-role";
      roleDiv.style.opacity = 0;
      roleDiv.innerHTML = 'Frontend Engineer <span class="cursor"></span>';
      termBody.appendChild(nameDiv);
      termBody.appendChild(roleDiv);
      nameDiv.style.opacity = 1;
      roleDiv.style.opacity = 1;

      return;
    }

    let div = document.createElement("div");

    div.className = "ln";
    div.innerHTML = this.#lines[this.#counter].text;
    div.style.opacity = 0;

    termBody.appendChild(div);
    div.style.opacity = 1;
    this.#counter++;
    setTimeout(() => {
        this.#typeLine()
    }, this.#timer);
  }
}

 const terminalObj = new terminal(300);
