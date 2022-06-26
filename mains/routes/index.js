const router = require('express').Router();

const user = require('./userRoute');

router.post('/login', user.postLogin);
router.post('/user', user.postUser);
router.put('/user', user.putUser);
router.delete('/api/user/:id', user.deleteUserById);
router.get('/api/user/:id', user.getRedisUserById, user.getUserById);
router.get('/api/user/accountNumber/:accountNumber', user.getRedisAccountNumber, user.getAccountNumber);
router.get('/api/user/identityNumber/:identityNumber', user.getRedisIdentityNumber, user.getIdentityNumber);

module.exports = router;