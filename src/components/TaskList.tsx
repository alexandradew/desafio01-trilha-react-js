import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if(tasks.length > 0){
      let newId = tasks[tasks.length-1].id + 1;

      let newTask = {
        id: newId,
        title: newTaskTitle,
        isComplete: false,
      }
      
      if(newTaskTitle != ''){
        let tasksUpdate = [...tasks];
        tasksUpdate.push(newTask);
        setTasks(tasksUpdate);
      }

    }else{
      let newId = 1;

      let newTask = {
        id: newId,
        title: newTaskTitle,
        isComplete: false,
      }
  
      if(newTaskTitle != ''){
        let tasksUpdate = [...tasks];
        tasksUpdate.push(newTask);
        setTasks(tasksUpdate);
      }

    }
    
  }

  function handleToggleTaskCompletion(id: number) {
    let tasksUpdate = [...tasks];

    tasks.forEach((task, index) => {
      if(task.id === id){
        if(!task.isComplete){
          tasksUpdate[index].isComplete = true;
          setTasks(tasksUpdate);
        }else{
          tasksUpdate[index].isComplete = false;
          setTasks(tasksUpdate);
        }
      }
    })
  }

  function handleRemoveTask(id: number) {
    let tasksUpdate = [...tasks];

    tasks.forEach((task, index) => {
      if(task.id === id){
        tasksUpdate.splice(index, 1);
        setTasks(tasksUpdate);
      }
    })
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}