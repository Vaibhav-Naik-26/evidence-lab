"""Policy agent: issues -> options -> evidence -> critic -> structured JSON.
Run: ANTHROPIC_API_KEY=... python agent.py   (swap call_llm for any other provider)"""
import json, os, re, pathlib
from pydantic import BaseModel
from anthropic import Anthropic

MODEL = os.getenv("MODEL", "claude-sonnet-5-5")
client = Anthropic()
HERE = pathlib.Path(__file__).parent
CORPUS = [l.strip() for l in (HERE / "corpus/facts.txt").read_text().splitlines() if l.strip()]

class Option(BaseModel):
    policy: str; rationale: str; evidence: list[str]; expected_impact: str
    cost_feasibility: str; risks: list[str]; trade_offs: list[str]; confidence: str

def call_llm(prompt: str) -> str:
    r = client.messages.create(model=MODEL, max_tokens=2500, messages=[{"role": "user", "content": prompt}])
    return r.content[0].text

def json_list(text: str):
    return json.loads(re.search(r"\[.*\]", text, re.S).group())

def retrieve(query: str, k: int = 4) -> list[str]:
    words = set(re.findall(r"\w+", query.lower()))
    return sorted(CORPUS, key=lambda s: -len(words & set(re.findall(r"\w+", s.lower()))))[:k]

def extract_issues(article: str) -> list[str]:
    return json_list(call_llm(f"List the key issues as a JSON array of short strings:\n{article}"))

def propose(issues: list[str], n: int = 4) -> list[Option]:
    ev = "\n".join(retrieve(" ".join(issues), 6))
    p = f"""Issues: {issues}\nEvidence (cite only this, or say 'unsupported'):\n{ev}\n
Recommend {n} evidence-based government policy options. Be politically neutral. Return ONLY a JSON array of objects with keys:
policy, rationale, evidence (list), expected_impact, cost_feasibility, risks (list), trade_offs (list), confidence (low/medium/high)."""
    return [Option(**o) for o in json_list(call_llm(p))]

def critique(opts: list[Option]) -> str:
    return call_llm("Critique these options briefly: flag unsupported claims and missing trade-offs:\n" + json.dumps([o.model_dump() for o in opts]))

if __name__ == "__main__":
    issues = extract_issues("\n".join(CORPUS)); opts = propose(issues)
    print(json.dumps([o.model_dump() for o in opts], indent=2)); print("\nCRITIC:\n", critique(opts))
