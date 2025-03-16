export default function Home() {
  return (
      <div>
        <div className="pinboard">
          <div className="newest-tasks card">
            <h2>Newest Tasks:</h2>
          </div>

          <div className="add-task card">
            <h2>Add Task</h2>
          </div>

          <div className="manage-folders card">
            <h2>Manage Folders</h2>
            <ul>
            </ul>
          </div>

          <div className="due-next card">
            <h2>Next Due</h2>
          </div>
        </div>
      </div>
  )
}