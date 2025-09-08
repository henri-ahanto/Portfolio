import { useState } from "react";
import Input from "../../components/Input/Input";
import emailjs from "emailjs-com";
import './Contact.css';
import { useTheme } from "../../contexts/ThemeContext";

export default function Contact(){
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const sendMail = (e) => {
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let isVaild = false;
        e.preventDefault()
        if(phoneNumber.length > 0 && emailRegex.test(email)){

           const formData = {
                name: "HS Code",
                email: email,
                message: `Nouvelle demande de ${email}, numéro ${phoneNumber}`,
            };

            // 👉 Identifiants EmailJS
            const serviceId = "service_pbzvf4g";
            const templateId = "template_wabsatp";
            const publicKey = "KvpjnXZC3RrzK04St";

            emailjs
                .send(serviceId, templateId, formData, publicKey)
                .then(() => {
                alert("Email envoyé avec succès ✅");
                setEmail("");
                setPhoneNumber("");
                })
                .catch(() => {
                alert("Échec de l'envoi ❌ Veuillez réessayer.");
                });
        }
        else{
            alert("email invalide")
        }

    }

    return (
        <div id="contact"
        className={`contact ${useTheme().theme} `} onSubmit={sendMail}>
            <form action="" method="get">
                <Input label={"email"} id={"email"} type={"email"} placeholder={undefined} value={email} onChanged={(e)=>{
                    setEmail(e.target.value)
                }} />
                <Input label={"Numéro de téléphone : "} type={"tel"} placeholder={"+1xxxxxxx"} value={phoneNumber} onChanged={(e)=>{
                    setPhoneNumber(e.target.value)
                }} id={"number"} />
                <Input type={"submit"} label={undefined} id={undefined} placeholder={undefined} value={undefined} onChanged={undefined}  />
            </form>
        </div>
    )
}