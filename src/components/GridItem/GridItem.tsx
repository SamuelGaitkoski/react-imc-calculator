import { Level } from "../../helpers/imc";
// importando o css para esse componente
import styles from './GridItem.module.css';
// importando as imagens que vamos usar aqui, de up e down
import upImage from '../../assets/up.png';
import downImage from '../../assets/down.png';

// criando a prop que recebemos no App.tsx
type Props = {
    item: Level
}

// o GridItem recebe um item agora, que tem type definido em Props, sendo esse tipe um objeto chamado Level, que importamos de helpers/imc. item é o nosso objeto Level.
// Como o background color de cada GridItem vai ser definido pela cor do level, passamos a prop style, onde o backgroundColor vai ser definido pela cor do level (item).
// toda vez que quisermos fazer uma operação condicional por exemplo, como um if, podemos abrir uma expressão para isso, como é feito na div do gridIcon, se item.icon for igual a up, ele bota a imagem de up. Se o icon for igual a down, bota a imagem de down.
export const GridItem = ({ item }: Props) => {
    return (
        <div className={styles.main} style={{ backgroundColor: item.color }}>
            <div className={styles.gridIcon}>
                {/* {item.icon === 'up' && <img src={upImage} alt="" width="30" />}
                {item.icon === 'down' && <img src={downImage} alt="" width="30" />} */}
                {/* podemos fazer da forma acima também, fazendo a validação no src da img */}

                <img src={item.icon === 'up' ? upImage : downImage} alt="" width="30"/>
            </div>
            <div className={styles.gridTitle}>
                {item.title}
            </div>
            
            {/* se o yourImc estiver preenchido, vamos exibir esse imc passado no level */}
            {item.yourImc && 
                <div className={styles.yourImc}>
                    Seu IMC é de {item.yourImc} kg/m²
                </div>
            }

            <div className={styles.gridInfo}>
                {/* utilizando um fragment para botar a string com tag strong e expressão */}
                {/* no primeiro string botamos o primeiro item do array imc, e no segundo strong pegamos o segundo item do array do imc, para pegar a taxa do imc para cada nível */}
                <>
                    IMC está entre <strong>{item.imc[0]}</strong> e <strong>{item.imc[1]}</strong>
                </>
            </div>

        </div>
    );
}

