import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import React from 'react'
import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";

import styles from "./ModalEditTask.module.css"
import { BsFillPencilFill } from 'react-icons/bs';
import { IoClose } from "react-icons/io5"

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
    const { updateDocument: updateTask, response } = useUpdateDocument(user.uid);


    const { register: taskInfo, handleSubmit, watch, formState: { errors }, reset, setValue }
        = useForm({
            resolver: yupResolver(schema)
        });

    const [statusTask, setstatusTask] = useState()

    useEffect(() => {
        try {
            if (task) {
                setstatusTask(task.checkTask);
            }
        } catch (error) {

        }
    }, [])

    useEffect(() => {
        if (task) {
            setValue('title', task.title);
            setValue('task', task.task);
            setValue('checkTask', task.checkTask);
        }
    }, [task])

    const editTaskSubmit = (dataTask) => {

        const data = {
            title: dataTask.title,
            task: dataTask.task,
            checkTask: dataTask.checkTask
        }

        updateTask(task.id, data)
        handleCloseModal();
    }

    const handleEndTask = (status) => {

        let newStatus;

        if (status === true) {
            newStatus = true;
        } else {
            newStatus = false;
        }

        const data = {
            title: task.title,
            task: task.task,
            checkTask: newStatus
        }

        updateTask(task.id, data)
        handleCloseModal();
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
                        <div className={styles.contentButtons}>
                            <button className={`btn ${styles.buttonSave}`} type='submit'>Editar</button>
                            {task && !task.checkTask ? (
                                <div className={`btn ${styles.buttonEndTask}`} onClick={() => { handleEndTask(true) }} >Concluir Tarefa</div>
                            ) : (
                                <div className={`btn ${styles.buttonEndTaskNo}`} onClick={() => { handleEndTask(false) }} >Reabrir Tarefa</div>
                            )}
                        </div>
                    </form>
                    <button onClick={() => handleCloseModal()} className={`btn ${styles.buttonClose}`} ><IoClose /></button>
                </Box>
            </Modal >
        </>
    )
}

export default ModalEditTask