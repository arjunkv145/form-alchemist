type StyledEditor = {
    show: boolean;
    customStyles: string;
    onChange: (customStyles: string) => void;
    onClose: () => void;
    onSubmit: () => void;
};

function StyleEditor({ show, customStyles, onChange, onClose, onSubmit }: StyledEditor) {
    return (
        <div className={`style-editor${show ? ' show' : ''}`}>
            <h2 className='style-editor__title'>Styles</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <textarea
                    className='style-editor__editor'
                    value={customStyles}
                    onChange={(e) => onChange(e.target.value)}
                ></textarea>
                <div className='style-editor__btn-wrapper'>
                    <button type='button' className='style-editor__btn-cancel' onClick={onClose}>
                        cancel
                    </button>
                    <button type='submit' className='style-editor__btn-save'>
                        save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default StyleEditor;
