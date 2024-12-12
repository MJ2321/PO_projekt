const userModel = require('../../app/models/users');
const assert = require('assert');

describe('User Model', () => {
    beforeEach(() => {
        userModel.getAllUsers().splice(0); // Reset danych
    });

    it('add user', () => {
        const user = userModel.addUser('Wojciech', 'Oczkowski');
        assert.strictEqual(user.name, 'Wojciech');
        assert.strictEqual(user.lastname, 'Oczkowski');
        assert.strictEqual(userModel.getAllUsers().length, 1);
    });

    it('find user by id', () => {
        const user = userModel.addUser('Wojciech', 'Oczkowski');
        const found = userModel.getUserById(user.id);
        assert.strictEqual(found.name, 'Wojciech');
    });

    it('return undefined if user doesnt exist', () => {
        const found = userModel.getUserById(999);
        assert.strictEqual(found, undefined);
    });

    it('update user', () => {
        const user = userModel.addUser('Wojciech', 'Oczkowski')
        const updated = userModel.updateUser(user.id, { lastname: 'Oczkowskiii' });
        assert.strictEqual(updated.lastname, 'Oczkowskiii');
    });

    it('delete user', () => {
        const user = userModel.addUser('Wojciech', 'Oczkowski');
        const success = userModel.deleteUser(user.id);
        assert.strictEqual(success, true);
        assert.strictEqual(userModel.getAllUsers().length, 0);
    });

    it('wont delete false user', () => {
        const success = userModel.deleteUser(999);
        assert.strictEqual(success, false);
    });
});
