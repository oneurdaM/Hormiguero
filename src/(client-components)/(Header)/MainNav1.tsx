import React,{FC} from "react";

import Logo from "@/components/ui/logo";
import ButtonPrimary from "@/components/ui/primary-button";
import SwitchDarkMode from "@/shared/SwitchDarkMode";
import MenuBar from "@/shared/MenuBar";

export interface MainNav1Props {
	className?: string;
}

const MainNav1: FC<MainNav1Props> = ({className = ""}) => {
	return (
		<div className={`nc-MainNav1 relative z-10 ${className}`}>
			<div className="px-4 lg:container h-20 relative flex justify-between">
				<div className="hidden md:flex justify-start flex-1 space-x-4 sm:space-x-10">
					<Logo className="w-24 self-center" />
				</div>

				<div className="hidden md:flex flex-shrink-0 justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
					<ButtonPrimary className="self-center mr-4" href="/login">
							Iniciar sesión
						</ButtonPrimary>
						 <SwitchDarkMode />
						<MenuBar />
				</div>
			</div>
		</div>
	);
};

export default MainNav1;
