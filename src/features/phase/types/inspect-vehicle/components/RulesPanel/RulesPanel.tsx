import "./RulesPanel.css";

type RuleTone = "required" | "tolerable" | "blocking";

const TITLE = "Regras de Liberação";

const RULES: { tone: RuleTone; title: string; text: string }[] = [
    {
        tone: "required",
        title: "Condições Obrigatórias:",
        text: "O carro só pode sair se o motor e freios estiverem aprovados, os pneus calibrados e documentação válida",
    },
    {
        tone: "tolerable",
        title: "Pendências Toleráveis:",
        text: "Pequenos reparos estéticos, como riscos na pintura ou retrovisor danificado",
    },
    {
        tone: "blocking",
        title: "Impedimentos de Liberação:",
        text: "Falha nos freios, pneus, documentação irregular.",
    },
];

export function RulesPanel() {
    return (
        <aside className="rules-panel">
            <h2 className="rules-panel-title">{TITLE}</h2>

            {RULES.map((r) => (
                <p key={r.title} className="rules-panel-rule">
                    <b className={`rule-${r.tone}`}>{r.title}</b> {r.text}
                </p>
            ))}
        </aside>
    );
}