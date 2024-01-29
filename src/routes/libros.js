const express = require("express");
const router = express.Router();

const { getAllLibros, getLibroById, createLibro, updateLibro, deleteLibro} = require("../controllers/libroController");


// Importamos la libreria para validar scopes
const { requiredScopes } = require("express-oauth2-jwt-bearer");

// Ruta para obtener todos los libros
router.get("/", requiredScopes("read:libros"), getAllLibros, (req, res) => {
try {
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la lista de usuarios" });
  }
});

// Ruta para obtener un libro por id
router.get("/:id", requiredScopes("read:libros"), getLibroById, (req, res) => {
    try {
        const id = req.params.id;
        const usuario = usuarios.find((u) => u.id === id);
        if (!usuario) {
          return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json(usuario);
      } catch (error) {
        res.status(500).json({ error: "Error al obtener el usuario" });
      }
});


// Ruta para crear un nuevo Libro
router.post("/", requiredScopes("write:libros"), createLibro, (req, res) => {
    try {
        const { titulo, autor } = value;
        if (!titulo || !autor) {
          return res.status(400).json({ error: "Faltan campos obligatorios" });
        } else {
          const nuevoUsuario = {
            id: usuarios.length + 1,
            titulo,  
            autor
            };
            usuarios.push(nuevoUsuario);
            res.status(201).json(nuevoUsuario);
      };
      } catch (error) {
        res.status(500).json({ error: "Error al crear el usuario" });
      }
    });

// Ruta para actualizar un Libro existente
router.put("/:id", requiredScopes("write:libros"), updateLibro, (req, res) => {
    try {
        const id = req.params.id;
        const usuarioActualizado = req.body;
        const index = usuarios.findIndex((u) => u.id == id);
        if (index == -1) {
          return res.status(404).json({ error: "Usuario no encontrado" });
        }
        usuarios[index] = usuarioActualizado;
        res.status(200).json(usuarios[index]);
      } catch (error) {
        res.status(500).json({ error: "Error al actualizar el usuario" });
      }
});


// Ruta para eliminar un Libro
router.delete("/:id", requiredScopes("write:libros"), deleteLibro, (req, res) => {
    try {
        const id = req.params.id;
        const index = usuarios.findIndex((u) => u.id == id);
        if (index == -1) {
          return res.status(404).json({ error: "Usuario no encontrado" });
        }
        usuarios.splice(index, 1);
        res.status(204).send();
      } catch (error) {
        res.status(500).json({ error: "Error al eliminar el usuario" });
      }
});

module.exports = router;
