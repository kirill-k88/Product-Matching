import { createContext } from 'react';
import { IDealer } from '../utils/Interfaces/IDealer.interface';
import { INIRIAL_USER, INITIAL_MARKETING_DEALER } from '../utils/constants';
import { IUser } from '../utils/Interfaces/IUser.interface';
interface IMarkingContext {
  dealerList: IDealer[];
  loggedIn: boolean;
  user: IUser;
}
export const MarkingContext = createContext<IMarkingContext>({
  dealerList: INITIAL_MARKETING_DEALER,
  loggedIn: false,
  user: INIRIAL_USER
});
