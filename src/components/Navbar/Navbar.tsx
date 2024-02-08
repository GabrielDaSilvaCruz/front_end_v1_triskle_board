import { Avatar } from "../Avatar/Avatar";
import { InputSearch } from "../inputs/InputSearch";



export function Navbar() {
    return (
        <nav id="navbar" className="navbar flex flex-row bg-base-300 text-base p-6 w-full">
                <InputSearch id="seachNavbar" placeholder="Pesquisar..." className="max-sm:hidden"/>

                <div className="flex flex-row justify-end w-full">
                    <Avatar />
                </div>
        </nav>
    )
}