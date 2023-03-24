import styles from "./TaskDetail.module.css"

import { useState } from "react";
import ModalEditTask from "./ModalEditTask";


import { useDeleteDocument } from "../hooks/useDeleteDocument";
import { useAuthValue } from "../context/AuthContext";
import { useUpdateDocument } from "../hooks/useUpadteDocument";
import { useFetchTask } from "../hooks/useFetchTask";


const TaskDetail = ({ task }) => {

    //MODAL CONTROLLER
    const [OpenModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    let dataTask = new Date(task.createdAt).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

    const { user } = useAuthValue()

    const { deleteDocument } = useDeleteDocument(user.uid)
    const { document: taskItem } = useFetchTask(user.uid, task.id)
    const { updateDocument, response } = useUpdateDocument(user.uid);


    return (

        <>
            <div onClick={handleOpenModal}>
                <p className={styles.title}>{task.title}</p>
                <p className={styles.data}>{dataTask}</p>
                <span className={`${styles.status} ${task.checkTask ? styles.taskCompleted : styles.taskPending}`}>
                    <div>
                        {task.checkTask ? (
                            <p>Completa</p>
                        ) : (<p>Pendente</p>)}
                    </div>
                </span>
                <ModalEditTask
                    openModal={OpenModal}
                    handleClose={handleCloseModal}
                    task={task}
                    deleteTask={deleteDocument}
                    updateTask={updateDocument}
                />
            </div>
        </>
    )
}

export default TaskDetail