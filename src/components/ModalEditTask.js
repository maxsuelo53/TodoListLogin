import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';

import React from 'react'
import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";

import styles from "./ModalEditTask.module.css"
import { BsFillPencilFill } from 'react-icons/bs';
import { IoClose, IoAlertCircle } from "react-icons/io5"

import { useDeleteDocument } from "../hooks/useDeleteDocument";
import { useAuthValue } from "../context/AuthContext";
import { useUpdateDocument } from "../hooks/useUpadteDocument";

const schema = yup.object({
    title: yup.string().required("Título é obrigatório"),
    task: yup.string().required("Tafera é obrigatória"),
    checkTask: yup.bool(),

}).required();

const ModalEditTask = ({ openModal, handleCloseModal, task }) => {


    const { user } = useAuthValue()

    const { deleteDocument: deleteTask } = useDeleteDocument(user.uid)
    const { updateDocument: updateTask, response } = useUpdateDocument(user.uid);


    const { register: taskInfo, handleSubmit, watch, formState: { errors }, reset, setValue }
        = useForm({
            resolver: yupResolver(schema)
        });

    //MODAL DELETE CONTROLL
    const [modalDeleteTask, setModalDeleteTask] = useState(false);
    const handleOpenModalDeleteTask = () => setModalDeleteTask(true);
    const handleCloseModalDeleteTask = () => setModalDeleteTask(false);



    useEffect(() => {
        if (task) {
            setValue('title', task.title);
            setValue('task', task.task);
            setValue('checkTask', task.checkTask);
        }
    }, [task])




    const deleteTaskItem = (id) => {
        handleCloseModal();
        handleCloseModalDeleteTask();
        deleteTask(id);
    }

    const editTaskSubmit = (dataTask) => {

        const data = {
            title: dataTask.title,
            task: dataTask.task,
            checkTask: dataTask.checkTask
        }

        updateTask(task.id, data)
        handleCloseModal();
    }

    const confirmDeleteModal = () => {
        setModalDeleteTask(true);
    }


    return (
        <>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
            >
                <Box className={styles.modalAddTaskContent}>

                    <form onSubmit={handleSubmit(editTaskSubmit)} className={styles.formStyle}>
                        <h1>Editar Tarefa</h1>
                        <label>
                            <div className={styles.iconInput} >
                                <BsFillPencilFill />
                            </div>
                            <input type="text"
                                placeholder="Título da tarefa"
                                {...taskInfo("title")}
                            />

                        </label>
                        <label>
                            <textarea type="text"
                                placeholder="Escreva a tarefa"
                                {...taskInfo("task")}
                            />
                        </label>
                        <label className={styles.switch}>
                            <input type="checkbox"
                                placeholder="Escreva a tarefa"
                                {...taskInfo("checkTask")}
                            />
                            <span className={styles.slider}></span>
                        </label>
                        <div className={`${styles.InfoCheckTask} 
                         ${watch("checkTask") ? styles.InfoCheckTaskComplete : styles.InfoCheckTaskNoComplete}`}
                        >
                            {watch("checkTask") ? <p>Completa</p> : <p>Pendente</p>}
                        </div>
                        <div className={styles.contentButtons}>
                            <button className={`btn ${styles.buttonSave}`} type='submit'>Editar</button>
                            <div className={`btn ${styles.buttonDeleteModal}`} onClick={() => handleOpenModalDeleteTask()}>Excluir</div>
                        </div>
                    </form>

                    <button onClick={() => handleCloseModal()} className={`btn ${styles.buttonClose}`} ><IoClose /></button>
                </Box>
            </Modal >
            {modalDeleteTask && (
                <div className={styles.containerDeleteModal}>
                    <div className={styles.dialogDelete} >
                        <div className={styles.titleModalDeleteContainer}>
                            <IoAlertCircle />
                            <p>Excluir tarefa</p>
                        </div>
                        <h1>Deseja realmente excluir essa tarefa?</h1>
                        <div className={styles.contianerButtonsConfirm}>
                            <button className={`btn ${styles.buttonConfirmYes}`} onClick={() => deleteTaskItem(task.id)}>Confimar</button>
                            <button className={`btn ${styles.buttonConfirmNo}`} onClick={handleCloseModalDeleteTask}>Fechar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalEditTask