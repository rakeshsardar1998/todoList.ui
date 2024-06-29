// todo.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

interface Todo {
  id?: number;
  task: string;
  isCompleted?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/todos';  // Update with your API URL

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<{status: number, data: Todo[]}>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<{status: number, data: Todo}>(this.apiUrl, todo).pipe(
      map(response => response.data)
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<{status: number, data: Todo}>(`${this.apiUrl}/${todo.id}`, todo).pipe(
      map(response => response.data)
    );
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toastAlertSuccess(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      timer: 2000,
      showConfirmButton: false
    });
  }

  toastAlertError(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message
    });
  }
}
