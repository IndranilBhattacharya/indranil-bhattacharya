import Link from "next/link";

const Navigation = () => (
  <header className="w-[1140px] max-w-[80%] mx-auto h-[50px] flex items-center relative z-50">
    <nav>
      <Link href="/" className="text-gray-100 mr-10">
        Home
      </Link>
      <Link href="/contacts" className="text-gray-100 mr-10">
        Contacts
      </Link>
      <Link href="/info" className="text-gray-100">
        Info
      </Link>
    </nav>
  </header>
);

export default Navigation;
