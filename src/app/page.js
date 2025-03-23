import TasksList from "@/app/tasks/page";
import AddTaskForm from "@/app/tasks/add/page";
import FoldersList from "@/app/folders/page";
import AddFolderForm from "@/app/folders/add/page";
import DueNext from "@/app/folders/DueNext";

export default function Dashboard() {

    return (
        <div>
            <div className="pinboard grid-container">
                <div className="newest-tasks taskcard color-lilac">
                    <TasksList />
                </div>

                <div className="add-task taskcard color-pink">
                    <AddTaskForm />
                </div>

                <div className="manage-folders taskcard color-dark-blue">
                    <FoldersList />
                    <AddFolderForm />
                </div>

                <div className="due-next taskcard color-dark-green">
                    <DueNext />
                </div>
            </div>
        </div>
    )
}