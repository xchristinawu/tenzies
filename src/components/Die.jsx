export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }
    
    return (
        <div 
            className="die" 
            style={styles} 
            onClick={props.holdDice}
        >
            <p className="die-num">{props.value}</p>
        </div>
    )
}