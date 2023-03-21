import React from 'react'
import { useState } from 'react'

import styles from "./Dashboard.module.css"
import { MdOutlinePlaylistAdd } from "react-icons/md"
import ModalAddTask from '../../components/ModalAddTask'

import { BsCardList, BsCheckAll, BsClock } from 'react-icons/bs'


const Dashboard = () => {

    //MODAL CONTROLL
    const [openModalAddTask, setOpenModalAddTask] = useState(false);
    const handleOpenModalAddTask = () => setOpenModalAddTask(true);
    const handleCloseModalAddTask = () => setOpenModalAddTask(false);

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
                <div>

                </div>
                <button className={styles.addItemButton} onClick={handleOpenModalAddTask}>
                    Adicionar
                    <MdOutlinePlaylistAdd />
                </button>
            </div>
            <ModalAddTask openModal={openModalAddTask} handleClose={handleCloseModalAddTask} />
        </>
    )
}

export default Dashboard