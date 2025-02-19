import React, { useState } from 'react';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
}

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [editingUser, setEditingUser] = useState<number | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data);
        } catch (err) {
            setError('Failed to fetch users');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post<{ id: number }>('https://jsonplaceholder.typicode.com/posts', { name, email });
            setUsers([...users, { id: response.data.id || users.length + 1, name, email }]);
            setName('');
            setEmail('');
        } catch (err) {
            setError('Failed to add user');
            console.error(err);
        }
    };

    const editUser = async (id: number) => {
        try {
            await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, { name, email });
            setUsers(users.map(user => user.id === id ? { ...user, name, email } : user));
            setEditingUser(null);
            setName('');
            setEmail('');
        } catch (err) {
            setError('Failed to update user');
            console.error(err);
        }
    };

    const deleteUser = async (id: number) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            setError('Failed to delete user');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>User List</h2>
            <button onClick={fetchUsers} disabled={loading}>Fetch Users</button>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={editingUser ? (e) => { e.preventDefault(); editUser(editingUser); } : addUser}>
                <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type='submit'>{editingUser ? 'Update User' : 'Add User'}</button>
            </form>

            {!loading && !error && users.length > 0 && (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.name} - {user.email}
                            <button onClick={() => { setEditingUser(user.id); setName(user.name); setEmail(user.email); }}>Edit</button>
                            <button onClick={() => deleteUser(user.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UsersList;
