import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import React from 'react'


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

const ModalEditTask = ({ openModal, handleClose, task, deleteTask }) => {


    const deleteTaskItem = (id) => {
        handleClose();
        deleteTask(id);
    }

    return (
        <Modal
            open={openModal}
            onClose={handleClose}
        >
            <Box sx={style}>
                <form action="">

                </form>
                <button onClick={() => deleteTaskItem(task.id)}>excluir</button>
            </Box>
        </Modal>
    )
}

export default ModalEditTask