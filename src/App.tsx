
import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
// importamos aqui o levels, array que tem os níveis, e a função calculateImc, que vamos usar aqui para calcular o imc da pessoa.
import { levels, calculateImc, Level } from './helpers/imc';
// fazendo isso, ele vai na pasta GridItem, dai pega o index.tsx, o index.tsx pega o componente GridItem, exporta ele, tudo certo!!!
import { GridItem } from './components/GridItem';
// importando a seta leftArrow
import leftArrowImage from './assets/leftarrow.png';

// Criando o projeto
// Vamos fazer um projeto que faz o calculo do imc baseado nos dados passados de altura e peso passados.

// Criando Estrutura Base
// crindo a pasta assets em stc para botar as imagens que vamos usar.
// Vamos trabalhar a estilização nesse projeto com o css modules.
// Podemos excluir o App.css que vem com o projeto criado por CRA.
// Então criamos na pasta src o arquivo App.module.css, que vai ter css normal, dai importamos o arquivo aqui em cima no App.tsx: import styles from './App.module.css';
// então botamos uma classe normal para um componente no App.module.css, mas aqui no className do componente, botamos className={styles.NomeDaClasse}
// importamos nossa imagem do assets:
// import poweredImage from './assets/powered.png'; dai usamos nossa imagem no src da tag img.
// botamos 150 de largura na imagem botando: width={150}

// Criando o leftside 1
// parte que mostra as informações, os campos, o botão de calcular.
// no campo vamos ter um type, placeholder, value, onChange, mantendo as informações padrão do campo na parte de cima, e as funcionalidades, como value, onChange, abaixo, que são as props do componente.
// como precisamos salvar o value e o onChange em alguma state, então vamos criar uma state, tanto o campo de altura (height), campo de altura (heightField).
// dando ctrl + space, o vs code puxa o que ele sabe sobre o campo, puxa o auto complete dele também, para escolhermos.
// como estamos usando typescript, podemos tipar o state, que nesse caso sempre vai ser um number, dau botamos <number> na direita do useState, dai o state só permite receber dados do tipo number.
// vamos criar o state para o peso também, o weightField.
// para que o heightField = 0, que é o valor inicial da state, não apareça assim no campo, já que a state seria setada no value do campo, botamos uma condicional, para verificar se o heightField é maior que 0, se sim botamos o heightField mesmo, caso contrário botamos uma string vazia (''). value={heightField > 0 ? heightField : ''}
// no onChange, vamos pegar o evento, e vamos pegar o setHeightField, mas convertemos o que é passado no campo para numero, pois o que é escrito no campo, o value, sempre é uma string, então usamos o parseFloat, pois a altura pode ser decimal, dai como vamos converter a string, pegamos a string do e.target.value, que é o valor digitado no campo.
// fazemos o mesmo que com a altura (height) para o peso (weight).
// Agora podemos ir digitando nos campos e a state já vai sendo atualizada na medida que os campos são editados.
// quando o botão de calcular for clicado, vai executar a função handleCalculateButton.

// Criando o leftside 2
// estilização de todo o leftSide

// Calculando o IMC
// criação da parte lógica do nosso sistema, para saber o que vai aparecer.
// criação da pasta helpers (ajudadores), no src, e nele vamos ter o helper imc.ts, onde teremos tudo relacionado ao imc, as categorias do imc

// Criando o Rightside
// como vamos exibir vários levels e quando calcular o imc só uma, a melhor opção é usar um grid.
// como é um grid que vai se repetir varias vezes, com propriedades diferentes, cor, etc, isso pede um componente separado, então vamos fazer um map no levels, para retornar todos os levels que temos em uma div, ou outro componente.
// por meio da pasta components/GridItem, criamos o componente e o estilo de cada caixinha que vai exibir os levels, criamos o componente e o estilo delas.

// Criando o GridItem
// agora vamos montar o nosso GridItem, precisamos montar o layout dele e usar as informações que precisamos nele


const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  // essa state vai ser do tipo Level, ou vai ser nula, e vai começar como nula, pois enquanto não for nada calculado para ser exibido, a state fica como null, state que vai armazenar nosso level (item) para exibir
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    // se eu tenho valores para as states heightField e weightField, vai fazer o cálculo aqui
    if(heightField && weightField) {
      // podemos usar a função que vai calcular o imc, e vai nos retornar o level já com o imc, qual o level que temos que exibir dai.
      // Precisamos armazenar em algum lugar o level que temos que exibir, então vamos criar uma state para exibir esse cara, a state toShow.
      // a state vai receber o retorno do método calculateImc, que faz o calculo do imc.
      // retorno da função é ou Level ou nulo, o mesmo configurado para a state receber.
      // toShow vai ter o level calculado e que deve ser exibido.
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert("Digite todos os campos.");
    }
  }

  const handleBackButton = () => {
    // quando clicar no botão de voltar, vamos limpar o nosso toShow, dessa forma zerando tudo, perdendo assim o level que calculamos, vai botar os levels para serem exibido novamente, etc.
    setToShow(null);
    // limpando os campos também
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>
          
          <input 
            type="number"
            placeholder = "Digite a sua altura. Ex: 1.5 (em metros)"
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            // quando toShow tiver algo para exibir, desabilita esse campo, caso contrário, deixa o mesmo habilitado
            disabled={toShow ? true : false}
          />
          <input 
            type="number"
            placeholder = "Digite o seu peso. Ex: 75.3 (em kg)"
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />

          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {/* quando não tivermos o toShow, quando ele não tiver nada, exibimos o grid com os levels */}
          {!toShow && 
            <div className={styles.grid}>
            {levels.map((item, key) => (
              // <div key={key}>{item.title}</div>

              // agora aqui passamos o nosso próprio componente GridItem agora, passando o key para ele, e a prop item com as informações do item do level que temos.
              <GridItem key={key} item={item} />
            ))}
            </div>
          }
          {/* quando tiver algum toShow, exibimos um item só, o level */}
          {toShow && 
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              {/* mandamos nosso item aqui para o GridItem, mandando o level toShow, que é o esperado pelo componente */}
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
