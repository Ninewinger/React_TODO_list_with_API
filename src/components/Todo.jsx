import React, { useState } from 'react';

function Todo() {
    const [todo, setTodo] = useState("");
    const tasks = todo.map((task) =>{
        return (
            <>
            <li>{task}</li><button></button>
            </>
            )
    } )
    function countItems() {

    }


    return (
        <>
            <h1>todos</h1>
            <div>
                <input type="text" />
                <ul>
                    {tasks}
                    <li>{countItems}</li>
                </ul>
            </div>
        </>
    );
}

export default Todo;