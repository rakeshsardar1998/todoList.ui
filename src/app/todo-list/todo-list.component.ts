// todo-list.component.ts

import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

interface Todo {
  id?: number;
  task: string;
  isCompleted?: boolean;
  isEditing?: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = { task: '', isCompleted: false };

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(): void {
    if (this.newTodo.task) {
      this.todoService.addTodo(this.newTodo).subscribe(
        todo => {
          this.todos.push(todo);
          this.newTodo = { task: '', isCompleted: false };
          this.todoService.toastAlertSuccess('Todo added successfully');
        },
        error => {
          this.todoService.toastAlertError('Failed to add todo');
        }
      );
    }
  }

  updateTodo(todo: Todo): void {
    console.log(todo);
    if (todo.id !== undefined) {
      this.todoService.updateTodo(todo).subscribe(
        updatedTodo => {
          const index = this.todos.findIndex(t => t.id === updatedTodo.id);
          if (index !== -1) {
            this.todos[index] = updatedTodo;
            this.todoService.toastAlertSuccess('Todo updated successfully');
          }
        },
        error => {
          this.todoService.toastAlertError('Failed to update todo');
        }
      );
    }
  }

  deleteTodo(id?: number): void {
    if (id !== undefined) {
      this.todoService.deleteTodo(id).subscribe(
        () => {
          this.todos = this.todos.filter(t => t.id !== id);
          this.todoService.toastAlertSuccess('Todo deleted successfully');
        },
        error => {
          this.todoService.toastAlertError('Failed to delete todo');
        }
      );
    }
  }


  edit(todo: Todo): void{
    todo.isEditing = !todo.isEditing;
  }

  save(todo: Todo): void {
    if(todo.id !== undefined){
      this.updateTodo(todo);
      todo.isEditing = false;
    }
  }
}
