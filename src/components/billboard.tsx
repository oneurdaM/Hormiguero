import {InformationCircleIcon} from '@heroicons/react/24/outline';
// import PlayButton from './ui/play-button';

const Billboard: React.FC = () => {
	return (
		<div className="relative h-[56.25vw] w-full">
			<video poster={'https://static.wixstatic.com/media/383a97_03a90a95037a479bb97906eb994619b3f000.jpg/v1/fill/w_901,h_482,al_c,q_85,usm_0.33_1.00_0.00,enc_auto/383a97_03a90a95037a479bb97906eb994619b3f000.jpg'} className="w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500" autoPlay muted loop src={"https://video.wixstatic.com/video/383a97_03a90a95037a479bb97906eb994619b3/720p/mp4/file.mp4"}></video>
			<div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
				<p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
					Hormiguero
				</p>
				<p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
					Centro cultural
				</p>
				<div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
					{/* <PlayButton movieId={"1"} /> */}
					<button
						// onClick={() => { }}
						className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2  px-2 md:px-4 w-auto  text-xs lg:text-lg  font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
					>
						<InformationCircleIcon className="w-4 md:w-7 mr-1" />
						More Info
					</button>
				</div>
			</div>
		</div>
	)
}
export default Billboard;
