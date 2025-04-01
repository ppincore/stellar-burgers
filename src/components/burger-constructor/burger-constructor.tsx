import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData,
  selectIsAuthenticated,
  fetchNewOrder,
  closeOrderRequest
} from '../../slices/exports';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const isAuth = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!isAuth) {
      navigate('/login', { replace: true });
    } else if (constructorItems.bun._id && constructorItems.ingredients) {
      const ingredients = constructorItems.ingredients.map(
        (ingredient) => ingredient._id
      );
      dispatch(
        fetchNewOrder([
          constructorItems.bun._id,
          ...ingredients,
          constructorItems.bun._id
        ])
      );
    }
  };

  const closeOrderModal = () => {
    dispatch(closeOrderRequest());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price! * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
