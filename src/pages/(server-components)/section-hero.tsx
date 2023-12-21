import React,{FC} from "react";
import Image from "next/image";
import imagePng from "@/images/logo1.webp";

import ButtonPrimary from "@/components/ui/primary-button";
import HeroSearchForm from "@/(client-components)/(heroSearchForm)/hero-search-form";

export interface SectionHeroProps {
	className?: string;
}

const SectionHero: FC<SectionHeroProps> = ({className = ""}) => {
	return (
		<div
			className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className}`}
		>
			<div className="flex flex-col lg:flex-row lg:items-center">
				<div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0">
					<h2 className="font-medium text-4xl md:text-5xl xl:text-7xl !leading-[114%] ">
						Centro Cultural El Hormiguero
					</h2>
					<span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
						Únete a Mundo Hormiga: Arte, Comunidad, Cambio.
					</span>
					<ButtonPrimary href="/" sizeClass="px-5 py-4 sm:px-7">
						Buscas un evento?
					</ButtonPrimary>
				</div>
				<div className="flex-grow">
					<video poster={'https://static.wixstatic.com/media/383a97_03a90a95037a479bb97906eb994619b3f000.jpg/v1/fill/w_901,h_482,al_c,q_85,usm_0.33_1.00_0.00,enc_auto/383a97_03a90a95037a479bb97906eb994619b3f000.jpg'} className="w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500 rounded-xl" autoPlay muted loop src={"https://video.wixstatic.com/video/383a97_03a90a95037a479bb97906eb994619b3/720p/mp4/file.mp4"}></video>
				</div>
			</div>

			<div className="hidden lg:block z-10 mb-12 lg:mb-0 lg:-mt-40 w-full">
				<HeroSearchForm />
			</div>
		</div>
	);
};

export default SectionHero;