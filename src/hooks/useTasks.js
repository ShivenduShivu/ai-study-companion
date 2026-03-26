import { useStudy } from '../context/StudyContext';

export function useTasks() {
  const { tasks, setTasks } = useStudy();

  function addTask(task) {
    setTasks((prev) => [...prev, { ...task, id: Date.now(), completed: false }]);
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  const now = new Date();
  const overdue = tasks.filter(
    (t) => !t.completed && t.deadline && new Date(t.deadline) < now
  );
  const pending = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);

  return { tasks, addTask, deleteTask, toggleTask, overdue, pending, completed };
}