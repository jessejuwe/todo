class Todo {
  id: string;
  text: string;
  isActive: boolean;
  isComplete: boolean;

  constructor(todoText: string) {
    this.id = `${Math.floor(Math.random() * 10000)}`;
    this.text = todoText;
    this.isActive = false;
    this.isComplete = false;
  }
}

export default Todo;
