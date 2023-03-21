import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";

import styles from "./ModalAddTask.module.css"

import React from 'react';
import { useInsertDocument } from '../hooks/useInsertDocument';
import { useAuthValue } from "../context/AuthContext"

const schema = yup.object({
    title: yup.string().required("Título é obrigatório"),
    task: yup.string().required("Tafera é obrigatória"),
    checkTask: yup.bool().default(false),

}).required();

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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
            <Box sx={style}>
                <form onSubmit={handleSubmit(addTaskData)} className={styles.formStyle}>
                    <label>
                        <span>Título</span>
                        <input type="text"
                            placeholder="Título da tarefa"
                            {...addTask("title")} />

                    </label>
                    <label>
                        <span>Tarefa</span>
                        <textarea type="text"
                            placeholder="Escreva a tarefa"
                            {...addTask("task")}
                        />
                    </label>
                    <button className="btn" type='submit'>Cadastrar</button>
                </form>
            </Box>
        </Modal>
    )
}

export default ModalAddTask