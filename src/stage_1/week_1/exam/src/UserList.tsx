import React, { useState } from 'react';

export default function UsersList() {
    const [users, setUsers] = useState(["Bob", "Alex", "Ann"]);

    return (
        <main>
            <h4>User list:</h4>
            <ul>
                {users.map(user => <li key={user}>{user}</li>)}
            </ul>
        </main>
    )
}