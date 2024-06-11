export const MiniCard = ({ name, number }) => {
  return (
    <div className="flex h-[32px]">
      <p className="bg-white  rounded-l-lg p-2 flex items-center justify-between">{name}:</p>
      <span className="bg-black rounded-r-lg p-2 text-white flex items-center justify-between font-semibold">
        {number}
      </span>
    </div>
  );
};

const TodoCounts = ({ todos }) => {
  return (
    <div className="flex gap-4">
      <MiniCard
        name="Restantes"
        number={todos?.filter((todo) => todo.checkState !== true).length || 0}
      />
      <MiniCard
        name="Completos"
        number={todos?.filter((todo) => todo.checkState !== false).length || 0}
      />
      <MiniCard name="Total" number={todos?.length || 0} />
    </div>
  );
};

export default TodoCounts;
