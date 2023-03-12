import React, { useReducer, useState, useEffect } from 'react'
import { todoReducer } from '../utils/todoReducer'



const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];

    // return [{
    //     id: new Date().getTime(),
    //     desc: 'Tarea',
    //     done: false
    // }]
}


const TodoApp = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], init)


    // get data from form 
    const [form, setForm] = useState({
        desc: '',
    })

    //  get data from form 
    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleDelete = (id) => {
        console.log(id)

        const action = {
            type: 'delete',
            payload: id
        }

        dispatch(action);
    }
    const handleTaskState = (id) => {

        dispatch({
            type: 'state',
            payload: id
        });
    }





    // load items from localStorage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])


    //  handle event from form to add todo to list using reducer
    const handleFormEvent = (e) => {
        e.preventDefault();

        const todo = {
            id: new Date().getTime(),
            desc: form.desc,
            done: true
        }

        const action = {
            type: 'add',
            payload: todo
        }

        dispatch(action);
        setForm({
            desc: ''
        })

    }


    return (
        <div className='container py-5'>
            <h1 className='h3'><i className="bi bi-bookmark-check"></i>  Todo App ({todos.length}) </h1>
            <hr />

            <div className="row flex-row-reverse">

                <div className="col">
                    <h6 className='pt-3 pb-2'>Agregar nueva tarea</h6>
                    <div className="p-4 border rounded-3">

                        <form onSubmit={e => handleFormEvent(e)}>

                            <label for="desc" class="form-label">Nombre</label>
                            <input
                                type="text"
                                id='desc'
                                name='desc'
                                className="form-control mb-3"
                                required
                                autoComplete='off'
                                onChange={handleChange}
                                value={form.desc}
                            />

                            <input
                                type="submit"
                                className="btn btn-success w-100"
                                value='Crear tarea'
                            />
                        </form>
                    </div>
                </div>
                <div className="col-md-7">
                    <h6 className='pt-3 pb-2'>Lista de tareas</h6>
                    <ul className='list-group list-group-flush border rounded-3'>
                        {
                            todos.map((todo, i) =>
                                <li className='list-group-item mt-3' key={todo.id}>
                                    <p className={`${!todo.done && 'text-decoration-line-through'} d-flex align-items-center`} onClick={() => handleTaskState(todo.id)}>
                                        <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckDefault" checked={!todo.done && true} />
                                        {i + 1}. {todo.desc}
                                        <i onClick={() => handleDelete(todo.id)} class="bi bi-trash3-fill fs-4 text-danger ms-auto"></i>
                                    </p>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default TodoApp