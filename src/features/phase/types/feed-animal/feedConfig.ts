export const FOODS = ["Carne", "Frutas", "Peixes", "Vegetais", "Sementes", "Insetos", "Folhas"];

export const HINT =
    "**Fique atento:** alguns animais compartilham a mesma alimentação, já outros precisam de combinações diferentes!";

export const LABELS = {
    method: "alimentar",
    feed: "Alimentar",
    rules: "Instruções",
};

export const MESSAGES = {
    incomplete: "Ainda há parâmetros em branco. Preencha todos os campos do método.",
    duplicate: "Esse alimento já está no método. Cada parâmetro é um alimento diferente.",
    wrong: "Essa alimentação não serve para esse animal, marcada em vermelho. Consulte as instruções.",
};

export const RULES = {
    title: "Instruções dos animais",
    intro: "Nosso biólogo passou as seguintes instruções para alimentação dos bichos.",
    signature: "alimentar(parâmetro1) / alimentar(parâmetro1, parâmetro2)",
    items: [
        "Este grande felino precisa de uma alimentação rica em proteínas. Sua dieta é composta principalmente por carne.",
        "Este primata aprecia uma alimentação variada, composta por frutas e alguns insetos.",
        "Este gigante herbívoro se alimenta de vegetais, folhas e frutas.",
        "Esta ave possui uma dieta baseada em sementes e frutas.",
        "Este réptil é carnívoro e se alimenta de pequenos animais, como roedores.",
        "Este mamífero aquático se alimenta principalmente de peixes.",
        "Este grande herbívoro se alimenta de vegetais e folhas.",
    ],
};