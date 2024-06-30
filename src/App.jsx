import Builder from './components/Builder'

function App() {
    const build = formData => {
        console.log(formData)
    }

    return <Builder build={build} />
}

export default App