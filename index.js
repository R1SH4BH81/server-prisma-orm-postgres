const express = require("express");
const app = express();
const authRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
