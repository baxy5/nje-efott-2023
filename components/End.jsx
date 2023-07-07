import Image from "next/image";

const End = () => {
  return (
    <div className="absolute lost-background top-0 left-0 w-full h-screen flex justify-center items-center">
      <div className="bg-[#CEB239] text-white p-24 rounded-md text-center">
        <div className="flex justify-center">
          <Image src="/beerlogo.png" width={128} height={128} alt="" />
        </div>
        <h1 className="text-[64px] font-bold">Vége!</h1>
        <p className="text-2xl font-bold">Köszönjük, hogy játszottatok!</p>
        <p className="text-4xl font-bold">
          Nyomjátok meg az after-t, HAJRÁ NJE!
        </p>
      </div>
    </div>
  );
};

export default End;
