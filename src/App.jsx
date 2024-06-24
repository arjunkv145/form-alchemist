import Builder from './components/Builder'
import Render from './components/Render'
import './styles/index.css'

const data = [
    {
        "uid": "_RqrXzIdPxlHjcjqE3_U-",
        "parentContainerUid": "main",
        "label": "name",
        "id": "name",
        "name": "name",
        "placeholder": "name",
        "minLength": 0,
        "maxLength": 100,
        "required": true,
        "readOnly": false,
        "disabled": false,
        "type": "text",
        "customStyles": "\n    margin-top: .6em;\n    display: flex;\n    align-items: center;\n\n    & label {\n        margin-right: 1em;\n        font-size: .9rem;\n        color: hsl(0, 0%, 31%);\n    }\n    & input {\n        padding: .65em .8em;\n        width: 100%;\n        font-family: inherit;\n        font-size: .9rem;\n        background-color: hsl(0, 0%, 100%);\n        color: hsl(0, 0%, 19%);\n        border: 1px solid hsl(0, 0%, 62%);\n        border-radius: 3px;\n        outline: none;\n    }\n\n    & input::placeholder {\n        color: hsl(0, 0%, 46%);\n    }\n"
    },
    {
        "uid": "bHBM-osMjpyGBNUHA5nOE",
        "parentContainerUid": "main",
        "label": "age",
        "id": "age",
        "name": "age",
        "placeholder": "age",
        "min": 0,
        "max": 50,
        "required": false,
        "readOnly": false,
        "disabled": false,
        "type": "number",
        "customStyles": "\n    margin-top: .6em;\n    display: flex;\n    align-items: center;\n\n    & label {\n        margin-right: 1em;\n        font-size: .9rem;\n        color: hsl(0, 0%, 31%);\n    }\n    & input {\n        padding: .65em .8em;\n        width: 100%;\n        font-family: inherit;\n        font-size: .9rem;\n        background-color: hsl(0, 0%, 100%);\n        color: hsl(0, 0%, 19%);\n        border: 1px solid hsl(0, 0%, 62%);\n        border-radius: 3px;\n        outline: none;\n    }\n\n    & input::placeholder {\n        color: hsl(0, 0%, 46%);\n    }\n"
    },
    {
        "uid": "xqKWOrgZhKxZ8zXIQ5G6C",
        "parentContainerUid": "main",
        "label": "number",
        "id": "numbre",
        "name": "number",
        "placeholder": "number",
        "min": 0,
        "max": 50,
        "required": false,
        "readOnly": false,
        "disabled": false,
        "type": "number",
        "customStyles": "\n    margin-top: .6em;\n    display: flex;\n    align-items: center;\n\n    & label {\n        margin-right: 1em;\n        font-size: .9rem;\n        color: hsl(0, 0%, 31%);\n    }\n    & input {\n        padding: .65em .8em;\n        width: 100%;\n        font-family: inherit;\n        font-size: .9rem;\n        background-color: hsl(0, 0%, 100%);\n        color: hsl(0, 0%, 19%);\n        border: 1px solid hsl(0, 0%, 62%);\n        border-radius: 3px;\n        outline: none;\n    }\n\n    & input::placeholder {\n        color: hsl(0, 0%, 46%);\n    }\n"
    },
    {
        "uid": "SLSYJOWxcj-FkGnvD3OGA",
        "parentContainerUid": "main",
        "label": "nb",
        "id": "hy",
        "name": "iu",
        "required": true,
        "disabled": false,
        "multiple": false,
        "optionsCount": "4",
        "type": "select",
        "customStyles": "\n    margin-top: .6em;\n    display: flex;\n    align-items: center;\n\n    & label {\n        margin-right: 1em;\n        font-size: .9rem;\n        color: hsl(0, 0%, 31%);\n    }\n\n    & select {\n        padding: .4em 1.2em .4em .8em;\n        width: 100%;\n        background-color: hsl(0, 0%, 100%);\n        color: hsl(0, 0%, 19%);\n        border: 1px solid hsl(0, 0%, 62%);\n        border-radius: 3px;\n        cursor: pointer;\n    }\n",
        "options": {
            "value": [
                "q",
                "w",
                "e",
                "r",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "text": [
                "q",
                "w",
                "e",
                "r",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "selected": [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ],
            "disabled": [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ]
        }
    },
    {
        "uid": "TBgNzhoJqqUpnbZHMCq_b",
        "parentContainerUid": "main",
        "name": "yj",
        "required": true,
        "question": "bn",
        "optionsCount": "4",
        "type": "radio",
        "customStyles": "\n    margin-top: .6em;\n\n    & span {\n        font-size: .9rem;\n        color: hsl(0, 0%, 46%);\n        display: block;\n    }\n\n    & input {\n        display: none;\n    }\n\n    & input + label {\n        display: inline-block;\n        padding: .5em 3em .5em 1em;\n        margin-top: .4em;\n        background-color: transparent;\n        color: hsl(0, 0%, 19%);\n        border: 1px solid hsl(0, 0%, 62%);\n        border-radius: 3px;\n        cursor: pointer;\n        position: relative;\n    }\n\n    & input + label::before {\n        content: '';\n        position: absolute;\n        right: 10px;\n        top: 50%;\n        transform: translateY(-50%);\n        width: 12px;\n        height: 12px;\n        background-color: hsl(0, 0%, 95%);\n        border: 2px solid hsl(0, 0%, 62%);\n        border-radius: 50%;\n    }\n\n    & input:checked + label::after {\n        content: '';\n        position: absolute;\n        right: 13px;\n        top: 50%;\n        transform: translateY(-50%);\n        width: 9px;\n        height: 9px;\n        background-color: hsl(0, 0%, 62%);\n        border-radius: 50%;\n    }\n",
        "options": {
            "label": [
                "jth",
                "jh",
                "ioy",
                "dfg",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "id": [
                "iu",
                "jfgh",
                "ioj",
                "tj",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "value": [
                "iu",
                "vty",
                "hfy",
                "fgh",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "checked": [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ],
            "disabled": [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ]
        }
    },
    {
        "uid": "11ouYK4xL-mNK12kbAWwm",
        "parentContainerUid": "main",
        "name": "rth",
        "required": true,
        "question": "rgfh",
        "optionsCount": "4",
        "type": "radio",
        "customStyles": "\n    margin-top: .6em;\n\n    & span {\n        font-size: .9rem;\n        color: hsl(0, 0%, 46%);\n        display: block;\n    }\n\n    & input {\n        display: none;\n    }\n\n    & input + label {\n        display: inline-block;\n        padding: .5em 3em .5em 1em;\n        margin-top: .4em;\n        background-color: transparent;\n        color: hsl(0, 0%, 19%);\n        border: 1px solid hsl(0, 0%, 62%);\n        border-radius: 3px;\n        cursor: pointer;\n        position: relative;\n    }\n\n    & input + label::before {\n        content: '';\n        position: absolute;\n        right: 10px;\n        top: 50%;\n        transform: translateY(-50%);\n        width: 12px;\n        height: 12px;\n        background-color: hsl(0, 0%, 95%);\n        border: 2px solid hsl(0, 0%, 62%);\n        border-radius: 50%;\n    }\n\n    & input:checked + label::after {\n        content: '';\n        position: absolute;\n        right: 13px;\n        top: 50%;\n        transform: translateY(-50%);\n        width: 9px;\n        height: 9px;\n        background-color: hsl(0, 0%, 62%);\n        border-radius: 50%;\n    }\n",
        "options": {
            "label": [
                "pi",
                "oiyr",
                "ere",
                "hju",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "id": [
                "oiu",
                "fhkb",
                "rtrt",
                "khjk",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "value": [
                "kh",
                "vnbj",
                "uyuy",
                "gjtyj",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "checked": [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ],
            "disabled": [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ]
        },
    },
    {
        "uid": "PKcoe82g6NwG13NDgepeK",
        "parentContainerUid": "main",
        "required": false,
        "question": "rtyrty",
        "optionsCount": "3",
        "type": "checkbox",
        "customStyles": "\n    margin-top: .6em;\n\n    & span {\n        font-size: .9rem;\n        color: hsl(0, 0%, 46%);\n        display: block;\n    }\n\n    & input {\n        display: none;\n    }\n\n    & input + label {\n        display: inline-block;\n        padding: .5em 3em .5em 1em;\n        margin-top: .4em;\n        background-color: transparent;\n        color: hsl(0, 0%, 19%);\n        border: 1px solid hsl(0, 0%, 62%);\n        border-radius: 3px;\n        cursor: pointer;\n        position: relative;\n    }\n\n    & input + label::before {\n        content: '';\n        position: absolute;\n        right: 10px;\n        top: 50%;\n        transform: translateY(-50%);\n        width: 12px;\n        height: 12px;\n        background-color: hsl(0, 0%, 95%);\n        border: 2px solid hsl(0, 0%, 62%);\n        border-radius: 50%;\n    }\n\n    & input:checked + label::after {\n        content: '';\n        position: absolute;\n        right: 13px;\n        top: 50%;\n        transform: translateY(-50%);\n        width: 9px;\n        height: 9px;\n        background-color: hsl(0, 0%, 62%);\n        border-radius: 50%;\n    }\n",
        "options": {
            "label": [
                "oneone",
                "tw",
                "tw",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "id": [
                "one",
                "tw",
                "twt",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "name": [
                "one",
                "tw",
                "tw",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "value": [
                "one",
                "tw",
                "tw",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "checked": [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ],
            "disabled": [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ]
        }
    },
    {
        "uid": "1hoY5QUWNqtvbpL3ZFI_W",
        "parentContainerUid": "main",
        "buttonType": "submit",
        "text": "submit",
        "id": "jrgj",
        "name": "uk",
        "disabled": false,
        "type": "button",
        "customStyles": "\n    margin-top: .6em;\n\n    & button {\n        margin: .8em 0;\n        padding: .7em 2em;\n        font-size: .9rem;\n        background-color: #9658dc;\n        color: #f2f2f2;\n        border: none;\n        border-radius: 5px;\n        cursor: pointer;\n        transition: background-color 130ms ease-in;\n    }\n\n    & button:hover {\n        background-color: #763bb9;\n    }\n\n    & button:disabled {\n        cursor: not-allowed;\n    }\n"
    }
]

function App() {
    // const build = data => {
    //     console.log(data)
    // }

    return (
      <div style={{
        margin: '40px auto',
        padding: '1em',
        width: '400px',
        border: '1px solid lightgrey',
        borderRadius: '5px'
      }}>
        <Render data={data} />
      </div>
        // <Builder build={build} />
    )
}

export default App