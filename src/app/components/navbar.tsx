import React, { ChangeEvent } from "react";

type ValueInput = {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
};

const Navbar = ({ onChange, value }: ValueInput) => {
    return (
        <div className="flex justify-between p-4 items-center bg-gray-400">
            <h1 className="w-full max-w-lg text-lg text-slate-100 font-bold font-sans">Notes App</h1>
            <input
            className="border-2 border-gray py-1 px-1 rounded-md w-full max-w-[250px]"
                type="text"
                placeholder="Find Notes..."
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

export default Navbar;
