import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateFood from './pages/Foods/CreateFood';
import FoodList from './pages/Foods/FoodList';
import Login from './pages/Login';
import CreateMealPlan from './pages/MealPlans/CreateMealPlan';
import MealPlanList from './pages/MealPlans/MealPlanList';

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" render={props => <Dashboard {...props} />} />
        <Route exact path="/login" render={props => <Login {...props} />} />
        <Route exact path="/dashboard" render={props => <Dashboard {...props} />} />
        <Route exact path="/foods" render={props => <FoodList {...props} />} />
        <Route exact path="/foods/:id" render={props => <CreateFood {...props} />} />
        <Route exact path="/create-food" render={props => <CreateFood {...props} />} />
        <Route exact path="/meal-plans" render={props => <MealPlanList {...props} />} />
        <Route exact path="/meal-plans/:id" render={props => <CreateMealPlan {...props} />} />
        <Route exact path="/create-meal-plan" render={props => <CreateMealPlan {...props} />} />
      </Router>
    </div>
  );
}

export default App;
