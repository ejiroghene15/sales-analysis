import {useAuth} from "../context/AuthContext.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Header() {
    const {signOut, session} = useAuth();
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const handleSignOut = async (e) => {
        e.preventDefault();
        const {success, error} = await signOut();
        if (!success) {
            setError(error);
        }
        navigate('/signin');
    }
    return (
        <>
            <header>
                <div
                    className="header-email"
                    role="navigation"
                    aria-label="User account navigation"
                >

                    <h2>
                        <span className="sr-only">Logged in as:</span>
                        {session?.user?.email}
                    </h2>

                    {error && (
                        <div role="role" className="error-message" id="signout-error">
                            {error}
                        </div>
                    )}


                    <button aria-label="Sign out of your account" onClick={handleSignOut}>
                        Sign out
                    </button>

                </div>
                <h1>

                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{marginRight: '8px'}}
                    >

                        <path
                            d="M12 2v8M12 14v8M4.93 4.93l5.66 5.66M13.41 13.41l5.66 5.66M2 12h8M14 12h8M4.93 19.07l5.66-5.66M13.41 10.59l5.66-5.66"
                            stroke="#29d952" strokeWidth="2.5" strokeLinecap="round"/>

                    </svg>
                    Sales Team Dashboard
                </h1>
            </header>
        </>
    );
}

export default Header;