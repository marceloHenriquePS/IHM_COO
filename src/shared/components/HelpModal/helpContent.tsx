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
                <>
                    <p>
                        Explore a cidade, conheça seus estabelecimentos e
                        aprenda conceitos de programação através de atividades
                        interativas.
                    </p>

                    <br />

                    <h3>Dê Cor a Cidade</h3>

                    <p>
                        Nossa cidade <b>está sem cor ultimamente</b>, nos ajude a colorir a cidade.
                        Escolha um <strong>módulo</strong> abaixo para iniciar sua jornada.
                        Progrida entre as fases e pinte a cidade conforme você avança.
                    </p>

                    <br />

                    <h3>MODO DE TESTES</h3>

                    <p>
                        Ao ativar, <b>todas as fases e módulos ficam liberados</b> para você explorar livremente. 
                        <b> Seu progresso oficial não será alterado</b> enquanto estiver nesse modo.
                        <b> A cidade não vai se colorir enquanto o modo estiver ativado.</b>
                    </p>

                    <br />

                    <h3>Está com dúvida?</h3>

                    <p>
                        Use o botão de <b>ajuda</b> sempre que precisar, ele têm o ícone <b>?</b>.
                        <br />
                        Nele você encontrará sobre <b>como jogar as fases</b> e <b>conceitos de programação</b>.
                    </p>
                </>
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
            title: "Como jogar: Construa um Objeto",
            content: (
                <>
                    <ol>
                        <li>Arraste um valor da Central de Recursos para cada campo.</li>
                        <li>Apenas valores de mesmo campo são preenchidos entre si.</li>
                        <li>Clique em um campo preenchido para esvaziá-lo.</li>
                        <li>Clique no botão para conferir o cadastro.</li>
                    </ol>

                    <p>
                        Nessa tipo de fase você criará uma <b>classe</b> (Ex: Cidade), com seus <b>atributos</b> (Ex: Estado).
                        Os atributos são colocados no <b>construtor</b> e ao cadastrar você tem um <b>objeto</b>.
                    </p>

                    <br />

                    <i>Avançe para aprender sobre Conceitos de Orientação a Objetos.</i>
                </>
            ),
        },
        {
            title: "Conceito: Classes",
            content: (
                <>
                    <p>
                        Uma <b>classe</b> é um molde utilizado para criar objetos.
                        Ela define quais características e comportamentos esses
                        objetos poderão ter.
                    </p>
                    <p>
                        <b>Exemplo:</b> no Zoológico COO, podemos criar uma classe
                        chamada <b>Animal</b>, que define características comuns
                        aos animais, como nome, idade e espécie.
                    </p>
                    <pre>
                        {`class Animal {
    nome: string;
    idade: number;
}`}
                    </pre>
                </>
            ),
        },
        {
            title: "Conceito: Objetos",
            content: (
                <>
                    <p>
                        Um <b>objeto</b> é uma instância de uma classe, ou seja,
                        é algo criado a partir do molde definido pela classe.
                        Cada objeto possui seus próprios valores.
                    </p>
                    <p>
                        <b>Exemplo:</b> a partir da classe Animal, podemos criar
                        dois objetos diferentes: Simba e Mel.
                    </p>
                    <pre>
                        {
                            `const simba = new Animal(); 
const mel = new Animal();`}
                    </pre>
                    <p>
                        Os dois são objetos da classe Animal, mas representam
                        animais diferentes.
                    </p>
                </>
            ),
        },
        {
            title: "Conceito: Atributos",
            content: (
                <>
                    <p>
                        <b>Atributos</b> são as características ou informações
                        armazenadas em um objeto. Cada objeto pode possuir
                        valores diferentes para os mesmos atributos.
                    </p>
                    <p>
                        <b>Exemplo:</b> Simba e Mel podem ter nomes e idades
                        diferentes, mesmo pertencendo à mesma classe.
                    </p>
                    <pre>
                        {`simba.nome = "Simba";
simba.idade = 5;

mel.nome = "Mel";
mel.idade = 3;`}
                    </pre>
                    <p>
                        Nesse exemplo, <b>nome</b> e <b>idade</b> são atributos,
                        enquanto os valores armazenados pertencem a cada objeto.
                    </p>
                </>
            ),
        },
        {
            title: "Conceito: Construtor",
            content: (
                <>
                    <p>
                        O <b>construtor</b> é um método especial executado
                        automaticamente ao criar um objeto. Ele inicializa
                        seus atributos.
                    </p>

                    <p><b>Exemplo:</b></p>

                    <pre>
                        {`class Animal {
    nome: string;
    idade: number;

    constructor(nome: string, idade: number) {
        this.nome = nome;
        this.idade = idade;
    }
}
const simba = new Animal("Simba", 5);`}
                    </pre>

                    <p>
                        Nesse exemplo, o construtor define o nome e a idade
                        do animal no momento de sua criação.
                    </p>
                </>
            ),
        },
    ],
    "analyse-object": [
        {
            title: "Como jogar: Analisando Objetos",
            content: (
                <>
                    <ol>
                        <li>Leia os requisitos apresentados na fase.</li>
                        <li>Analise os atributos de cada objeto.</li>
                        <li>Selecione os objetos que atendem aos requisitos.</li>
                        <li>Confirme sua escolha para avançar.</li>
                    </ol>

                    <p>
                        Nesta fase, você deverá comparar os <b>atributos</b> de
                        diferentes objetos para identificar quais atendem
                        às condições propostas.
                    </p>

                    <br />

                    <p>
                        Lembre-se: objetos da mesma classe compartilham uma
                        estrutura, mas podem possuir <b>valores e características diferentes</b>.
                    </p>

                    <br />

                    <p>
                        <i>Analise com atenção e escolha os objetos corretos!</i>
                    </p>
                </>
            ),
        },
    ],
    "classify-attributes": [
        {
            title: "Como jogar: Classificando Atributos",
            content: (
                <>
                    <ol>
                        <li>Arraste os valores da central de recursos para os campos correspondentes.</li>
                        <li>Clique em um campo preenchido para remover seu valor.</li>
                        <li>Clique no botão para validar sua classificação.</li>
                    </ol>

                    <p>
                        Nesta fase, você aprenderá que cada <b>atributo possui um tipo de dado</b>,
                        como texto, número ou valor lógico (verdadeiro ou falso).
                    </p>

                    <br />

                    <p>
                        Os tipos de dados ajudam a organizar e validar as informações,
                        evitando, por exemplo, que um atributo numérico receba um texto.
                    </p>

                    <br />

                    <i>Avance para continuar aprendendo sobre Orientação a Objetos.</i>
                </>
            ),
        },
        {
            title: "Conceito: Tipos de Dados",
            content: (
                <>
                    <p>
                        Os <b>tipos de dados</b> definem quais valores um atributo pode armazenar.
                        Nesta fase, você encontrará quatro tipos:
                    </p>

                    <ul>
                        <li>
                            <b>String:</b> armazena textos.
                            <pre>{`nome = "Simba"`}</pre>
                        </li>
                        <li>
                            <b>int:</b> armazena números inteiros.
                            <pre>{`idade = 5`}</pre>
                        </li>
                        <li>
                            <b>double:</b> armazena números com casas decimais. <pre>{`peso = 125.5`}</pre>
                        </li>
                        <li>
                            <b>boolean:</b> armazena valores verdadeiros ou falsos.
                            <pre>{`estaAtivo = true`}</pre>
                        </li>
                    </ul>
                </>
            ),
        },
    ],
    "sequence-methods": [
        {
            title: "Como jogar: Organizando Métodos",
            content: (
                <>
                    <ol>
                        <li>Arraste os métodos para os campos na ordem desejada.</li>
                        <li>Use o botão <b>DESFAZER</b> para remover uma ação.</li>
                        <li>Após organizar a sequência, clique em <b>EXECUTAR</b>.</li>
                        <li>Acompanhe o resultado no terminal.</li>
                        <li>Se a sequência estiver incorreta, reorganize as ações.</li>
                    </ol>

                    <p>
                        Nesta fase, você conhecerá os <b>métodos</b>, que representam as ações que um objeto pode executar.
                        Por exemplo, um animal pode realizar ações como:

                    </p>

                    <pre>{`andar();
pular();
correr();`}</pre>

                    <p>
                        <b>CUIDADO: </b>A ordem dos métodos pode alterar o resultado da execução!
                    </p>
                </>
            ),
        }
    ],
    "order-methods": [
        {
            title: "Como jogar: Organizando Pedidos",
            content: (
                <>
                    <ol>
                        <li>Observe o estado atual do pedido.</li>
                        <li>Selecione o método adequado para executar a ação.</li>
                    </ol>

                    <p>
                        Nesta fase, você aprenderá que os <b>métodos podem modificar
                            os atributos de um objeto</b>.
                    </p>

                    <br />

                    <p>
                        Por exemplo, um método pode alterar o estado de um pedido
                        de <b>pendente</b> para <b>finalizado</b> ou o método <b>acelerar</b> pode alterar a <b>velocidade de um carro</b>.
                    </p>

                    <br />

                    <i> Escolha o método correto de acordo com a situação do pedido!</i>
                </>
            ),
        }
    ],
    "order-queue": [
        {
            title: "Como jogar: Fila de Pedidos",
            content: (
                <>
                    <ol>
                        <li>Observe o estado atual de cada pedido.</li>
                        <li>Selecione o método adequado para cada situação.</li>
                    </ol>

                    <p>
                        Nesta fase, você verá que o <b>mesmo método pode gerar
                            resultados diferentes</b>, dependendo do estado atual
                        do objeto.
                    </p>

                    <br />

                    <i>
                        Analise cada pedido e escolha a ação mais adequada!
                    </i>
                </>
            ),
        }
    ],
    "custom-order": [
        {
            title: "Como jogar: Anotando Pedidos",
            content: (
                <>
                    <ol>
                        <li>Leia o pedido de cada cliente.</li>
                        <li>Na <b>CENTRAL DE RECURSOS</b>, selecione o produto ou adicional desejado.</li>
                        <li>Informe a quantidade que deseja adicionar.</li>
                        <li>Clique em um produto para removê-lo junto com seu adicional.</li>
                        <li>Ao terminar, clique em <b>FINALIZAR PEDIDO</b>.</li>
                    </ol>

                    <i>Avançe para aprender sobre Conceitos de Orientação a Objetos.</i>

                </>
            ),
        },
        {
            title: "Conceito: Parâmetros",
            content: (
                <>
                    <p>
                        Nesta fase, você aprenderá sobre <b>parâmetros</b>.
                        Eles são valores informados a um método para que ele
                        execute uma ação específica.

                        <br />

                        <b>Exemplo:</b>
                    </p>

                    <pre>{`andar(10);`}</pre>

                    <p>
                        Nesse caso, o método <b>andar()</b> recebe o valor
                        <b> 10</b> como parâmetro, indicando que a pessoa
                        deverá dar 10 passos.
                    </p>
                </>
            ),
        },
        {
            title: "Conceito: Múltiplos Parâmetros",
            content: (
                <>
                    <p>
                        Um método pode receber <b>mais de um parâmetro</b>,
                        permitindo informar diferentes valores para executar uma ação.
                    </p>

                    <p><b>Exemplo:</b></p>

                    <pre>{`andar(10, "direita");`}</pre>

                    <p>
                        Nesse exemplo, o método recebe dois parâmetros:
                    </p>

                    <ul>
                        <li><b>quantidadePassos:</b> indica quantos passos dar.</li>
                        <li><b>direcao:</b> indica para qual direção andar.</li>
                    </ul>

                    <p>
                        Assim, podemos controlar melhor a ação executada pelo método!
                    </p>
                </>
            ),
        },
    ],
    "inspect-vehicle": [
        {
            title: "Como jogar: Inspeção Veicular",
            content: (
                <>
                    <ol>
                        <li>Leia a ficha de Inspeção de cada <b>veículo</b> com atenção.</li>
                        <li>Conforme as regras faça sua analise e indique se o veículo pode ou nao ser liberado.</li>
                        <li>Regras:
                            <ol>
                                <li><b>Obrigatórias: </b> são necessárias para o veículo ser liberado.</li>
                                <li><b>Toleráveis: </b> não são necessárias para o veículo ser liberado.</li>
                                <li><b>Impedimentos: </b> o veículo não pode ser liberado se tiver algum.</li>
                            </ol>
                        </li>
                    </ol>

                    <i>Avançe para aprender sobre Conceitos de Orientação a Objetos.</i>

                </>
            ),
        },
        {
            title: "Conceito: Retorno de Métodos",
            content: (
                <>
                    <p>
                        Um método pode <b>retornar um valor</b> após executar
                        uma ação. Esse valor representa o resultado da operação.
                    </p>

                    <p><b>Exemplo:</b></p>

                    <pre>{`verificarVeiculo();`}</pre>

                    <p>
                        Nesse caso, o método pode retornar:
                    </p>

                    <ul>
                        <li><b>true:</b> veículo aprovado.</li>
                        <li><b>false:</b> veículo reprovado.</li>
                    </ul>

                    <p>
                        O retorno permite que o programa utilize o resultado
                        para tomar decisões, como liberar ou não um veículo.
                    </p>
                </>
            ),
        },
    ],
    "repair-vehicle": [
        {
            title: "Como jogar: Fazendo Reparos",
            content: (
                <>
                    <ol>
                        <li>Leia a ficha de Concerto do <b>veículo</b> com atenção.</li>
                        <li>Verifique os metódos que estão marcados com <b>SIM</b>, essses são os que você deve concertar.</li>
                        <li>Arraste um método da <b>CENTRAL DE RECURSOS</b> para o campo destinado.</li>
                        <li>Clique no botão <b>REALIZAR CONCERTO</b> e repita o processo até todos concertos serem feitos.</li>
                    </ol>

                    <i>Avançe para aprender sobre Conceitos de Orientação a Objetos.</i>

                </>
            ),
        },
        {
            title: "Revisão: Metódos",
            content: (
                <>
                    <p>
                        Lembre que: que os <b>métodos podem modificar
                            os atributos de um objeto</b>.
                    </p>

                    <br />

                    <p>
                        Por exemplo, um método pode alterar o estado de um pedido
                        de <b>pendente</b> para <b>finalizado</b> ou o método <b>acelerar</b> pode alterar a <b>velocidade de um carro</b>.
                    </p>

                    <br />

                    <i> Escolha o método correto de acordo com os concertos necessários!</i>
                </>
            ),
        }
    ],
    "calculate-payment": [
        {
            title: "Como jogar: Calculando Pagamento",
            content: (
                <>
                    <ol>
                        <li>Leia a ficha de Concerto do <b>veículo</b> com atenção.</li>
                        <li>Faça o cálculo de quanto o cliente gastou na oficina baseado na <b>tabela de preços.</b></li>
                        <li>Na <b>CENTRAL DE RECURSOS</b>, informe o valor total dos concertos.</li>
                        <li>Clique no botão <b>REALIZAR PAGAMENTO</b> para finalizar.</li>
                    </ol>

                    <i>Avançe para aprender sobre Conceitos de Orientação a Objetos.</i>

                </>
            ),
        },
        {
            title: "Revisão: Parâmetros",
            content: (
                <>
                    <p>
                        <b>Lembre que:</b> métodos possuem <b>parâmetros</b>.
                        Eles são valores informados a um método para que ele
                        execute uma ação específica.

                        <br />

                        <b>Exemplo:</b>
                    </p>

                    <pre>{`andar(10);`}</pre>

                    <p>
                        Nesse caso, o método <b>andar()</b> recebe o valor
                        <b> 10</b> como parâmetro, indicando que a pessoa
                        deverá dar 10 passos.
                    </p>
                </>
            ),
        },
        {
            title: "Revisão: Múltiplos Parâmetros",
            content: (
                <>
                    <p>
                        <b>Lembre que:</b> um método pode receber <b>mais de um parâmetro</b>,
                        permitindo informar diferentes valores para executar uma ação.
                    </p>

                    <p><b>Exemplo:</b></p>

                    <pre>{`andar(10, "direita");`}</pre>

                    <p>
                        Nesse exemplo, o método recebe dois parâmetros:
                    </p>

                    <ul>
                        <li><b>quantidadePassos:</b> indica quantos passos dar.</li>
                        <li><b>direcao:</b> indica para qual direção andar.</li>
                    </ul>

                    <p>
                        Assim, podemos controlar melhor a ação executada pelo método!
                    </p>
                </>
            ),
        },
    ],
    "find-unprotected": [
        {
            title: "Como jogar: Encontrar Atributo Desprotegido",
            content: (
                <>
                    <ol>
                        <li>Na <b>CENTRAL DE RECURSOS</b> seleciona o atributo.</li>
                        <li>
                            No campo <b>NOVO VALOR</b> informe uma valor para o atributo selecionado.
                            <br /><i>(O valor informado deve corresponder ao tipo do atributo)</i>
                        </li>
                        <li>Clique no botão <b>TENTAR ALTERAÇÃO</b> para alterar o atributo com o valor indicado.</li>
                        <li>Repita o processo com todos os atributos até encontrar o atributo desprotegido</li>

                    </ol>

                    <i>Avançe para aprender sobre Conceitos de Orientação a Objetos.</i>

                </>
            ),
        },
        {
            title: "Conceito: Encapsulamento",
            content: (
                <>
                    <p>
                        O <b>encapsulamento</b> é um princípio da Orientação a Objetos
                        que <b>protege os dados de um objeto</b>, controlando como eles
                        podem ser acessados e modificados.
                    </p>

                    <p>
                        Dessa forma, evitamos que qualquer parte do programa
                        altere os atributos livremente.
                    </p>

                    <pre>{`class Pessoa {
    private idade: number = 20;
}`}</pre>

                    <p>
                        Nesse exemplo, o atributo <b>idade</b> é <b>privado</b> e não
                        pode ser acessado diretamente de fora da classe.
                    </p>
                </>
            ),
        },
        {
            title: "Conceito: Modificadores de Acesso",
            content: (
                <>
                    <p>
                        Os <b>modificadores de acesso</b> controlam onde os atributos
                        e métodos podem ser utilizados.
                    </p>

                    <p>
                        <br />
                        <b>Public:</b> permite acesso de qualquer lugar.
                        <br />
                        <b>Protected:</b> permite acesso pela classe e suas classes filhas.
                        <br />
                        <b>Private:</b> permite acesso somente dentro da própria classe.
                        <br />
                        <b>Default:</b> segue a regra padrão da linguagem.
                    </p>

                    <p>
                        <br />
                        <b>Exemplo:</b>
                    </p>

                    <pre>{`public nome;
protected idade;
private senha;
nome; // sem modificador`}</pre>

                    <p>
                        Esses modificadores ajudam a proteger os dados e controlar
                        como eles são acessados.
                    </p>
                </>
            ),
        },
    ],
    "diagnose-cause": [
        {
            title: "Como jogar: Respondendo Questionário",
            content: (
                <>
                    <ol>
                        <li>Leia a pergunta e as afirmações sobre o conteúdo abordado.</li>
                        <li>
                            Na <b>CENTRAL DE RECURSOS</b> selecione o número correspondente a afirmação que você acha
                            que responde a pergunta
                        </li>
                    </ol>
                </>
            ),
        },
    ],
    "sort-conveyor": [
        {
            title: "Como jogar: Classificando Atributos",
            content: (
                <>
                    <ol>
                        <li>Observe o atributo apresentado na parte superior.</li>
                        <li>Leia as <b>INSTRUÇÕES</b> e identifique se ele deve ser <b>público</b> ou <b>privado</b>.</li>
                        <li>
                            Na <b>CENTRAL DE RECURSOS</b>, selecione o cadeado
                            aberto para público ou fechado para privado.
                        </li>
                        <li>Clique em <b>PROTEGER</b> para classificar o atributo.</li>
                        <li>Repita o processo com os demais atributos.</li>
                    </ol>

                    <i>Classifique corretamente os atributos e proteja os dados!</i>
                </>
            ),
        },
        {
            title: "Conceito: Encapsulamento",
            content: (
                <>
                    <p>
                        O <b>encapsulamento</b> é um princípio da Orientação a Objetos
                        que <b>protege os dados de um objeto</b>, controlando como eles
                        podem ser acessados e modificados.
                    </p>

                    <p>
                        Dessa forma, evitamos que qualquer parte do programa
                        altere os atributos livremente.
                    </p>

                    <pre>{`class Pessoa {
    private idade: number = 20;
}`}</pre>

                    <p>
                        Nesse exemplo, o atributo <b>idade</b> é <b>privado</b> e não
                        pode ser acessado diretamente de fora da classe.
                    </p>
                </>
            ),
        },
        {
            title: "Conceito: Modificadores de Acesso",
            content: (
                <>
                    <p>
                        Os <b>modificadores de acesso</b> controlam onde os atributos
                        e métodos podem ser utilizados.
                    </p>

                    <p>
                        <br />
                        <b>Public:</b> permite acesso de qualquer lugar.
                        <br />
                        <b>Protected:</b> permite acesso pela classe e suas classes filhas.
                        <br />
                        <b>Private:</b> permite acesso somente dentro da própria classe.
                        <br />
                        <b>Default:</b> segue a regra padrão da linguagem.
                    </p>

                    <p>
                        <br />
                        <b>Exemplo:</b>
                    </p>

                    <pre>{`public nome;
protected idade;
private senha;
nome; // sem modificador`}</pre>

                    <p>
                        Esses modificadores ajudam a proteger os dados e controlar
                        como eles são acessados.
                    </p>
                </>
            ),
        },
    ],
    "product-requests": [
        {
            title: "Como jogar: Consultando e Alterando",
            content: (
                <>
                    <ol>
                        <li>Leia e interprete a solicitação feita pelo personagem.</li>

                        <li>
                            Se for uma solicitação de <b>consulta (GET):</b>
                            <ol>
                                <li>Na <b>CENTRAL DE RECURSOS</b>, selecione o método de consulta.</li>
                                <li>Na tabela, localize o <b>objeto</b> e o <b>atributo</b> solicitados.</li>
                                <li>Digite o valor encontrado no campo abaixo e clique em <b>CONFIRMAR</b>.</li>
                            </ol>
                        </li>

                        <li>
                            Se for uma solicitação de <b>alteração (SET):</b>
                            <ol>
                                <li>Na <b>CENTRAL DE RECURSOS</b>, selecione o método de alteração.</li>
                                <li>Na tabela, localize o <b>objeto</b> e o <b>atributo</b> que deseja modificar.</li>
                                <li>No primeiro campo, informe o <b>nome do objeto</b>.</li>
                                <li>No segundo campo, informe o <b>atributo</b> que será alterado.</li>
                                <li>No terceiro campo, informe o novo <b>valor</b> e clique em <b>CONFIRMAR</b>.</li>
                            </ol>
                        </li>
                    </ol>
                </>
            ),
        },
        {
            title: "Conceito: Getters e Setters",
            content: (
                <>
                    <p>
                        Para acessar ou modificar atributos protegidos,
                        podemos utilizar métodos especiais chamados
                        <b> getters</b> e <b>setters</b>.
                    </p>

                    <ul>
                        <li><b>Getter:</b> permite consultar o valor de um atributo.</li>
                        <li><b>Setter:</b> permite modificar o valor de um atributo com validações.</li>
                    </ul>

                    <i>Exemplo a seguir.</i>
                </>
            ),
        },
        {
            title: "Conceito: Getters e Setters",
            content: (
                <>
                    <p><b>Exemplo:</b></p>

                    <pre>{`class Pessoa {
    private idade = 20;

    getIdade() {
        return this.idade;
    }

    setIdade(novaIdade: number) {
        if (novaIdade > 0) {
            this.idade = novaIdade;
        }
    }
}`}</pre>

                    <p>
                        Assim, o atributo só pode ser alterado seguindo
                        as regras definidas pela classe.
                    </p>
                </>
            ),
        },
    ],
    "accuse-suspect": [
        {
            title: "Como jogar: Acusando Suspeito",
            content: (
                <>
                    <ol>
                        <li>Leia as informações disponíveis e selecione um suspeito.</li>
                        <li>Ao selecionar aperte o botão <b>APONTAR SUSPEITO</b> na <b>CENTRAL DE RECURSOS</b></li>
                    </ol>
                </>
            ),
        },
    ],
    "find-repetitions": [
        {
            title: "Como jogar: Encontrando Repetições",
            content: (
                <>
                    <ol>
                        <li>Observe os atributos das classes disponíveis e <b>encontre os repetidos</b> entre elas.</li>
                        <li>Na <b>CENTRAL DE RECURSOS</b> digite o nome dos atributos repetidos.</li>
                        <li>Clique no botão <b>REGISTRAR</b> para adicionar um atributo ao relatório.</li>
                        <li>Clique no atributo enviado para removê-lo do relatório.</li>
                        <li>Clique no botão <b>ENVIAR</b> para finalizar sua análise.</li>
                    </ol>
                </>
            ),
        },
        {
            title: "Conceito: Herança",
            content: (
                <>
                    <p>
                        A <b>herança</b> permite que uma classe aproveite atributos
                        e métodos de outra classe, evitando repetições.
                    </p>

                    <br />

                    <p>
                        Por exemplo, Policial, Bombeiro e Médico possuem <b>atributos em comum</b>,
                        como nome, idade, peso e telefone.
                    </p>

                    <br />


                    <p>
                        Podemos reunir esses atributos em uma classe chamada
                        <b> Funcionário</b>, que será herdada pelas outras classes.
                    </p>
                </>
            ),
        },
    ],
    "build-base-class": [
        {
            title: "Como jogar: Montando uma Classe Pai",
            content: (
                <>
                    <ol>
                        <li>Utilize os atributos identificados na fase anterior para definir os atributos e seus respectivos tipos.</li>
                        <li>Na <b>CENTRAL DE RECURSOS</b>, arraste os valores para os campos correspondentes.</li>
                        <li>Após preencher todos os campos, clique em <b>CRIAR CLASSE</b>.</li>
                    </ol>

                    <i>Reúna as características em comum e crie a classe que será compartilhada pelas demais!</i>
                </>
            ),
        },
        {
            title: "Conceito: Classe Pai e Classe Filha",
            content: (
                <>
                    <p>
                        Na herança, temos dois tipos de classes:
                    </p>

                    <p>
                        <b>Classe Pai:</b> contém os atributos e métodos
                        compartilhados com outras classes.
                    </p>

                    <p>
                        <b>Classe Filha:</b> herda as características da classe
                        pai e pode possuir seus próprios atributos e métodos.
                    </p>

                    <p><b>Exemplo:</b></p>

                    <pre>{`class Funcionario {
    nome;
    idade;
    peso;
    telefone;
}

class Policial extends Pessoa {
    patente;
}`}</pre>
                </>
            ),
        },
    ],
    "build-subclasses": [
        {
            title: "Como jogar: Montando Classes Filhas",
            content: (
                <>
                    <ol>
                        <li>Na <b>CENTRAL DE RECURSOS</b>, selecione os atributos específicos de cada classe filha.</li>
                        <li>Organize os atributos nas classes correspondentes.</li>
                        <li>Clique em um atributo selecionado para removê-lo.</li>
                        <li>Após organizar tudo, clique em <b>CRIAR CLASSES</b>.</li>
                    </ol>

                    <i>Lembre-se: as classes filhas herdam os atributos da classe pai e possuem características próprias!</i>
                </>
            ),
        },
        {
            title: "Conceito: Herança",
            content: (
                <>
                    <p>
                        A <b>herança</b> permite que uma classe aproveite atributos
                        e métodos de outra classe, evitando repetições.
                    </p>

                    <br />

                    <p>
                        Por exemplo, Policial, Bombeiro e Médico possuem <b>atributos em comum</b>,
                        como nome, idade, peso e telefone.
                    </p>

                    <br />


                    <p>
                        Podemos reunir esses atributos em uma classe chamada
                        <b> Funcionário</b>, que será herdada pelas outras classes.
                    </p>
                </>
            ),
        },
        {
            title: "Conceito: Classe Pai e Classe Filha",
            content: (
                <>
                    <p>
                        Na herança, temos dois tipos de classes:
                    </p>

                    <p>
                        <b>Classe Pai:</b> contém os atributos e métodos
                        compartilhados com outras classes.
                    </p>

                    <p>
                        <b>Classe Filha:</b> herda as características da classe
                        pai e pode possuir seus próprios atributos e métodos.
                    </p>

                    <p><b>Exemplo:</b></p>

                    <pre>{`class Funcionario {
    nome;
    idade;
    peso;
    telefone;
}

class Policial extends Pessoa {
    patente;
}`}</pre>
                </>
            ),
        },
    ],
    "match-pairs": [
        {
            title: "Como jogar: Relacionando Funções",
            content: (
                <>
                    <ol>
                        <li>Observe as duas colunas apresentadas.</li>
                        <li>A coluna da esquerda contém as <b>funções</b>.</li>
                        <li>A coluna da direita contém os <b>trabalhos</b> realizados pelos funcionários.</li>
                        <li>Leia as instruções na <b>CENTRAL DE RECURSOS</b> para descobrir as correspondências.</li>
                        <li>Relacione cada função ao trabalho correspondente.</li>
                        <li>Clique em uma função já relacionada para desfazer sua ligação.</li>
                    </ol>

                    <i>Descubra como cada funcionário realiza sua função!</i>
                </>
            ),
        },
        {
            title: "Conceito: Herança de Métodos",
            content: (
                <>
                    <p>
                        Além dos atributos, uma classe filha também pode herdar
                        <b> métodos</b> de sua classe pai.
                    </p>

                    <p>
                        No Hotel COO, todos os funcionários herdam o método
                        <b> trabalhar()</b> da classe <b>Funcionario</b>.
                    </p>

                    <pre>{`class Funcionario {
    trabalhar() {
        // realizar trabalho
    }
}

class Recepcionista extends Funcionario {}
class Cozinheiro extends Funcionario {}`}</pre>

                    <p>
                        Assim, as classes filhas recebem o método da classe pai,
                        sem precisar declará-lo novamente.
                    </p>
                </>
            ),
        },
    ],
    "build-hierarchy": [
        {
            title: "Como jogar: Construindo a Hierarquia",
            content: (
                <>
                    <ol>
                        <li>Observe a árvore de herança e os espaços disponíveis.</li>
                        <li>Na <b>CENTRAL DE RECURSOS</b>, selecione as classes disponíveis e coloque-as nas posições corretas.</li>
                        <li>Clique em uma classe já posicionada para removê-la junto com suas classes filhas.</li>
                        <li>Após organizar a árvore, confirme sua resposta.</li>
                    </ol>

                    <i>Organize as classes e construa a hierarquia corretamente!</i>
                </>
            ),
        },
        {
            title: "Conceito: Hierarquia de Classes",
            content: (
                <>
                    <p>
                        Na herança, as classes podem ser organizadas em uma
                        <b> hierarquia</b>, formando relações entre classes
                        pais e filhas.
                    </p>

                    <p>
                        Uma classe pode herdar de outra e também servir como
                        classe pai para uma terceira.
                    </p>

                    <p><b>Exemplo:</b></p>

                    <pre>{`Classe A
    └── Classe B
        └── Classe C`}</pre>

                    <p>
                        Nesse exemplo, <b>A</b> é pai de <b>B</b>, e <b>B</b> é
                        pai de <b>C</b>. Assim, C também herda indiretamente
                        as características de A.
                    </p>
                </>
            ),
        },
    ],
    "match-sounds": [
        {
            title: "Como jogar: Relacionando Características",
            content: (
                <>
                    <ol>
                        <li>Observe os animais apresentados.</li>
                        <li>
                            Na <b>CENTRAL DE RECURSOS</b>, escolha os métodos ou sons disponíveis.
                            <ol>
                                <li>Caso seja um <b>som</b> clique em cima do número para ouvir o som correspondente.</li>
                            </ol>
                        </li>
                        <li>Arraste cada método para o campo correspondente ao animal.</li>
                        <li>Repita o processo para todos os animais.</li>
                        <li>Clique em <b>VALIDAR</b> para conferir suas escolhas.</li>
                    </ol>

                    <i>Descubra qual som pertence a cada animal!</i>
                </>
            ),
        },
        {
            title: "Conceito: Polimorfismo",
            content: (
                <>
                    <p>
                        O <b>polimorfismo</b> permite que diferentes classes utilizem
                        o mesmo método, mas executem ações de maneiras diferentes.
                    </p>

                    <p>
                        No zoológico, todos os animais possuem o método
                        <b> emitirSom()</b>, mas cada um produz um som próprio.
                    </p>

                    <pre>{`Leão → emitirSom() → Rugido
Cachorro → emitirSom() → Latido
Gato → emitirSom() → Miado`}</pre>

                    <p>
                        Assim, o mesmo método apresenta comportamentos diferentes
                        dependendo do animal.
                    </p>
                </>
            ),
        },
        {
            title: "Conceito: Sobrescrita de Métodos",
            content: (
                <>
                    <p>
                        A <b>sobrescrita</b> acontece quando uma classe filha
                        fornece sua própria implementação de um método herdado
                        da classe pai.
                    </p>

                    <p><b>Exemplo:</b></p>

                    <pre>{`class Animal {
    emitirSom() {}
}

class Leao extends Animal {
    emitirSom() {
        return "Rugido";
    }
}`}</pre>

                    <p>
                        Dessa forma, cada animal mantém o mesmo método,
                        mas define seu próprio comportamento.
                    </p>
                </>
            ),
        },
    ],
    "fill-blanks": [
        {
            title: "Como jogar: Preenchendo as Lacunas",
            content: (
                <>
                    <ol>
                        <li>Leia atentamente as informações apresentadas.</li>
                        <li>Observe as lacunas que precisam ser preenchidas.</li>
                        <li>Na <b>CENTRAL DE RECURSOS</b>, escolha os termos disponíveis.</li>
                        <li>Arraste cada termo para a lacuna correspondente.</li>
                        <li>Após preencher todas as lacunas, clique em <b>CONFERIR RESPOSTAS</b>.</li>
                    </ol>

                    <i>Utilize seus conhecimentos para completar corretamente as informações!</i>
                </>
            ),
        },
    ],
    "choose-animal": [
        {
            title: "Como jogar: Escolhendo o Animal",
            content: (
                <>
                    <ol>
                        <li>Leia atentamente as solicitações apresentadas no chat.</li>
                        <li>Identifique qual animal possui as habilidades necessárias para atender cada solicitação.</li>
                        <li>Na <b>CENTRAL DE RECURSOS</b>, selecione o animal adequado e arraste-o para o campo disponível.</li>
                        <li>Clique em <b>INFORMAR ANIMAL</b> para confirmar sua escolha.</li>
                        <li>Repita o processo para atender às demais solicitações.</li>
                    </ol>

                    <i>Escolha os animais de acordo com suas habilidades!</i>
                </>
            ),
        },
        {
            title: "Conceito: Herança e Polimorfismo",
            content: (
                <>
                    <p>
                        Na programação orientada a objetos, a classe <b>Animal</b>  pode
                        ser uma classe pai. Classes específicas, como
                        <b> Leao</b>, <b>Macaco</b> e <b>Golfinho</b>, herdam
                        suas características e métodos.
                    </p>

                    <br />

                    <p>
                        Com o <b>polimorfismo</b>, cada classe filha pode
                        implementar um método herdado de maneira diferente,
                        de acordo com suas habilidades.
                    </p>
                </>
            ),
        },
        {
            title: "Conceito: Herança e Polimorfismo",
            content: (
                <>
                    <p><b>Exemplo:</b></p>

                    <pre>{`class Animal {
    realizarHabilidade() {}
}

class Golfinho extends Animal {
    realizarHabilidade() {
        return "Nadar";
    }
}`}</pre>

                    <p>
                        Assim, todos possuem o método
                        <b> realizarHabilidade()</b>, mas cada animal executa
                        uma ação diferente. Isso é o <b>polimorfismo</b>!
                    </p>
                </>
            ),
        },
    ],
    "feed-animal": [
        {
            title: "Como jogar: Alimentando os Animais",
            content: (
                <>
                    <ol>
                        <li>Clique em <b>INSTRUÇÕES</b> para descobrir quais alimentos cada animal consome.</li>
                        <li>Leia atentamente as informações e identifique os alimentos necessários.</li>
                        <li>Na <b>CENTRAL DE RECURSOS</b>, selecione os alimentos e arraste-os para os parâmetros do método <b>alimentar()</b>.</li>
                        <li>Após preencher os parâmetros, clique em <b>ALIMENTAR</b>.</li>
                        <li>Repita o processo com os demais animais.</li>
                    </ol>

                    <i>Observe que alguns animais compartilham alimentos, enquanto outros precisam de combinações diferentes!</i>
                </>
            ),
        },
        {
            title: "Conceito: Polimorfismo e Sobrescrita de Métodos",
            content: (
                <>
                    <p>
                        A classe <b>Animal</b> pode definir um método chamado
                        <b> alimentar()</b>, que é herdado por todos os animais.
                    </p>

                    <br />

                    <p>
                        Cada classe específica, como <b>Elefante</b>, <b>Leao</b>
                        e <b>Macaco</b>, pode sobrescrever esse método,
                        definindo sua própria maneira de se alimentar.
                    </p>
                </>
            ),
        },
        {
            title: "Conceito: Polimorfismo e Sobrescrita de Métodos",
            content: (
                <>
                    <p><b>Exemplo:</b></p>

                    <pre>{`class Animal {
    alimentar(a, b, c) {}
}
class Elefante extends Animal {
    alimentar(a, b, c) {
    }
}
class Leao extends Animal {
    alimentar(a) {
    }
}`}</pre>

                    <p>
                        Embora todos utilizem o mesmo método
                        <b> alimentar()</b>, cada animal se alimenta de um jeito
                        Isso é o <b>polimorfismo</b>!
                    </p>
                </>
            ),
        },
    ],
    "sort-animals": [
        {
            title: "Como jogar: Organizando os Animais",
            content: (
                <>
                    <ol>
                        <li>Observe os animais disponíveis na <b>CENTRAL DE RECURSOS</b>.</li>
                        <li>Identifique a qual grupo cada animal pertence: <b>MAMÍFEROS</b>, <b>RÉPTEIS</b> ou <b>AVES</b>.</li>
                        <li>Arraste cada animal para o grupo correspondente.</li>
                        <li>Para retirar um animal de um grupo, clique nele. Ele retornará à lista de animais.</li>
                        <li>Se necessário, você pode mover os animais entre os grupos.</li>
                        <li>Após organizar todos os animais, clique em <b>CONFIRMAR ORGANIZAÇÃO</b>.</li>
                    </ol>

                    <i>Identifique corretamente cada animal e organize-os em seus respectivos grupos!</i>
                </>
            ),
        },
        {
            title: "Conceito: Casting (Conversão de Tipos)",
            content: (
                <>
                    <p>
                        Na programação orientada a objetos, o <b>casting</b> permite
                        tratar uma referência de um tipo como outro tipo compatível.
                    </p>

                    <br />

                    <p>
                        Por exemplo, um objeto pode ser tratado inicialmente como
                        <b> Animal</b>, sua classe pai, e depois como uma classe mais
                        específica, como <b>Mamifero</b>.
                    </p>
                </>
            ),
        },
        {
            title: "Conceito: Casting (Conversão de Tipos)",
            content: (
                <>
                    <p><b>Exemplo:</b></p>

                    <pre>{`class Animal {}

class Mamifero extends Animal {}

class Leao extends Mamifero {}

let animal: Animal = new Leao();

// Downcasting
let leao = animal as Leao;`}</pre>

                    <p>
                        O <b>downcasting</b> ocorre quando uma referência da classe
                        pai é convertida para um tipo mais específico de uma classe
                        filha. É importante verificar se o objeto realmente pertence
                        àquele tipo antes de realizar a conversão.
                    </p>
                </>
            ),
        },
    ]
};

export const DEFAULT_HELP: HelpPage[] = [
    {
        title: "Ajuda",
        content: <p>Nenhuma orientação específica disponível.</p>
    },
];