// Renders everything from content.json (DRY). Serve with: python -m http.server
const $ = (id) => document.getElementById(id);
const li = (html) => Object.assign(document.createElement("li"), { innerHTML: html });

fetch("content.json").then((r) => r.json()).then((c) => {
  $("title").textContent = c.title; $("lede").textContent = c.lede;
  c.stats.forEach((s) => $("stats").append(li(`<b>${s.value}</b>${s.label}`)));
  c.ladder.forEach((l) => $("ladder").append(li(`<b>${l.name}</b><span>${l.note}</span>`)));
  $("vc-h").textContent = c.voteCounting.heading; $("vc-body").textContent = c.voteCounting.body; $("vc-fix").textContent = c.voteCounting.fix;
  c.timeline.forEach((t) => $("timeline").append(li(`<b>${t.year}</b> ${t.text}`)));
  c.cases.forEach((k) => $("cases").insertAdjacentHTML("beforeend", `<p><b>${k.title}.</b> ${k.text}</p>`));
  $("viral").textContent = c.viral; $("sources").textContent = c.sources; $("w-h").textContent = c.widget.heading;
  c.ladder.forEach((l) => $("w-type").add(new Option(l.name, l.id)));
  c.widget.sizes.forEach((s) => $("w-size").add(new Option(s.name, s.id)));
  const rate = () => {
    const base = c.ladder.find((l) => l.id === $("w-type").value).score;
    const mod = c.widget.sizes.find((s) => s.id === $("w-size").value).mod;
    const i = Math.max(1, Math.min(5, Math.round(base + mod))) - 1;
    $("w-out").textContent = `${c.widget.verdicts[i]} evidence. Check whether a systematic review exists before acting on it.`;
  };
  ["w-type", "w-size"].forEach((id) => $(id).addEventListener("change", rate)); rate();
});
