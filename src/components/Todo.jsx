import React, { useState, useEffect } from 'react';

function Todo() {
    const [todo, setTodo] = useState(null);
    const [url, setUrl] = useState("https://assets.breatheco.de/apis/fake/todos/user/ninewinger");

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
        fetch("https://assets.breatheco.de/apis/fake/todos/user/ninewinger", {
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

    const createTodo = (todo) => {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([todo])
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    getTodo();
                }
            })
    }

    const removeTodo = (todo, id) => {
        fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                if (data.id) {
                    getTodo();
                }
            })
            .catch((error) => console.log(error))
    }

    const handleKeypress = e => {
        if (e.keyCode === 13 && e.target.value !== "") {
            let td = { label: e.target.value, done: false }
            createTodo(td)
            e.target.value = ""
        }
    };

    return (
        <>
            <h1>todos</h1>
            <div id="contenedor">
                <input type="text" placeholder={!!todo && todo.length === 0 ? "No tasks, add a task" : "what need to be done"} onKeyUp={handleKeypress} />
                <ul>
                    {!!todo && todo.length > 0 && todo.map((todo, i) => {
                        return <li className="list" key={i}>{todo.label}<button className="close" onClick={() => removeTodo(todo, i)}>X</button></li>
                    })}
                    <li id="itemsLeft">{ } items left</li>
                </ul>
            </div>
        </>
    );
}

export default Todo;