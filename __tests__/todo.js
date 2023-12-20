const todoList = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();
describe("TodoList test suites", () => {
  beforeAll(() => {
    add({
      title: "Test todo1",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    add({
      title: "Test todo1 yesterday",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .split("T")[0],
    });
    add({
      title: "Test todo1 tomorrow",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0],
    });
  });
//one
  test("Checks creating a new todo", () => {
    const itemCount = all.length;    
    add({
      title: "Test todo2",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(itemCount + 1);
  });
//two
  test("Checkd markinga a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
//three
  test("Checks retrival of overdue items", () => {
    const itemCount = overdue().length;    
    add({
      title: "Test todo2 yesterday",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .split("T")[0],
    });
    expect(overdue().length).toBe(itemCount + 1);
  });
//four
  test("Checks retrival of dueToday items", () => {
    const itemCount = dueToday().length;    
    add({
      title: "Test todo3",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(dueToday().length).toBe(itemCount + 1);
  });
//five
  test("Checks retrival of dueLater items", () => {
    const itemCount = dueLater().length;    
    add({
      title: "Test todo2 tomorrow",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0],
    });
    expect(dueLater().length).toBe(itemCount + 1);
  });
});