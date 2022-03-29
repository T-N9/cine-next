import styles from './CrewCard.module.scss';
import { Person } from "@mui/icons-material";


const CrewCard = (props) => {
    return (
        <div className={styles.crew_card_wrapper}>
            {
                props.image !== null ?
                <img className={styles.crew_img} src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${props.image}`} alt={`${props.name}`} />
                :
                <div className={styles.person}>
                    <Person/>
                </div>

            }
            
            <div className={styles.content}>
                <h1>{props.name}</h1>
                <p>
                    <span>
                        {props.job}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default CrewCard;