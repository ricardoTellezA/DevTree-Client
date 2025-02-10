import { useQueryClient } from "@tanstack/react-query";

const AdminNavigation = () => {
    const queryClient = useQueryClient()
    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN_DEVTREE')
        queryClient.invalidateQueries({ queryKey: ['user'] })

    }
    return (
        <button
            onClick={logout}
            className="bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer">
            Cerrar Sesión
        </button>
    );
}

export default AdminNavigation;
