"use client"
import { ChangeEvent, FormEvent, useState } from "react";
import Navbar from "./components/navbar";
import Notes from "./components/notes";
import ListNotes from "./components/list_notes";
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";
type notesData={
  id: string,
  title: string,
  notes: string,
  date: string,
  isArchive: boolean,
}

export default function Home() {
  const [valueNavbar, setValueNavbar] = useState("");
  const [valueInputTitle, setValueInputTittle] = useState("");
  const [valueNotes, setValueNotes] = useState("");
  const [notes, setNotes] = useState<notesData[]>([]);
  const [archiveValue] = useState(false);
  const handlerNavbarValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValueNavbar(event.target.value);
  }

  const handlerValueTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setValueInputTittle(event.target.value);
  }

  const handlerInputNotes = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValueNotes(event.target.value);
  }

  const isArchive = (id: string) => {
    const updatedNotes = notes.map((note: notesData) => {
      if (note.id === id) {
        return { ...note, isArchive: !note.isArchive };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const deleteNotes = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const filterNotes = notes.filter((note:notesData) => note.id !== id);
        setNotes(filterNotes);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  const submitValue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!valueInputTitle.trim() || !valueNotes.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'title or notes cant empty!'
      })
    }
    else if (!valueInputTitle.trim() && !valueNotes.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'title and notes cant empty!'
      })
    }
    else {
      const currentDate = new Date();
      const getDate = currentDate.toLocaleDateString('id-ID')
      const getNotes = {
        id: uuidv4(),
        title: valueInputTitle,
        notes: valueNotes,
        date: getDate,
        isArchive: archiveValue,
      }
      const handlerNotes = [...notes, getNotes];
      setNotes(handlerNotes);
      setValueInputTittle("");
      setValueNotes("");
    }
  }
  const activeNotes = notes.filter((note: notesData) => !note.isArchive);
  const archivedNotes = notes.filter((note: notesData) => note.isArchive);
  return (
    <div>
      <Navbar
        onChange={handlerNavbarValue}
        value={valueNavbar}
      />
      <Notes
        onChangeTitle={handlerValueTitle}
        valueTitle={valueInputTitle}
        onChangeNotes={handlerInputNotes}
        valueNotes={valueNotes}
        onsubmit={submitValue}
      />
      <div className="p-10">
        <h1 className="mb-5 font-bold text-2xl">All Notes</h1>
        <div className="max-w-7xl grid grid-cols-4  mx-auto gap-5">
          {activeNotes.filter((note: notesData) => {
            if (valueNavbar === "") {
              return note
            }
            else if (note.title.toLowerCase().includes(valueNavbar.toLowerCase())) {
              return note
            }
            return false;
          }).map((note: notesData) => {
            return (
              <ListNotes
                key={note.id}
                noteId={note.id}
                noteTitle={note.title}
                noteDate={note.date}
                noteNotes={note.notes}
                deleteNotes={deleteNotes}
                isArchive={isArchive}

              />
            )
          })
          }

        </div>
      </div>

      <div className="p-10">
        <h1 className="mb-5 font-bold text-2xl">Archive Notes</h1>
        <div className="max-w-7xl grid grid-cols-4 gap-5 mx-auto">
          {archivedNotes.filter((note: notesData) => {
            if (valueNavbar === "") {
              return note
            }
            else if (note.title.toLowerCase().includes(valueNavbar.toLowerCase())) {
              return note
            }
            return false;
          }).map((note: notesData) => {
            return (
              <ListNotes
                key={note.id}
                noteId={note.id}
                noteTitle={note.title}
                noteDate={note.date}
                noteNotes={note.notes}
                deleteNotes={deleteNotes}
                isArchive={isArchive}
              />
            )
          })
          }

        </div>
      </div>
    </div>
  )
}