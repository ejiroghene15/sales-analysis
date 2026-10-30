import {useActionState} from 'react';
import supabase from "../supabase-client.js";
import {useAuth} from "../context/AuthContext.jsx";

function Form() {
    const {users, session: {user: authUser}} = useAuth();
    const [error, submitAction, isPending] = useActionState(
        async (previousState, formData) => {
            //Action logic
            const newDeal = {
                user_id: formData.get('user_id'),
                value: formData.get('value'),
            };

            const {error} = await supabase.from('sales_deals').insert(newDeal);

            if (error) throw new Error('Error adding new deal:' + error);

            return null;
        },
        null // Initial state
    );

    const generateOptions = () => {
        if (authUser.user_metadata.account_type === 'rep') {
            return (
                <option key={authUser.id} value={authUser.id}>
                    {authUser.user_metadata.name}
                </option>
            )
        }

        // Admin can
        return users.filter((user) => user.account_type === 'rep').map((user) => (
            <option key={user.id} value={user.name}>
                {user.name}
            </option>
        ));
    };

    return (
        <div className="add-form-container">
            <form
                action={submitAction}
                aria-label="Add new sales deal"
                aria-describedby="form-description"
            >
                <div id="form-description" className="sr-only">
                    Use this form to add a new sales deal. Select a sales rep and enter
                    the amount.
                </div>

                <label htmlFor="deal-name">
                    Name:
                    <select
                        id="deal-name"
                        name="user_id"
                        defaultValue={users?.[0]?.name || ''}
                        aria-required="true"
                        aria-invalid={error ? 'true' : 'false'}
                        disabled={isPending}
                    >
                        {generateOptions()}
                    </select>
                </label>

                <label htmlFor="deal-value">
                    Amount: $
                    <input
                        id="deal-value"
                        type="number"
                        name="value"
                        defaultValue={0}
                        className="amount-input"
                        min="0"
                        step="10"
                        aria-required="true"
                        aria-invalid={error ? 'true' : 'false'}
                        aria-label="Deal amount in dollars"
                        disabled={isPending}
                    />
                </label>

                <button
                    type="submit"
                    disabled={isPending}
                    aria-busy={isPending}
                >
                    {isPending ? 'Adding...' : "Add Deal"}
                </button>
            </form>

            {error && (
                <div role='alert' className="error-message">
                    {error.message}
                </div>
            )}
        </div>
    );
};

export default Form;
