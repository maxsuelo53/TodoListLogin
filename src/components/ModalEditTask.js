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

const schema = yup.object({
    title: yup.string().required("Título é obrigatório"),
    task: yup.string().required("Tafera é obrigatória"),
    checkTask: yup.bool(),

}).required();

const ModalEditTask = ({ openModal, handleClose, task, deleteTask, updateTask }) => {


    const { register: taskInfo, handleSubmit, watch, formState: { errors }, reset, setValue }
        = useForm({
            resolver: yupResolver(schema)
        });



    useEffect(() => {
        setValue('title', task.title);
        setValue('task', task.task);
        setValue('checkTask', task.checkTask);
    }, [])


    const deleteTaskItem = (id) => {
        handleClose();
        deleteTask(id);
    }

    const editTaskSubmit = (dataTask) => {

        const data = {
            title: dataTask.title,
            task: dataTask.task,
            checkTask: dataTask.checkTask
        }

        updateTask(task.id, data)
        handleClose();
    }

    const closeModalTaskEdit = () => {
        handleClose();
        console.log("trete")
    }


    return (
        <Modal
            open={openModal}
            onClose={handleClose}
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
                    <button className="btn" type='submit'>Salvar</button>
                </form>
                <button onClick={() => deleteTaskItem(task.id)}>excluir</button>
                <button onClick={() => closeModalTaskEdit()} className={`btn ${styles.buttonClose}`} ><IoClose /></button>
            </Box>
        </Modal >
    )
}

export default ModalEditTask