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
    const [isChecked, setIsChecked] = useState(false);

    const carouselSettings = {
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

    /* TODO abstract out into util to share with tasks/page.js */
    const getTaskDueDate = (date) => {
        const taskDueDate = new Date(date);
        const formattedDate = taskDueDate.toLocaleDateString();
        const formattedTime = taskDueDate.toLocaleTimeString();
        return formattedDate + ' ' + formattedTime;
    }

    const getRemainingTime = (date) => {
        const currentTime = new Date();
        const taskDueDate = new Date(date);
        const timeDiff = taskDueDate.getTime() - currentTime.getTime();
        const timeDiffSec = timeDiff / 1000;
        const timeDiffMin = timeDiffSec / 60;
        const timeDiffHours = timeDiffMin / 60;
        const timeDiffDays = timeDiffHours / 24;
        return timeDiffDays;
    }

    const handleCheckboxChange = (event) => {
        const taskId = event.target.name;
        setIsChecked(event.target.checked);
        supabase.from('tasks')
            .update({task_isActive: !event.target.checked})
            .eq('task_id', taskId)
            .then(data => {
                console.log(data);
            });
    }

    return (
        <div>
            <h2>Due Next:</h2>
            {nextTasks.length === 0 && (
                "No tasks due! Hooray!"
            )}
            <Slider {...carouselSettings}>
                {nextTasks.map((task) => (
                    <li key={task.id}>
                        <div>
                            <h3>{task.task_name}</h3>
                            <h4>{getTaskDueDate(task.task_due_date)}</h4>
                            <h5>{Math.trunc(getRemainingTime(task.task_due_date))} days left!</h5>
                            <form>
                                <label className="checkbox">
                                    <input type="checkbox"
                                           type="checkbox"
                                           checked={isChecked}
                                           onChange={handleCheckboxChange}
                                           name={task.task_id}
                                    />
                                    Mark complete!
                                </label>
                            </form>
                            {task.task_folder && (
                                <p>Folder: {task.task_folder}</p>
                            )}
                        </div>
                    </li>
                ))}
            </Slider>
        </div>
    )
}