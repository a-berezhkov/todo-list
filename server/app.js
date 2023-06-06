import express from "express";
import cors from "cors";

const port = 80;
const app = express();
app.use(express.json());
app.use(cors());

let dataBase = [];

app.listen(port, () => {
  console.log(`serv strt on port ${port}`);
});

//request => ЗАПРОС КОТОРЫЙ МЫ ДЕЛАЕМ С БРАУЗЕРА
//response => ОТВЕТ СЕРВЕРА БРАУЗЕРУ

//отдаем массив данных
app.get("/", (request, response) => {
  try {
    return response.json(dataBase);
  } catch (error) {
    response.status(400).send("err");
  }
});

//добавляем новый таск
app.post("/one", (request, response) => {
  try {
    const obj = request.body;
    dataBase.push(obj);
    return response.json(dataBase);
  } catch (error) {
    response.status(400).send("err");
  }
});

app.delete("/all", (request, response) => {
  try {
    dataBase.splice(0);
    return response.json(dataBase);
  } catch (error) {
    console.log(error);
  }
});

app.patch("/check", (request, response) => {
  try {
    const idTask = request.body.id;

    // const findItem = dataBase.find((el) => el.id === idTask);
    // findItem.checked = !findItem.checked

    dataBase = dataBase.map((obj) =>
      obj.id === idTask ? { ...obj, checked: !obj.checked } : obj
    );

    console.log(dataBase);

    return response.json(dataBase);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/checkeds", (request, response) => {
  try {
    dataBase = dataBase.filter((obj) => obj.checked === false);
    response.json(dataBase);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/one", (request, response) => {
  try {
    const idTask = request.body.id;
    dataBase = dataBase.filter((obj) => obj.id !== idTask);
    return response.json(dataBase);
  } catch (error) {
    console.log(error);
  }
});

app.patch("/edit", (request, response) => {
  try {
    const textTask = request.body.text;
    const idTask = request.body.id;

    dataBase = dataBase.map((obj) => {
      if (obj.id === idTask) {
        return { ...obj, text: textTask };
      }
    });

    console.log(dataBase);

    return response.json(dataBase);
  } catch (error) {
    console.log(error);
  }
});
