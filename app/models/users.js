let users = [];
let nextId = 1;

const getAllUsers = () => users;

const getUserById = (id) => users.find((user) => user.id === id);

const addUser = (name, lastname) => {
    const user = { id: nextId++, name, lastname };
    users.push(user);
    return user;
};

const updateUser = (id, updates) => {
    const user = getUserById(id);
    if (!user) {
        return { error: 'User not found' };
    }
    Object.assign(user, updates);
    return user;
};

const deleteUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
};
