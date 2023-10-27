const Button = ({color, text , onClick}) => {
    // const onClick = () => {
    //     console.log('clicked')
    // }


  return (
    <button onClick={onClick} style={{backgroundColor: color}} className="btn" >
        {text}
    </button>
  )
}
Button.defaultProps = {
  color : "steelblue",
  text : "button"  
}

// Button.propTypes = {
//   color: PropTypes.string,
//   text: PropTypes.string,
//   onClick: PropTypes.func
// }

export default Button