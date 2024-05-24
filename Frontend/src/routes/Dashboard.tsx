import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
// import { useNavigate } from 'react-router-dom';
import '../style/Dashboard.css'
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Draggable from '../components/Draggable';
import Droppable from '../components/Droppable';
import DeleteIcon from '@mui/icons-material/Delete';
import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    TextField
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

interface Task {
    id: string;
    name: string;
    type: 'TODO' | 'INPROGRESS' | 'DONE'
}

function Dashboard() {
    const navigate = useNavigate();
    const { userEmail, userRole, userJwt } = useContext(UserContext);
    const [dialog, setDialog] = useState(false);
    const [newType, setNewType] = useState<'TODO' | 'INPROGRESS' | 'DONE'>('TODO');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        if (userJwt == '') {
            // Decomment for presentation
            // navigate('/auth');
        }
    }, [])

    const handleAddCollaborator = () => {
        alert("TODO");
    };

    const handleAddTask = (type: string) => {
        setNewType(type as 'TODO' | 'INPROGRESS' | 'DONE')
        setDialog(true);       
    };
    
    function handleDragEnd({over, active}: DragEndEvent) {
        console.log(tasks);
        if (!over) {
            return;
        }
        if (over.id === 'DELETE') {
            const updatedTasks = tasks.filter((task: Task) => {
                if (task.id === active.id) {
                    return false;
                }
                return true;
            });
            setTasks(updatedTasks);
        }
        else {
            const updatedTasks = tasks.map((task: Task) => {
                if (task.id === active.id) {
                    task.type = over.id as 'TODO' | 'INPROGRESS' | 'DONE';
                }
                return task;
            })
            setTasks(updatedTasks);
        }
      }

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div style={{
                    display: 'flex',
                    width: "100%",
                    justifyContent: 'center'
                }}>
                    <AccountCircleIcon style={{
                        color: 'white',
                        fontSize: 50
                    }}/>
                </div>
                <div className="user-details">
                    <p>{userEmail}</p>
                    <p>{userRole}</p>
                </div>
            </div>
            <DndContext onDragEnd={handleDragEnd}>
                <div className="main-board">
                    <div className="board">
                        <div className="header-content">
                            <button onClick={handleAddCollaborator} className="add-collaborator">
                                + Add Collaborator
                            </button>
                        </div>
                        <div className="board-columns">
                            <div className="column">
                                <div className="column-header">To Do
                                    <button onClick={() => handleAddTask('TODO')} className="add-task-button">
                                        <PostAddIcon/>
                                    </button>
                                </div>
                                <Droppable id="TODO">
                                    <div className="column-content">
                                        {tasks.filter((task: Task) => task.type === 'TODO').map((task, index) => (
                                            <Draggable key={task.id} id={task.id}>
                                                <div>{task.name}</div>
                                            </Draggable>
                                        ))}
                                    </div>
                                </Droppable>
                            </div>
                            <div className="column">
                                <div className="column-header">In Progress
                                    <button onClick={() => handleAddTask('INPROGRESS')} className="add-task-button">
                                        <PostAddIcon/>
                                    </button></div>
                                    <Droppable id="INPROGRESS">
                                        <div className="column-content">
                                            {tasks.filter((task: Task) => task.type === 'INPROGRESS').map((task, index) => (
                                                <Draggable key={task.id} id={task.id}>
                                                    <div>{task.name}</div>
                                                </Draggable>
                                            ))}
                                        </div>
                                    </Droppable>
                            </div>
                            <div className="column">
                                <div className="column-header">Done
                                    <button onClick={() => handleAddTask('DONE')} className="add-task-button">
                                        <PostAddIcon/>
                                    </button>
                                </div>
                                <Droppable id="DONE">
                                    <div className="column-content">
                                        {tasks.filter((task: Task) => task.type === 'DONE').map((task, index) => (
                                            <Draggable key={task.id} id={task.id}>
                                                <div>{task.name}</div>
                                            </Draggable>
                                        ))}
                                    </div>
                                </Droppable>
                            </div>
                        </div>
                        <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}>
                            <Droppable id="DELETE">
                                <DeleteIcon fontSize='large' style={{     
                                    backgroundColor: 'lightgray',
                                    width: '200px',
                                    padding: '5px',
                                    borderRadius: '10px'
                                }}/>
                            </Droppable>
                        </div>
                    </div>
                    <div>
                        <Dialog open={dialog} onClose={() => {
                            setDialog(false);
                        }}>
                            <DialogContent>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Add task name" 
                                    variant="standard"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setInput(event.target.value);
                                    }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={()=>{
                                    if (input === '') {
                                        return;
                                    }
                                    const updatedTasks = [...tasks];
                                    updatedTasks.push({
                                        id: uuidv4(),
                                        type: newType,
                                        name: input
                                    } as Task);
                                    setTasks(updatedTasks);
                                    setInput('');
                                    setDialog(false);
                                }} color="primary">
                                    Add
                                </Button>
                                <Button onClick={()=>{
                                    setDialog(false);
                                }} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </DndContext>
        </div>
    );
}

export default Dashboard;