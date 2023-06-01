import { TrashIcon,ArchiveBoxIcon } from '@heroicons/react/24/solid'

const ListNotes = ({noteId,noteTitle,noteDate,noteNotes,deleteNotes,isArchive}:any) => {
    return (
        <div key={noteId} className=" ">
            <div className="border-2 border-black p-5 rounded-lg">
                <h1 className="text-lg font-bold  break-words">{noteTitle}</h1>
                <p className="text-sm font font-light mb-2 ">{noteDate}</p>
                <p className="mb-2 break-words">{noteNotes}</p>
                <div className="flex justify-evenly [&>*]:m-1">
                    <button className="bg-gray-600 text-white px-2 rounded-md p-2 w-full hover:bg-red-600 " onClick={()=> deleteNotes(noteId)}>
                        <TrashIcon className='w-7 h-5 mx-auto'/>
                    </button>
                    <button className="bg-blue-200 px-2 rounded-md w-full hover:bg-amber-200" onClick={() => isArchive(noteId)}>
                        <ArchiveBoxIcon className='w-7 h-5 mx-auto text-yellow-600'/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ListNotes