const Footer = () => {
  return (
    <footer className="bg-slate-900 md:h-[250px]">
      <div className=" max-lg:pt-9 max-lg:pb-9 text-white grid w-[80%] mx-auto md:grid-cols-3 gap-10 items-center justify-around h-full">
        <div className="w-[300px] flex flex-col  gap-6">
          <a href="/" className="w-fit font-extrabold text-3xl">
            LifeManager
          </a>
          <p className="text-balance text-lg break-words">
            Seu Guia para uma Vida Mais Organizada e Produtiva
          </p>
        </div>
        <div></div>
        <div></div>
      </div>
    </footer>
  );
};

export default Footer;
