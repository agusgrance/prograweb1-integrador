const express = require("express");
const router = express.Router();
const { Usuario } = require("../Modelos");
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../Config");

router.get("/usuarios", async (req, res) => {
  const data = await Usuario.findAll();
  res.json(data);
});

router.get("/usuarios/perfil", async (req, res) => {
  const { id } = req.params;
  const payload = jwt.verify(req.headers["authorization"], jwtSecretKey);
  try {
    const unUsuario = await Usuario.findByPk(payload.id, {
      include: "",
    });
    if (unUsuario === null) {
      res
        .status(404)
        .json({ error: `No se encontró el usuario con ID ${id}.` });
    } else {
      res.json(unUsuario);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al ejecutar la consulta." });
  }
});

router.post("/usuarios/", async (req, res) => {
  try {
    const unUsuario = await Usuario.build(req.body);
    await unUsuario.validate();
    const unUsuarioValidado = await Usuario.create(req.body);
    res.json({ id: unUsuarioValidado.id });
  } catch (error) {
    console.error(error);
    res.status(409).json({
      errores: error.errors.map(function (e) {
        return e.message;
      }),
    });
  }
});

router.patch("/usuarios/perfil", async (req, res) => {
  const payload = jwt.verify(req.headers["authorization"], jwtSecretKey);
  const id = payload.id;
  const unUsuario = req.body;

  try {
    const [, affectedRows] = await Usuario.update(unUsuario, {
      where: { id },
      individualHooks: true,
    });
    if (affectedRows === 0) {
      res
        .status(404)
        .json({ error: `No se encontró el usuario con ID ${id}.` });
    } else {
      res.json({ id: id });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al actualizar los datos." });
  }
});
router.patch("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const unUsuario = req.body;

  try {
    const [, affectedRows] = await Usuario.update(unUsuario, {
      where: { id },
      individualHooks: true,
    });
    if (affectedRows === 0) {
      res
        .status(404)
        .json({ error: `No se encontró el usuario con ID ${id}.` });
    } else {
      res.json({ id: id });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al actualizar los datos." });
  }
});

router.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const unUsuario = await Usuario.findOne({ where: { id } });
    if (!unUsuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    await unUsuario.destroy();
    res.json("ok");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
