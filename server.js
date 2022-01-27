import server from "./src/app.js"
const PORT = process.env.PORT || 3030
server.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
})