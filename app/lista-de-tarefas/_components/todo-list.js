import { SwapSortTodo } from "@/actions/todos";
import { TodoCard } from "@/app/lista-de-tarefas/_components/todo-card";
import { useRef, Children ,useTransition } from "react";
import { toast } from "sonner";

const TodoList = ({ todos, todoUpdate, drag = true }) => {
const [isPending, startTransition] = useTransition()
  if (isPending) {
  drag = false
  }
  const dragElement = useRef({});
  const draggedOverElement = useRef({});
  todos.sort((a, b) => a.sort - b.sort);

  function handlerSort() {
    startTransition(()=> {
      const result = SwapSortTodo({todo1:{index:dragElement.current.index }, todo2:{index:draggedOverElement.current.index}})
      
      if (result?.success) {
        todoUpdate()
        toast(result?.success)
        
      }
      if (result?.error) {
        toast(result?.error)
      }

    })
  }
  return (
    <section>
        {todos?.map((e, index) => {
          return (
            <div
              draggable={drag}
              onDragStart={() => dragElement.current = {index:e.sort, id: e.id}}
              onDrop={() => draggedOverElement.current = {index:e.sort, id: e.id}}
              onDragEnd={handlerSort}
              onDragOver={(e) => e.preventDefault()}
              className="flex flex-col items-center w-full mt-5"
              key={index}
            >
              <TodoCard
                checkState={e.checkState}
                description={e.description}
                title={e.title}
                id={e.id}
                todoUpdate={todoUpdate}
              />
            </div>
          );
        })}
    </section>
  );
};

export default TodoList;
