import {NavItemType} from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";


const demoChildMenus: NavItemType[] = [
	{
		id: ncNanoId(),
		href: "/",
		name: "Todos nuestros eventos",
	},
	{
		id: ncNanoId(),
		href: "/",
		name: "Mis Tickets",
		isNew: true,
	},
	{
		id: ncNanoId(),
		href: "/",
		name: "Mis eventos",
		isNew: true,
	},
];

export const NAVIGATION: NavItemType[] = [
	{
		id: ncNanoId(),
		href: "/",
		name: "Eventos",
		type: "dropdown",
		children: demoChildMenus,
		isNew: true,
	},
	{
		id: ncNanoId(),
		href: "/",
		name: "Social",
		type: "dropdown",
		children: demoChildMenus,
		isNew: true,
	},
	// {
	// 	id: ncNanoId(),
	// 	href: "/",
	// 	name: "Iniciar sesión",
	// 	type: "dropdown",
	// 	children: demoChildMenus,
	// 	isNew: true,
	// },
]