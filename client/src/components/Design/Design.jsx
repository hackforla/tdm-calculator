import React, { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import ContentContainer from "../Layout/ContentContainer";
import MaskedInput from "../UI/MaskedInput";
import MultiMaskedInput from "../UI/MultiMaskedInput";

const useStyles = createUseStyles(theme => ({
  inputGroup: {
    marginBottom: "1em"
  },
  textInput: {
    boxSizing: "border-box"
  },

  heading1: { ...theme.typography.heading1, textAlign: "left" },
  badgeContainer: { display: "flex", flexWrap: "wrap" },
  badge: {
    margin: "0.25em",
    color: theme.colorText,
    backgroundColor: "#DDDDDD",
    borderRadius: "1em",
    padding: "0.25em 0.5em",
    boxShadow: `0px 1px 4px ${theme.colorText}`
  },
  closeBox: {
    marginLeft: "0.5em",
    color: theme.colorText,
    verticalAlign: "middle"
  },
  errorText: {
    color: theme.colorError
  }
}));

const Design = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [inputValue, setInputValue] = useState("");
  const [maskedInputValue, setMaskedInputValue] = useState("");

  const [ains, setAins] = useState("1234-567-890,9876-543-210");
  const [ain, setAin] = useState("345");
  const [inputError, setInputError] = useState("");

  const handleMaskedInputChange = e => {
    setMaskedInputValue(e.target.value);
  };

  return (
    <ContentContainer>
      <h1 className={classes.heading1}>Design System</h1>
      <h2 className={theme.heading2}>Inputs</h2>
      <section style={{ width: "80vw" }}>
        <div className={classes.inputGroup}>
          <label htmlFor="input1">Standard Input</label>
          <input
            type="text"
            onChange={e => setInputValue(e.target.value)}
            className={classes.textInput}
          />
          <div>{inputValue}</div>
        </div>
        <div className={classes.inputGroup}>
          <label htmlFor="input1">Masked Input</label>
          <MaskedInput
            mask="999-99-9999"
            value={maskedInputValue}
            name="maskedInput"
            onChange={handleMaskedInputChange}
            className={classes.textInput}
          />
          <div>{maskedInputValue}</div>
        </div>

        <div className={classes.inputGroup}>
          <label htmlFor="multiMaskedInput">Multi-Masked Input</label>
          <MultiMaskedInput
            code="ainMultiInput"
            value={ains}
            mask="9999-999-999"
            validationErrors={null}
            onChange={e => setAins(e.target.value)}
            required={true}
            onError={setInputError}
            partialValue={ain}
            onPartialValueChange={setAin}
            placeholder={"required"}
          />
          <div>{inputError}</div>
        </div>
      </section>
    </ContentContainer>
  );
};

export default Design;
