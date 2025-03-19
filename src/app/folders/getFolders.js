import { createSupabaseClient } from "../utils/supabase";

export default function getFolders(userId) {
    const supabase = createSupabaseClient();
    const folders = supabase.from('users')
        .select('user_folders')
        .eq('user_id', userId)
        .then(data => {
            console.log(data)
            return (data.data[0].user_folders || []);
        });
    return folders;
};