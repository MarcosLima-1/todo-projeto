"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { FaEllipsisVertical } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { changeCheckState, deleteTodo, editTodo } from "@/actions/todos";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "@/schemas/zod/zod-schemas";
import { toast } from "sonner";
export const TodoCard = ({ title, description, id, checkState, todoUpdate, ...props }) => {
  const [checkValue, setCheckValue] = useState(checkState);
  const [todoId, setTodoId] = useState(0);
  const [isPending, startTransition] = useTransition();

  const checkbox = (values) => {
    if (values) {
      setCheckValue(true);
      changeCheckState(id, true);
      todoUpdate();
      return;
    }
    setCheckValue(false);
    changeCheckState(id, false);
    todoUpdate();
  };
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values) {
    startTransition(() => {
      editTodo(values, todoId);
      todoUpdate();
    });
  }

  return (
    <label
      {...props}
      htmlFor={id}
      className={`relative border shadow-md rounded-lg flex gap-5 items-center justify-between p-4 cursor-pointer w-full max-w-[600px] max-h-[100px]${
        checkValue ? " bg-slate-300 tex" : " bg-slate-100"
      }`}
    >
      <Checkbox
        id={id}
        className="h-5 w-5"
        checked={checkValue}
        onCheckedChange={(e) => checkbox(e, id)}
      />
      <div className="w-[90%]">
        <h1
          className={`font-extrabold text-xl max-md:text-lg ${
            checkValue ? "line-through text-secondary-foreground" : "text-primary"
          }`}
        >
          {title}
        </h1>
        {description && (
          <p
            className={`text-balance text-sm break-all ${
              checkValue ? "line-through" : "text-secondary-foreground"
            }`}
          >
            {description}
          </p>
        )}
      </div>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <FaEllipsisVertical className="w-[30px] h-[30px] hover:bg-slate-100 p-1 rounded-md" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Info</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer">Editar</DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem
              onClick={() => {
                deleteTodo(id);
                toast("Tarefa apagada");
                todoUpdate();
              }}
              className="cursor-pointer text-destructive"
            >
              Apagar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editando Card: {title}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form className="flex w-full flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="Title"
                          maxLength={32}
                          className="w-full bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="Description"
                          maxLength={256}
                          className="w-full bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    todoUpdate();
                    setTodoId(id);
                  }}
                  disabled={isPending}
                  type="submit"
                >
                  Atualizar
                </Button>
              </DialogClose>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </label>
  );
};
