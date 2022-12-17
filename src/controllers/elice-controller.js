const { eliceService } = require("../services");

class EliceController {
  async create(req, res, next) {
    const { track } = req.body;
    const generation = parseInt(req.body.generation);
    try {
      const result = await eliceService.create({ track, generation });
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const eliceList = await eliceService.getAll();
      return res.status(200).json(eliceList);
    } catch (e) {
      next(e);
    }
  }

  async updateTrack(req, res, next) {
    try {
      const { newTrack, track } = req.body;
      const result = await eliceService.updateTrack(newTrack, track);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async updateGeneration(req, res, next) {
    try {
      const generation = parseInt(req.body.generation);
      const newGeneration = parseInt(req.body.newGeneration);
      const result = await eliceService.updateGeneration(newGeneration, generation);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async deleteTrack(req, res, next) {
    try {
      const { track } = req.body;
      const result = await eliceService.deleteTrack(track);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async deleteGeneration(req, res, next) {
    try {
      const generation = parseInt(req.body.generation);
      const result = await eliceService.deleteGeneration(generation);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

const eliceController = new EliceController();

module.exports = { eliceController };
