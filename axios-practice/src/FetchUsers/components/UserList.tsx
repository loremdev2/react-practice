import React from "react";

const UsersList = () => {
    const [users, setUsers] = React.useState<{ id: number; name: string; email: string }[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            setError('Failed to fetch users');
            console.log("Error: " + error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
        <h2>User List</h2>
        <button onClick={fetchUsers} disabled={loading}>Fetch Users</button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && users.length > 0 && (
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        )}
    </div>
    )
}

export default UsersList;