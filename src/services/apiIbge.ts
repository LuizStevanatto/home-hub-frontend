import axios from "axios";

const apiIbge = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades",
});

export default apiIbge;
