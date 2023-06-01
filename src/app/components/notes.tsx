import { ChangeEvent, FormEventHandler } from "react"

type notes={
    onChangeTitle:(event:ChangeEvent<HTMLInputElement>)=> void,
    valueTitle:string,
    onChangeNotes:(event:ChangeEvent<HTMLTextAreaElement>)=> void,
    valueNotes:string,
    onsubmit:(FormEventHandler<HTMLFormElement>)
}

const Notes = ({ onChangeTitle, valueTitle,onChangeNotes,valueNotes, onsubmit }:notes) => {
    return (

            <div className="flex flex-col items-center mt-20 border-2 border-gray-200 w-max mx-auto p-5 rounded-md">
                <h3 className="mb-5 text-lg font-bold">New Notes</h3>
                <form action="" onSubmit={onsubmit} className=" flex flex-col w-80">
                    <input
                        className="border-2 border-black px-2 py-2 rounded-md mb-2"
                        type="text"
                        placeholder="Input Tittle..."
                        onChange={onChangeTitle}
                        value={valueTitle}
                    />
                    <textarea
                        className="border-2 border-black mt-2 px-2 h-40 rounded-md mb-2"
                        placeholder="Write your notes here..."
                        onChange={onChangeNotes}
                        value={valueNotes}
                    />
                    <button type="submit" className="border-2 border-black mt-2 rounded-md py-1 roun hover:bg-black hover:text-white mb-5">Create</button>
                </form>

            </div>
 
    )
}
export default Notes