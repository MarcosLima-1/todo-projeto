import { Button } from "@/components/ui/button";
import {
  addTemplate,
  deleteTemplate,
  editTemplate,
  selectCurrentTemplate,
} from "@/actions/templates";
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
import { Input } from "../../../components/ui/input";
import { templateSchema } from "@/schemas/zod/zod-schemas";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
const ToggleButton = ({ template, value, checked = false, label, editable, id, newName }) => {
  const [isPending, startTransition] = useTransition();
  const [oldName, setOldName] = useState("");
  const [templateId, setTemplateId] = useState("");

  const form = useForm({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values) {
    startTransition(() => {
      values.oldName = oldName;
      values.id = templateId;
      editTemplate(values);
    });
  }
  return (
    <Dialog>
      <ContextMenu className="w-full">
        <ContextMenuTrigger className="w-full flex items-center">
          <Button
            onClick={() => {
              selectCurrentTemplate(template);
            }}
            className={`w-full ${checked ? "bg-white text-black hover:bg-emerald-100" : ""}`}
            value={value}
          >
            {label}
          </Button>
        </ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuLabel>
            {`${value.substring(0, 10)} ${value.length > 10 ? "..." : ""}`}
          </ContextMenuLabel>
          <ContextMenuSeparator />
          {!editable && (
            <>
              <DialogTrigger asChild>
                <ContextMenuItem>
                  <GoPencil />
                  <p className="ml-2">Renomear</p>
                </ContextMenuItem>
              </DialogTrigger>
              <ContextMenuItem
                onClick={() => deleteTemplate({ value, id, newName })}
                className=" bg-destructive-foreground text-destructive shadow-sm hover:bg-destructive-foreground/90 "
              >
                <FaRegTrashAlt />
                <p className="ml-2">Apagar</p>
              </ContextMenuItem>
            </>
          )}
        </ContextMenuContent>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editando Card: {value}</DialogTitle>
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
                          placeholder="Novo nome"
                          maxLength={32}
                          className="w-full bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                onClick={() => {
                  setTemplateId(id);
                  setOldName(value);
                }}
                disabled={isPending}
                type="submit"
              >
                Atualizar
              </Button>
            </form>
          </Form>
        </DialogContent>
      </ContextMenu>
    </Dialog>
  );
};

export const SideBar = ({ allTemplates, currentTemplate }) => {
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
    <div className=" flex sm:flex-col items-center gap-1 p-1  sm:w-[50px] max-sm:h-[50px] sticky left-0 top-0 bg-slate-800 h-screen sm:overflow-y-scroll max-sm:overflow-x-scroll">
      <div className="flex sm:flex-col gap-1 items-center justify-start w-fit" type="single">
        {allTemplates?.map((e, length) => (
          <ToggleButton
            key={length}
            value={e.name}
            label={e.name.charAt(0).toUpperCase()}
            checked={currentTemplate === e.name ? true : false}
            template={`${e.name}`}
            editable={length === 0 ? true : false}
            id={e.id}
          />
        ))}
      </div>

      <Dialog>
        <DialogTrigger className="w-full text-xl h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border text-primary-foreground shadow hover:bg-emerald-500">
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
