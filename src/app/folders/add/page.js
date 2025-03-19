"use client"
import { useUser } from "@stackframe/stack";
import addFolder from "@/app/folders/addFolder";

export default function AddFolder() {
    const user = useUser({ or: "redirect" });

    const handleAddFolder = (formData) => {
        addFolder(formData);
    }

    return (
        <form action={handleAddFolder}>
            <input type="hidden" value={user.id} name="user_id" />
            <input type="text" name="user_folder_name" defaultValue="Folder name" required></input>
            <input type="submit" value="Add folder" />
        </form>
    )
}