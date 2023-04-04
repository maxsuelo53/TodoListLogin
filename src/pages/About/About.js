import styles from "./About.module.css"
import { BsTools, BsFillDoorClosedFill, BsGithub, BsLinkedin } from "react-icons/bs"
import { IoDesktopOutline } from "react-icons/io5"

const About = () => {
    return (
        <div className='contentComponent'>
            <div className={styles.containerAbout}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Tecnologias Utilizadas</h1>
                    <BsTools className={styles.titleIcon} />
                </div>
                <div className={styles.containerInfo}>
                    <div className={styles.containerFrontBack}>
                        <h1>Front-End <IoDesktopOutline /></h1>
                        <ul>
                            <li>ReactJS</li>
                            <ol className={styles.sublista}>
                                <li>useReducer</li>
                                <li>useEffect</li>
                                <li>useState</li>
                                <li>Components</li>
                                <li>Context</li>
                                <li>useNavigate</li>
                                <li>useForm</li>
                            </ol>
                            <li>CSS</li>
                            <li>Material UI</li>
                            <li>Hooks Personalizados</li>
                            <li>Yup</li>
                            <li>React-icons</li>
                        </ul>
                    </div>
                    <div className={styles.containerFrontBack}>
                        <h1>Back-End <BsFillDoorClosedFill className={styles.iconBackEnd} /></h1>
                        <ul>
                            <li>Firebase</li>
                            <ol className={styles.sublista}>
                                <li>Autentication</li>
                                <li>Firestore</li>
                            </ol>
                        </ul>
                    </div>
                </div>
                <div className={styles.social}>
                    <div>
                        <BsGithub />
                        <a href="https://github.com/maxsuelo53" target={"_blank"}>GitHub</a>
                    </div>
                    <div>
                        <BsLinkedin />
                        <a href="https://www.linkedin.com/in/maxsuel-oliveira-alves-80b80817b/" target={"_blank"}>LinkedIn</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About