import TasksList from "@/app/tasks/page";

export default function Dashboard() {
    return (
        <div>
            <div className="pinboard">
                <div className="newest-tasks card">
                    <TasksList />
                </div>

                <div className="add-task card">
                </div>

                <div className="manage-folders card">
                </div>

                <div className="due-next card">
                </div>
            </div>
        </div>
    )
}