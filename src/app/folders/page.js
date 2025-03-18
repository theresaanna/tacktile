"use client"

import { createSupabaseClient } from "../utils/supabase";
import { useUser } from "@stackframe/stack";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
    const user = useUser();
    const supabase = createSupabaseClient();
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        supabase.from('users')
            .select('user_folders')
            .eq('user_id', user.id)
            .then(data => {
                setFolders(data.data[0].user_folders);
            });
    }, []);

    return (
        <div>
            <h2>Folders:</h2>
            {folders.length === 0 && (
                <p>No folders yet! Maybe <Link href="/folders/add">add one</Link>?</p>
            )}
            <ul>
                {folders.map((folder) => (
                    <li key={folder+Date.now()}>{folder}</li>
                ))}
            </ul>
        </div>
    )
}