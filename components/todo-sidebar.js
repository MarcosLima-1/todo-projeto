"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { addTemplate, getAllTemplates, setCurrentTemplate } from "@/actions/templates";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { templateSchema } from "@/schemas/zod/zod-schemas";
export const SideBar = () => {
  const [allTemplates, setAllTemplates] = useState([]);
  setInterval(() => {
    const localAllTemplates = getAllTemplates();
    setAllTemplates(localAllTemplates);
  }, 1000);

  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values) {
    startTransition(() => {
      addTemplate(values);
    });
  }

  return (
    <div className=" flex flex-col items-center gap-1 p-1  w-[50px] bg-emerald-800 h-full fixed">
      <ToggleGroup className="flex flex-col w-full" type="single">
        <ToggleGroupItem
          onClick={() => {
            setCurrentTemplate("to-dos");
          }}
          className="border w-[85%]"
          value="to-dos"
        >
          T
        </ToggleGroupItem>
        {allTemplates?.map((e, length) => (
          <ToggleGroupItem
            onClick={() => {
              setCurrentTemplate(`${e.name}`);
            }}
            className="border w-[85%]"
            key={length}
            value="e.name"
          >
            {e.name.charAt(0).toUpperCase()}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <Dialog>
        <DialogTrigger className="h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 w-[85%]">
          +
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar um template novo?</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form className="flex w-full flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="Nome do Template"
                          maxLength={16}
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
        </DialogContent>
      </Dialog>
    </div>
  );
};
