import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useContext, useEffect} from 'react';
import AuthContext from '../../store/auth-context';

const AvailableMeals = () => {

  const ctx = useContext(AuthContext)

useEffect(()=> {
  const fetchMeals = async () => {
  const response = await fetch("https://react-http-47f2f-default-rtdb.firebaseio.com/meals.json");

  if(!response.ok) {
    throw new Error ("Something Went Wrong!!!!")
  }

  const responseData = await response.json();

  const loadedMeals = [];

  for (const key in responseData) {
    loadedMeals.push({
        id:key,
        name: responseData[key].name,
        description: responseData[key].description,
        price: responseData[key].price
    })
  }
  ctx.setMeals(loadedMeals)
  ctx.setIsLoading(false)
 };

  fetchMeals().catch((error)=> {
      ctx.setIsLoading(false);
      ctx.setHttpError(error.message)
  })
 
},)

if(ctx.isLoading) {
  return <section className={classes.MealsLoading}>
    <p>Loading....</p>
  </section>
}

if(ctx.httpError) {
  return <section className={classes.MealsError}>
  <p>{ctx.httpError}</p>
</section>
}

  const mealsList = ctx.meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
