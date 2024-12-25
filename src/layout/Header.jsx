import { useState } from "react";
import { Heart, Menu, Search, ShoppingCart, UserRound } from "lucide-react";
import { NavLink, useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Gravatar from 'react-gravatar';

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const history = useHistory();

    const user = useSelector((state) => state.client.user);

    const mainPageHandle = () => {
        history.push("/");
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleLoginMenu = () => {
        setIsLoginOpen(!isLoginOpen);
    };

    const categories = {
        kadin: ['Bags', 'Belts', 'Cosmetics', 'Bags', 'Hats'],
        erkek: ['Bags', 'Belts', 'Cosmetics', 'Bags', 'Hats']
    };

    return (
        <div className="font-monts">
            <div className="flex justify-between mt-[40px] mx-[30px] mb-[25px]">
                <div>
                    <button onClick={mainPageHandle}><h3 className="font-bold text-2xl leading-8 tracking-[0.1px] text-[#252B42]">Bandage</h3></button>
                </div>
                <nav className="hidden lg:flex justify-between items-center px-[30px] font-semibold relative">
                    <ul className="flex gap-8 text-gray-500">
                        <NavLink exact to="/" activeClassName="selected" className="hover:text-black">Home</NavLink>
                        <div className="relative group">
                            <button className="hover:text-black flex items-center gap-1 py-2">
                                Shop
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute hidden group-hover:block top-full left-0 mt-1 w-[400px] bg-white border rounded-lg shadow-lg z-50">
                                <div className="p-6 grid grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="font-bold text-lg mb-4 text-gray-800">Kadın</h3>
                                        <ul className="space-y-3">
                                            {categories.kadin.map((category, index) => (
                                                <li key={index}>
                                                    <Link
                                                        to={`/shop/kadin/${category.toLowerCase()}`}
                                                        className="text-gray-600 hover:text-black"
                                                    >
                                                        {category}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-4 text-gray-800">Erkek</h3>
                                        <ul className="space-y-3">
                                            {categories.erkek.map((category, index) => (
                                                <li key={index}>
                                                    <Link
                                                        to={`/shop/erkek/${category.toLowerCase()}`}
                                                        className="text-gray-600 hover:text-black"
                                                    >
                                                        {category}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <NavLink to="/about" activeClassName="selected" className="hover:text-black">About</NavLink>
                        <NavLink to="/blog" activeClassName="selected" className="hover:text-black">Blog</NavLink>
                        <NavLink to="/contact" activeClassName="selected" className="hover:text-black">Contact</NavLink>
                        <NavLink to="/pages" activeClassName="selected" className="hover:text-black">Pages</NavLink>
                        <NavLink to="/product" activeClassName="selected" className="hover:text-black">Product</NavLink>
                    </ul>
                </nav>
                <div className="text-[#3C403D] md:text-[#23A6F0] flex gap-[20px] items-center">
                    <div className="flex gap-2 items-center">
                        {user && user.email ? (
                            <Gravatar
                                email={user.email}
                                size={40}
                                default="identicon"
                                className="rounded-full cursor-pointer"
                                onClick={toggleLoginMenu}
                                alt="User Avatar"
                            />
                        ) : (
                            <button onClick={toggleLoginMenu} className="hover:text-gray-500 font-semibold">
                                <UserRound />
                            </button>
                        )}
                        <div className="hidden gap-2 md:flex">
                            {user ? (
                                <p className="font-semibold hover:text-gray-500 cursor-pointer">{user.name}</p>
                            ) : (
                                <>
                                    <Link to="/login" className="hover:text-gray-500 font-semibold">Login</Link>
                                    <p>|</p>
                                    <Link to="/signup" className="hover:text-gray-500 font-semibold">Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                    <button className="hover:text-gray-500">
                        <Search />
                    </button>
                    <button className="hover:text-gray-500">
                        <ShoppingCart />
                    </button>
                    <button className="hidden md:block hover:text-gray-500">
                        <Heart />
                    </button>
                    <button
                        className="lg:hidden hover:text-gray-500"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle Menu"
                    >
                        <Menu />
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="flex flex-col items-center space-y-6 my-16 text-[30px] text-gray-500 lg:hidden">
                    <NavLink exact to="/" activeClassName="selected" className="hover:text-black">Home</NavLink>
                    <NavLink to="/shop" activeClassName="selected" className="hover:text-black">Shop</NavLink>
                    <NavLink to="/pricing" activeClassName="selected" className="hover:text-black">Pricing</NavLink>
                    <NavLink to="/contact" activeClassName="selected" className="hover:text-black">Contact</NavLink>
                    <NavLink to="/product" activeClassName="selected" className="hover:text-black">Product</NavLink>
                </div>
            )}
            {isLoginOpen && (
                user ? (
                    <div className="flex flex-col items-center space-y-6 my-12 text-[30px] text-gray-500 md:hidden cursor-pointer">
                        <p className="hover:text-black">{user.name}</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-6 my-12 text-[30px] text-gray-500 md:hidden">
                        <NavLink exact to="/login" activeClassName="selected" className="hover:text-black">Login</NavLink>
                        <NavLink to="/signup" activeClassName="selected" className="hover:text-black">Register</NavLink>
                    </div>
                )
            )}
        </div>
    )
}

export default Header;
