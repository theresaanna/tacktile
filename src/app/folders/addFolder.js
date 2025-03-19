import { createSupabaseClient } from "../utils/supabase";
import getFolders from "@/app/folders/getFolders";

export default async function addFolder(formData) {
    const supabase = createSupabaseClient();
    const folders = await getFolders(formData.get("user_id"));
    folders.push(formData.get("user_folder_name"));

    const folder = await supabase
        .from('users')
        .update({
            user_folders: folders,
            user_id: formData.get("user_id")
        })
        .eq('user_id', formData.get("user_id"))
        .then(data => {
            console.log(data)
        })

    return folder;
};