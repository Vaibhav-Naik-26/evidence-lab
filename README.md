# Evidence & Misinformation: Open-book lab exam (Assignment E)

## 1. Problem definition
About 7 million scholarly articles were published in 2025, often with conflicting findings. Weak single studies go viral while systematic reviews take ~3 years and AI can hallucinate. **How can a government help citizens and policymakers separate strong evidence from weak studies?**
Scope for 3 hours: <fill on exam day: which track, what is in/out>

## 2. Tracks, stack and design principles
| Track | Folder | Stack | Principles |
|---|---|---|---|
| Website | `website/` | HTML, CSS, vanilla JS, content in `content.json`, GitHub Pages | DRY, orthogonality, small iterations, documented |
| SFT + QLoRA | `sft/` | Qwen2.5-1.5B-Instruct, 4-bit NF4, peft + trl, Colab T4 (~4-6 GB) | Reproducible seed, dry run first, educational scope |
| Policy agent | `agent/` | Python, LLM API, small evidence corpus, Pydantic schema | Evidence-cited, trade-offs mandatory, human review, neutral |

## 3. Outputs
<screenshots, loss curve, before/after outputs, agent JSON; honest note on what was completed>

## 4. Run
- Website: `cd website && python -m http.server`
- SFT: open `sft/qlora_evidence_assistant.ipynb` in Colab (T4), upload `sft/handwritten_seed.jsonl`
- Agent: `pip install -r agent/requirements.txt && ANTHROPIC_API_KEY=... python agent/agent.py`
