const express = require("express");
const fs = require("fs");
var cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
/**
 
theme
    userId: int
    id: int
    title: string
    likes: userId[]

*/

app.get("/theme", (req, res) => {
  const allThemes = fs.readFileSync("./themes.txt");
  const allThemesJson = JSON.parse(allThemes) || [];

  res.send(
    allThemesJson.map((theme) => {
      return {
        id: theme.id,
        title: theme.title,
        userId: theme.userId,
        likes: theme.likes.length,
        liked: theme.likes.includes(req.headers["user-id"]),
      };
    })
  );
});

app.post("/theme", (req, res) => {
  const themeData = req.body;
  const userId = req.headers["user-id"];

  if (!userId) res.status(400).send("No user id");
  if (!themeData) res.status(400).send("No theme data");

  const allThemes = fs.readFileSync("./themes.txt");
  const allThemesJson = JSON.parse(allThemes) || [];

  const lastTheme = allThemesJson.at(-1);

  const theme = {
    id: lastTheme ? lastTheme.id + 1 : 1,
    userId,
    title: themeData.title,
    likes: [],
  };

  const updatedThemes = allThemesJson.concat(theme);

  fs.writeFileSync("./themes.txt", JSON.stringify(updatedThemes), (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.send({
    id: theme.id,
    title: theme.title,
    userId: theme.userId,
    likes: theme.likes.length,
    liked: theme.likes.includes(userId),
  });
});

app.put("/theme/:id", (req, res) => {
  const userId = req.headers["user-id"];
  const themeId = +req.params.id;

  if (!userId) res.status(400).send("No user id");
  if (!themeId) res.status(400).send("No theme id");

  const themeData = req.body;
  const allThemes = fs.readFileSync("./themes.txt");
  const allThemesJson = JSON.parse(allThemes) || [];

  let updatedTheme = null;
  const updatedThemes = allThemesJson.map((theme) => {
    if (theme.id === themeId && theme.userId === userId) {
      theme.title = themeData.title;

      updatedTheme = theme;
    }
    return theme;
  });

  fs.writeFileSync("./themes.txt", JSON.stringify(updatedThemes), (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.send(updatedTheme);
});
app.delete("/theme/:id", (req, res) => {
  const userId = req.headers["user-id"];
  const themeId = +req.params.id;

  if (!userId) res.status(400).send("No user id");
  if (!themeId) res.status(400).send("No theme id");

  const allThemes = fs.readFileSync("./themes.txt");
  const allThemesJson = JSON.parse(allThemes) || [];

  console.log(req.headers);
  let deletedTheme = null;
  const updatedThemes = allThemesJson.filter((theme) => {
    if (theme.id === themeId && theme.userId === userId) {
      deletedTheme = theme;
      return false;
    }
    return true;
  });

  fs.writeFileSync("./themes.txt", JSON.stringify(updatedThemes), (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.send(deletedTheme);
});

app.post("/theme/:id/like", (req, res) => {
  const userId = req.headers["user-id"];
  const themeId = +req.params.id;

  if (!userId) res.status(400).send("No user id");
  if (!themeId) res.status(400).send("No theme id");

  const allThemes = fs.readFileSync("./themes.txt");
  const allThemesJson = JSON.parse(allThemes) || [];

  let updatedTheme;
  const updatedThemes = allThemesJson.map((theme) => {
    if (theme.id === themeId) {
      if (theme.likes.includes(userId))
        res.status(400).send("You already liked this theme");

      theme.likes.push(userId);

      updatedTheme = theme;
    }
    return theme;
  });

  fs.writeFileSync("./themes.txt", JSON.stringify(updatedThemes), (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.send({
    id: updatedTheme?.id,
    title: updatedTheme?.title,
    userId: updatedTheme?.userId,
    likes: updatedTheme?.likes.length,
    liked: updatedTheme?.likes.includes(userId),
  });
});

app.delete("/theme/:id/like", (req, res) => {
  const userId = req.headers["user-id"];
  const themeId = +req.params.id;

  if (!userId) res.status(400).send("No user id");
  if (!themeId) res.status(400).send("No theme id");

  const allThemes = fs.readFileSync("./themes.txt");
  const allThemesJson = JSON.parse(allThemes) || [];

  let updatedTheme = null;
  const updatedThemes = allThemesJson.map((theme) => {
    if (theme.id === themeId) {
      if (!theme.likes.includes(userId))
        res.status(400).send("You have no like");

      theme.likes = theme.likes.filter((like) => like !== userId);

      updatedTheme = theme;
    }
    return theme;
  });

  fs.writeFileSync("./themes.txt", JSON.stringify(updatedThemes), (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.send({
    id: updatedTheme?.id,
    title: updatedTheme?.title,
    userId: updatedTheme?.userId,
    likes: updatedTheme?.likes.length,
    liked: updatedTheme?.likes.includes(userId),
  });
});

const start = async () => {
  await fs.writeFile("./themes.txt", JSON.stringify([]), (err) => {
    if (err) console.log(err);
  });

  app.listen(3000, () => {
    console.log(`backend started on 3000 port`);
  });
};
start();
