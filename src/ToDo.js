import React, {useState} from "react";
import './ToDo.css'
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { RiEditLine } from "react-icons/ri";
import { FaTrashCan } from "react-icons/fa6";
import { IoSaveOutline } from "react-icons/io5";
import dark from './moon-image.png'


export default function ToDo() {
    const [todo, setTodo] = useState([])
    const [newTodo, setNewTodo] = useState('')
    const [editTodo, setEditTodo] = useState({id: null,text: ''})
    const [searchName, setSearchName] = useState('')


    const addTodo = () => {
        if (newTodo.trim() !== '') {
            const newTodoObj = {
                id: Date.now(),
                text: newTodo
            }
            setTodo(prevTodo => [...prevTodo, newTodoObj]);
            setNewTodo('');
        }
    };

    const innerinput = (e) => {
        setNewTodo(e.target.value)
    }

    const pressEnter = (e) => {
        if(e.key === 'Enter'){
            addTodo()
        }
    }

    // Delete task
    const deleteBtn = (id) => {
        setTodo(prevTodo => prevTodo.filter(delItem => delItem.id !== id))
    }

    // Edit task
    const handleEdit = (item) => {
        setEditTodo({
            id: item.id,
            text: item.text
        });
    };

    const saveEdit = () => {
        setTodo(prevTodo =>
            prevTodo.map(textItem =>
                textItem.id === editTodo.id ? { ...textItem, text: editTodo.text } : textItem
            )
        );
        setEditTodo({ id: null, text: '' });
    };

    // Search bar
    const filterSearchBar = todo.filter(item => 
        item.text.includes(searchName)
    )

    return(
        <div className="TodoList">
            <div className="moon--block">
                <img src={dark} alt="#" className="moon"/>
            </div>
            <div className="addTodoBlock">
                {/* Search tasks */}
                <input className="SearchBar"
                type="text"
                placeholder="Search task"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                />
                {/* Add task */}
                <input className="TodayTodo"
                    type="text"
                    placeholder="Today todo" 
                    value={newTodo} 
                    onKeyPress={pressEnter}
                    onChange={innerinput}
                />
                <button onClick={addTodo} className="todoButton">
                    <AiOutlineAppstoreAdd/>
                </button>
            </div>
            {filterSearchBar.map(item => (
               <div className="todoBlock" key={item.id}>   
                    {editTodo.id === item.id ? (
                     <>
                        <b className="Save" onClick={saveEdit}>
                            <IoSaveOutline/>    
                        </b> 
                        <input className="editInput"
                            type="text"
                            placeholder="Edit in process..."
                            value={setEditTodo.text}
                            onChange={(e) => setEditTodo(prevEditTodo => ({...prevEditTodo, text: e.target.value}))}
                        />
                     </>
                    ) : (
                        <div className="taskBlock">
                            <p key={item.id} className="todoBlock--indent">{item.text}</p>
                            <b className="hover" onClick={() => deleteBtn(item.id)}>
                                <FaTrashCan/>
                            </b>
                            <b className="hover" onClick={() => handleEdit(item)}>
                                <RiEditLine/>
                            </b> 
                        </div> 
                    )}
                </div>
            ))}
            <div class="circle"></div>
                <div class="circle"></div>
                    <div class="circle"></div>
        </div>
    )
};
