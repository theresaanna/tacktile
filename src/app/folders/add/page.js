"use client"
import { useUser } from "@stackframe/stack";

export default function AddFolder() {
    const user = useUser({ or: "redirect" });

    return (
        <form>
            <input type="hidden" value={user.id} name="user_id" />
            <input type="text" name="user_folder_name" defaultValue="Folder name" required></input>
            <input type="submit" value="Add folder" />
        </form>
    )
}