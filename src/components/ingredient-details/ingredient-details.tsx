import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../slices/exports';
import { useLocation, useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const ingredientsActive = useParams();
  const ingredients = useSelector(selectIngredients);
  const isModalOpen = !!useLocation().state?.background;
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === ingredientsActive.id
  );
  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <IngredientDetailsUI
      ingredientData={ingredientData}
      isModalOpen={isModalOpen}
    />
  );
};
