import styles from "./TaskDetail.module.css"
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa"

const TaskDetail = ({ task, handleOpenModal, deleteTask, handleOpenModalConfirmDelete }) => {

    let dataTask = new Date(task.createdAt).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

    const deleteConfirmTask = (id) => {
        handleOpenModalConfirmDelete(id);
    }

    return (

        <>
            <div className={styles.ContentitemInformationIndividual}>
                <div className={styles.checkTaskButton}>
                    <input type="checkbox" />
                    <div>
                        <p className={styles.titleTask}>{task.title}</p>
                        <p className={styles.dataTask}>{dataTask}</p>
                    </div>
                </div>
                <div className={`${styles.status} ${task.checkTask ? styles.taskCompleted : styles.taskPending}`}>
                    <div>
                        {task.checkTask ? (
                            <p>Completa</p>
                        ) : (<p>Pendente</p>)}
                    </div>
                </div>
                <div className={styles.contentActionsTask}>
                    <button onClick={() => handleOpenModal(task)} className={styles.buttonEdit}><FaPencilAlt /></button>
                    <button onClick={() => deleteConfirmTask(task.id)} className={styles.buttonDelete}><FaTrashAlt /></button>
                </div>
            </div>
        </>
    )
}

export default TaskDetail