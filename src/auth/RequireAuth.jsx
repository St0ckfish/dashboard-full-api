import { useAuth } from "../context/Auth";
import { useNavigate,Navigate } from 'react-router-dom';

const RequireAuth = ({children}) => {
    const auth = useAuth();

    if(!auth.user){
        return <Navigate to="/" />
    }

    return children;
}

export default RequireAuth;