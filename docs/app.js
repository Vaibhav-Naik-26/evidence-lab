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


  // Vote-counting demo
  const d = c.voteDemo;
  $("vd-h").textContent = d.heading; $("vd-intro").textContent = d.intro;
  $("vd-a-l").textContent = d.a.label; $("vd-b-l").textContent = d.b.label;

  const ids = ["a-n", "a-p", "b-n", "b-p"];
  [d.a.studies, d.a.people, d.b.studies, d.b.people].forEach((v, i) => ($(ids[i]).value = v));
  const fmt = (n) => n.toLocaleString("en-IN");

  const voteDemo = () => {
    const [an, ap, bn, bp] = ids.map((id) => Math.max(1, Number($(id).value) || 1));
    const ta = an * ap, tb = bn * bp, top = Math.max(ta, tb);
    const win = (x, y) => (x === y ? d.tie : x > y ? d.a.short : d.b.short);

    $("vd-count").textContent = d.countLine.replace("{winner}", win(an, bn));
    $("vd-weigh").textContent = d.weighLine.replace("{winner}", win(ta, tb)).replace("{a}", fmt(ta)).replace("{b}", fmt(tb));
    $("bar-a").style.width = Math.max(1, (100 * ta) / top) + "%";
    $("bar-b").style.width = Math.max(1, (100 * tb) / top) + "%";
  };

  ids.forEach((id) => $(id).addEventListener("input", voteDemo)); voteDemo();

  // Policy ideas
  const p = c.policies;
  $("pol-h").textContent = p.heading; $("pol-intro").textContent = p.intro;
  p.items.forEach((i) => {
    const el = document.createElement("article"); el.className = "card";
    el.innerHTML = `<h3>${i.title}</h3><p><b>Helps with:</b> ${i.fixes}</p><p><b>Trade-off:</b> ${i.tradeoff}</p>`;
    $("pol-list").append(el);
  });
});