"use client"

import { createSupabaseClient } from "../utils/supabase";
import { useUser } from "@stackframe/stack";
import { useEffect, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function TasksList() {
    const user = useUser({ or: "redirect" });
    const supabase = createSupabaseClient();
    const [tasks, setTasks] = useState([]);
    var carouselSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

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
                <Slider {...carouselSettings}>
                    {tasks.map((task) => (
                        <li key={task.id}>{task.task_name}</li>
                    ))}
                </Slider>
            </ul>
        </div>
    )
}