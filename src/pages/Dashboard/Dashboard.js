import React from 'react'
import { useState } from 'react'

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

    const { register: searchForm, handleSubmit, watch, formState: { errors } }
        = useForm({
            resolver: yupResolver(schema)
        });

    const SearchSubmit = async (userData) => {

    }

    return (
        <>
            <div className={styles.dashboard}>
                <div className={styles.painelTop}>
                    <button className={`btn ${styles.buttonFilter}`}>
                        <div className={` ${styles.backgroundIconFilterButtonAll}`}>
                            <BsCardList />
                        </div>
                        <span>Tarefas</span>
                    </button>
                    <button className={`btn ${styles.buttonFilter}`}>
                        <div className={styles.backgroundIconFilterButtonEnded}>
                            <BsCheckAll />
                        </div>
                        <span>Realizadas</span>
                    </button>
                    <button className={`btn ${styles.buttonFilter}`}>
                        <div className={styles.backgroundIconFilterButtonAwait}>
                            <BsClock />
                        </div>
                        <span>Pendentes</span>
                    </button>
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