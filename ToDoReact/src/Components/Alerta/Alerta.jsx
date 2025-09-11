import React from "react";
import "./Alerta.css";

function Alerta({ tipo = "alert", mensaje, valorInicial = "", onConfirm, onCancel }) {
    const [inputValue, setInputValue] = React.useState(valorInicial);
    // Manejar Enter en prompt
    const manejarEnter = (e) => {
    if (e.key === "Enter") {
      if (tipo === "prompt") {
        onConfirm(inputValue); // ✅ Confirma con el valor
      } else {
        onConfirm?.(); // ✅ Para alert o confirm
      }
    }
  };

  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <p>{mensaje}</p>

        {/* prompt (input) */}
        {tipo === "prompt" && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={manejarEnter}
            autoFocus
          />
        )}

        <div className="alert-buttons">
          {/* alert simple */}
          {tipo === "alert" && (
            <button className="btn-ok" onClick={onConfirm}>Aceptar</button>
          )}

          {/* confirm */}
          {tipo === "confirm" && (
            <>
              <button className="btn-cancel" onClick={onCancel}>Cancelar</button>
              <button className="btn-ok" onClick={onConfirm}>Aceptar</button>
            </>
          )}

          {/* prompt */}
          {tipo === "prompt" && (
            <>
              <button className="btn-cancel" onClick={onCancel}>Cancelar</button>
              <button className="btn-ok" onClick={() => onConfirm(inputValue)}>Aceptar</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Alerta;
