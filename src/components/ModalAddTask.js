import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";

import styles from "./ModalAddTask.module.css"
import { BsFillPencilFill } from 'react-icons/bs'

import React from 'react';
import { useInsertDocument } from '../hooks/useInsertDocument';
import { useAuthValue } from "../context/AuthContext"

const schema = yup.object({
    title: yup.string().required("Título é obrigatório"),
    task: yup.string().required("Tafera é obrigatória"),
    checkTask: yup.bool().default(false),

}).required();

const ModalAddTask = ({ openModal, handleClose }) => {

    const { register: addTask, handleSubmit, watch, formState: { errors }, reset }
        = useForm({
            resolver: yupResolver(schema)
        });

    const { user } = useAuthValue();
    const { insertDocument, response } = useInsertDocument(user.uid);


    const addTaskData = (taskData) => {
        insertDocument({
            title: taskData.title,
            task: taskData.task,
            checkTask: taskData.checkTask,
            uid: user.uid,
        })

        reset({ title: '', task: "" });
        handleClose();
    }

    return (
        <Modal
            open={openModal}
            onClose={handleClose}
        >
            <Box className={styles.modalAddTaskContent}>
                <form onSubmit={handleSubmit(addTaskData)} className={styles.formStyle}>
                    <h1>Nova Tarefa</h1>
                    <label>
                        <div className={styles.iconInput} >
                            <BsFillPencilFill />
                        </div>
                        <input type="text"
                            placeholder="Título da tarefa"
                            {...addTask("title")}
                            className='inputStyle'
                        />
                    </label>
                    <label>
                        <textarea type="text"
                            placeholder="Escreva a tarefa"
                            {...addTask("task")}
                            className='inputStyle'
                        />
                    </label>
                    <button className="btn" type='submit'>Cadastrar</button>
                </form>
                <button className="btn" onClick={() => handleClose()}>sair</button>
            </Box>
        </Modal>
    )
}

export default ModalAddTask