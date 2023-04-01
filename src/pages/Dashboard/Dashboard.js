import React from 'react'
import { useState, useEffect } from 'react'

import styles from "./Dashboard.module.css"
import { MdOutlinePlaylistAdd } from "react-icons/md"
import ModalAddTask from '../../components/ModalAddTask'
import ProgressBar from "@ramonak/react-progress-bar";


import { BsFillCalendarCheckFill, BsClockFill, BsSearch } from 'react-icons/bs'
import { FaThList } from "react-icons/fa"
import { IoAlertCircle } from "react-icons/io5"


import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useAuthValue } from '../../context/AuthContext'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'

import TaskDetail from '../../components/TaskDetail'
import ModalEditTask from '../../components/ModalEditTask'

const styleProgressBar = {
    color: "#1A202C",
    radius: "5px",
}

const Dashboard = () => {

    const { user } = useAuthValue();
    const { documents: tasks, loading } = useFetchDocuments(user.uid)
    const { deleteDocument: deleteTask } = useDeleteDocument(user.uid)

    //MODALADD CONTROLL
    const [openModalAddTask, setOpenModalAddTask] = useState(false);
    const handleOpenModalAddTask = () => setOpenModalAddTask(true);
    const handleCloseModalAddTask = () => setOpenModalAddTask(false);

    //MODALAEDIT CONTROLL
    const [openModalEditTask, setOpenModalEditTask] = useState(false);
    const [dataItem, setdataItem] = useState(null);
    const handleOpenModalEditTask = (data) => {
        setOpenModalEditTask(true)
        setdataItem(data)
    };
    const handleCloseModalEditTask = () => { setOpenModalEditTask(false) }

    //MODAL DELETE CONFIRM CONTROLL
    const [modalDeleteTask, setModalDeleteTask] = useState(false);
    const [deleteTaskID, setDeleteTaskID] = useState(null);
    const handleOpenModalDeleteTask = (id) => {
        setModalDeleteTask(true);
        setDeleteTaskID(id);
    }
    const handleCloseModalDeleteTask = () => setModalDeleteTask(false);


    const deleteTaskItem = (id) => {
        handleCloseModalDeleteTask();
        deleteTask(id);
    }


    //Contadores
    const [tasksEnd, setTasksEnd] = useState(0)
    const [tasksPending, setTaskPending] = useState(0)
    const [tasksTotal, settaskTotal] = useState(0);

    useEffect(() => {
        if (tasks) {
            setTasksEnd(tasks.filter(item => item.checkTask === true).length)
            setTaskPending(tasks.filter(item => item.checkTask === false).length)
            settaskTotal(tasks.length)
        }
        return
    }, [tasks])

    return (
        <>
            <div className={styles.dashboardContainer}>
                <div className={styles.painelTop}>
                    <div className={`btn ${styles.FilterCountTasks}`}>
                        <div className={styles.contentInfoCount}>
                            <div className={`${styles.FilterCountTasksIcon} ${styles.colorCountAll}`}>
                                <FaThList />
                            </div>
                            <div className={styles.titleCounterTask}>
                                <p>Tarefas</p>
                                <span>{tasksTotal}</span>
                            </div>
                        </div>
                    </div>
                    <div className={`btn ${styles.FilterCountTasks}`}>
                        <div className={styles.contentInfoCount}>
                            <div className={` ${styles.FilterCountTasksIcon} ${styles.colorCountEnd}`}>
                                <BsFillCalendarCheckFill />
                            </div>
                            <div className={styles.titleCounterTask}>
                                <p>Realizadas</p>
                                <span>{tasksEnd}</span>
                            </div>
                        </div>
                        <ProgressBar
                            className={styles.progressBarBack}
                            completed={parseInt(tasksEnd / tasksTotal * 100)}
                            baseBgColor={styleProgressBar.color}
                            borderRadius={styleProgressBar.radius}
                            labelColor={styleProgressBar.color}
                            isLabelVisible={false}
                            bgColor="#2FE5A7"
                        />


                    </div>
                    <div className={`btn ${styles.FilterCountTasks}`}>
                        <div className={styles.contentInfoCount}>
                            <div className={` ${styles.FilterCountTasksIcon} ${styles.colorCountWait}`}>
                                <BsClockFill />
                            </div>
                            <div className={styles.titleCounterTask}>
                                <p>Pendentes</p>
                                <span>{tasksPending}</span>
                            </div>
                        </div>
                        <ProgressBar
                            className={styles.progressBarBack}
                            completed={parseInt(tasksPending / tasksTotal * 100)}
                            baseBgColor={styleProgressBar.color}
                            borderRadius={styleProgressBar.radius}
                            labelColor={styleProgressBar.color}
                            isLabelVisible={false}
                            bgColor="#FF69B4"
                        />
                    </div>
                </div>
                <div className={styles.todoListContent}>
                    <div className={styles.actionsTodoList}>
                        <h1>Tarefas</h1>
                        <button className={styles.addItemButton} onClick={handleOpenModalAddTask}>
                            Adicionar
                            <MdOutlinePlaylistAdd />
                        </button>
                    </div>
                    <div className={styles.listContent}>
                        <ul className={styles.listTodosTable}>
                            {tasks && tasks.map((taskItem) => (
                                <li key={taskItem.id}>
                                    <TaskDetail
                                        task={taskItem}
                                        handleOpenModal={handleOpenModalEditTask}
                                        handleOpenModalConfirmDelete={handleOpenModalDeleteTask}
                                        deleteTask={deleteTaskItem}
                                    />
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>

            </div>

            <ModalAddTask openModal={openModalAddTask} handleClose={handleCloseModalAddTask} />
            <ModalEditTask
                openModal={openModalEditTask}
                handleCloseModal={handleCloseModalEditTask}
                task={dataItem}
            />
            {/*MODAL DE CONFIRMAÇÃO DE EXCLUSÃO DA TAREFA*/}
            {modalDeleteTask && (
                <div className={styles.containerDeleteModal}>
                    <div className={styles.dialogDelete} >
                        <div className={styles.titleModalDeleteContainer}>
                            <IoAlertCircle />
                            <p>Excluir tarefa</p>
                        </div>
                        <h1>Deseja realmente excluir essa tarefa?</h1>
                        <div className={styles.contianerButtonsConfirm}>
                            <button className={`btn ${styles.buttonConfirmYes}`} onClick={() => deleteTaskItem(deleteTaskID)}>Confimar</button>
                            <button className={`btn ${styles.buttonConfirmNo}`} onClick={handleCloseModalDeleteTask}>Fechar</button>
                        </div>
                    </div>
                </div>
            )}


        </>
    )
}

export default Dashboard