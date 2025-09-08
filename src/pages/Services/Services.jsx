import CardServices from '../../components/Card/Services/service';
import './Services.css';


export default function Services(){
    return(
        <div className='services page'>
            <div className='lists'>
            <CardServices title="Dévellopement web" description={
                `Transformer vos idées en sites web statique ou dynamique`
            }
            image_src={"https://tse3.mm.bing.net/th/id/OIP.1BEkIWI2CaghBS8DHaTrxgHaE8?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3"}/>

            <CardServices 
            image_src={"https://tse1.mm.bing.net/th/id/OIP.qZxfCse2XrvW4IXH8qYo6QHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3"}
            title={"Dévellopement Mobile"}
            description={"Rapprocher vos idées du monde"}/>

            <CardServices 
            image_src={"https://thvnext.bing.com/th/id/OIP.KjgdsWCAcK_ltdME3C9GZgHaFj?w=237&h=180&c=7&r=0&o=7&cb=ucfimgc2&dpr=1.3&pid=1.7&rm=3"}
            title={"Dévellopement Back-end"}
            description={"Connecter les apps issues de vos idée avec des apis puissantes et robustes"}/>
            </div>
        </div>
    );
}