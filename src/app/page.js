import TasksList from "@/app/tasks/page";
import AddTaskForm from "@/app/tasks/add/page";
import FoldersList from "@/app/folders/page";
import AddFolderForm from "@/app/folders/add/page";
import DueNext from "@/app/folders/DueNext";

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
                    <FoldersList />
                    <AddFolderForm />
                </div>

                <div className="due-next card">
                    <DueNext />
                </div>
            </div>
        </div>
    )
}