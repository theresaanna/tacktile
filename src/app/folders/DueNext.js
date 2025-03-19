"use client"

import {useEffect, useState} from "react";
import {createSupabaseClient} from "@/app/utils/supabase";
import { useUser } from "@stackframe/stack";

export default function DueNext() {
    const supabase = createSupabaseClient();
    const [nextTasks, setNextTasks] = useState([]);
    const user = useUser({ or: "redirect" });

    useEffect(() => {
        supabase.from("tasks")
            .select("*")
            .match({'user_id': user.id})
            .order('task_due_date', { ascending: false })
            .limit(10)
            .then(data => {
                setNextTasks(data.data);
            });
    }, []);

    return (
        <div>
            <h2>Due Next:</h2>
            {nextTasks.length === 0 && (
                "No tasks due! Hooray!"
            )}
            {nextTasks.map((task) => (
                <li key={task.task_id}>{task.task_name}</li>
            ))}
        </div>
    )
}