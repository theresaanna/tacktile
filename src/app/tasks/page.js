"use client"

import { createSupabaseClient } from "../utils/supabase";
import { useUser } from "@stackframe/stack";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TasksList() {
    const user = useUser({ or: "redirect" });
    const supabase = createSupabaseClient();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        supabase.from("tasks")
            .select("*")
            .match({'user_id': user.id})
            .order('created_at', { ascending: false })
            .then(data => {
                setTasks(data.data);
            });
    }, []);

    return (
        <div>
            <h2>Tasks:</h2>
            {tasks.length === 0 && (
                <p>No tasks yet! Maybe <Link href="/tasks/add">add one</Link>?</p>
            )}
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>{task.task_name}</li>
                ))}
            </ul>
        </div>
    )
}