const withInputStyles = (InputComponent) => {
    return props => {
        const style = {
          padding: ".3em",
          borderRadius: "10px",
          border: "2px solid black",
          fontSize: ".9em",
        };
        return <NewInput style={style} />
    }
    {/*
        
        .form_control label {
    font-weight: bold;
    margin-bottom: .5em;
}

.form_control input {
    padding: .3em;
    border-radius: 10px;
    border: 2px solid  black;
    font-size: .9em;
}

.form_control input::placeholder {
    color: black;
    font-weight: 500;
}*/}
}