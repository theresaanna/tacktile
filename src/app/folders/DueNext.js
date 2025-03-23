"use client"

import {useEffect, useState} from "react";
import {createSupabaseClient} from "@/app/utils/supabase";
import { useUser } from "@stackframe/stack";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function DueNext() {
    const supabase = createSupabaseClient();
    const [nextTasks, setNextTasks] = useState([]);
    const user = useUser({ or: "redirect" });
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
            <Slider {...carouselSettings}>
                {nextTasks.map((task) => (
                    <li key={task.task_id}>{task.task_name}</li>
                ))}
            </Slider>
        </div>
    )
}