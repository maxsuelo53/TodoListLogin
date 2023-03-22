import styles from "./TaskDetail.module.css"

const TaskDetail = ({ task }) => {
    return (
        <>
            <p className={styles.title}>{task.title}</p>
            <p className={styles.data}>{task.task}</p>
            <span className={`${styles.status} ${task.checkTask ? styles.taskCompleted : styles.taskPending}`}>
                <div>
                    {task.checkTask ? (
                        <p>Completa</p>
                    ) : (<p>Pendente</p>)}
                </div>
            </span>
            <p>{console.log(task)}</p>
        </>
    )
}

export default TaskDetail