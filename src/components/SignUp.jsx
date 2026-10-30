import {Link, useNavigate} from "react-router-dom";
import {useActionState} from "react";
import {useAuth} from "../context/AuthContext.jsx";

const Signup = () => {
    const {signUp} = useAuth();
    const navigate = useNavigate();
    const [error, handleSubmit, isPending] = useActionState(async (previousState, formData) => {
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const accountType = formData.get('account-type');

        if (!email || !password) {
            return new Error('Email and password are required.');
        }

        const {success, data, error} = await signUp(email, password, name, accountType);
        if (!success) {
            return new Error(error);
        }

        if (success && data?.session) {
            navigate('/dashboard');
            return null;
        }

    }, null);

    return (
        <>
            <h1 className="landing-header">Paper Like A Boss</h1>
            <div className="sign-form-container">
                <form
                    action={handleSubmit}
                    aria-label="Sign up form"
                    aria-describedby="form-description"
                >
                    <div id="form-description" className="sr-only">
                        Use this form to create a new account. Enter your email and
                        password.
                    </div>

                    <h2 className="form-title">Sign up today!</h2>
                    <p>
                        Already have an account?{' '}
                        <Link to="/" className="form-link">
                            Sign in
                        </Link>
                    </p>

                    <label htmlFor="name">Name</label>
                    <input
                        className="form-input"
                        type="text"
                        name="name"
                        id="name"
                        placeholder=""
                        required
                        aria-required="true"
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error ? 'signup-error' : undefined}
                        disabled={isPending}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder=""
                        required
                        aria-required="true"
                        aria-invalid={!!error}
                        aria-describedby={error ? 'signup-error' : undefined}
                        disabled={isPending}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        className="form-input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder=""
                        required
                        aria-required="true"
                        aria-invalid={!!error}
                        aria-describedby={error ? 'signup-error' : undefined}
                        disabled={isPending}
                    />

                    <fieldset
                        className="form-fieldset"
                        aria-required="true"
                        aria-label="Select your role"
                    >
                        <legend>Select your role</legend>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="account-type"
                                    value="admin"
                                    required
                                />{' '}
                                Admin
                            </label>
                            <label>
                                <input type="radio" name="account-type" value="rep" required />{' '}
                                Sales Rep
                            </label>
                        </div>
                    </fieldset>


                    <button
                        type="submit"
                        className="form-button"
                        disabled={isPending}
                        aria-busy={isPending}
                    >
                        {isPending ? 'Signing up...' : 'Sign up'}
                    </button>

                    {error && (
                        <div id="signup-error" role="alert" className="sign-form-error-message">
                            {error.message}
                        </div>
                    )}
                </form>
            </div>
        </>
    );
};

export default Signup;
