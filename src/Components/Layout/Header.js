import { Fragment } from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assests/food.jpg";
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Let's Order Something</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt= 'Pasta'></img>
      </div>
    </Fragment>
  );
};

export default Header;
