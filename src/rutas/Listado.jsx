import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "../Form";
import Formulario from "../partes/Formulario";

function Listado() {
  const [usuarios, setUsuarios] = useState(null);
  const [editar, setEditar] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const listar = () => {
    axios
      .get("usuarios")
      .then((response) => {
        setSelectedUser(response.data);
        setUsuarios(response.data);
      })
      .catch((response) => {
        setSelectedUser([]);
      });
  };

  const botonEditar = (unUsuario) => {
    setEditar(!editar);
    setSelectedUser(unUsuario);
  };

  const botonBorrar = (unUsuario) => {
    if (
      window.confirm(
        `¿Estás seguro de que querés eliminar a ${unUsuario.nombre}?`
      )
    ) {
      axios
        .delete("usuarios/" + unUsuario.id)
        .then((response) => {
          listar();
        })
        .catch((response) => {
          window.alert("Algo falló en la eliminación");
        });
    }
  };
  useEffect(() => {
    listar();
  }, []);

  const handleEdit = (data, id) => {
    if (window.confirm(`¿Estás seguro de que querés editar?`)) {
      axios
        .patch(`http://localhost:3001/usuarios/${id}`, {
          password: "hola123",
          ...data,
        })
        .then((response) => {
          setEditar(!editar);
          listar();
        })
        .catch((error) => {
          console.log(error);
          window.alert("Algo falló al editar");
        });
    }
  };

  return (
    <>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="text-center">
                Foto
              </th>
              <th scope="col" className="text-center">
                Nombre
              </th>
              <th scope="col" className="text-center">
                Email
              </th>
              <th scope="col" className="text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {usuarios &&
              usuarios.map((usuario, index) => (
                <tr key={index}>
                  <td className="text-center">
                    <img src={usuario.foto} style={{ width: "30px" }} />
                  </td>
                  <td className="text-center">{usuario.nombre}</td>
                  <td className="text-center">{usuario.email}</td>
                  <td className="text-center text-nowrap">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={() => botonEditar(usuario)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="ms-1 btn btn-sm btn-danger"
                      onClick={() => botonBorrar(usuario)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <button
          onClick={() => setShowForm(!showForm)}
          type="button"
          className="ms-2 btn btn-sm btn-secondary"
        >
          Agregar usuario
        </button>
      </div>

      {editar && (
        <div
          className="modal show"
          style={{ display: "block", position: "fixed" }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton onClick={() => setEditar(!editar)}>
              <Modal.Title>Modal Editar</Modal.Title>
            </Modal.Header>

            <Form
              formUserData={selectedUser}
              handleClose={() => setEditar(!editar)}
              handleEdit={handleEdit}
            />
          </Modal.Dialog>
        </div>
      )}
      {showForm && <Formulario onCambio={listar} />}
    </>
  );
}

export default Listado;
