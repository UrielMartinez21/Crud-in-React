import axios from "axios";

export class Service {

    // baseUrl = "http://localhost:8080/api/products/";
    baseUrl = "https://hg-rest-api.herokuapp.com/api/products/";

    crear(registro) {
        return axios.post(this.baseUrl + "product/", registro).then(res => res.data);
    }

    obtenerRegistros() {
        return axios.get(this.baseUrl).then(res => res.data);
    }

    actualizar(registro) {
        return axios.put(this.baseUrl + "product/" + registro._id, registro).then(res => res.data);
    }

    eliminar(id) {
        return axios.delete(this.baseUrl + "product/" + id).then(res => res.data);
    }
}