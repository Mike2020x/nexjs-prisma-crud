"use client";

import { data } from "autoprefixer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewPage({ params }) {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (params.taskId) {
            fetch(`/api/tasks/${params.taskId}`)
                .then((res) => res.json())
                .then((data) => {
                    setTitle(data.title)
                    setDescription(data.description)
                });
        }
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (params.taskId) {
            const res = await fetch(`/api/tasks/${params.taskId}`, {
                method: "PUT",
                body: JSON.stringify({ title, description }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await res.json()
            console.log(data);
        } else {
            const res = await fetch("/api/tasks", {
                method: "POST",
                body: JSON.stringify({
                    title, description
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json()
        }
        // console.log(data);
        router.refresh()
        router.push("/")
    }
    return (
        <div className="h-screen flex justify-center items-center">
            <form className="bg-slate-800 p-10 lg:w-1/4 md:w-1/2 rounded-md" onSubmit={onSubmit}>
                <label htmlFor="title" className="font-bold text-sm">Titulo de la tarea</label>
                <input
                    type="text"
                    id="title"
                    className="border border-gray-400 pb-2 mb-4 w-full text-black rounded-md"
                    placeholder="Titulo"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="description" className="font-bold text-sm">Descripcion de la tarea</label>
                <textarea
                    rows="3"
                    id="description"
                    className="border border-gray-400 pb-2 mb-4 w-full text-black rounded-md"
                    placeholder="Describe tu tarea"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                >
                </textarea>
                <div className="flex justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Crear</button>
                    {
                        params.taskId && (
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                                type="button"
                                onClick={async () => {
                                    const res = await fetch(`/api/tasks/${params.taskId}`, {
                                        method: "DELETE"
                                    })
                                    const data = await res.json()
                                    router.refresh()
                                    router.push("/")
                                }}
                            >Eliminar</button>
                        )}
                </div>
            </form>
        </div>
    )
}
