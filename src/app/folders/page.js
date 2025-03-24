"use client"

import { useUser } from "@stackframe/stack";
import Link from "next/link";
import { useEffect, useState } from "react";
import getFolders from "@/app/folders/getFolders";
import { useRouter } from "next/navigation";

export default function FoldersList() {
    const user = useUser({ or: "redirect" });
    const [folders, setFolders] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (folders.length === 0) {
            const getFoldersArr = async (userId) => {
                const foldersArr = await getFolders(userId)
                    .then((data) => {
                        setFolders(data);
                        console.log(router)
                        router.refresh();
                    });

                return foldersArr;
            }

            getFoldersArr(user.id);
        } else {
            router.refresh();
        }
    }, [folders]);

    return (
        <div>
            <h2>Folders:</h2>
            {(!folders) && (
                <p>No folders yet! Maybe <Link href="/folders/add">add one</Link>?</p>
            )}
            <ul>
                {folders && folders.map((folder) => (
                    <li key={folder+Math.random()}>{folder}</li>
                ))}
            </ul>
        </div>
    )
}