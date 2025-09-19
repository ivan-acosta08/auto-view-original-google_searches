// Common languages
const VIEW_ORIGINAL_PATTERNS = [
  "ver original",           // es
  "view original",          // en
  "voir l’original", "voir l'original", // fr
  "original anzeigen",      // de
  "visualizar original",    // pt
  "visualizza originale",   // it
  "原文を表示",                // ja
  "원문 보기",                 // ko
  "查看原文",                  // zh
];

const TRANSLATED_BY_GOOGLE_PATTERNS = [
  "traducido por google",   // es
  "translated by google",   // en
  "traduit par google",     // fr
  "von google übersetzt",   // de
  "tradotto da google",     // it
  "traduzido pelo google",  // pt
  "由 Google 翻译",            // zh
  "Google 翻訳",              // ja
  "Google 번역",              // ko
];

const textMatchesAny = (text, patterns) =>
  patterns.some(p => text.includes(p));

function isVisible(el) {
  const r = el.getBoundingClientRect();
  const style = window.getComputedStyle(el);
  return (
    r.width > 0 &&
    r.height > 0 &&
    style.visibility !== "hidden" &&
    style.display !== "none"
  );
}

function clickElement(el) {
  try {
    el.focus({ preventScroll: true });
    el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
  } catch (e) {
    console.error(e);
  }
}

function nodeHasTranslatedContext(node) {
  // Avoid false positives: check that “Translated by Google” appears nearby.
  let cur = node;
  let depth = 0;
  while (cur && depth < 6) {
    const txt = (cur.textContent || "").toLowerCase();
    if (textMatchesAny(txt, TRANSLATED_BY_GOOGLE_PATTERNS)) return true;
    cur = cur.parentElement;
    depth++;
  }
  return false;
}

function findViewOriginalCandidates(root = document) {
  // Limit search to results to improve performance
  const scope = root.querySelector("#rso") || root;
  const candidates = scope.querySelectorAll('a, button, span, div');
  const out = [];
  for (const el of candidates) {
    const txt = (el.textContent || "").trim().toLowerCase();
    if (!txt) continue;
    if (!textMatchesAny(txt, VIEW_ORIGINAL_PATTERNS)) continue;
    if (!isVisible(el)) continue;
    if (!nodeHasTranslatedContext(el)) continue;
    out.push(el);
  }
  return out;
}

let lastRun = 0;
const RUN_EVERY_MS = 600;

function clickAllViewOriginal() {
  const now = Date.now();
  if (now - lastRun < RUN_EVERY_MS) return; // simple debounce
  lastRun = now;

  const targets = findViewOriginalCandidates();
  if (targets.length) {
    // Avoid multiple clicks on the same item
    const clicked = new WeakSet();
    for (const el of targets) {
      if (!clicked.has(el)) {
        clickElement(el);
        clicked.add(el);
      }
    }
  }
}

// 1) Execute on load
document.addEventListener("DOMContentLoaded", clickAllViewOriginal);
window.addEventListener("load", clickAllViewOriginal);

// 2) Observe dynamic changes (Google continuously injects results)
const mo = new MutationObserver(() => clickAllViewOriginal());
mo.observe(document.documentElement, { childList: true, subtree: true });

// 3) Gentle retries if it takes a while to paint
for (let i = 1; i <= 6; i++) {
  setTimeout(clickAllViewOriginal, i * 500);
}