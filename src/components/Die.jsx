export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#404040" : "#FFFFFF"
    }
    const pipStyles = {
        backgroundColor: props.isHeld ? "#FFFFFF" : "#404040"
    }
    const pips = Array
                    .from(Array(props.value))
                    .map((item,i) => <span key={i} className="pip" style={pipStyles}/>)

    return (
        <div 
            className="die" 
            style={styles} 
            onClick={props.holdDice}
        >
            <div className="face">{pips}</div>
        </div>
    )
}