import type { ReactNode } from "react";
import type { StepType } from "@/shared/data/modules";

export type HelpTopic =
    | "home"
    | "phase-selector"
    | StepType

export interface HelpPage {
    title?: string;
    content: ReactNode;
}

export const HELP: Partial<Record<HelpTopic, HelpPage[]>> = {
    "home": [
        {
            title: "Bem-vindo à cidade COO!",
            content: (
                <p>
                    Explore a cidade, conheça seus estabelecimentos e
                    aprenda conceitos de programação através de atividades
                    interativas.
                </p>
            ),
        },
        {
            title: "Como começar",
            content: (
                <p>
                    Escolha um módulo para iniciar sua jornada.
                    Complete as fases para avançar e desbloquear
                    novos desafios.
                </p>
            ),
        },
    ],
    "phase-selector": [
        {
            title: "Seletor de fases",
            content: (
                <p>
                    Escolha uma fase para iniciar ou continuar suas atividades.
                    As fases são desbloqueadas conforme seu progresso.
                </p>
            ),
        },
    ],
    "build-object": [
        {
            title: "Como jogar",
            content: (
                <ol>
                    <li>Arraste um valor da Central de Recursos para cada campo.</li>
                    <li>Apenas valores de mesmo campo são preenchidos entre si.</li>
                    <li>Clique em um campo preenchido para esvaziá-lo.</li>
                    <li>Clique no botão para conferir o cadastro.</li>
                </ol>
            ),
        },
        {
            title: "Conceito: classe e atributos",
            content: (
                <p>
                    Uma <b>classe</b> é um molde. Os <b>atributos</b> são as características
                    que todo objeto criado a partir dela possui, como nome e população.
                </p>
            ),
        },
    ],
};

export const DEFAULT_HELP: HelpPage[] = [
    {
        title: "Ajuda",
        content: <p>Nenhuma orientação específica disponível.</p>
    },
];