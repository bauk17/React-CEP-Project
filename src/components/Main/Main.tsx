import styles from "./Main.module.css";
import { useState } from "react";
import { AxiosInstance } from "../../API/Api";

export type CepValue = {
  cep: string;
  logradouro: string;
  bairro: string;
  estado: string;
  uf: string;
  ddd: string;
};

export const Main = () => {
  const [cep, setCep] = useState<String>(""); // This hold an Cep 'Number'
  const [values, setValues] = useState<CepValue | undefined | "">(); // This receive an Type of the Fetch Values
  const [backButton, setBackButton] = useState(false); // This make the back Button after values got received works

  const handleCep = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This catch input Value
    const InputValue = e.target.value; //
    setCep(InputValue); // This hold the input value and put on 'Cep' UseState()
  };

  const handleFetch = async () => {
    await AxiosInstance.get(`${cep}/json/`).then((response) => {
      // This Fetch the API from API/Api.ts
      const CepData = response.data;
      const FetchValues = {
        cep: CepData.cep,
        logradouro: CepData.logradouro,
        bairro: CepData.bairro,
        estado: CepData.localidade,
        uf: CepData.uf,
        ddd: CepData.ddd,
      };

      setValues(FetchValues);
      setBackButton(true); // It does back button 'glow out'
    });
  };

  const handleBackButton = () => {
    setValues("");
    setBackButton(false); // It does back button 'glow off'
  };

  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.mainInputInfo}>
          <h2>Digite o número do CEP</h2>
          <input
            type="text"
            maxLength={9}
            onChange={handleCep}
            disabled={values ? true : false}
            placeholder="Ex: xxxxx-xxx"
            className={styles.inputCep}
          />
          <input
            type="button"
            value="Encontrar Cep"
            onClick={handleFetch}
            className={styles.inputButton}
            disabled={values ? true : false} //
          />
          <input
            type="button"
            value="Voltar"
            className={styles.inputButtonBack}
            disabled={backButton ? false : true}
            onClick={handleBackButton}
          />
        </div>
        {values && ( // If values == true, show...
          <div className={styles.cepInfos}>
            <span>Endereço: {values && values.logradouro}</span>
            <span>Bairro: {values && values.bairro}</span>
            <span>Cidade: {values && values.estado}</span>
            <span>Unidade Federal: {values && values.uf}</span>
            <span>CEP: {values && values.cep}</span>
            <span>DDD: {values && values.ddd}</span>
          </div>
        )}
      </div>
    </div>
  );
};
