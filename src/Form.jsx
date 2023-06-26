import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "react-bootstrap";
import { convertToBase64 } from "./partes/Formulario";

const schema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio"),
  email: yup
    .string()
    .required("El contacto es obligatorio")
    .email("Email incorrecto"),
  foto: yup.string().notRequired(),
});

function Form({ formUserData, handleClose, handleEdit }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("nombre", formUserData.nombre);
    setValue("email", formUserData.email);
    setValue("foto", formUserData.foto);
  }, [formUserData]);

  const enviar = (data) => {
    return handleEdit(data, formUserData.id);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setValue("foto", base64);
  };

  return (
    <>
      <form onSubmit={handleSubmit(enviar)}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            {...register("nombre")}
            className="form-control"
            id="nombre"
            name="nombre"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="form-control"
            id="email"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="foto" className="form-label">
            Foto
          </label>
          <input
            type="file"
            className="form-control"
            id="foto"
            accept=".jpeg, .png, .jpg"
            onChange={handleFileUpload}
          />
        </div>
        <Modal.Footer>
          <Button type="reset" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save changes
          </Button>
        </Modal.Footer>
      </form>
    </>
  );
}

export default Form;
