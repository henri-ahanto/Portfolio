


export default function Menu(menuItems){
    return (
        <div>
            <nav className={styles.menu}>
                <ul>
                    {menuItems.map((item, index) => (
                    <li key={index}>{item}</li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}