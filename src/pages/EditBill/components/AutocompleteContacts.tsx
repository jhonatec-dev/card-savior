import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AppContext } from "../../../context";
import { ContactNewType } from "../../../context/types";

const filter = createFilterOptions<ContactNewType>();
const newIdContact = '';

const AutocompleteContacts = () => {
  const { contacts } = useContext(AppContext);
  const { register, setValue, getValues } = useFormContext();

  register("selContact");
  const newContacts = contacts.map((c) => {
    return {
      id: c.id,
      name: c.name,
      inputValue: "",
    };
  });
  const [selContact, setSelContact] = useState<ContactNewType | null>(
    getValues("selContact") || null
  );

  useEffect(() => {
    setValue("selContact", selContact);
  }, [selContact, setValue]);

  const handleChange = (_e: any, newValue: any) => {
    if(!newValue) {
      setSelContact(null);
      return
    }
    if(typeof newValue === "string") {
      // console.log('string', newIdContact)
      setSelContact({
        id: newIdContact,
        name: newValue,
        inputValue: "",
      });
    } else if (newValue.inputValue) {
      // console.log('inputValue', newIdContact)
      setSelContact({
        id: newIdContact,
        name: newValue.inputValue,
        inputValue: "",
      });
    } else {
      setSelContact(newValue);
    }
  };

  return (
    <>
      <Autocomplete
        freeSolo
        fullWidth
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(params, option) => <li {...params}>{option.name}</li>}
        onChange={handleChange}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          const isExisting = options.some(
            (option) => option.name === inputValue
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              id: newIdContact,
              inputValue,
              name: `Adicionar ${inputValue}`,
            });
          }

          return filtered;
        }}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }

          if (option.inputValue) {
            return option.inputValue;
          }

          return option.name;
        }}
        options={newContacts}
        value={selContact}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Quem comprou"
            helperText="Deixe em branco para registrar como seus gastos."
          />
        )}
      />
    </>
  );
};

export { AutocompleteContacts };
