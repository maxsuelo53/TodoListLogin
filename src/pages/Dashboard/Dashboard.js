import React from 'react'
import { useState, useEffect } from 'react'

import styles from "./Dashboard.module.css"
import { MdOutlinePlaylistAdd } from "react-icons/md"
import ModalAddTask from '../../components/ModalAddTask'
import ProgressBar from "@ramonak/react-progress-bar";


import { BsFillCalendarCheckFill, BsClockFill, BsSearch } from 'react-icons/bs'
import { FaThList } from "react-icons/fa"
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useAuthValue } from '../../context/AuthContext'
import TaskDetail from '../../components/TaskDetail'
import ModalEditTask from '../../components/ModalEditTask'

const styleProgressBar = {
    color: "#1A202C",
    radius: "5px",
}

const Dashboard = () => {

    const { user } = useAuthValue();
    const { documents: tasks, loading } = useFetchDocuments(user.uid)

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


    console.log(parseInt(tasksPending / tasksTotal * 100))

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
                        <div className={styles.titleContainer}>
                            <p className={styles.tableTitle}>Título</p>
                            <p className={styles.tableDate}>Data de criação</p>
                            <p className={styles.tableStatus}>Status</p>
                        </div>
                        <ul className={styles.listTodosTable}>
                            {tasks && tasks.map((taskItem) => (
                                <li key={taskItem.id}> <TaskDetail task={taskItem} handleOpenModal={handleOpenModalEditTask} /> </li>
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

        </>
    )
}

export default Dashboard