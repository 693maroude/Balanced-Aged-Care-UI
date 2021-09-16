import React, { useState, createContext } from "react";

export const GlobalContext = createContext();

const GlobalStateProvider = (props) => {
  const [resolvedHTML, setResolvedHTML] = useState(null);
  const [entryValues, setEntryValues] = useState("");
  const [entryId, setEntryId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    date: new Date().toISOString().substr(0, 10),
  });
  const [signature, setSignature] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        ResolvedHTML: [resolvedHTML, setResolvedHTML],
        EntryValues: [entryValues, setEntryValues],
        EntryId: [entryId, setEntryId],
        FormValue: [form, setForm],
        Signature: [signature, setSignature],
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalStateProvider;
