import Form from "../components/Form"

function Login({ setUserName }) {
    return <Form route="/api/token/" method="login" setUserName={setUserName} />
}

export default Login