import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
	return (
		<div className="w-full border-b border-[#2D2D2D] bg-black">
			<div className="py-4 flex flex-row justify-between w-[85%] mx-auto items-center border-bottom">
				<Link href={'/'}>
					<div className="flex flex-row gap-2">
						<Image src='/images/logo.svg' alt='logo' width={22} height={22}/>
						{/* <span className="text-white text-md">OneClick</span> */}
						<span className="text-md text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white hover:from-white hover:via-[#b2dada] hover:to-[#96dcd4]">Thaara AI</span>
					</div>
				</Link>
				<Link href={'mailto:siddarthreddygsr@gmail.com'}> <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white hover:from-white hover:via-[#b2dad5] hover:to-[#a3dad4] text-sm">Contact</span> </Link>
			</div>
		</div>
	)
};

export default Navbar