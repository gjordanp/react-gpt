import { NavLink } from "react-router-dom";

interface Props {
    to: string;
    icon: string;
    title: string;
    description: string;
}


export const SidebarMenuItem = ({ to, icon, title, description }: Props) => {
    return (
        <NavLink
            to={to}
            className={(isActive) =>
                isActive
                    ? 'flex justify-center items-center bg-gray800 rounded-md p-2 transitions-colors'
                    : 'flex justify-center items-center hover:bg-gray800 rounded-md p-2 transitions-colors'}
        >
            <i className={`mr-4 text-2xl text-indigo-400 ${icon}`} />
            <div className="flex flex-col flex-grow">
                <span className="text-white text-lg font-semibold">
                    {title}
                </span>
                <span className="text-sm text-gray-400">
                    {description}
                </span>
            </div>
        </NavLink>
    )
}
