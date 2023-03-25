import React from 'react'
import { useState, useEffect } from 'react'

import styles from "./Dashboard.module.css"
import { MdOutlinePlaylistAdd } from "react-icons/md"
import ModalAddTask from '../../components/ModalAddTask'

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { BsCardList, BsCheckAll, BsClock, BsSearch } from 'react-icons/bs'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useAuthValue } from '../../context/AuthContext'
import TaskDetail from '../../components/TaskDetail'

const schema = yup.object({
    search: yup.string().required(""),
}).required();


const Dashboard = () => {

    const { user } = useAuthValue();
    const { documents: tasks, loading } = useFetchDocuments(user.uid)

    //MODAL CONTROLL
    const [openModalAddTask, setOpenModalAddTask] = useState(false);
    const handleOpenModalAddTask = () => setOpenModalAddTask(true);
    const handleCloseModalAddTask = () => setOpenModalAddTask(false);

    //Contadores
    const [tasksEnd, setTasksEnd] = useState(0)
    const [tasksPending, setTaskPending] = useState(0)
    const [tasksTotal, settaskTotal] = useState(0);

    const { register: searchForm, handleSubmit, watch, formState: { errors } }
        = useForm({
            resolver: yupResolver(schema)
        });

    const SearchSubmit = async (userData) => {

    }

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
            <div className={styles.dashboard}>
                <div className={styles.painelTop}>
                    <div className={`btn ${styles.FilterCountTasks}`}>
                        <div className={`${styles.FilterCountTasksIcon} ${styles.colorCountAll}`}>
                            <BsCardList />
                        </div>
                        <div>
                            <span>Tarefas</span>
                            <p>{tasksTotal}</p>
                        </div>
                    </div>
                    <div className={`btn ${styles.FilterCountTasks}`}>
                        <div className={` ${styles.FilterCountTasksIcon} ${styles.colorCountEnd}`}>
                            <BsCheckAll />
                        </div>
                        <div>
                            <span>Realizadas</span>
                            <p>{tasksEnd}</p>
                        </div>
                    </div>
                    <div className={`btn ${styles.FilterCountTasks}`}>
                        <div className={` ${styles.FilterCountTasksIcon} ${styles.colorCountWait}`}>
                            <BsClock />
                        </div>
                        <div>
                            <span>Pendentes</span>
                            <p>{tasksPending}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.todoListContent}>
                    <h1>Tarefas</h1>
                    <div className={styles.actionsTodoList}>
                        <button className={styles.addItemButton} onClick={handleOpenModalAddTask}>
                            Adicionar
                            <MdOutlinePlaylistAdd />
                        </button>
                        <form onSubmit={handleSubmit(SearchSubmit)}>
                            <label>
                                <input type="text"
                                    placeholder="Pesquisar..."
                                    {...searchForm("search")}
                                />
                            </label>
                            <button className={`btn ${styles.buttonSearch}`} type='submit'><BsSearch /></button>
                        </form>
                    </div>
                    <div className={styles.listContent}>
                        <ul className={styles.listTodos}>
                            {tasks && tasks.map((taskItem) => (
                                <li key={taskItem.id}> <TaskDetail task={taskItem} /> </li>
                            ))}

                        </ul>
                    </div>
                </div>

            </div>

            <ModalAddTask openModal={openModalAddTask} handleClose={handleCloseModalAddTask} />

        </>
    )
}

export default Dashboard