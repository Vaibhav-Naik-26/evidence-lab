# Evidence & Misinformation: Open-book lab exam (Assignment E)

Article: "Facts Are Hares, But Truth Is A Tortoise" (Mindfield, Times of India).
**Task attempted in the exam: Task 1, issue-focused website.**

Live site: https://vaibhav-naik-26.github.io/evidence-lab/

## 1. Problem definition
About 7 million scholarly articles were published in 2025, often with conflicting findings. Weak single studies go viral while systematic reviews take about 3 years and AI can hallucinate. **How can a government help citizens and policymakers separate strong evidence from weak studies?**

**Scope for 3 hours:** A public explainer website on how to judge a study. Government ideas appear as a short section with trade-offs.
- In scope: evidence ladder, vote-counting demo, infant-sleep timeline, case studies, why weak claims go viral, policy ideas, claim-rating widget.
- Out of scope: backend, user accounts, a real claim-checking tool and Tasks 2 and 3.

## 2. Website (Task 1)
| Item | Choice |
|---|---|
| Stack | HTML, CSS, vanilla JavaScript, GitHub Pages |
| Content | All text and figures in `docs/content.json`, rendered by `docs/app.js` |
| Design | Plain language, high contrast, dark-mode support, mobile-first layout |
| Data shown | Figures from the article: 7 million papers, 19,000+ a day, 3-year review time, up to 50,000 deaths, 1945, 1957 and 1991 timeline |

**Design principles:** DRY (content in one JSON file), orthogonality (data, layout, style and behaviour in separate files), small iterations (one feature per commit, see commit history), clear documentation (this README and `.github/copilot-instructions.md`).

**Sections:** hero statistics, evidence ladder, why counting studies misleads, interactive count-vs-weigh demo, timeline of reversed advice, case studies, why weak claims go viral, government policy ideas with trade-offs, rate-a-claim widget.

## 3. Homework starters (prepared before the exam, not attempted in the exam)
| Track | Folder | What was prepared |
|---|---|---|
| SFT + QLoRA | `sft/` | Colab notebook: Qwen2.5-1.5B-Instruct, 4-bit NF4, LoRA r=16, PubMedQA plus a small hand-written seed set. Test-run once on a Colab T4. |
| Policy agent | `agent/` | Starter code (`agent.py`) for a policy-options agent. |

## 4. Outputs
Screenshots of the live site, the interactive demo and the mobile view are in Section 7 of the answer book. An honest completion note is in the answer book.

**Known limitations:** The policy ideas are suggestions that follow from the article's problems, not claims made by the article. The site is static with no backend.

## 5. Run
- Website: open the live link, or run `cd docs && python -m http.server` and visit http://localhost:8000
- SFT (homework): open `sft/qlora_evidence_assistant.ipynb` in Colab (T4 GPU) and upload `sft/handwritten_seed.jsonl`
- Agent (homework): `pip install -r agent/requirements.txt`, then `ANTHROPIC_API_KEY=... python agent/agent.py`

## 6. AI assistance
AI assistants (Claude) helped prepare the starter templates and some of the exam code. I reviewed, tested and committed every change myself.