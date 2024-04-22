import FormComponent from "../components/Form"

function Login({ setUserName }) {
    return <FormComponent route="/api/token/" method="login" setUserName={setUserName} />
}

export default Login