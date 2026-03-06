import express from "express";
import path from "path";
import hbs from "hbs";

import productRoutes from "./routes/product.routes";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.set("view options", { layout: "layouts/main" });

hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Simple helper to lowercase strings (used for CSS classes)
hbs.registerHelper("lowercase", (value: string) => (value ? value.toLowerCase().replace(" ", "-") : ""));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", productRoutes);

export default app;