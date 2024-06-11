import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CiLock } from "react-icons/ci";
import { LuFileSignature } from "react-icons/lu";
import { FaArrowTrendUp } from "react-icons/fa6";
const cards = [
  {
    icon: <LuFileSignature className="text-6xl" />,
    title: "Organize Tarefas",
    description: "Gerencie suas tarefas diárias de forma eficiente.",
  },
  {
    icon: <FaArrowTrendUp className="text-6xl" />,
    title: "Defina Metas",
    description: "Estabeleça e acompanhe suas metas pessoais.",
  },
  {
    icon: <CiLock className="text-6xl" />,
    title: "Armazenamento Seguro",
    description: "Mantenha seus dados privados com armazenamento local.",
  },
];
const imageCards = [
  {
    img: "/img/negocio1.jpg",
  },
  {
    img: "/img/negocio2.jpeg",
  },
  {
    img: "/img/negocio3.jpeg",
  },
];

const HomePage = () => {
  return (
    <>
      <section>
        <div className="flex mx-auto w-[90%] h-[600px] justify-around gap-5 items-center ">
          <div className="flex flex-col gap-5 max-w-[400px]">
            <h1 className="text-4xl font-extrabold">
              LifeManager: Simplifique sua Vida e Realize seus Sonhos
            </h1>
            <p className="break-all text-balance text-foreground ">
              Gerencie suas tarefas e metas com facilidade. Alcance seus objetivos com o
              LifeManager.
            </p>
            <Button className="w-fit">abrir cu alex</Button>
          </div>
          <Image
            className="h-auto rounded-lg w-full max-w-[600px]"
            src="/img/hero.jpg"
            width={300}
            height={300}
            alt="Picture of the author"
          />
        </div>
      </section>
      <section className=" bg-slate-100">
        <div className="flex flex-col w-[90%] h-[600px] mx-auto items-center justify-around">
          <h1 className="text-4xl font-bold">Recursos do LifeManager</h1>
          <div className="flex gap-2 items-center justify-around w-full ">
            {cards.map((card) => {
              return (
                <div
                  className="bg-white shadow-md border rounded-md h-[300px] w-[300px] "
                  key={card.title}
                >
                  <div className="flex flex-col h-full items-center justify-center gap-1 p-4 text-center">
                    {card.icon}
                    <div className="flex flex-col items-center gap-1 p-4">
                      <h2 className="text-2xl font-bold">{card.title}</h2>
                      <p className="text-sm text-foreground w-full">{card.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col w-[90%] h-[600px] gap-10 mx-auto items-center justify-center">
          <h1 className="text-4xl font-bold">Impulsione sua Produtividade Empresarial</h1>
          <div className="flex gap-5 items-center justify-center">
            {imageCards.map((image, length) => (
              <Image
                className="h-[400px] rounded-md object-cover shadow-md"
                src={image.img}
                key={length}
                width={250}
                height={400}
                alt="Picture of the author"
              />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col w-[70%] h-[300px] gap-10 mx-auto items-center justify-center">
          <div className=" rounded-lg justify-around flex gap-5 items-center bg-slate-900 w-[100%] h-28 p-7">
            <h1 className="text-4xl font-semibold text-white">
              Dê o Próximo Passo para uma Vida Organizada
            </h1>
            <Button asChild variant="outline">
              <a href="/lista-de-tarefas">Confira agora</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
