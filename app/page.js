import TodoCounts from "@/components/todo-counts";
import TodoForm from "@/components/todo-form";
import TodoList from "@/components/todo-list";
import { SideBar } from "@/components/todo-sidebar";

export default function Home() {
  return (
    <div>
      <div>
        <SideBar />
      </div>
      <div className="flex h-[300px] bg-emerald-700 justify-center items-center">
        <div className="flex flex-col h-[80%] justify-between items-center">
          <TodoForm />
          <TodoCounts />
        </div>
      </div>
      <div>
        <TodoList />
      </div>
    </div>
  );
}
