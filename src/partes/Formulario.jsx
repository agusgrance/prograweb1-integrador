import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
const schema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio"),
  foto: yup.string().notRequired(),
  password: yup.string().notRequired(),
  email: yup
    .string()
    .required("El email es obligatorio")
    .email("Email incorrecto"),
});

function Formulario({ onCambio }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setValue("foto", base64);
  };

  const enviar = (data) => {
    axios
      .post(`usuarios`, data)
      .then((response) => {
        reset();
        onCambio();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(enviar)}>
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

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            {...register("nombre")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            {...register("email")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contacto" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password")}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!isValid}>
          Guardar
        </button>
        <button
          type="reset"
          className="ms-1 btn btn-secondary"
          onClick={() => reset()}
        >
          Descartar
        </button>
      </form>
    </div>
  );
}

export default Formulario;
