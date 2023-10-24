import {EventInterface} from "@/interfaces";
import Badge from "@/shared/Badge";
import Link from "next/link";
import React,{FC} from "react";
import GallerySlider from "./GallerySlider";
import BtnLikeIcon from "./BtnLikeIcon";

export interface EventCardProps {
	className?: string;
	data: EventInterface;
	size?: "default" | "small";
}

const EventCard: FC<EventCardProps> = ({
	size = "default",
	className = "",
	data,
}) => {
	const {id,title,type,director,isAds,price,thumbnailUrl} = data;
	const url = `/listing-events-detail/${id}`;

	const renderSliderGallery = () => {
		return (
			<div className="relative w-full">
				<GallerySlider
					uniqueID={`StayCard_${id}`}
					ratioClass="aspect-w-4 aspect-h-3 "
					galleryImgs={[thumbnailUrl]}
					href={'/'}
					galleryClass={size === "default" ? undefined : ""}
				/>
				<BtnLikeIcon isLiked={false} className="absolute right-3 top-3 z-[1]" />			</div>
		);
	};

	const renderContent = () => {
		return (
			<div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-1"}>
				<div className={size === "default" ? "space-y-2" : "space-y-1"}>
					<span className="text-sm text-neutral-500 dark:text-neutral-400">
						{type} . {director}
					</span>
					{/* Ads */}
					<div className="flex items-center space-x-2">
						{isAds && <Badge name="ADS" color="green" />}
						<h2
							className={`font-semibold capitalize text-neutral-900 dark:text-white ${size === "default" ? "text-base" : "text-base"
								}`}
						>
							<span className="line-clamp-1">{title}</span>
						</h2>
					</div>
					<div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
						{size === "default" && (
							<svg
								className="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						)}
						<span className="">{type}</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-base font-semibold">
							{price}
							{` `}
							{size === "default" && (
								<span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
									/ ticket
								</span>
							)}
						</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`nc-StayCard group relative bg-white dark:bg-neutral-900 ${size === "default"
				? "border border-neutral-100 dark:border-neutral-800 "
				: ""
				} rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
			data-nc-id="EventCard">
			{renderSliderGallery()}

			<Link href={{
				pathname: url
			}}

			>{renderContent()}</Link>
		</div>
	);
}

export default EventCard;