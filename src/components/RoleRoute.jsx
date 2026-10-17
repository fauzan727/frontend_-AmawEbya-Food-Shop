import { Navigate } from "react-router-dom"


function RoleRroute({ role, izin, children}){
    if(role !== izin){
        return <Navigate to="/dashboard" replace />
    }
    return children
}

export default RoleRroute
