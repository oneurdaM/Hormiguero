import React,{FC} from "react";
import rightImgDemo from "@/images/BecomeAnAuthorImg.png";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import imageUrl from '@/images/logo.png'

export interface SectionBecomeAnAuthorProps {
  className?: string;
  rightImg?: string;
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
  className = "",
  rightImg = rightImgDemo,
}) => {
  return (
    <div
      className={`nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center  ${className}`}
      data-nc-id="SectionBecomeAnAuthor"
    >
      <div className="flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
        {/* <Logo className="w-20" /> */}
        <div className="w-[480px] rounded-lg">
          <Image alt="" src={imageUrl} width={200} height={200} />
        </div>

        <h2 className="font-semibold text-3xl sm:text-4xl mt-6 sm:mt-11">
          Mundo Hormiga
        </h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400">
          Somos mucho más que una comunidad de profesionales en diversas disciplinas.
          Somos un reflejo de la unión, la confianza, la integridad y el crecimiento colectivo.
          Aquí, el trabajo en equipo es nuestra brújula y la solidaridad nuestra fuerza impulsora.
        </span>
        <ButtonPrimary className="mt-6 sm:mt-11">
          Leer más
        </ButtonPrimary>
      </div>
      <div className="flex-grow">
        <Image alt="" src={rightImg} />
      </div>
    </div>
  );
};

export default SectionBecomeAnAuthor;
