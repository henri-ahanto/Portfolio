import './Input.css';

export default function Input({label, id, type, placeholder, value, onChanged}){

    return(
        <div className="input-group">
            <label htmlFor={id}>
                {label}
            </label>
            <input id={id} type={type} {...placeholder !== undefined ? placeholder={placeholder} : placeholder=""} value={value!} onChange={onChanged}/>
        </div>
    );
}