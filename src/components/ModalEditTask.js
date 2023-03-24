import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import React from 'react'
import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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
        setValue('checkTask', false);
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


    return (
        <Modal
            open={openModal}
            onClose={handleClose}
        >
            <Box sx={style}>
                <form onSubmit={handleSubmit(editTaskSubmit)}>
                    <label>
                        <span>Título</span>
                        <input type="text"
                            placeholder="Título da tarefa"
                            {...taskInfo("title")}
                        />

                    </label>
                    <label>
                        <span>Tarefa</span>
                        <textarea type="text"
                            placeholder="Escreva a tarefa"
                            {...taskInfo("task")}
                        />
                    </label>
                    <button className="btn" type='submit'>Salvar</button>
                </form>
                <button onClick={() => deleteTaskItem(task.id)}>excluir</button>
            </Box>
        </Modal >
    )
}

export default ModalEditTask