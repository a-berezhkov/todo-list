import Task from "./Task.js";

class TaskController {
  //получить все таски
  async getAllTasks(request, response) {
    try {
      const tasks = await Task.find();
      return response.json(tasks);
    } catch (error) {
      response.status(500).json(error);
    }
  }
  //создать таску
  async addTask(request, response) {
    try {
      const { text, checked } = request.body;
      await Task.create({ text, checked });
      response.status(200).json({ message: "Success!: task added" });
    } catch (error) {
      response.status(500).json({ message: "Error!: task not added", error });
    }
  }
  //изменить текст таски
  async editTask(request, response) {
    try {
      const { text } = request.body;
      const { id } = request.params;

      if (!id) {
        response.status(400).json({ message: "Error!: id not found" });
      }
      if (!text) {
        response.status(400).json({ message: "Error!: text not found" });
      }
      await Task.findByIdAndUpdate(id, { $set: { text: `${text}` } });
      response.status(200).json({ message: "Success!: task updated" });
    } catch (error) {
      response.status(400).json({ message: "Error!: task not added", error });
    }
  }
  //удалить таску по id
  async deleteTask(request, response) {
    try {
      const { id } = request.params;
      if (!id) {
        response.status(400).json({ message: "Error!: id not found" });
      }
      await Task.findByIdAndDelete(id);
      return response.json({ message: `"Success!: task id:${id} deleted!"` });
    } catch (error) {
      response.status(500).json(error);
    }
  }

  async deleteAllCheckedTask(request, response) {
    try {
      await Task.deleteMany({ checked: true });
      return response.json({
        message: `"Success!: all tasks containing 'checked: true' deleted!"`,
      });
    } catch (error) {
      response.status(500).json(error);
    }
  }

  async deleteAllTasks(request, response) {
    try {
      await Task.deleteMany({});
      return response.json({
        message: `"Success!: all tasks deleted!"`,
      });
    } catch (error) {
      response.status(400).json(error);
    }
  }
}

export default new TaskController();
