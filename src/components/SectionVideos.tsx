"use client";

import Heading from "@/shared/Heading";
import NcPlayIcon from "@/shared/NcPlayIcon";
import NcPlayIcon2 from "@/shared/NcPlayIcon2";
import Image from "next/image";
import React, { FC, useState } from "react";

export interface VideoType {
  id: string;
  title: string;
  thumbnail: string;
}

export interface SectionVideosProps {
  videos?: VideoType[];
  className?: string;
}

const VIDEOS_DEMO: VideoType[] = [
  {
    id: "tBF2ppe2WQ4",
    title: "Centro cultural el Hormiguero",
    thumbnail:
      "https://static.wixstatic.com/media/383a97_d8d3bc81c9244e8dba983fd4891c3cba~mv2.jpg/v1/fill/w_679,h_720,al_c,q_85,enc_auto/383a97_d8d3bc81c9244e8dba983fd4891c3cba~mv2.jpg",
  },
  {
    id: "6Uht8T-7DnE",
    title: "Así se vivió el taller de la risa y la caricia",
    thumbnail:
      "https://static.wixstatic.com/media/383a97_760a1de9729d45b98a07f711ff7ac722~mv2.png/v1/crop/x_0,y_303,w_1650,h_602/fill/w_1080,h_394,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/LOGO%205%20A%C3%91OS_Mesa%20de%20trabajo%201.png",
  },
  {
    id: "swRfcP81fls",
    title: "💚El Hormiguero Colectivo presenta:Instrucciones para armar una esperanza",
    thumbnail:
      "https://static.wixstatic.com/media/383a97_760a1de9729d45b98a07f711ff7ac722~mv2.png/v1/crop/x_0,y_303,w_1650,h_602/fill/w_1080,h_394,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/LOGO%205%20A%C3%91OS_Mesa%20de%20trabajo%201.png",
  },
  {
    id: "swRfcP81fls",
    title: "💚El Hormiguero Colectivo presenta:Instrucciones para armar una esperanza",
    thumbnail:
      "https://static.wixstatic.com/media/383a97_760a1de9729d45b98a07f711ff7ac722~mv2.png/v1/crop/x_0,y_303,w_1650,h_602/fill/w_1080,h_394,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/LOGO%205%20A%C3%91OS_Mesa%20de%20trabajo%201.png",
  },
  {
    id: "EMf0G7eEw-0",
    title: "💚Estos son los testimonios del público que ya disfruto de INSTRUCCIONES PARA ARMAR UNA ESPERANZA",
    thumbnail:
      "https://static.wixstatic.com/media/383a97_760a1de9729d45b98a07f711ff7ac722~mv2.png/v1/crop/x_0,y_303,w_1650,h_602/fill/w_1080,h_394,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/LOGO%205%20A%C3%91OS_Mesa%20de%20trabajo%201.png",
  },
];

const SectionVideos: FC<SectionVideosProps> = ({
  videos = VIDEOS_DEMO,
  className = "",
}) => {
  const [isPlay, setIsPlay] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);

  const renderMainVideo = () => {
    const video: VideoType = videos[currentVideo];
    return (
      <div
        className="group aspect-w-16 aspect-h-16 sm:aspect-h-9 bg-neutral-800 rounded-3xl overflow-hidden border-4 border-white dark:border-neutral-900 sm:rounded-[50px] sm:border-[10px] will-change-transform"
        title={video.title}
      >
        {isPlay ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <>
            <div
              onClick={() => setIsPlay(true)}
              className="cursor-pointer absolute inset-0 flex items-center justify-center z-10"
            >
              <NcPlayIcon />
            </div>

            <Image
              fill
              className="object-cover w-full h-full transform transition-transform group-hover:scale-105 duration-300 "
              src={video.thumbnail}
              title={video.title}
              alt={video.title}
              sizes="(max-width: 1000px) 100vw,
                (max-width: 1200px) 75vw,
                50vw"
            />
          </>
        )}
      </div>
    );
  };

  const renderSubVideo = (video: VideoType, index: number) => {
    if (index === currentVideo) return null;
    return (
      <div
        className="group relative aspect-h-16 aspect-w-16 rounded-2xl cursor-pointer overflow-hidden sm:aspect-h-12 sm:rounded-3xl lg:aspect-h-9 "
        onClick={() => {
          setCurrentVideo(index);
          !isPlay && setIsPlay(true);
        }}
        title={video.title}
        key={String(index)}
      >
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <NcPlayIcon2 />
        </div>
        <Image
          fill
          className="object-cover w-full h-full transform transition-transform group-hover:scale-110 duration-300 "
          src={video.thumbnail}
          title={video.title}
          alt={video.title}
          sizes="(max-width: 300px) 100vw,
          (max-width: 1200px) 50vw,
          25vw"
        />
      </div>
    );
  };

  return (
    <div className={`nc-SectionVideos ${className}`}>
      <Heading
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed"
      >
        🎬 Videoteca
      </Heading>

      <div className="flex flex-col relative sm:pr-4 sm:py-4 md:pr-6 md:py-6 xl:pr-14 xl:py-14 lg:flex-row">
        <div className="absolute -top-4 -bottom-4 -right-4 w-2/3 rounded-3xl bg-primary-100 bg-opacity-40 z-0 sm:rounded-[50px] md:top-0 md:bottom-0 md:right-0 xl:w-1/2 dark:bg-neutral-800 dark:bg-opacity-40"></div>
        <div className="flex-grow relative pb-2 sm:pb-4 lg:pb-0 lg:pr-5 xl:pr-6">
          {renderMainVideo()}
        </div>
        <div className="flex-shrink-0 grid gap-2 grid-cols-4 sm:gap-6 lg:grid-cols-1 lg:w-36 xl:w-40">
          {videos.map(renderSubVideo)}
        </div>
      </div>
    </div>
  );
};

export default SectionVideos;
