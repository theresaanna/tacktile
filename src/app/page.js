import TasksList from "@/app/tasks/page";
import AddTaskForm from "@/app/tasks/add/page";

export default function Dashboard() {
    return (
        <div>
            <div className="pinboard">
                <div className="newest-tasks card">
                    <TasksList />
                </div>

                <div className="add-task card">
                    <AddTaskForm />
                </div>

                <div className="manage-folders card">
                </div>

                <div className="due-next card">
                </div>
            </div>
        </div>
    )
}