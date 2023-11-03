'use client'
import React from 'react'

import Logo from '@/shared/Logo'
import SocialsList1 from '@/shared/SocialsList1'
import { useVisit } from '@/data/visits'

// import FooterNav from "./FooterNav";
// import {CustomLink} from "@/data/types";

// export interface WidgetFooterMenu {
//   id: string;
//   title: string;
//   menus: CustomLink[];
// }

// const widgetMenus: WidgetFooterMenu[] = [
//   {
//     id: "5",
//     title: "Getting started",
//     menus: [
//       {href: "#",label: "Installation"},
//       {href: "#",label: "Release Notes"},
//       {href: "#",label: "Upgrade Guide"},
//       {href: "#",label: "Browser Support"},
//       {href: "#",label: "Editor Support"},
//     ],
//   },
//   {
//     id: "1",
//     title: "Explore",
//     menus: [
//       {href: "#",label: "Design features"},
//       {href: "#",label: "Prototyping"},
//       {href: "#",label: "Design systems"},
//       {href: "#",label: "Pricing"},
//       {href: "#",label: "Security"},
//     ],
//   },
//   {
//     id: "2",
//     title: "Resources",
//     menus: [
//       {href: "#",label: "Best practices"},
//       {href: "#",label: "Support"},
//       {href: "#",label: "Developers"},
//       {href: "#",label: "Learn design"},
//       {href: "#",label: "Releases"},
//     ],
//   },
//   {
//     id: "4",
//     title: "Community",
//     menus: [
//       {href: "#",label: "Discussion Forums"},
//       {href: "#",label: "Code of Conduct"},
//       {href: "#",label: "Community Resources"},
//       {href: "#",label: "Contributing"},
//       {href: "#",label: "Concurrent Mode"},
//     ],
//   },
// ];

const Footer = () => {
  // const renderWidgetMenuItem = (menu: WidgetFooterMenu,index: number) => {
  //   return (
  //     <div key={index} className="text-sm">
  //       <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
  //         {menu.title}
  //       </h2>
  //       <ul className="mt-5 space-y-4">
  //         {menu.menus.map((item,index) => (
  //           <li key={index}>
  //             <a
  //               key={index}
  //               className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
  //               href={item.href}
  //             >
  //               {item.label}
  //             </a>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // };
  const storedVisits = localStorage.getItem('visits');
  const visits = storedVisits !== null ? parseInt(storedVisits) + 1 : 1;
  
  return (
    <>
      {/* <FooterNav /> */}

      <div className="nc-Footer relative py-4 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5">
          <div className="grid grid-cols-4 gap-5 col-span-2">
            <div className="col-span-2">
              <Logo />
            </div>
            <div className="col-span-2 flex items-center justify-between">
              <SocialsList1 className="flex items-center space-x-3 " />
              <span className="hidden md:block text-sm">
                Visitado {visits.toString()} veces
              </span>
            </div>
          </div>
          {/* {widgetMenus.map(renderWidgetMenuItem)} */}
        </div>
      </div>
    </>
  )
}

export default Footer
