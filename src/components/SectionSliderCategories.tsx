"use client";

import React,{FC,useEffect,useState} from "react";
import {useWindowSize} from "react-use";
import CardCategory3 from "@/components/CardCategory3";
import {TaxonomyType} from "@/data/types";
import CardCategory4 from "@/components/CardCategory4";
import CardCategory5 from "@/components/CardCategory5";
import {AnimatePresence,motion,MotionConfig} from "framer-motion";
import {useSwipeable} from "react-swipeable";
import PrevBtn from "./PrevBtn";
import NextBtn from "./NextBtn";
import {variants} from "@/utils/animationVariants";
import Heading from "@/shared/Heading";
import {useEventsQuery} from '@/data/events';

export interface SectionSliderNewCategoriesProps {
	className?: string;
	itemClassName?: string;
	heading?: string;
	subHeading?: string;
	categories?: TaxonomyType[];
	categoryCardType?: "card3" | "card4" | "card5";
	itemPerRow?: 4 | 5;
	sliderStyle?: "style1" | "style2";
}

const DEMO_CATS: TaxonomyType[] = [
	{
		id: "1",
		href: "/",
		name: "Bazar Hormiga",
		taxonomy: "category",
		count: 14,
		thumbnail:
			"https://static.wixstatic.com/media/383a97_9b2d5f8b7e504022bef26eb187196338~mv2.png/v1/fill/w_652,h_1270,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/383a97_9b2d5f8b7e504022bef26eb187196338~mv2.png",
	},
	{
		id: "2",
		href: "/",
		name: "El circo de los enamorados",
		taxonomy: "category",
		count: 20,
		thumbnail:
			"https://static.wixstatic.com/media/383a97_b7ca1fabe9784d0dbe0b8a0944e9ced0~mv2.png/v1/fill/w_654,h_1270,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/383a97_b7ca1fabe9784d0dbe0b8a0944e9ced0~mv2.png",
	},
	{
		id: "3",
		href: "/",
		name: "Raziel",
		taxonomy: "category",
		count: 32,
		thumbnail:
			"https://static.wixstatic.com/media/383a97_e2270e6e0c3545dbb1d07af07e691267~mv2.png/v1/fill/w_760,h_950,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/383a97_e2270e6e0c3545dbb1d07af07e691267~mv2.png",
	},
	{
		id: "4",
		href: "/",
		name: "4to Rally por los Derechos Culturales",
		taxonomy: "category",
		count: 12,
		thumbnail:
			"https://static.wixstatic.com/media/383a97_7a82423ac6fd4199af37567878f647e9~mv2.png/v1/fill/w_760,h_950,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/383a97_7a82423ac6fd4199af37567878f647e9~mv2.png",
	},
	{
		id: "5",
		href: "/",
		name: "Dulces Compañias",
		taxonomy: "category",
		count: 21,
		thumbnail:
			"https://static.wixstatic.com/media/383a97_b7ca1fabe9784d0dbe0b8a0944e9ced0~mv2.png/v1/fill/w_654,h_1270,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/383a97_b7ca1fabe9784d0dbe0b8a0944e9ced0~mv2.png",
	}
];

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
	heading = "Nuestra cartelera",
	subHeading = "Estos son los eventos que tenemos para ti",
	className = "",
	itemClassName = "",
	categories = DEMO_CATS,
	itemPerRow = 5,
	categoryCardType = "card3",
	sliderStyle = "style1",
}) => {
	// const {data} = useEventsQuery({})
	// console.log(data)

	const [currentIndex,setCurrentIndex] = useState(0);
	const [direction,setDirection] = useState(0);
	const [numberOfItems,setNumberOfitem] = useState(0);

	const windowWidth = useWindowSize().width;
	useEffect(() => {
		if (windowWidth < 320) {
			return setNumberOfitem(1);
		}
		if (windowWidth < 500) {
			return setNumberOfitem(itemPerRow - 3);
		}
		if (windowWidth < 1024) {
			return setNumberOfitem(itemPerRow - 2);
		}
		if (windowWidth < 1280) {
			return setNumberOfitem(itemPerRow - 1);
		}

		setNumberOfitem(itemPerRow);
	},[itemPerRow,windowWidth]);

	function changeItemId(newVal: number) {
		if (newVal > currentIndex) {
			setDirection(1);
		} else {
			setDirection(-1);
		}
		setCurrentIndex(newVal);
	}

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (currentIndex < categories?.length - 1) {
				changeItemId(currentIndex + 1);
			}
		},
		onSwipedRight: () => {
			if (currentIndex > 0) {
				changeItemId(currentIndex - 1);
			}
		},
		trackMouse: true,
	});

	const renderCard = (item: TaxonomyType) => {
		switch (categoryCardType) {
			case "card3":
				return <CardCategory3 taxonomy={item} />;
			case "card4":
				return <CardCategory4 taxonomy={item} />;
			case "card5":
				return <CardCategory5 taxonomy={item} />;
			default:
				return <CardCategory3 taxonomy={item} />;
		}
	};

	if (!numberOfItems) return null;

	return (
		<div className={`nc-SectionSliderNewCategories ${className}`}>
			<Heading desc={subHeading} isCenter={sliderStyle === "style2"}>
				{heading}
			</Heading>
			<MotionConfig
				transition={{
					x: {type: "spring",stiffness: 300,damping: 30},
					opacity: {duration: 0.2},
				}}
			>
				<div className={`relative flow-root`} {...handlers}>
					<div className={`flow-root overflow-hidden rounded-xl`}>
						<motion.ul
							initial={false}
							className="relative whitespace-nowrap -mx-2 xl:-mx-4"
						>
							<AnimatePresence initial={false} custom={direction}>
								{categories.map((item,indx) => (
									<motion.li
										className={`relative inline-block px-2 xl:px-4 ${itemClassName}`}
										custom={direction}
										initial={{
											x: `${(currentIndex - 1) * -100}%`,
										}}
										animate={{
											x: `${currentIndex * -100}%`,
										}}
										variants={variants(200,1)}
										key={indx}
										style={{
											width: `calc(1/${numberOfItems} * 100%)`,
										}}
									>
										{renderCard(item)}
									</motion.li>
								))}
							</AnimatePresence>
						</motion.ul>
					</div>

					{currentIndex ? (
						<PrevBtn
							style={{transform: "translate3d(0, 0, 0)"}}
							onClick={() => changeItemId(currentIndex - 1)}
							className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -left-3 xl:-left-6 top-1/3 -translate-y-1/2 z-[1]"
						/>
					) : null}

					{categories.length > currentIndex + numberOfItems ? (
						<NextBtn
							style={{transform: "translate3d(0, 0, 0)"}}
							onClick={() => changeItemId(currentIndex + 1)}
							className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -right-3 xl:-right-6 top-1/3 -translate-y-1/2 z-[1]"
						/>
					) : null}
				</div>
			</MotionConfig>
		</div>
	);
};

export default SectionSliderNewCategories;
