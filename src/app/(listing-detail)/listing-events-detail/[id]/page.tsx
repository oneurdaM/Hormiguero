"use client";


import {Route} from "next";
import Image from "next/image";

import LikeSaveBtns from "@/components/LikeSaveBtns";
import StartRating from "@/components/StartRating";
import Avatar from "@/shared/Avatar";
import Badge from "@/shared/Badge";
import {usePathname,useRouter} from "next/navigation";
import {PHOTOS} from "../constant";
import ButtonSecondary from "@/shared/ButtonSecondary";
import ButtonCircle from "@/shared/ButtonCircle";
import {ArrowRightIcon,Squares2X2Icon} from "@heroicons/react/24/solid";
import Input from "@/shared/Input";
import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import ButtonPrimary from "@/shared/ButtonPrimary";
import GuestsInput from "@/(client-components)/(heroSearchForm)/GuestsInput";
import {useEventQuery} from "@/data/events";

const ListingDetailPage = () => {
	const id = "11";
	const {data,isLoading,error} = useEventQuery({id});


	const thisPathname = usePathname();
	const router = useRouter();

	const handleOpenModalImageGallery = () => {
		router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
	};

	const renderSection1 = () => {
		return (
			<div className="listingSection__wrap !space-y-6">
				{/* 1 */}
				<div className="flex justify-between items-center">
					<Badge name="Wooden house" />
					<LikeSaveBtns />
				</div>

				{/* 2 */}

				<h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
					{
						isLoading ? "Loading..." : error ? "An error has occurred: " + error.message : data?.title
					}
				</h2>

				{/* 3 */}
				<div className="flex items-center space-x-4">
					<StartRating />
					<span>·</span>
					<span>
						<i className="las la-map-marker-alt"></i>
						<span className="ml-1">{data?.dramaturgy}</span>
					</span>
				</div>

				{/* 4 */}
				<div className="flex items-center">
					<Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
					<span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
						Director {" "}
						<span className="text-neutral-900 dark:text-neutral-200 font-medium">
							{data?.director}
						</span>
					</span>
				</div>
			</div>
		);
	};

	const renderSection2 = () => {
		return (
			<div className="listingSection__wrap">
				<h2 className="text-2xl font-semibold">Sinopsis</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				<div className="text-neutral-6000 dark:text-neutral-300">
					<span>
						{data?.synopsis}
					</span>
				</div>
			</div>
		);
	};

	const renderSection5 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Director</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* host */}
				<div className="flex items-center space-x-4">
					<Avatar
						hasChecked
						hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
						sizeClass="h-14 w-14"
						radius="rounded-full"
					/>
					<div>
						<a className="block text-xl font-medium" href="##">
							{data?.director}
						</a>
						<div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
							<StartRating />
							<span className="mx-2">·</span>
							<span> 12 eventos</span>
						</div>
					</div>
				</div>

				{/* desc */}
				<span className="block text-neutral-6000 dark:text-neutral-300">
					....
				</span>

				{/* info */}
				<div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
					<div className="flex items-center space-x-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						<span>Registrado en 2023</span>
					</div>
					<div className="flex items-center space-x-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
							/>
						</svg>
						<span>
							Eventos <span className="font-medium">12</span>
						</span>
					</div>
					<div className="flex items-center space-x-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>

						<span>
							Profesional
						</span>
					</div>
				</div>

				{/* == */}
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				<div>
					<ButtonSecondary href="/">Más información</ButtonSecondary>
				</div>
			</div>
		);
	};

	const renderSection6 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Reseñas (23 reseñas)</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* Content */}
				<div className="space-y-5">
					<FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
					<div className="relative">
						<Input
							fontClass=""
							sizeClass="h-16 px-4 py-3"
							rounded="rounded-3xl"
							placeholder="Comenta algo..."
						/>
						<ButtonCircle
							className="absolute right-2 top-1/2 transform -translate-y-1/2"
							size=" w-12 h-12 "
						>
							<ArrowRightIcon className="w-5 h-5" />
						</ButtonCircle>
					</div>
				</div>

				{/* comment */}
				<div className="divide-y divide-neutral-100 dark:divide-neutral-800">
					<div className="pt-8">
						<ButtonSecondary>Ver más</ButtonSecondary>
					</div>
				</div>
			</div>
		);
	};

	const renderSection7 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<div>
					<h2 className="text-2xl font-semibold">Mapa</h2>
					<span className="block mt-2 text-neutral-500 dark:text-neutral-400">
						Centro Cultural el Hormiguero
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* MAP */}
				<div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
					<div className="rounded-xl overflow-hidden z-0">
						<iframe
							width="100%"
							height="100%"
							loading="lazy"
							allowFullScreen
							referrerPolicy="no-referrer-when-downgrade"
							src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY&q=Eiffel+Tower,Paris+France"
						></iframe>
					</div>
				</div>
			</div>
		);
	};

	const renderSection8 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Cosas que debes saber</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					<h4 className="text-lg font-semibold">Políticas de devolución</h4>
					<span className="block mt-3 text-neutral-500 dark:text-neutral-400">
						Refund 50% of the booking value when customers cancel the room
						within 48 hours after successful booking and 14 days before the
						check-in time. <br />
						Then, cancel the room 14 days before the check-in time, get a 50%
						refund of the total amount paid (minus the service fee).
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					<h4 className="text-lg font-semibold">Check-in time</h4>
					<div className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm sm:text-base">
						<div className="flex space-x-10 justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
							<span>Check-in</span>
							<span>08:00 am - 12:00 am</span>
						</div>
						<div className="flex space-x-10 justify-between p-3">
							<span>Check-out</span>
							<span>02:00 pm - 04:00 pm</span>
						</div>
					</div>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					<h4 className="text-lg font-semibold">Nota</h4>
					<div className="prose sm:prose">
						<ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
							<li>
								Alimentos y bebidas no incluidos en el precio de la entrada.
							</li>
							<li>
								No se permite el ingreso de alimentos y bebidas al teatro.
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	};

	const renderSidebar = () => {
		return (
			<div className="listingSectionSidebar__wrap shadow-xl">
				{/* PRICE */}
				<div className="flex justify-between">
					<span className="text-3xl font-semibold">
						${data?.price}
						<span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
							/ticket
						</span>
					</span>
					<StartRating />
				</div>

				{/* FORM */}
				<form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
					{/* <StayDatesRangeInput className="flex-1 z-[11]" /> */}
					<div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
					<GuestsInput className="flex-1" />
				</form>

				{/* SUM */}
				<div className="flex flex-col space-y-4">
					<div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
						<span>${data?.price} x 3 ticket</span>
						<span>${data?.price ?? 1 * 3}</span>
					</div>
					<div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
						<span>Cargo por servicio</span>
						<span>$0</span>
					</div>
					<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
					<div className="flex justify-between font-semibold">
						<span>Total</span>
						<span>$199</span>
					</div>
				</div>

				{/* SUBMIT */}
				<ButtonPrimary href={"/"}>Reservar</ButtonPrimary>
			</div>
		);
	};

	return (
		<div className="nc-ListingStayDetailPage">
			{/*  HEADER */}
			<header className="rounded-md sm:rounded-xl">
				<div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
					<div
						className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
						onClick={handleOpenModalImageGallery}
					>
						<Image
							fill
							className="object-cover rounded-md sm:rounded-xl"
							src={data?.thumbnailUrl || PHOTOS[0]}
							alt=""
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
						/>
						<div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
					</div>
					{PHOTOS.filter((_,i) => i >= 1 && i < 5).map((item,index) => (
						<div
							key={index}
							className={`relative rounded-md sm:rounded-xl overflow-hidden ${index >= 3 ? "hidden sm:block" : ""
								}`}
						>
							<div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
								<Image
									fill
									className="object-cover rounded-md sm:rounded-xl "
									src={item || ""}
									alt=""
									sizes="400px"
								/>
							</div>
							{/* over */}
							<div
								className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
								onClick={handleOpenModalImageGallery}
							/>
						</div>
					))}

					<button
						className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
						onClick={handleOpenModalImageGallery}
					>
						<Squares2X2Icon className="w-5 h-5" />
						<span className="ml-2 text-neutral-800 text-sm font-medium">
							Ver todas las fotos
						</span>
					</button>
				</div>
			</header>

			{/* MAIN */}
			<main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
				{/* CONTENT */}
				<div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
					{renderSection1()}
					{renderSection2()}
					{/* <SectionDateRange /> */}
					{renderSection5()}
					{renderSection6()}
					{renderSection7()}
					{renderSection8()}
				</div>

				{/* SIDEBAR */}
				<div className="hidden lg:block flex-grow mt-14 lg:mt-0">
					<div className="sticky top-28">{renderSidebar()}</div>
				</div>
			</main>
		</div>
	);
}

export default ListingDetailPage;