import { Party } from '../pages/MainPage/Type';

export const isFullParty = (party: Party) => {
  return party.likedNum === party.partyLimit;
};
