import PropTypes from 'prop-types'
import Button from '../Button/Button'
const Header = ({title, onAdd, showAdd}) => {
 
  return (
    <header className='header'>
        <h1>{title}</h1>
        {/* <button className='btn'>Add</button> */}
        <Button color={showAdd ? "red" : "green"} text={showAdd ? "close" : "Add"} 
        onClick={onAdd} />
    </header>
  )
}

Header.defaultProps={
    title: "Task Tracker"
}

Header.propTypes= {
  title: PropTypes.string.isRequired
};


// css in js
// const HeadingStyle = {
//   color: 'white',
//   textAlign : 'center',
//   backgroundColor: 'aqua'
// }

export default Header

