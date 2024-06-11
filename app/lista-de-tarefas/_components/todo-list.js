import { TodoCard } from "@/app/lista-de-tarefas/_components/todo-card";

const TodoList = ({ todos }) => {
  return (
    <section>
      <div className="flex flex-col items-center justify-center p-4">
        {todos?.map((e) => (
          <TodoCard
            key={e.id}
            checkState={e.checkState}
            description={e.description}
            title={e.title}
            id={e.id}
          />
        ))}
      </div>
    </section>
  );
};

export default TodoList;
