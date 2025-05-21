import logo from '@/public/logo.svg'; // Adjust the path as necessary
import Image from 'next/image';
import Link from 'next/link';
const Logo = () => {
    return (
        <div className="lg:flex">
            <Link href="/">
                <Image
                    className="h-6 w-auto"
                    src={logo}
                    alt="Logo"
                    width={100}
                    height={24}
                    priority
                />
            </Link>
        </div>
    );
};

export default Logo;