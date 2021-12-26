import { actionsLocalUser } from '../utils/reduxConstants';

export const saveData = (data) => ({
	type: actionsLocalUser.saveData,
  datos
});
export const updateData = (newData) => ({
	type: actionsLocalUser.updateData,
	newData
});
export const emptyData = () => ({
	type: actionsLocalUser.emptyData,
}); 