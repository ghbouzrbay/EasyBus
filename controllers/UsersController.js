import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const crypto = require('crypto');
const { ObjectId } = require('mongodb');

class UsersController {
  static async postNew(request, response) {
    const dict = request.body;
    const { username } = dict;
    const { email } = dict;
    const { password } = dict;
    if (username === undefined) {
      return response.status(400).send({ error: 'Missing username' });
    }
    if (email === undefined) {
      return response.status(400).send({ error: 'Missing email' });
    }
    if (password === undefined) {
      return response.status(400).send({ error: 'Missing password' });
    }
    const useremail = await dbClient.getUser({ email });
    if (useremail) {
      return response.status(400).send({ error: 'Already exist' });
    }
    const sha1Hash = crypto.createHash('sha1');
    sha1Hash.update(password);
    const hashedPass = sha1Hash.digest('hex');

    const id = await dbClient.setUser({ username, email, password: hashedPass });
    return response.status(201).send({ username, email, id });
  }

  static async getMe(request, response) {
    const token = request.headers['x-token'];
    const userid = await redisClient.get(`auth_${token}`);
    if (!userid) {
      return response.status(401).send({ error: 'Unauthorized' });
    }
    const useridobj = new ObjectId(userid);
    const user = await dbClient.getUser({ _id: useridobj });
    return response.send({ username: user.username, email: user.email, id: userid });
  }
}

module.exports = UsersController;
