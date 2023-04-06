import styles from "./TaskDetail.module.css"
import { FaEye, FaTrashAlt } from "react-icons/fa"

const TaskDetail = ({ task, handleOpenModal, updateTask, deleteTask, handleOpenModalConfirmDelete }) => {

    let dataTask = new Date(task.createdAt).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

    const deleteConfirmTask = (id) => {
        handleOpenModalConfirmDelete(id);
    }

    const handleUpdateTask = () => {

        const data = {
            title: task.title,
            task: task.task,
            checkTask: !task.checkTask
        }


        updateTask(task.id, data)

    }

    return (

        <>
            <div
                className={`${styles.ContentitemInformationIndividual} 
                ${task.checkTask ? styles.taskFinished : ""}`
                }>
                <div className={styles.checkTaskButton}>
                    <label className={styles.containerCheckBox}>
                        <input type="checkbox" checked={task.checkTask} onChange={handleUpdateTask} />
                        <span className={styles.checkmark}></span>
                    </label>

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
                    <button onClick={() => handleOpenModal(task)} className={styles.buttonEdit}><FaEye /></button>
                    <button onClick={() => deleteConfirmTask(task.id)} className={styles.buttonDelete}><FaTrashAlt /></button>
                </div>
            </div>
        </>
    )
}

export default TaskDetail