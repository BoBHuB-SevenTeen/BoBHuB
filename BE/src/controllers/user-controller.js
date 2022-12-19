const { userService } = require("../services");

class UserController {
  async create(req, res, next) {
    try {
      const generation = parseInt(req.body.generation);
      const { track, name, email, nickName, password, phone, profile, role } = req.body;
      const addedUser = await userService.create({
        track,
        generation,
        name,
        email,
        nickName,
        password,
        phone,
        profile,
        role,
      });
      return res.status(200).json(addedUser);
    } catch (e) {
      next(e);
    }
  }
  async checkNickname(req, res, next) {
    try {
      const nickName = req.params.nickname;
      const result = await userService.checkNickname(nickName);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      const result = await userService.getById(userId);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
  async getAllByAdmin(req, res, next) {
    try {
      const users = await userService.getAllByAdmin();

      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      const generation = parseInt(req.body.generation);
      const currentUserId = parseInt(req.user.userId);

      const { track, name, nickName, newPassword, password, phone, profile } = req.body;
      const exUserDTO = {
        track,
        generation,
        name,
        nickName,
        newPassword,
        password,
        phone,
        profile,
      };
      const result = await userService.update(exUserDTO, userId, currentUserId);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async updateByAdmin(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      const { nickName, role } = req.body;
      const newUserDTO = { nickName, role };
      const result = await userService.updateByAdmin(newUserDTO, userId);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const currentUserId = parseInt(req.user.userId);
      const userId = parseInt(req.params.userId);
      const result = await userService.deleteById(currentUserId, userId);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

const userController = new UserController();

module.exports = { userController };
