"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const obsidian_1 = require("obsidian");
class CodeblockFoldPlugin extends obsidian_1.Plugin {
    async onload() {
        console.log("Codeblock Fold 插件已加载（默认折叠模式）");
        const styleEl = document.createElement("style");
        styleEl.id = "codeblock-fold-style";
        styleEl.textContent = `
            .codeblock-fold-btn { cursor: pointer !important; padding: 2px 6px !important; }
            .codeblock-fold-btn:hover { color: var(--interactive-accent) !important; background-color: var(--background-modifier-hover) !important; }
        `;
        document.head.appendChild(styleEl);
        this.register(() => styleEl.remove());
        this.registerMarkdownPostProcessor((element) => {
            const codeBlocks = element.querySelectorAll("pre");
            codeBlocks.forEach((pre) => {
                if (pre.querySelector(".codeblock-fold-btn"))
                    return;
                const code = pre.querySelector("code");
                if (!code)
                    return;
                code.style.maxHeight = "7.5em";
                code.style.overflow = "hidden";
                code.style.display = "block";
                const toggle = document.createElement("span");
                toggle.textContent = "#";
                toggle.className = "codeblock-fold-btn";
                toggle.addEventListener("click", () => {
                    if (code.style.maxHeight === "7.5em") {
                        code.style.maxHeight = "";
                        code.style.overflow = "";
                        toggle.textContent = "*";
                    }
                    else {
                        code.style.maxHeight = "7.5em";
                        code.style.overflow = "hidden";
                        toggle.textContent = "#";
                    }
                });
                pre.style.position = "relative";
                pre.insertBefore(toggle, pre.firstChild);
            });
        });
    }
    onunload() {
        console.log("Codeblock Fold 插件已卸载");
    }
}
exports.default = CodeblockFoldPlugin;
