import React, { useState, useEffect } from 'react';

function Todo() {
    const [todo, setTodo] = useState(null);
    const [url, setUrl] = useState("https://assets.breatheco.de/apis/fake/todos/user/Ninewinger");

    useEffect(() => {
        getTodo();
    }, [])

    const getTodo = () => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setTodo(data)
            })
    }

    const createUser = () => {
        fetch("https://assets.breatheco.de/apis/fake/todos/user/Ninewinger", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([])
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    const updateTodo = (todo) => {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    getTodo();
                }
            })
    }

    const handleKeypress = e => {
        if (e.keyCode === 13 && e.target.value !== "") {
            let newTodo = [...todo].concat({ label: e.target.value, done: false })
            updateTodo(newTodo)
            e.target.value = ""
        }
    };

    const handleDelete = i => {
        var array = [...todo];
        console.log(i)
        array.splice(i, 1);
        console.log(array)
        updateTodo(array)
    };

    function removeAll(){
        setTodo([])
    }


    return (
        <>
            <h1>todos</h1>
            <div id="contenedor">
                <input type="text" placeholder={!!todo && todo.length === 0 ? "No tasks, add a task" : "what need to be done"} onKeyUp={handleKeypress} />
                <ul>
                    {!!todo && todo.length > 0 && todo.map((todo, i) => {
                        return <li className="list" key={i}>{todo.label}<button className="close" onClick={() => handleDelete(i)}>X</button></li>
                    })}
                    <li id="itemsLeft">{!!todo && todo.length} items left</li>
                    <button className="rall" onClick={() => removeAll()}>Remove all tasks</button>
                </ul>
            </div>
        </>
    );
}

export default Todo;