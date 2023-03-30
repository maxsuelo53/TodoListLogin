import styles from "./TaskDetail.module.css"

const TaskDetail = ({ task, handleOpenModal }) => {

    let dataTask = new Date(task.createdAt).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

    return (

        <>
            <div onClick={() => handleOpenModal(task)}>
                <p className={styles.title}>{task.title}</p>
                <p className={styles.data}>{dataTask}</p>
                <p className={`${styles.status} ${task.checkTask ? styles.taskCompleted : styles.taskPending}`}>
                    <div>
                        {task.checkTask ? (
                            <p>Completa</p>
                        ) : (<p>Pendente</p>)}
                    </div>
                </p>
            </div>
        </>
    )
}

export default TaskDetail