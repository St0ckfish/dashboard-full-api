import { useAuth } from "../context/Auth";
import { useNavigate,Navigate } from 'react-router-dom';
import { Authurization } from '../api/Api';

const RequireAuth = ({children}) => {
    const auth = useAuth();

    if(!Authurization){
        return <Navigate to="/" />
    }

    return children;
}

export default RequireAuth;