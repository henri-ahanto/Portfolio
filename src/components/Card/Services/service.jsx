export default function CardServices({image_src, title, description}){
    return(
    <div className="card">

            {/* Version avec Image */}
            <div className="card with-image">
                { image_src !== undefined ? 
                    <div className="card_image">
                        <img src={image_src} alt="Placeholder" />
                    </div>
                 : <span></span>
                 }
                <div className="card_content">
                <h3 className="card_title">{title}</h3>
                <p className="card_text">{description}</p>
                </div>
            </div>
    </div>
    );
}