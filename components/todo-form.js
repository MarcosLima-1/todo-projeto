"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/schemas/zod/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useTransition } from "react";
import { CreateTodo } from "@/actions/todos";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { setCurrentTemplate } from "@/actions/templates";

const TodoForm = () => {
  const [isPending, startTransition] = useTransition();
  // if (!localStorage.getItem("to-dos")) {setCurrentTemplate("to-dos");}
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values) {
    startTransition(() => {
      CreateTodo(values);
    });
  }
  return (
    <Dialog>
      <h1 className="font-bold font text-3xl text-white">Crie seu Todo Aqui</h1>
      <DialogTrigger className="h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90">
        Criar
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crie seu todo agora</DialogTitle>
        </DialogHeader>
        <section>
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
              <Button disabled={isPending} type="submit">
                Criar
              </Button>
            </form>
          </Form>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default TodoForm;
