"use client"
import { useState } from "react";
import Navbar from "./components/navbar";
import Notes from "./components/notes";
import ListNotes from "./components/list_notes";
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";

export default function Home() {
  const [valueNavbar, setValueNavbar] = useState("");
  const [valueInputTitle, setValueInputTittle] = useState("");
  const [valueNotes, setValueNotes] = useState("");
  const [notes, setNotes] = useState<any>([]);
  const [archiveValue] = useState(false);
  const handlerNavbarValue = (event: any) => {
    setValueNavbar(event.target.value);
  }

  const handlerValueTitle = (event: any) => {
    setValueInputTittle(event.target.value);
  }

  const handlerInputNotes = (event: any) => {
    setValueNotes(event.target.value);
  }

  const isArchive = (id: any) => {
    const updatedNotes = notes.map((note: any) => {
      if (note.id === id) {
        return { ...note, isArchive: !note.isArchive };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const deleteNotes = (id: number) => {
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
        const filterNotes = notes.filter((note: any) => note.id !== id);
        setNotes(filterNotes);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  const submitValue = (event: any) => {
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
  const activeNotes = notes.filter((note: any) => !note.isArchive);
  const archivedNotes = notes.filter((note: any) => note.isArchive);
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
          {activeNotes.filter((note: any) => {
            if (valueNavbar === "") {
              return note
            }
            else if (note.title.toLowerCase().includes(valueNavbar.toLowerCase())) {
              return note
            }
            return false;
          }).map((note: any) => {
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
          {archivedNotes.filter((note: any) => {
            if (valueNavbar === "") {
              return note
            }
            else if (note.title.toLowerCase().includes(valueNavbar.toLowerCase())) {
              return note
            }
            return false;
          }).map((note: any) => {
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