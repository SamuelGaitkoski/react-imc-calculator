// aqui teremos as categorias de imc, que é um array de objetos.
// imc do objeto com title Magreza vai de 0 até 18.5 por exemplo, assim funcionam os outros imc's também.
// como estamos trabalhando com typescript, as propriedades do objeto precisam estar com seus types, então vamos criar um tipo Level que vai ter os types das propriedades dos objetos.
// icon vai ser 'down' ou (|) 'up.
// imc vai ser um array de number (number[])
export type Level = {
    title: string;
    color: string;
    icon: 'down' | 'up';
    imc: number[];
    yourImc?: number;
}

// levels vai ser um array de Level
export const levels: Level[] = [
    { title: 'Magreza', color: '#96A3AB', icon: 'down', imc: [0, 18.5] },
    { title: 'Normal', color: '#0EAD69', icon: 'up', imc: [18.6, 24.9] },
    { title: 'Sobrepeso', color: '#E2B036', icon: 'down', imc: [25, 30] },
    { title: 'Obesidade', color: '#C3423F', icon: 'down', imc: [30.1, 99] }
];

// também teremos uma função para calcular o imc, que vai receber a altura e peso, e retornar o level da pessoa, junto com o imc dessa pessoa.
// CalculateImc tem 2 tipos de retorno, Level ou null.
export const calculateImc = (height: number, weight: number) => {
    // fórmula para calcular o imc é bem simples, peso dividido pela raiz da altura
    const imc = weight / (height * height);

    // vamos fazer um loop nos levels para vermos qual level que se encaixa no imc que temos.
    // i nesse caso é cada level (cada objeto) em levels
    for (let i in levels) {
        // vendo se imc está entre os valores de imc de algum dos levels
        if (imc >= levels[i].imc[0] && imc < levels[i].imc[1]) {
            // dai retornamos o próprio level, e retornamos o imc da pessoa na propriedade opcional yourImc de levels, ocpional para que possamos definí-la aqui.
            // toFixed transforma para string após definir só quantas casas decimais queremos, então transformamos para float novamente o imc, pois é o que definimos que o yourImc é, um dado do tipo float.
            // para não alterar o próprio yourImc dentro de levels, vamos criar uma cópia do levels, e alterar e retornar essa cópia.
            // fazer uma cópia é o objeto, então fazer uma cópia do objeto levels com o ..., dai alteramos só essa cópia, alterando o objeto percorrido no caso. Dai ele não alterar nada em levels, vai alterar só na copia, e retornar a copia, e quando nos livramos dela acabou. Essa copia também é level da mesma forma.
            // dessa forma quando calculamos um imc e voltamos, como ele não altera o yourImc do objeto do level calculado, o level não volta com o yourImc calculado.
            let levelCopy: Level = {...levels[i]};

            levelCopy.yourImc = parseFloat(imc.toFixed(2));
            // dai aqui já retornamos o yourImc com o valor do imc da pessoa.
            return levelCopy;
        }
    }
    // se ele passou pelo loop e não se encaixou em nenhum intervalo de imc, retornamos null, quer dizer que o imc ou não foi calculado, ou não tem.
    return null;
}