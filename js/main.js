const tabs = [
  {
    label: "HTML",
    content: `<div>Html content</div>`,
  },
  {
    label: "Count Characters",
    content: `<div>
        <h3>Count Characters<h3>
        <textarea
          id="text-input"
          placeholder="Type something..."
        ></textarea>
        <p class="counter"><span id="char-count">0</span>/200 characters</p>
        <button id="text-action-btn" type="button">Submit Text</button>
      </div>`,
  },
  {
    label: "javascript",
    content: `<div>JavaScript Content</div>`,
  },
];
function buildTabs(containerId, tabData) {
  const container = document.getElementById(containerId);
  const buttonBar = document.createElement("div");
  buttonBar.className = "tab-buttons";

  let activeIndex = 0;

  const panelsWrapper = document.createElement("div");

  const addBtn = document.createElement("button");
  addBtn.className = "add-tab-btn";
  addBtn.textContent = "+";

  function switchTab(nextIndex) {
    activeIndex = Math.max(0, Math.min(nextIndex, tabData.length - 1));

    buttonBar.querySelectorAll(".tab-btn").forEach((btn, index) => {
      btn.classList.toggle("active", index === activeIndex);
    });

    panelsWrapper.querySelectorAll(".tab-panel").forEach((panel, index) => {
      panel.classList.toggle("active", index === activeIndex);
    });
  }

  function renderTabs() {
    buttonBar.querySelectorAll(".tab-btn").forEach((btn) => btn.remove());
    panelsWrapper.innerHTML = "";

    tabData.forEach((tab, index) => {
      const btn = document.createElement("button");
      btn.className = "tab-btn" + (index === activeIndex ? " active" : "");
      btn.innerHTML = `
        <span class="tab-label">${tab.label}</span>
        <span class="tab-close" data-close-tab="true" aria-label="Close tab" title="Close tab">×</span>
      `;

      btn.addEventListener("click", (event) => {
        if (event.target && event.target.closest("[data-close-tab='true']")) {
          event.stopPropagation();
          closeTab(index);
          return;
        }

        switchTab(index);
      });

      buttonBar.insertBefore(btn, addBtn);

      const panel = document.createElement("div");
      panel.className = "tab-panel" + (index === activeIndex ? " active" : "");
      panel.innerHTML = tab.content;
      panelsWrapper.appendChild(panel);
    });
  }

  function closeTab(indexToRemove) {
    if (tabData.length === 1) {
      return;
    }

    tabData.splice(indexToRemove, 1);

    if (activeIndex === indexToRemove) {
      activeIndex = Math.min(indexToRemove, tabData.length - 1);
    } else if (activeIndex > indexToRemove) {
      activeIndex -= 1;
    }

    renderTabs();
  }

  addBtn.addEventListener("click", () => {
    tabData.push({
      label: "New Tab",
      content: `<h3 style="color: white; font-size: 18px; background: #8447FF; text-align: center; padding:10px 0px;">Bytes4Future</h3><input
                 style="width: 50%; display: block; margin: 10px auto; padding: 10px; border: 1px solid #ccc; border-radius: 4px;" type="text" placeholder="Type here..."/>`,
    });

    activeIndex = tabData.length - 1;
    renderTabs();
  });

  buttonBar.appendChild(addBtn);
  container.appendChild(buttonBar);
  container.appendChild(panelsWrapper);

  renderTabs();
}

buildTabs("myTabs", tabs);

const commentContainer = document.querySelector(".comment-container");
const textarea = document.getElementById("text-input");
const charCount = document.getElementById("char-count");
const countText = document.querySelector(".counter");
const textActionBtn = document.getElementById("text-action-btn");
const maxCharacters = 200;

function updateCharacterCounter() {
  const length = textarea.value.length;
  charCount.textContent = length;
  countText.classList.toggle("counter-over-limit", length > maxCharacters);
  textActionBtn.disabled = length > maxCharacters;
}

textarea.addEventListener("input", updateCharacterCounter);
updateCharacterCounter();