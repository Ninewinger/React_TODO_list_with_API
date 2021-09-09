import React, { useState, useEffect } from 'react';

function Todo() {
    const [todo, setTodo] = useState(null);
    const [url, setUrl] = useState("http://localhost:4000/todo");


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
    /*     const lista = todo.map((todo, i) => {
            return <li className="list" key={i}>{todo}<button className="close" onClick={() => removeTodo(todo, i)}>X</button></li>
        }) */

    const createTodo = (todo) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
        })
            .then(res => res.json())
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
/* 
    function question() {
        if (todo.length === 0) {
            return "No tasks, add a task"
        }
        else {
            return "what need to be done"
        }
    }
 */

    return (
        <>
            <h1>todos</h1>
            <div id="contenedor">
                <input type="text" /* placeholder={question()} */ onKeyUp={handleKeypress} />
                <ul>
                   {!!todo && todo.length>0 && todo.map((todo, i) => {
                        return <li className="list" key={i}>{todo.todo}<button className="close" onClick={() => removeTodo(todo, i)}>X</button></li>
                    })}
                    <li id="itemsLeft">{!!todo && todo.length} items left</li>
                </ul>
            </div>
        </>
    );
}

export default Todo;