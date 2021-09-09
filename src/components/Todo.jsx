import React, { useState, useEffect } from 'react';

function Todo() {
    const [todo, setTodo] = useState(null);
    console.log(todo)
    const [url] = "http://localhost:4000/todo";

    const lista = todo.map((todo, i) => {
        return <li className="list" key={i}>{todo}<button className="close" onClick={() => removeTodo(todo, i)}>X</button></li>
    })

    useEffect(() => {
        getTodo();
    }, [])

    const getTodo = () => {
        fetch("http://localhost:4000/todo")
            .then(res => res.json)
            .then(data => {
                setTodo(data)
            })
    }

    const createTodo = (todo) => {
        fetch("http://localhost:4000/todo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
        })
            .then(res => res.json)
            .then(data => {
                setTodo(data)
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
            createTodo(e.target.value)
            e.target.value = ""
        }
    };

    function question() {
        if (todo.length === 0) {
            return "No tasks, add a task"
        }
        else {
            return "what need to be done"
        }
    }


    return (
        <>
            <h1>todos</h1>
            <div id="contenedor">
                <input id="" type="text" placeholder={question()} onKeyUp={handleKeypress} />
                {todo && <ul>
                    {lista}
                    <li id="itemsLeft">{todo.length} items left</li>
                </ul>}
            </div>
        </>
    );
}

export default Todo;