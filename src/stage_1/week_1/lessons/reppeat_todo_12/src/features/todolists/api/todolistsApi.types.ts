export type FieldError = {
  error: string
  field: string
}

export type Todolist = {
  id: string
  addedDate: string
  order: number
  title: string
}

export type BaseResponse<T = {}> = {
  data: T
  resultCode: number
  fieldsErrors: FieldError[]
  messages: string[]
}

export type CreateTodolistResponse = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
  data: {
    item: Todolist
  }
}

export type DeleteTodolistResponse = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
  data: {}
}

export type UpdateTodolistResponse = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
  data: {}
}
