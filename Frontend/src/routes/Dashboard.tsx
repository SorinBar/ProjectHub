import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import '../style/Dashboard.css'

// TODO: Creare Design Dashboard


function Dashboard() {
    // const navigate = useNavigate();
    const { userEmail, userRole, userJwt } = useContext(UserContext);
    const [boards, setBoards] = useState<string[]>([]);
    const [selectedBoard, setSelectedBoard] = useState<string | null>(null);

    const handleBoardSelection = (board: string) => {
        setSelectedBoard(board);
    };


    const handleAddBoard = () => {
        if (boards.length >= 4) {
            alert("Maximum number of boards created.");
        } else {
            let newBoardNumber = 1;
            while (boards.includes(`Board ${newBoardNumber}`)) {
                newBoardNumber++;
            }
            const newBoard = `Board ${newBoardNumber}`;
            setBoards([...boards, newBoard]);
            setSelectedBoard(newBoard);
        }
    };


    const handleRemoveBoard = (board: string) => {
        const confirmation = window.confirm(`Are you sure you want to delete ${board}?`);
        if (confirmation) {
            setBoards(prevBoards => prevBoards.filter(b => b !== board));
            setSelectedBoard(null);
        }
    };
    
    const handleAddCollaborator = () => {
        alert("Functionality to add a collaborator goes here.");
        // TODO:
        // Add functionality to add a collaborator
    };

    const handleAddTask = (board: string) => {
        // TODO:
        // Add functionality to add a task to the specified board
        alert(`Add task to ${board}`);
    };
    
    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="user-details">
                    <p>Email: {userEmail}</p>
                    <p>Role: {userRole}</p>
                    <p>JWT: {userJwt}</p>
                </div>
                <button onClick={handleAddBoard} className="create-board">
                    Create Board
                </button>
                
                {boards.map(board => (
                    <div key={board}
                            className={`board-list-item ${board === selectedBoard ? 'active' : ''}`}
                            onClick={() => handleBoardSelection(board)}>
                        {board}
                    </div>
                ))}
                <div className="remove-board" onClick={() => {
                    if (selectedBoard) {
                        handleRemoveBoard(selectedBoard);
                    }
                }}>
                    Remove Board
                </div>
            </div>
            <div className="main-board">
                {selectedBoard&& (
                <div className="board">
                    <div className="board-header">{selectedBoard}</div>
                        <div className="header-content">
                        <p>Content for {selectedBoard}</p>
                        <button onClick={handleAddCollaborator} className="add-collaborator">
                            + Add Collaborator
                        </button>
                        <button onClick={() => handleAddTask(selectedBoard)} className="add-task-bottom-right">
                                + Add Task
                        </button>
                        </div>
                    <div className="board-columns">
                        <div className="column">
                            <div className="column-header">To Do</div>
                            <div className="column-content">Tasks...</div>
                        </div>
                        <div className="column">
                            <div className="column-header">In Progress</div>
                            <div className="column-content">Tasks...</div>
                        </div>
                        <div className="column">
                            <div className="column-header">Done</div>
                            <div className="column-content">Tasks...</div>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;